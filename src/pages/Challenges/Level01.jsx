import { useState } from "react";
import "./Level01.css";

const questions = [
  {
    question: "Which option correctly represents an array of four elements?",
    help: "An array stores multiple elements together in an ordered sequence.",
    options: [
      "[10, 20, 30, 40]",
      "10 → 20 → 30 → 40",
      "{10, 20, 30, 40}",
      "10 + 20 + 30 + 40",
    ],
    correct: 0,
    explanation:
      "Correct! [10, 20, 30, 40] represents four elements stored together in an array.",
  },
  {
    question: "What is the index of the first element in an array?",
    help: "Array indexing normally starts from the beginning with a special number.",
    options: [
      "0",
      "1",
      "2",
      "4",
    ],
    correct: 0,
    explanation:
      "Correct! In most programming languages, array indexing starts from 0.",
  },
  {
    question: "In [10, 20, 30, 40], what value is stored at index 2?",
    help: "Start counting the indexes from 0.",
    options: [
      "10",
      "20",
      "30",
      "40",
    ],
    correct: 2,
    explanation:
      "Correct! Index 0 = 10, index 1 = 20, and index 2 = 30.",
  },
  {
    question: "How many elements are present in [5, 10, 15, 20]?",
    help: "Count each value stored inside the array.",
    options: [
      "2",
      "3",
      "4",
      "5",
    ],
    correct: 2,
    explanation:
      "Correct! The array contains four elements: 5, 10, 15 and 20.",
  },
  {
    question: "Which structure is commonly used to represent an array?",
    help: "Look for the option that groups values using positions.",
    options: [
      "[10, 20, 30]",
      "10 + 20 + 30",
      "10 × 20 × 30",
      "10 → 20 → 30",
    ],
    correct: 0,
    explanation:
      "Correct! Square brackets are commonly used to visually represent an array.",
  },
];

