import { useMemo, useState } from "react";
import "./Level06.css";

const missions = [
  {
    type: "sequence",
    title: "BLADE ORDER",
    instruction:
      "Tap the numbers from smallest to largest. Your blade follows the correct sorting path.",
    array: [42, 17, 35, 9, 28],
    target: [9, 17, 28, 35, 42],
    reward: 30,
  },
  {
    type: "swap",
    title: "SHADOW SWAP",
    instruction:
      "The highlighted pair is out of order. Tap SWAP to perform the correct sorting move.",
    array: [31, 14, 26, 8],
    pair: [0, 1],
    shouldSwap: true,
    reward: 30,
  },
  {
    type: "sequence",
    title: "SHURIKEN SORT",
    instruction:
      "Build the sorted array by selecting the next smallest value.",
    array: [56, 21, 43, 12, 38],
    target: [12, 21, 38, 43, 56],
    reward: 35,
  },
  {
    type: "swap",
    title: "DOJO DUEL",
    instruction:
      "Two warriors are facing each other. Decide whether the pair needs a swap.",
    array: [11, 27, 19, 34],
    pair: [1, 2],
    shouldSwap: true,
    reward: 35,
  },
  {
    type: "sequence",
    title: "MASTER SORT",
    instruction:
      "Final trial. Sort the array completely. One wrong move breaks your combo.",
    array: [64, 18, 47, 7, 33, 25],
    target: [7, 18, 25, 33, 47, 64],
    reward: 70,
  },
];

