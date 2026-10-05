import { useEffect, useMemo, useState } from "react";
import "./Level08.css";

const phases = [
  {
    title: "WEB BUILD",
    subtitle: "Reconstruct the Array Core",
    type: "build",
    reward: 80,
  },
  {
    title: "WEB TRACE",
    subtitle: "Locate the correct index",
    type: "trace",
    reward: 90,
  },
  {
    title: "WEB STRIKE",
    subtitle: "Execute the correct array operation",
    type: "operation",
    reward: 100,
  },
  {
    title: "SPIDER SENSE",
    subtitle: "React before the core collapses",
    type: "sense",
    reward: 100,
  },
  {
    title: "CORE BATTLE",
    subtitle: "Defeat the final Array Core",
    type: "boss",
    reward: 130,
  },
];

const buildSequence = [10, 20, 30, 40, 50];

const buildOptions = [30, 10, 50, 20, 40];

const traceQuestions = [
  {
    array: [14, 28, 42, 56, 70],
    target: 42,
    answer: 2,
  },
  {
    array: [11, 22, 33, 44, 55],
    target: 55,
    answer: 4,
  },
];

const operationQuestions = [
  {
    array: [10, 20, 30, 40],
    question: "Which operation changes 30 into 99?",
    options: ["INSERT", "DELETE", "UPDATE", "SEARCH"],
    answer: "UPDATE",
  },
  {
    array: [5, 10, 15, 20],
    question: "Which operation removes 15?",
    options: ["SORT", "DELETE", "UPDATE", "REVERSE"],
    answer: "DELETE",
  },
];

const senseQuestions = [
  {
    question: "Which index stores the first element?",
    options: ["0", "1", "2", "4"],
    answer: "0",
  },
  {
    question: "For arr[2], what does 2 represent?",
    options: ["Value", "Index", "Size", "Memory type"],
    answer: "Index",
  },
];

const bossQuestions = [
  {
    question: "Which notation accesses row 2, column 3 in a 2D array?",
    options: ["arr[2][3]", "arr[3]", "arr[2,3]", "arr(2)(3)"],
    answer: "arr[2][3]",
  },
  {
    question: "Which algorithm repeatedly compares adjacent elements?",
    options: [
      "Linear Search",
      "Binary Search",
      "Bubble Sort",
      "Traversal",
    ],
    answer: "Bubble Sort",
  },
];