function Level01() {
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
      setXp((currentXp) => currentXp + 10);
    } else {
      setResult("wrong");
      setHearts((currentHearts) => Math.max(0, currentHearts - 1));
    }
  };

  const handleNext = () => {
    if (result === "correct") {
      if (questionIndex === questions.length - 1) {
        setCompleted(true);
        localStorage.setItem("challenge1Completed", "true");
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

  return (
    <div className="level01-page">
      <div className="magic-sky"></div>
      <div className="magic-stars"></div>

      <div className="magic-spark spark-one">✦</div>
      <div className="magic-spark spark-two">✧</div>
      <div className="magic-spark spark-three">✦</div>

      {/* HUD */}
      <header className="level01-hud">
        <div className="hud-brand">
          <span>ARRAYVERSE</span>
          <small>MAGICAL KINGDOM</small>
        </div>

        <div className="hud-level">
          <span>LEVEL 01</span>
          <strong>ARRAY ROOKIE</strong>
        </div>

        <div className="hud-stats">
          <div>
            <small>HEARTS</small>
            <strong>
              {"♥ ".repeat(hearts)}
              {"♡ ".repeat(3 - hearts)}
            </strong>
          </div>

          <div>
            <small>XP</small>
            <strong>{String(xp).padStart(3, "0")}</strong>
          </div>
        </div>
      </header>

      <main className="level01-world">

        {!started ? (
          <>
            {/* INTRO */}
            <section className="kingdom-header">
              <span className="kingdom-kicker">
                ✨ WELCOME TO THE MAGIC KINGDOM ✨
              </span>

              <h1>
                ARRAY
                <span>ROOKIE</span>
              </h1>

              <p>
                Your first adventure begins here.
                Learn how arrays store magical data.
              </p>
            </section>

            {/* MAGIC STAGE */}
            <section className="magic-stage">
              <div className="castle-glow"></div>

              <div className="castle">
                <div className="castle-roof"></div>

                <div className="castle-body">
                  <span className="castle-window">✦</span>
                  <span className="castle-window">✦</span>
                  <span className="castle-door">♕</span>
                </div>
              </div>

              <div className="mascot">
                <div className="mascot-crown">♕</div>

                <div className="mascot-face">
                  <span className="eye left"></span>
                  <span className="eye right"></span>
                  <span className="smile">⌣</span>
                </div>
              </div>
            </section>

            {/* INTRO MISSION */}
            <section className="mission-panel">
              <div className="mission-top">
                <span>MISSION 01</span>
                <span>BEGINNER</span>
              </div>

              <h2>THE FIRST ARRAY</h2>

              <p>
                A magical array is waiting for you.
                Discover how elements are stored inside
                an array and begin your first adventure.
              </p>

              <div className="array-demo">
                <div className="array-cell">
                  <small>INDEX 0</small>
                  <strong>10</strong>
                </div>

                <div className="array-cell">
                  <small>INDEX 1</small>
                  <strong>20</strong>
                </div>

                <div className="array-cell">
                  <small>INDEX 2</small>
                  <strong>30</strong>
                </div>

                <div className="array-cell">
                  <small>INDEX 3</small>
                  <strong>40</strong>
                </div>
              </div>

              <button
                className="begin-button"
                type="button"
                onClick={() => setStarted(true)}
              >
                BEGIN MISSION ✨
              </button>
            </section>
          </>
        ) : completed ? (
          /* COMPLETION SCREEN */
          <section className="level-complete">
            <div className="completion-sparkle">✦</div>

            <span className="completion-kicker">
              ✨ MISSION COMPLETE ✨
            </span>

            <h1>
              ARRAY
              <span>ROOKIE!</span>
            </h1>

            <p>
              You have completed your first Arrayverse mission.
              The magical kingdom recognizes your array skills.
            </p>

            <div className="reward-card">
              <div>
                <small>FINAL XP</small>
                <strong>+{xp} XP</strong>
              </div>

              <div>
                <small>STATUS</small>
                <strong>COMPLETED</strong>
              </div>
            </div>

            <button
              className="begin-button"
              type="button"
              onClick={() => {
  window.location.href = `${import.meta.env.BASE_URL}challenges`;
}}
            >
              RETURN TO ARENA →
            </button>

            <button
              className="restart-button"
              type="button"
              onClick={restartLevel}
            >
              PLAY AGAIN
            </button>
          </section>
        ) : (
          /* GAMEPLAY */
          <section className="gameplay-screen">

            <div className="gameplay-header">
              <div>
                <span>MISSION 01 // ACTIVE</span>
                <h1>THE FIRST ARRAY</h1>
              </div>

              <div className="mission-progress">
                <small>MISSION PROGRESS</small>

                <div className="mission-progress-track">
                  <div
                    className="mission-progress-fill"
                    style={{
                      width: `${
                        ((questionIndex + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>

                <strong>
                  {String(questionIndex + 1).padStart(2, "0")} /{" "}
                  {String(questions.length).padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div className="gameplay-card">

              <div className="question-kicker">
                ✨ ARRAYVERSE KNOWLEDGE TEST
              </div>

              <h2>{question.question}</h2>

              <p className="question-help">
                {question.help}
              </p>

              <div className="answer-grid">
                {question.options.map((option, index) => {

                  let optionClass = "answer-option";

                  if (selected !== null) {
                    if (index === question.correct) {
                      optionClass += " answer-correct";
                    } else if (
                      index === selected &&
                      index !== question.correct
                    ) {
                      optionClass += " answer-wrong";
                    }
                  }

                  return (
                    <button
                      key={index}
                      className={optionClass}
                      type="button"
                      disabled={selected !== null}
                      onClick={() => handleAnswer(index)}
                    >
                      <span>
                        {String.fromCharCode(65 + index)}
                      </span>

                      <strong>{option}</strong>
                    </button>
                  );
                })}
              </div>

              {result && (
                <div
                  className={`answer-feedback ${
                    result === "correct"
                      ? "feedback-correct"
                      : "feedback-wrong"
                  }`}
                >
                  <div className="feedback-icon">
                    {result === "correct" ? "✨" : "💫"}
                  </div>

                  <div>
                    <strong>
                      {result === "correct"
                        ? "MAGIC SUCCESS!"
                        : "NOT QUITE!"}
                    </strong>

                    <p>
                      {result === "correct"
                        ? question.explanation
                        : `That answer isn't correct. ${question.explanation}`}
                    </p>
                  </div>
                </div>
              )}

              {result && (
                <button
                  className="next-question-button"
                  type="button"
                  onClick={handleNext}
                >
                  {result === "correct"
                    ? questionIndex === questions.length - 1
                      ? "CLAIM REWARD ✨"
                      : "NEXT MISSION →"
                    : "TRY AGAIN"}
                </button>
              )}

              <div className="gameplay-footer">
                <span>
                  {"♥ ".repeat(hearts)}
                  {"♡ ".repeat(3 - hearts)}
                </span>

                <span>
                  {selected === null
                    ? "SELECT YOUR ANSWER"
                    : result === "correct"
                    ? "+10 XP EARNED"
                    : "REVIEW THE LOGIC"}
                </span>

                <span>LEVEL XP: +50</span>
              </div>

            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default Level01;