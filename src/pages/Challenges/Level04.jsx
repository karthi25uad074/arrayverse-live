import { useState } from "react";
import "./Level04.css";

const experiments = [
  {
    question: "Which operation should be used to add a new sample to an array?",
    help: "Think about adding a new element into the experimental sequence.",
    options: ["INSERT", "DELETE", "UPDATE", "SEARCH"],
    correct: 0,
    explanation:
      "Correct! INSERT adds a new element to the array at a chosen position.",
  },
  {
    question: "The lab needs to remove a contaminated sample. Which operation is required?",
    help: "The unwanted element must be removed from the array.",
    options: ["SEARCH", "UPDATE", "DELETE", "INSERT"],
    correct: 2,
    explanation:
      "Correct! DELETE removes an existing element from the array.",
  },
  {
    question: "A sample contains incorrect data. Which operation can change its value?",
    help: "The element stays in the array, but its value changes.",
    options: ["DELETE", "UPDATE", "SORT", "SEARCH"],
    correct: 1,
    explanation:
      "Correct! UPDATE changes the value of an existing array element.",
  },
  {
    question: "The scientist wants to find a specific sample in the array. What should be used?",
    help: "The goal is to locate a particular element.",
    options: ["INSERT", "DELETE", "SEARCH", "UPDATE"],
    correct: 2,
    explanation:
      "Correct! SEARCH is used to locate a required element in an array.",
  },
  {
    question: "An experiment has [10, 20, 30]. A new sample 15 must be placed between 10 and 20. Which operation is needed?",
    help: "A new element must be added at a specific position.",
    options: ["DELETE", "INSERT", "SEARCH", "UPDATE"],
    correct: 1,
    explanation:
      "Correct! INSERT can place the new value 15 at the required position.",
  },
];

