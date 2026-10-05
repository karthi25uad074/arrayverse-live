import { useState } from "react";
import "./Level05.css";

const missions = [
  {
    question: "What is the main purpose of searching an array?",
    help: "Think about what happens when you need to locate a particular element.",
    options: [
      "Find a specific element",
      "Delete every element",
      "Increase the array size",
      "Reverse the program",
    ],
    correct: 0,
    explanation:
      "Correct! Searching is used to locate a specific element or value inside an array.",
  },
  {
    question: "In [12, 25, 38, 41], what value is found at index 2?",
    help: "Remember that array indexing normally starts from 0.",
    options: ["12", "25", "38", "41"],
    correct: 2,
    explanation:
      "Correct! Index 0 = 12, index 1 = 25, and index 2 = 38.",
  },
  {
    question: "Which value should the sonar search for to locate the artifact in [15, 28, 42, 67]?",
    help: "The target value is the element you want to locate.",
    options: ["15", "28", "42", "67"],
    correct: 2,
    explanation:
      "Correct! If 42 is the target artifact, the search operation must locate the value 42.",
  },
  {
    question: "If a searched value is found at index 3, what does index 3 tell us?",
    help: "The index tells you the position of the discovered element.",
    options: [
      "The element was deleted",
      "The element is at position 3",
      "The array has 3 elements",
      "The element is always 3",
    ],
    correct: 1,
    explanation:
      "Correct! Index 3 identifies the position where the searched element is stored.",
  },
  {
    question:
      "The sonar scans [10, 20, 30, 40, 50] for 40. At which index will the artifact be discovered?",
    help: "Start counting from index 0.",
    options: ["1", "2", "3", "4"],
    correct: 2,
    explanation:
      "Correct! 10 is index 0, 20 is index 1, 30 is index 2 and 40 is index 3.",
  },
];

