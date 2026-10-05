import { useState } from "react";
import "./Level02.css";

const questions = [
  {
    question: "The treasure map contains [10, 25, 40, 55]. Which index holds the treasure value 40?",
    help: "Remember: array indexing starts from 0.",
    options: ["0", "1", "2", "3"],
    correct: 2,
    explanation:
      "Correct! 10 is at index 0, 25 at index 1, and 40 is at index 2.",
  },
  {
    question: "A pirate stores [15, 30, 45, 60]. What value is at index 0?",
    help: "Index 0 points to the first element.",
    options: ["15", "30", "45", "60"],
    correct: 0,
    explanation:
      "Correct! The first element of an array is stored at index 0.",
  },
  {
    question: "The map shows [5, 10, 15, 20, 25]. Which index contains 20?",
    help: "Start counting positions from index 0.",
    options: ["1", "2", "3", "4"],
    correct: 2,
    explanation:
      "Correct! Index 0 = 5, 1 = 10, 2 = 15, and 3 = 20.",
  },
  {
    question: "Which element is located at index 4 in [12, 24, 36, 48, 60]?",
    help: "The fifth element has index 4.",
    options: ["12", "24", "36", "60"],
    correct: 3,
    explanation:
      "Correct! The fifth element, 60, is stored at index 4.",
  },
  {
    question: "A treasure chest is stored at index 1 in [100, 500, 900]. What is its value?",
    help: "Index 1 means the second element.",
    options: ["100", "500", "900", "1"],
    correct: 1,
    explanation:
      "Correct! The second element is 500, so index 1 contains 500.",
  },
];

function Level02() {
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
      setXp((currentXp) => currentXp + 15);
    } else {
      setResult("wrong");
      setHearts((currentHearts) => Math.max(0, currentHearts - 1));
    }
  };

  const handleNext = () => {
    if (result === "correct") {
      if (questionIndex === questions.length - 1) {
        setCompleted(true);
        localStorage.setItem("challenge2Completed", "true");
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
      <main className="level02-page">
        <div className="pirate-stars"></div>

        <section className="level02-intro">
          <div className="pirate-flag">🏴‍☠️</div>

          <div className="treasure-island">
            <div className="island-moon">☾</div>
            <div className="island-palm">🌴</div>
            <div className="treasure-chest">💎</div>
          </div>

          <p className="level02-kicker">LEVEL 02 // INDEX HUNTER</p>

          <h1>
            THE LOST
            <span> TREASURE MAP</span>
          </h1>

          <p className="level02-description">
            Captain Array has lost the coordinates to his treasure.
            Find the correct array indexes and unlock the hidden treasure.
          </p>

          <div className="mission-rules">
            <div>
              <span>💎</span>
              <strong>5</strong>
              <small>MAP CLUES</small>
            </div>

            <div>
              <span>❤️</span>
              <strong>3</strong>
              <small>LIVES</small>
            </div>

            <div>
              <span>⭐</span>
              <strong>75</strong>
              <small>MAX XP</small>
            </div>
          </div>

          <button
            className="start-voyage-button"
            onClick={() => setStarted(true)}
          >
            <span>⚓</span>
            START THE VOYAGE
            <span>→</span>
          </button>

          <p className="warning-text">
            ⚠ Beware of the wrong coordinates, matey!
          </p>
        </section>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="level02-page">
        <div className="pirate-stars"></div>

        <section className="treasure-complete">
          <div className="completion-icon">💰</div>

          <p className="level02-kicker">MISSION COMPLETE</p>

          <h1>
            TREASURE
            <span> FOUND!</span>
          </h1>

          <p>
            You successfully decoded every treasure coordinate.
            Captain Array salutes you, Index Hunter!
          </p>

          <div className="final-reward">
            <span>⭐</span>
            <strong>+{xp} XP</strong>
            <small>INDEX HUNTER REWARD</small>
          </div>

          <div className="completion-actions">
            <button onClick={restartLevel} className="replay-button">
              ↻ REPLAY MISSION
            </button>

            <button
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}challenges`;
              }}
              className="arena-button"
            >
              ⚔ RETURN TO ARENA
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="level02-page gameplay02-screen">
      <div className="pirate-stars"></div>

      <header className="level02-hud">
        <div className="hud-title">
          <span>🏴‍☠️</span>
          INDEX HUNTER
        </div>

        <div className="hud-stats">
          <div className="hud-stat">
            ❤️ {hearts}
          </div>

          <div className="hud-stat">
            ⭐ {xp} XP
          </div>
        </div>
      </header>

      <section className="map-progress">
        <div className="map-progress-label">
          <span>🗺️ TREASURE MAP</span>
          <span>
            CLUE {questionIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="map-progress-track">
          <div
            className="map-progress-fill"
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

      <section className="pirate-game-card">
        <div className="map-pin">📍</div>

        <p className="question-kicker">
          TREASURE COORDINATE #{questionIndex + 1}
        </p>

        <h2>{question.question}</h2>

        <div className="treasure-array">
          {question.options.map((option, index) => (
            <div key={index} className="map-gem">
              <span className="gem-index">IDX {index}</span>
              <strong>{option}</strong>
            </div>
          ))}
        </div>

        <p className="pirate-help">
          🧭 {question.help}
        </p>

        <div className="pirate-answer-grid">
          {question.options.map((option, index) => {
            let className = "pirate-answer";

            if (selected !== null) {
              if (index === question.correct) {
                className += " answer-correct";
              } else if (index === selected && result === "wrong") {
                className += " answer-wrong";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={selected !== null}
              >
                <span className="answer-number">{index + 1}</span>
                <strong>{option}</strong>
              </button>
            );
          })}
        </div>

        {result && (
          <div className={`pirate-feedback ${result}`}>
            <div className="feedback-icon">
              {result === "correct" ? "💎" : "💥"}
            </div>

            <div>
              <strong>
                {result === "correct"
                  ? "TREASURE COORDINATE FOUND!"
                  : "WRONG COORDINATE!"}
              </strong>

              <p>{question.explanation}</p>
            </div>
          </div>
        )}

        {result && (
          <button className="next-map-button" onClick={handleNext}>
            {result === "correct"
              ? questionIndex === questions.length - 1
                ? "OPEN THE TREASURE CHEST"
                : "NEXT MAP CLUE →"
              : "TRY AGAIN ↻"}
          </button>
        )}
      </section>

      <footer className="pirate-game-footer">
        <span>⚓ ARRAYVERSE</span>
        <span>INDEX HUNTER // LEVEL 02</span>
        <span>🗺️ DECODE THE MAP</span>
      </footer>
    </main>
  );
}

export default Level02;