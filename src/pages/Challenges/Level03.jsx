import { useState } from "react";
import "./Level03.css";

const questions = [
  {
    question: "In an array, what does a memory location represent?",
    help: "Think about where each array element is stored.",
    options: [
      "A place where an element is stored",
      "The size of the program",
      "The number of loops",
      "The name of the computer",
    ],
    correct: 0,
    explanation:
      "Correct! Every array element occupies a specific location in memory.",
  },
  {
    question: "An array stores [10, 20, 30]. Which element is stored at index 1?",
    help: "Index 1 points to the second element.",
    options: ["10", "20", "30", "1"],
    correct: 1,
    explanation:
      "Correct! Index 0 stores 10, index 1 stores 20, and index 2 stores 30.",
  },
  {
    question: "Why are array elements stored in a sequence of memory locations?",
    help: "Think about how arrays make accessing elements efficient.",
    options: [
      "To make elements easier to access",
      "To hide the values",
      "To increase the number of indexes",
      "To remove the array",
    ],
    correct: 0,
    explanation:
      "Correct! Arrays store elements sequentially so they can be accessed efficiently using indexes.",
  },
  {
    question: "If the first element starts at address 1000, what identifies the next array element's location?",
    help: "Array elements have positions relative to one another in memory.",
    options: [
      "Its position and element size",
      "The screen resolution",
      "The program title",
      "The keyboard layout",
    ],
    correct: 0,
    explanation:
      "Correct! The next memory location depends on the starting address, index and size of each element.",
  },
  {
    question: "What connects an array index with its stored element?",
    help: "The index acts like a key to locate an element.",
    options: [
      "The memory location",
      "The monitor",
      "The compiler logo",
      "The file name",
    ],
    correct: 0,
    explanation:
      "Correct! An index helps identify the corresponding element stored in memory.",
  },
];