function Level05() {
  const [started, setStarted] = useState(false);
  const [missionIndex, setMissionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(false);

  const mission = missions[missionIndex];

  const handleAnswer = (index) => {
    if (selected !== null || completed) return;

    setSelected(index);

    if (index === mission.correct) {
      setResult("correct");
      setXp((currentXp) => currentXp + 35);
    } else {
      setResult("wrong");
      setHearts((currentHearts) => Math.max(0, currentHearts - 1));
    }
  };

  const handleNext = () => {
    if (result === "correct") {
      if (missionIndex === missions.length - 1) {
        setCompleted(true);
        localStorage.setItem("challenge5Completed", "true");
        return;
      }

      setMissionIndex((current) => current + 1);
      setSelected(null);
      setResult(null);
    } else {
      setSelected(null);
      setResult(null);
    }
  };

  const restartMission = () => {
    setMissionIndex(0);
    setSelected(null);
    setResult(null);
    setHearts(3);
    setXp(0);
    setCompleted(false);
  };

  if (!started) {
    return (
      <main className="level05-page">
        <div className="ocean-particles"></div>
        <div className="underwater-rays"></div>
        <div className="ocean-bubbles"></div>

        <section className="lost-city-intro">
          <div className="sonar-device">
            <div className="sonar-ring sonar-ring-one"></div>
            <div className="sonar-ring sonar-ring-two"></div>
            <div className="sonar-core">🌊</div>
            <div className="sonar-sweep"></div>
          </div>

          <p className="level05-kicker">
            LEVEL 05 // SEARCH COMMANDER
          </p>

          <h1>
            THE LOST
            <span> UNDERWATER CITY</span>
          </h1>

          <p className="ocean-description">
            Descend into the forgotten ruins beneath the ocean. Ancient
            artifacts are hidden inside the treasure array. Use the sonar
            correctly and locate every target before your oxygen runs out.
          </p>

          <div className="oxygen-warning">
            <span className="oxygen-dot"></span>
            OXYGEN SYSTEM:
            <strong> STABLE</strong>
          </div>

          <div className="ocean-rules">
            <div>
              <span>🔎</span>
              <strong>5</strong>
              <small>SONAR CLUES</small>
            </div>

            <div>
              <span>❤️</span>
              <strong>3</strong>
              <small>LIVES</small>
            </div>

            <div>
              <span>⭐</span>
              <strong>175</strong>
              <small>MAX XP</small>
            </div>
          </div>

          <button
            className="dive-button"
            onClick={() => setStarted(true)}
          >
            <span>🌊</span>
            START DIVE
            <span>→</span>
          </button>

          <p className="ocean-warning">
            ⚠ DEEP ZONE // UNKNOWN SIGNAL DETECTED
          </p>
        </section>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="level05-page">
        <div className="ocean-particles"></div>
        <div className="underwater-rays"></div>
        <div className="ocean-bubbles"></div>

        <section className="lost-city-complete">
          <div className="city-discovery">
            <div className="discovery-ring"></div>
            <span>🏛️</span>
          </div>

          <p className="level05-kicker">
            SONAR MISSION COMPLETE
          </p>

          <h1>
            LOST CITY
            <span> DISCOVERED!</span>
          </h1>

          <p>
            Every target was successfully located. The ancient underwater
            city has been revealed through your search skills.
          </p>

          <div className="treasure-reward">
            <span>💎</span>
            <strong>+{xp} XP</strong>
            <small>SEARCH COMMANDER REWARD</small>
          </div>

          <div className="completion-actions05">
            <button
              onClick={restartMission}
              className="replay-dive-button"
            >
              ↻ REPLAY DIVE
            </button>

            <button
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}challenges`;
              }}
              className="return-ocean-button"
            >
              ✦ RETURN TO ARENA
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="level05-page underwater-game-screen">
      <div className="ocean-particles"></div>
      <div className="underwater-rays"></div>
      <div className="ocean-bubbles"></div>

      <header className="ocean-hud">
        <div className="ocean-title">
          <span>🔎</span>
          SEARCH COMMANDER
        </div>

        <div className="ocean-stats">
          <div className="ocean-stat">
            ❤️ {hearts}
          </div>

          <div className="ocean-stat">
            ⭐ {xp} XP
          </div>

          <div className="oxygen-meter">
            <span>O₂</span>
            <div className="oxygen-track">
              <div
                className="oxygen-fill"
                style={{
                  width: `${Math.max(35, 100 - missionIndex * 12)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <section className="sonar-progress">
        <div className="sonar-progress-label">
          <span>📡 SONAR SEARCH</span>

          <span>
            SIGNAL {missionIndex + 1} / {missions.length}
          </span>
        </div>

        <div className="sonar-progress-track">
          <div
            className="sonar-progress-fill"
            style={{
              width: `${
                ((missionIndex +
                  (result === "correct" ? 1 : 0)) /
                  missions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </section>

      <section className="underwater-card">
        <div className="ruin-corner ruin-one"></div>
        <div className="ruin-corner ruin-two"></div>

        <div className="floating-treasure">💎</div>

        <p className="question-kicker05">
          ANCIENT SONAR SIGNAL // SCAN #{missionIndex + 1}
        </p>

        <div className="treasure-map-display">
          <div className="map-label">
            ANCIENT TREASURE ARRAY
          </div>

          <div className="artifact-array">
            <div className="artifact-cell">
              <small>IDX 0</small>
              <strong>10</strong>
            </div>

            <div className="artifact-cell">
              <small>IDX 1</small>
              <strong>20</strong>
            </div>

            <div className="artifact-cell sonar-target">
              <small>IDX 2</small>
              <strong>30</strong>
              <span>📡</span>
            </div>

            <div className="artifact-cell">
              <small>IDX 3</small>
              <strong>40</strong>
            </div>

            <div className="artifact-cell">
              <small>IDX 4</small>
              <strong>50</strong>
            </div>
          </div>
        </div>

        <h2>{mission.question}</h2>

        <p className="sonar-help">
          ✦ {mission.help}
        </p>

        <div className="ocean-answer-grid">
          {mission.options.map((option, index) => {
            let className = "ocean-answer";

            if (selected !== null) {
              if (index === mission.correct) {
                className += " sonar-correct";
              } else if (
                index === selected &&
                result === "wrong"
              ) {
                className += " sonar-wrong";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(index)}
                disabled={selected !== null}
              >
                <span className="signal-number">
                  0{index + 1}
                </span>

                <strong>{option}</strong>

                <span className="signal-arrow">›</span>
              </button>
            );
          })}
        </div>

        {result && (
          <div
            className={`ocean-feedback ${
              result === "correct"
                ? "feedback-found"
                : "feedback-lost"
            }`}
          >
            <div className="sonar-feedback-icon">
              {result === "correct" ? "💎" : "⚠"}
            </div>

            <div>
              <strong>
                {result === "correct"
                  ? "ARTIFACT SIGNAL LOCKED!"
                  : "SONAR SIGNAL LOST!"}
              </strong>

              <p>{mission.explanation}</p>
            </div>
          </div>
        )}

        {result && (
          <button
            className="next-dive-button"
            onClick={handleNext}
          >
            {result === "correct"
              ? missionIndex === missions.length - 1
                ? "REVEAL THE LOST CITY"
                : "SCAN NEXT SIGNAL →"
              : "SCAN AGAIN ↻"}
          </button>
        )}
      </section>

      <footer className="ocean-game-footer">
        <span>🌊 ARRAYVERSE</span>
        <span>LOST CITY // LEVEL 05</span>
        <span>📡 SONAR ONLINE</span>
      </footer>
    </main>
  );
}

export default Level05;