function Level08() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [core, setCore] = useState(0);

  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [wrong, setWrong] = useState(false);

  const [buildArray, setBuildArray] = useState([]);
  const [buildStep, setBuildStep] = useState(0);

  const [traceIndex, setTraceIndex] = useState(0);
  const [operationIndex, setOperationIndex] = useState(0);
  const [senseIndex, setSenseIndex] = useState(0);
  const [bossIndex, setBossIndex] = useState(0);

  const [bossHealth, setBossHealth] = useState(100);
  const [webPulse, setWebPulse] = useState(false);

  const phase = phases[phaseIndex];

  const currentTrace = traceQuestions[traceIndex];
  const currentOperation = operationQuestions[operationIndex];
  const currentSense = senseQuestions[senseIndex];
  const currentBoss = bossQuestions[bossIndex];

  const totalProgress = useMemo(() => {
    return Math.round((core / 500) * 100);
  }, [core]);

  useEffect(() => {
    if (!started || completed) return;

    const timer = setInterval(() => {
      setWebPulse((value) => !value);
    }, 1200);

    return () => clearInterval(timer);
  }, [started, completed]);

  const resetFeedback = () => {
    setFeedback("");
    setWrong(false);
    setSelected(null);
  };

  const damagePlayer = () => {
    setHearts((value) => Math.max(0, value - 1));
    setWrong(true);
    setFeedback("WEB BROKEN — Try again.");
  };

  const reward = (amount) => {
    setXp((value) => value + amount);
    setCore((value) => Math.min(500, value + amount));
  };

  const completePhase = (amount) => {
    reward(amount);
    setWrong(false);
    setFeedback("CORE HIT — Phase cleared!");

    setTimeout(() => {
      if (phaseIndex === phases.length - 1) {
        localStorage.setItem("challenge8Completed", "true");
        setCompleted(true);
        return;
      }

      setPhaseIndex((value) => value + 1);
      resetFeedback();
    }, 850);
  };

  // -----------------------------
  // PHASE 01 — WEB BUILD
  // -----------------------------
  const handleBuild = (value) => {
    if (feedback) return;

    const expected = buildSequence[buildStep];

    if (value !== expected) {
      damagePlayer();
      return;
    }

    const nextArray = [...buildArray, value];
    setBuildArray(nextArray);

    // Final value
    if (buildStep === buildSequence.length - 1) {
      completePhase(phase.reward);
      return;
    }

    // Move to next node.
    // IMPORTANT:
    // Do NOT keep feedback here, otherwise the buttons become disabled.
    setBuildStep((step) => step + 1);
    setSelected(value);

    // Small visual selection without locking the phase.
    setTimeout(() => {
      setSelected(null);
    }, 250);
  };

  // -----------------------------
  // PHASE 02 — WEB TRACE
  // -----------------------------
  const handleTrace = (index) => {
    if (feedback) return;

    setSelected(index);

    if (index === currentTrace.answer) {
      completePhase(phase.reward);
    } else {
      damagePlayer();
    }
  };

  // -----------------------------
  // PHASE 03 — WEB STRIKE
  // -----------------------------
  const handleOperation = (option) => {
    if (feedback) return;

    setSelected(option);

    if (option === currentOperation.answer) {
      completePhase(phase.reward);
    } else {
      damagePlayer();
    }
  };

  // -----------------------------
  // PHASE 04 — SPIDER SENSE
  // -----------------------------
  const handleSense = (option) => {
    if (feedback) return;

    setSelected(option);

    if (option === currentSense.answer) {
      completePhase(phase.reward);
    } else {
      damagePlayer();
    }
  };

  // -----------------------------
  // PHASE 05 — CORE BATTLE
  // -----------------------------
  const handleBoss = (option) => {
    if (feedback) return;

    setSelected(option);

    if (option !== currentBoss.answer) {
      damagePlayer();
      return;
    }

    const newHealth = Math.max(0, bossHealth - 50);

    setBossHealth(newHealth);

    // Half reward per boss question.
    reward(phase.reward / 2);

    if (newHealth === 0) {
      // Second half of the phase reward.
      completePhase(phase.reward / 2);
      return;
    }

    setWrong(false);
    setFeedback("DIRECT HIT — CORE DAMAGED!");

    setTimeout(() => {
      setBossIndex((value) => value + 1);
      resetFeedback();
    }, 700);
  };

  const handleRetry = () => {
    resetFeedback();
  };

  const renderPhase = () => {
    // ==========================================
    // PHASE 01 — WEB BUILD
    // ==========================================
    if (phase.type === "build") {
      return (
        <section className="boss-panel build-panel">
          <div className="panel-heading">
            <span>01</span>

            <div>
              <h2>REBUILD THE WEB CORE</h2>
              <p>Place the array values in ascending order.</p>
            </div>
          </div>

          <div className="boss-array">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className={`boss-cell ${
                  selected === buildArray[index] ? "selected" : ""
                }`}
                key={index}
              >
                <span>[{index}]</span>

                <strong>{buildArray[index] ?? "?"}</strong>
              </div>
            ))}
          </div>

          <div className="choice-grid">
            {buildOptions.map((value) => (
              <button
                key={value}
                className={`web-choice ${
                  selected === value ? "selected" : ""
                }`}
                onClick={() => handleBuild(value)}
                disabled={Boolean(feedback)}
              >
                {value}
              </button>
            ))}
          </div>
        </section>
      );
    }

    // ==========================================
    // PHASE 02 — WEB TRACE
    // ==========================================
    if (phase.type === "trace") {
      return (
        <section className="boss-panel">
          <div className="panel-heading">
            <span>02</span>

            <div>
              <h2>TRACE THE WEB</h2>

              <p>
                Find the index of <b>{currentTrace.target}</b>.
              </p>
            </div>
          </div>

          <div className="boss-array">
            {currentTrace.array.map((value, index) => (
              <button
                key={index}
                className={`boss-cell clickable ${
                  selected === index ? "selected" : ""
                }`}
                onClick={() => handleTrace(index)}
                disabled={Boolean(feedback)}
              >
                <span>[{index}]</span>

                <strong>{value}</strong>
              </button>
            ))}
          </div>
        </section>
      );
    }

    // ==========================================
    // PHASE 03 — WEB STRIKE
    // ==========================================
    if (phase.type === "operation") {
      return (
        <section className="boss-panel">
          <div className="panel-heading">
            <span>03</span>

            <div>
              <h2>WEB STRIKE</h2>

              <p>{currentOperation.question}</p>
            </div>
          </div>

          <div className="mini-array">
            {currentOperation.array.map((value, index) => (
              <div className="mini-cell" key={index}>
                <small>{index}</small>

                {value}
              </div>
            ))}
          </div>

          <div className="choice-grid">
            {currentOperation.options.map((option) => (
              <button
                key={option}
                className={`web-choice ${
                  selected === option ? "selected" : ""
                }`}
                onClick={() => handleOperation(option)}
                disabled={Boolean(feedback)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      );
    }

    // ==========================================
    // PHASE 04 — SPIDER SENSE
    // ==========================================
    if (phase.type === "sense") {
      return (
        <section className="boss-panel sense-panel">
          <div className="panel-heading">
            <span>04</span>

            <div>
              <h2>SPIDER SENSE</h2>

              <p>{currentSense.question}</p>
            </div>
          </div>

          <div className="sense-ring">
            <div className="sense-core">⚡</div>
          </div>

          <div className="choice-grid">
            {currentSense.options.map((option) => (
              <button
                key={option}
                className={`web-choice ${
                  selected === option ? "selected" : ""
                }`}
                onClick={() => handleSense(option)}
                disabled={Boolean(feedback)}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      );
    }

    // ==========================================
    // PHASE 05 — CORE BATTLE
    // ==========================================
    return (
      <section className="boss-panel final-battle">
        <div className="panel-heading">
          <span>05</span>

          <div>
            <h2>CORE BATTLE</h2>

            <p>{currentBoss.question}</p>
          </div>
        </div>

        <div className="boss-core">
          <div
            className="boss-core-energy"
            style={{ width: `${bossHealth}%` }}
          />

          <div className="boss-core-inner">
            <span>CORE</span>

            <strong>{bossHealth}%</strong>
          </div>
        </div>

        <div className="choice-grid">
          {currentBoss.options.map((option) => (
            <button
              key={option}
              className={`web-choice ${
                selected === option ? "selected" : ""
              }`}
              onClick={() => handleBoss(option)}
              disabled={Boolean(feedback)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    );
  };

  // ==========================================
  // COMPLETION SCREEN
  // ==========================================
  if (completed) {
    return (
      <main className="level08 level08-complete">
        <div className="web-field" />

        <div className="spider-mascot spider-complete">🕷️</div>

        <section className="victory-card">
          <div className="victory-web">✦</div>

          <p className="boss-kicker">CORE OVERRIDE COMPLETE</p>

          <h1>ARRAY MASTER</h1>

          <div className="master-line" />

          <p className="victory-text">
            You defeated the Array Core and mastered the web of arrays.
          </p>

          <div className="final-xp">+500 XP</div>

          <div className="victory-stats">
            <div>
              <strong>05</strong>
              <span>PHASES</span>
            </div>

            <div>
              <strong>08</strong>
              <span>MISSIONS</span>
            </div>

            <div>
              <strong>MAX</strong>
              <span>RANK</span>
            </div>
          </div>

          <button
            className="master-button"
            onClick={() => (window.location.href = `${import.meta.env.BASE_URL}challenges`)}
          >
            RETURN TO ARRAYVERSE
          </button>
        </section>
      </main>
    );
  }

  // ==========================================
  // INTRO SCREEN
  // ==========================================
  if (!started) {
    return (
      <main className="level08 level08-intro">
        <div className="web-field" />

        <div className="web-grid" />

        <div className="spider-mascot spider-top">🕷️</div>

        <div className="swing-line" />

        <section className="intro-card">
          <div className="boss-emblem">
            <span>🕷️</span>
          </div>

          <p className="boss-kicker">ARRAYVERSE // FINAL MISSION</p>

          <h1>
            WEB OF
            <br />
            <span>THE CORE</span>
          </h1>

          <p className="intro-description">
            The Array Core has been breached. Enter the neon web, master every
            array concept and defeat the final system.
          </p>

          <div className="boss-warning">
            <span>⚠</span>
            BOSS LEVEL // EXTREME SYSTEM OVERRIDE
          </div>

          <div className="boss-rules">
            <div>
              <strong>05</strong>
              <span>PHASES</span>
            </div>

            <div>
              <strong>03</strong>
              <span>HEARTS</span>
            </div>

            <div>
              <strong>500</strong>
              <span>XP</span>
            </div>
          </div>

          <button className="enter-boss" onClick={() => setStarted(true)}>
            ENTER THE WEB
            <span>→</span>
          </button>
        </section>
      </main>
    );
  }

  // ==========================================
  // GAME SCREEN
  // ==========================================
  return (
    <main className={`level08 level08-game ${webPulse ? "pulse" : ""}`}>
      <div className="web-field" />

      <div className="web-grid" />

      <div className="spider-mascot spider-game">🕷️</div>

      <div className="swing-line game-line" />

      <header className="boss-hud">
        <div className="hud-title">
          <span>ARRAYVERSE</span>

          <strong>ARRAY MASTER</strong>
        </div>

        <div className="hud-core">
          <small>CORE POWER</small>

          <div className="core-bar">
            <span style={{ width: `${totalProgress}%` }} />
          </div>

          <b>{core}/500</b>
        </div>

        <div className="hud-stats">
          <div>
            <small>XP</small>

            <strong>{xp}</strong>
          </div>

          <div>
            <small>HEARTS</small>

            <strong>
              {"♥".repeat(hearts)}
              {"♡".repeat(3 - hearts)}
            </strong>
          </div>
        </div>
      </header>

      <section className="boss-stage">
        <div className="phase-track">
          {phases.map((item, index) => (
            <div
              key={item.title}
              className={`phase-dot ${
                index === phaseIndex
                  ? "active"
                  : index < phaseIndex
                  ? "cleared"
                  : ""
              }`}
            >
              <span>{index + 1}</span>

              <small>{item.title}</small>
            </div>
          ))}
        </div>

        <div className="stage-heading">
          <p>FINAL BOSS // PHASE {phaseIndex + 1}</p>

          <h1>{phase.title}</h1>

          <span>{phase.subtitle}</span>
        </div>

        {renderPhase()}

        {feedback && (
          <div className={`boss-feedback ${wrong ? "wrong" : "success"}`}>
            <strong>{feedback}</strong>

            {wrong && (
              <button onClick={handleRetry}>TRY AGAIN</button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Level08;