function Level04() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(false);

  const experiment = experiments[questionIndex];

  const handleAnswer = (index) => {
    if (selected !== null || completed) return;

    setSelected(index);

    if (index === experiment.correct) {
      setResult("correct");
      setXp((currentXp) => currentXp + 30);
    } else {
      setResult("wrong");
      setHearts((currentHearts) => Math.max(0, currentHearts - 1));
    }
  };

  const handleNext = () => {
    if (result === "correct") {
      if (questionIndex === experiments.length - 1) {
        setCompleted(true);
        localStorage.setItem("challenge4Completed", "true");
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
      <main className="level04-page">
        <div className="lab-grid"></div>
        <div className="lab-particles"></div>

        <section className="lab-intro">
          <div className="reactor-core">
            <div className="reactor-ring ring-one"></div>
            <div className="reactor-ring ring-two"></div>
            <div className="reactor-orb">🧬</div>
          </div>

          <p className="level04-kicker">
            LEVEL 04 // OPERATION MASTER
          </p>

          <h1>
            SECRET
            <span> LABORATORY</span>
          </h1>

          <p className="lab-description">
            A critical experiment has gone unstable. Manipulate the
            experimental array correctly and restore the laboratory system
            before the reactor reaches critical state.
          </p>

          <div className="lab-status">
            <span className="status-dot"></span>
            EXPERIMENT STATUS:
            <strong> UNSTABLE</strong>
          </div>

          <div className="lab-rules">
            <div>
              <span>🧪</span>
              <strong>5</strong>
              <small>EXPERIMENTS</small>
            </div>

            <div>
              <span>❤️</span>
              <strong>3</strong>
              <small>LIVES</small>
            </div>

            <div>
              <span>⭐</span>
              <strong>150</strong>
              <small>MAX XP</small>
            </div>
          </div>

          <button
            className="start-experiment-button"
            onClick={() => setStarted(true)}
          >
            <span>🧪</span>
            START EXPERIMENT
            <span>→</span>
          </button>

          <p className="lab-warning">
            ⚠ SYSTEM WARNING // ARRAY CORE INSTABILITY DETECTED
          </p>
        </section>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="level04-page">
        <div className="lab-grid"></div>
        <div className="lab-particles"></div>

        <section className="experiment-complete">
          <div className="success-reactor">
            <div className="success-ring"></div>
            <div>🧬</div>
          </div>

          <p className="level04-kicker">
            EXPERIMENT STABILIZED
          </p>

          <h1>
            OPERATION
            <span> COMPLETE!</span>
          </h1>

          <p>
            The experimental array has been successfully restored.
            The laboratory core is stable again.
          </p>

          <div className="lab-reward">
            <span>⚡</span>
            <strong>+{xp} XP</strong>
            <small>OPERATION MASTER REWARD</small>
          </div>

          <div className="completion-actions04">
            <button
              onClick={restartLevel}
              className="replay-lab-button"
            >
              ↻ REPLAY EXPERIMENT
            </button>

            <button
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}challenges`;
              }}
              className="lab-arena-button"
            >
              ✦ RETURN TO ARENA
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="level04-page lab-game-screen">
      <div className="lab-grid"></div>
      <div className="lab-particles"></div>

      <header className="lab-hud">
        <div className="lab-title">
          <span>🧪</span>
          OPERATION MASTER
        </div>

        <div className="lab-stats">
          <div className="lab-stat">
            ❤️ {hearts}
          </div>

          <div className="lab-stat">
            ⭐ {xp} XP
          </div>
        </div>
      </header>

      <section className="experiment-progress">
        <div className="experiment-progress-label">
          <span>🧬 ARRAY EXPERIMENT</span>

          <span>
            TEST {questionIndex + 1} / {experiments.length}
          </span>
        </div>

        <div className="experiment-progress-track">
          <div
            className="experiment-progress-fill"
            style={{
              width: `${
                ((questionIndex +
                  (result === "correct" ? 1 : 0)) /
                  experiments.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </section>

      <section className="experiment-card">
        <div className="lab-screen-corner corner-one"></div>
        <div className="lab-screen-corner corner-two"></div>

        <div className="floating-tube">🧪</div>

        <p className="question-kicker04">
          RESEARCH TERMINAL // TEST #{questionIndex + 1}
        </p>

        <div className="experiment-display">
          <div className="display-label">
            EXPERIMENTAL ARRAY
          </div>

          <div className="sample-array">
            <div className="sample-cell">
              <small>INDEX 0</small>
              <strong>10</strong>
            </div>

            <div className="sample-cell active-sample">
              <small>INDEX 1</small>
              <strong>20</strong>
            </div>

            <div className="sample-cell">
              <small>INDEX 2</small>
              <strong>30</strong>
            </div>

            <div className="sample-cell">
              <small>INDEX 3</small>
              <strong>40</strong>
            </div>
          </div>
        </div>

        <h2>{experiment.question}</h2>

        <p className="experiment-help">
          ✦ {experiment.help}
        </p>

        <div className="lab-answer-grid">
          {experiment.options.map((option, index) => {
            let className = "lab-answer";

            if (selected !== null) {
              if (index === experiment.correct) {
                className += " lab-answer-correct";
              } else if (
                index === selected &&
                result === "wrong"
              ) {
                className += " lab-answer-wrong";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={selected !== null}
              >
                <span className="answer-code">
                  0{index + 1}
                </span>

                <strong>{option}</strong>

                <span className="answer-arrow">›</span>
              </button>
            );
          })}
        </div>

        {result && (
          <div
            className={`lab-feedback ${
              result === "correct"
                ? "feedback-success"
                : "feedback-failure"
            }`}
          >
            <div className="feedback-icon">
              {result === "correct" ? "✓" : "⚠"}
            </div>

            <div>
              <strong>
                {result === "correct"
                  ? "EXPERIMENT STABILIZED!"
                  : "EXPERIMENT INSTABILITY DETECTED!"}
              </strong>

              <p>{experiment.explanation}</p>
            </div>
          </div>
        )}

        {result && (
          <button
            className="next-experiment-button"
            onClick={handleNext}
          >
            {result === "correct"
              ? questionIndex === experiments.length - 1
                ? "STABILIZE ARRAY CORE"
                : "NEXT EXPERIMENT →"
              : "RETRY TEST ↻"}
          </button>
        )}
      </section>

      <footer className="lab-game-footer">
        <span>🧪 ARRAYVERSE</span>
        <span>SECRET LAB // LEVEL 04</span>
        <span>⚡ SYSTEM MONITOR</span>
      </footer>
    </main>
  );
}

export default Level04;