function Level06() {
  const [started, setStarted] = useState(false);
  const [missionIndex, setMissionIndex] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [swapUsed, setSwapUsed] = useState(false);

  const mission = missions[missionIndex];

  const sortedTarget = useMemo(
    () => [...mission.array].sort((a, b) => a - b),
    [mission]
  );

  const handleSequencePick = (value) => {
    if (result || selected.includes(value)) return;

    const nextSequence = [...sequence, value];
    setSequence(nextSequence);
    setSelected((current) => [...current, value]);

    const expected = mission.target[nextSequence.length - 1];

    if (value !== expected) {
      setResult("wrong");
      setHearts((current) => Math.max(0, current - 1));
      setCombo(0);
      return;
    }

    if (nextSequence.length === mission.target.length) {
      setResult("correct");
      setXp((current) => current + mission.reward);
      setCombo((current) => current + 1);
    }
  };

  const handleSwap = () => {
    if (result || swapUsed) return;

    if (mission.shouldSwap) {
      setSwapUsed(true);
      setResult("correct");
      setXp((current) => current + mission.reward);
      setCombo((current) => current + 1);
    }
  };

  const handleStay = () => {
    if (result || swapUsed) return;

    if (!mission.shouldSwap) {
      setSwapUsed(true);
      setResult("correct");
      setXp((current) => current + mission.reward);
      setCombo((current) => current + 1);
    } else {
      setResult("wrong");
      setHearts((current) => Math.max(0, current - 1));
      setCombo(0);
    }
  };

  const nextMission = () => {
    if (result !== "correct") {
      setSequence([]);
      setSelected([]);
      setResult(null);
      setSwapUsed(false);
      return;
    }

    if (missionIndex === missions.length - 1) {
      setCompleted(true);
      localStorage.setItem("challenge6Completed", "true");
      return;
    }

    setMissionIndex((current) => current + 1);
    setSequence([]);
    setSelected([]);
    setResult(null);
    setSwapUsed(false);
  };

  const restartLevel = () => {
    setMissionIndex(0);
    setSequence([]);
    setSelected([]);
    setResult(null);
    setHearts(3);
    setXp(0);
    setCombo(0);
    setSwapUsed(false);
    setCompleted(false);
  };

  if (!started) {
    return (
      <main className="level06-page ninja-intro">
        <div className="dojo-mist"></div>
        <div className="dojo-stars"></div>

        <section className="ninja-intro-card">
          <div className="ninja-emblem">
            <div className="emblem-ring"></div>
            <span>🥷</span>
          </div>

          <p className="level06-kicker">
            LEVEL 06 // SORT WARRIOR
          </p>

          <h1>
            NINJA
            <span> DOJO</span>
          </h1>

          <p className="ninja-description">
            Enter the hidden dojo and master the ancient art of sorting.
            Choose your moves carefully, build your combo and prove that
            you can control every element in the array.
          </p>

          <div className="dojo-warning">
            <span></span>
            HARD MODE // PRECISION REQUIRED
          </div>

          <div className="ninja-rules">
            <div>
              <span>⚔️</span>
              <strong>5</strong>
              <small>TRIALS</small>
            </div>

            <div>
              <span>❤️</span>
              <strong>3</strong>
              <small>LIVES</small>
            </div>

            <div>
              <span>⭐</span>
              <strong>200</strong>
              <small>MAX XP</small>
            </div>
          </div>

          <button
            className="enter-dojo-button"
            onClick={() => setStarted(true)}
          >
            <span>🥷</span>
            ENTER DOJO
            <span>→</span>
          </button>

          <p className="ninja-warning">
            ⚠ ONE WRONG MOVE BREAKS YOUR COMBO
          </p>
        </section>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="level06-page ninja-complete">
        <div className="dojo-mist"></div>
        <div className="dojo-stars"></div>

        <section className="master-card">
          <div className="master-emblem">
            <span>⚔️</span>
          </div>

          <p className="level06-kicker">
            DOJO TRIALS COMPLETE
          </p>

          <h1>
            SORT
            <span> WARRIOR</span>
          </h1>

          <p>
            Every sorting trial has been conquered. Your precision,
            timing and algorithmic control have earned the title of
            Sort Warrior.
          </p>

          <div className="ninja-reward">
            <span>⭐</span>
            <strong>+{xp} XP</strong>
            <small>SORT WARRIOR REWARD</small>
          </div>

          <div className="master-actions">
            <button
              className="replay-dojo-button"
              onClick={restartLevel}
            >
              ↻ REPLAY DOJO
            </button>

            <button
              className="return-dojo-button"
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}challenges`;
              }}
            >
              ✦ RETURN TO ARENA
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="level06-page ninja-game">
      <div className="dojo-mist"></div>
      <div className="dojo-stars"></div>

      <header className="ninja-hud">
        <div className="ninja-title">
          <span>🥷</span>
          SORT WARRIOR
        </div>

        <div className="ninja-stats">
          <div className="ninja-stat">
            ❤️ {hearts}
          </div>

          <div className="ninja-stat">
            ⭐ {xp} XP
          </div>

          <div className="combo-stat">
            🔥 COMBO ×{combo}
          </div>
        </div>
      </header>

      <section className="dojo-progress">
        <div className="dojo-progress-label">
          <span>⚔️ DOJO TRIAL</span>

          <span>
            {String(missionIndex + 1).padStart(2, "0")} /{" "}
            {String(missions.length).padStart(2, "0")}
          </span>
        </div>

        <div className="dojo-progress-track">
          <div
            className="dojo-progress-fill"
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

      <section className="ninja-mission-card">
        <div className="mission-stamp">
          {mission.title}
        </div>

        <p className="mission-kicker06">
          SECRET DOJO // TRIAL {missionIndex + 1}
        </p>

        <h2>{mission.instruction}</h2>

        {mission.type === "sequence" && (
          <>
            <div className="sort-arena">
              {mission.array.map((value, index) => {
                const isSelected = selected.includes(value);

                return (
                  <button
                    key={`${value}-${index}`}
                    className={`ninja-cell ${
                      isSelected ? "cell-selected" : ""
                    }`}
                    onClick={() => handleSequencePick(value)}
                    disabled={selected.includes(value) || result !== null}
                  >
                    <small>IDX {index}</small>
                    <strong>{value}</strong>
                    <span>
                      {isSelected ? "✓" : "⚔"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="blade-path">
              <span>YOUR SORT PATH</span>

              <div className="path-values">
                {sequence.length === 0 ? (
                  <small>Select the smallest element first...</small>
                ) : (
                  sequence.map((value, index) => (
                    <div key={`${value}-${index}`}>
                      {value}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {mission.type === "swap" && (
          <>
            <div className="duel-array">
              {mission.array.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className={`duel-cell ${
                    mission.pair.includes(index)
                      ? "duel-highlight"
                      : ""
                  }`}
                >
                  <small>IDX {index}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="duel-message">
              ⚔️ SHADOW DUEL — SHOULD THESE TWO ELEMENTS CHANGE
              POSITIONS?
            </div>

            <div className="duel-actions">
              <button
                className="swap-button"
                onClick={handleSwap}
                disabled={swapUsed || result !== null}
              >
                ⚔ SWAP
              </button>

              <button
                className="stay-button"
                onClick={handleStay}
                disabled={swapUsed || result !== null}
              >
                ✦ STAY
              </button>
            </div>
          </>
        )}

        {result && (
          <div
            className={`ninja-feedback ${
              result === "correct"
                ? "feedback-correct06"
                : "feedback-wrong06"
            }`}
          >
            <div className="feedback-icon06">
              {result === "correct" ? "⚔️" : "💥"}
            </div>

            <div>
              <strong>
                {result === "correct"
                  ? "PERFECT MOVE!"
                  : "WRONG MOVE!"}
              </strong>

              <p>
                {result === "correct"
                  ? "Your sorting decision was correct. The dojo recognizes your precision."
                  : `The correct move follows ascending order. The sorted target is ${sortedTarget.join(
                      " → "
                    )}.`}
              </p>
            </div>
          </div>
        )}

        {result && (
          <button
            className="next-ninja-button"
            onClick={nextMission}
          >
            {result === "correct"
              ? missionIndex === missions.length - 1
                ? "CLAIM WARRIOR TITLE"
                : "NEXT TRIAL →"
              : "RETRY MOVE ↻"}
          </button>
        )}
      </section>

      <footer className="ninja-footer">
        <span>🥷 ARRAYVERSE</span>
        <span>NINJA DOJO // LEVEL 06</span>
        <span>⚔ SORT SYSTEM ONLINE</span>
      </footer>
    </main>
  );
}

export default Level06;