function Level03() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[questionIndex];

  const handleAnswer = (index) => {
    if (selected !== null || completed) return;

    setSelected(index);

    if (index === question.correct) {
      setResult("correct");
      setXp((currentXp) => currentXp + 20);
    } else {
      setResult("wrong");
      setHearts((currentHearts) => Math.max(0, currentHearts - 1));
    }
  };

  const handleNext = () => {
    if (result === "correct") {
      if (questionIndex === questions.length - 1) {
        setCompleted(true);
        localStorage.setItem("challenge3Completed", "true");
        return;
      }

      setQuestionIndex((current) => current + 1);
      setSelected(null);
      setResult(null);
    } else {
      setSelected(null);
      setResult(null);
    }
  };

  const restartLevel = () => {
    setQuestionIndex(0);
    setSelected(null);
    setResult(null);
    setHearts(3);
    setXp(0);
    setCompleted(false);
  };

  if (!started) {
    return (
      <main className="level03-page">
        <div className="library-stars"></div>

        <section className="library-intro">
          <div className="magic-orb">🔮</div>

          <div className="library-tower">
            <div className="tower-glow"></div>
            <div className="tower-books">📚</div>
            <div className="tower-door">🚪</div>
          </div>

          <p className="level03-kicker">LEVEL 03 // MEMORY RUNNER</p>

          <h1>
            THE MAGIC
            <span> MEMORY LIBRARY</span>
          </h1>

          <p className="level03-description">
            Deep inside the enchanted library, every array element has a
            hidden memory location. Find the correct locations and unlock
            the ancient memory spell.
          </p>

          <div className="library-rules">
            <div>
              <span>📖</span>
              <strong>5</strong>
              <small>MAGIC CLUES</small>
            </div>

            <div>
              <span>❤️</span>
              <strong>3</strong>
              <small>LIVES</small>
            </div>

            <div>
              <span>⭐</span>
              <strong>100</strong>
              <small>MAX XP</small>
            </div>
          </div>

          <button
            className="enter-library-button"
            onClick={() => setStarted(true)}
          >
            <span>🔮</span>
            ENTER THE LIBRARY
            <span>→</span>
          </button>

          <p className="library-warning">
            ✦ The ancient memory shelves are waiting...
          </p>
        </section>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="level03-page">
        <div className="library-stars"></div>

        <section className="memory-complete">
          <div className="completion-orb">🔮</div>

          <p className="level03-kicker">MEMORY UNLOCKED</p>

          <h1>
            THE SPELL
            <span> IS COMPLETE!</span>
          </h1>

          <p>
            You discovered the hidden memory locations and restored the
            ancient library's memory system.
          </p>

          <div className="memory-reward">
            <span>✨</span>
            <strong>+{xp} XP</strong>
            <small>MEMORY RUNNER REWARD</small>
          </div>

          <div className="completion-actions03">
            <button onClick={restartLevel} className="replay-button03">
              ↻ REPLAY MISSION
            </button>

            <button
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}challenges`;
              }}
              className="library-arena-button"
            >
              ✦ RETURN TO ARENA
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="level03-page memory-game-screen">
      <div className="library-stars"></div>

      <header className="library-hud">
        <div className="library-title">
          <span>📚</span>
          MEMORY RUNNER
        </div>

        <div className="library-stats">
          <div className="library-stat">❤️ {hearts}</div>
          <div className="library-stat">⭐ {xp} XP</div>
        </div>
      </header>

      <section className="spell-progress">
        <div className="spell-progress-label">
          <span>🔮 MEMORY SPELL</span>
          <span>
            CHAPTER {questionIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="spell-progress-track">
          <div
            className="spell-progress-fill"
            style={{
              width: `${
                ((questionIndex + (result === "correct" ? 1 : 0)) /
                  questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </section>

      <section className="memory-game-card">
        <div className="floating-book">📖</div>

        <p className="question-kicker03">
          ANCIENT MEMORY CHAPTER #{questionIndex + 1}
        </p>

        <h2>{question.question}</h2>

        <div className="memory-shelves">
          <div className="memory-shelf shelf-one">
            <span>0x1000</span>
            <b>📕</b>
            <b>📗</b>
            <b>📘</b>
          </div>

          <div className="memory-shelf shelf-two">
            <span>0x1004</span>
            <b>📙</b>
            <b>📓</b>
            <b>📔</b>
          </div>

          <div className="memory-shelf shelf-three">
            <span>0x1008</span>
            <b>📒</b>
            <b>📕</b>
            <b>📗</b>
          </div>
        </div>

        <p className="memory-help">
          ✦ {question.help}
        </p>

        <div className="magic-answer-grid">
          {question.options.map((option, index) => {
            let className = "magic-answer";

            if (selected !== null) {
              if (index === question.correct) {
                className += " memory-correct";
              } else if (index === selected && result === "wrong") {
                className += " memory-wrong";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={selected !== null}
              >
                <span className="spell-number">{index + 1}</span>
                <strong>{option}</strong>
              </button>
            );
          })}
        </div>

        {result && (
          <div className={`memory-feedback ${result}`}>
            <div className="feedback-orb">
              {result === "correct" ? "✨" : "💫"}
            </div>

            <div>
              <strong>
                {result === "correct"
                  ? "MEMORY LOCATION UNLOCKED!"
                  : "THE SPELL FAILED!"}
              </strong>

              <p>{question.explanation}</p>
            </div>
          </div>
        )}

        {result && (
          <button className="next-spell-button" onClick={handleNext}>
            {result === "correct"
              ? questionIndex === questions.length - 1
                ? "UNLOCK THE ANCIENT SPELL"
                : "NEXT MEMORY CHAPTER →"
              : "CAST AGAIN ↻"}
          </button>
        )}
      </section>

      <footer className="library-game-footer">
        <span>🔮 ARRAYVERSE</span>
        <span>MEMORY RUNNER // LEVEL 03</span>
        <span>📚 EXPLORE MEMORY</span>
      </footer>
    </main>
  );
}

export default Level03;