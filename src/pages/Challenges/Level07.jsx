import { useEffect, useMemo, useState } from "react";
import "./Level07.css";

const missions = [
  {
    title: "ESCAPE THE CRATER",
    size: 4,
    start: [0, 0],
    exit: [3, 3],
    crystals: [[1, 1]],
    rocks: [[0, 2], [2, 0]],
    lava: [[1, 3], [3, 1]],
    reward: 40,
  },
  {
    title: "THE FORGOTTEN PATH",
    size: 4,
    start: [0, 3],
    exit: [3, 0],
    crystals: [[1, 2], [2, 1]],
    rocks: [[0, 1], [2, 3]],
    lava: [[1, 0], [3, 2]],
    reward: 45,
  },
  {
    title: "MAGMA TEMPLE",
    size: 5,
    start: [0, 0],
    exit: [4, 4],
    crystals: [[1, 1], [2, 3], [3, 1]],
    rocks: [[0, 2], [1, 3], [3, 3]],
    lava: [[1, 0], [2, 2], [4, 1], [4, 3]],
    reward: 50,
  },
  {
    title: "ERUPTION ZONE",
    size: 5,
    start: [4, 0],
    exit: [0, 4],
    crystals: [[3, 1], [2, 2], [1, 3]],
    rocks: [[4, 2], [3, 3], [1, 1]],
    lava: [[3, 0], [2, 4], [0, 1], [1, 4]],
    reward: 55,
  },
  {
    title: "VOLCANO CORE",
    size: 6,
    start: [5, 0],
    exit: [0, 5],
    crystals: [[4, 1], [3, 2], [2, 3], [1, 4]],
    rocks: [[5, 2], [4, 3], [3, 4], [2, 1], [1, 2]],
    lava: [[5, 4], [4, 0], [3, 5], [2, 4], [1, 0], [0, 3]],
    reward: 60,
  },
];

const directions = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
};

function samePosition(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function positionKey(position) {
  return `${position[0]}-${position[1]}`;
}

function Level07() {
  const [started, setStarted] = useState(false);
  const [missionIndex, setMissionIndex] = useState(0);
  const [player, setPlayer] = useState(missions[0].start);
  const [collected, setCollected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [lavaPulse, setLavaPulse] = useState(false);

  const mission = missions[missionIndex];

  const crystalKeys = useMemo(
    () => mission.crystals.map(positionKey),
    [mission]
  );

  const collectedKeys = useMemo(
    () => new Set(collected),
    [collected]
  );

  useEffect(() => {
    if (!started || result || completed) return;

    const handleKeyDown = (event) => {
      const keyMap = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        W: "UP",
        s: "DOWN",
        S: "DOWN",
        a: "LEFT",
        A: "LEFT",
        d: "RIGHT",
        D: "RIGHT",
      };

      const direction = keyMap[event.key];

      if (!direction) return;

      event.preventDefault();
      movePlayer(direction);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [started, result, completed, player, missionIndex, collected]);

  const movePlayer = (direction) => {
    if (result || completed) return;

    const [rowChange, columnChange] = directions[direction];

    const nextRow = player[0] + rowChange;
    const nextColumn = player[1] + columnChange;

    if (
      nextRow < 0 ||
      nextRow >= mission.size ||
      nextColumn < 0 ||
      nextColumn >= mission.size
    ) {
      setLavaPulse(true);

      setTimeout(() => {
        setLavaPulse(false);
      }, 300);

      return;
    }

    const nextPosition = [nextRow, nextColumn];
    const nextKey = positionKey(nextPosition);

    const isRock = mission.rocks.some((rock) =>
      samePosition(rock, nextPosition)
    );

    if (isRock) {
      setLavaPulse(true);

      setTimeout(() => {
        setLavaPulse(false);
      }, 300);

      return;
    }

    setPlayer(nextPosition);
    setMoves((current) => current + 1);

    const isLava = mission.lava.some((lava) =>
      samePosition(lava, nextPosition)
    );

    if (isLava) {
      setHearts((current) => Math.max(0, current - 1));
      setResult("lava");
      return;
    }

    if (
      mission.crystals.some(
        (crystal) => positionKey(crystal) === nextKey
      ) &&
      !collectedKeys.has(nextKey)
    ) {
      setCollected((current) => [...current, nextKey]);
    }

    if (samePosition(nextPosition, mission.exit)) {
      const allCrystalsCollected = mission.crystals.every((crystal) =>
        collectedKeys.has(positionKey(crystal)) ||
        positionKey(crystal) === nextKey
      );

      if (allCrystalsCollected) {
        setXp((current) => current + mission.reward);
        setResult("escaped");
      } else {
        setResult("locked");
      }
    }
  };

  const nextMission = () => {
    if (result === "lava" || result === "locked") {
      setResult(null);
      return;
    }

    if (result !== "escaped") return;

    if (missionIndex === missions.length - 1) {
      setCompleted(true);
      localStorage.setItem("challenge7Completed", "true");
      return;
    }

    const nextMissionData = missions[missionIndex + 1];

    setMissionIndex((current) => current + 1);
    setPlayer(nextMissionData.start);
    setCollected([]);
    setMoves(0);
    setResult(null);
    setLavaPulse(false);
  };

  const restartLevel = () => {
    setMissionIndex(0);
    setPlayer(missions[0].start);
    setCollected([]);
    setMoves(0);
    setHearts(3);
    setXp(0);
    setResult(null);
    setCompleted(false);
    setLavaPulse(false);
  };

  const getCellType = (row, column) => {
    const position = [row, column];
    const key = positionKey(position);

    if (samePosition(position, player)) return "player";

    if (samePosition(position, mission.exit)) return "exit";

    if (mission.rocks.some((rock) => samePosition(rock, position))) {
      return "rock";
    }

    if (mission.lava.some((lava) => samePosition(lava, position))) {
      return "lava";
    }

    if (mission.crystals.some((crystal) => samePosition(crystal, position))) {
      return collectedKeys.has(key) ? "crystal-collected" : "crystal";
    }

    return "safe";
  };

  if (!started) {
    return (
      <main className="level07-page volcano-intro">
        <div className="volcano-smoke"></div>
        <div className="lava-glow"></div>
        <div className="volcano-particles"></div>

        <section className="volcano-intro-card">
          <div className="volcano-emblem">
            <div className="volcano-ring"></div>
            <span>🌋</span>
          </div>

          <p className="level07-kicker">
            LEVEL 07 // 2D MATRIX
          </p>

          <h1>
            VOLCANO
            <span> ESCAPE GRID</span>
          </h1>

          <p className="volcano-description">
            The volcano is awakening. Navigate the ancient matrix,
            collect the hidden crystals and reach the exit before the
            magma claims the grid.
          </p>

          <div className="matrix-warning">
            <span></span>
            HARD MODE // MATRIX NAVIGATION ACTIVE
          </div>

          <div className="volcano-rules">
            <div>
              <span>🧭</span>
              <strong>5</strong>
              <small>ESCAPE ZONES</small>
            </div>

            <div>
              <span>❤️</span>
              <strong>3</strong>
              <small>LIVES</small>
            </div>

            <div>
              <span>⭐</span>
              <strong>250</strong>
              <small>MAX XP</small>
            </div>
          </div>

          <div className="matrix-preview">
            <span>2D ARRAY</span>

            <div className="preview-grid">
              <i></i>
              <i></i>
              <i className="preview-lava"></i>
              <i></i>
              <i></i>
              <i className="preview-crystal"></i>
              <i></i>
              <i className="preview-rock"></i>
              <i></i>
            </div>
          </div>

          <button
            className="enter-volcano-button"
            onClick={() => setStarted(true)}
          >
            <span>🔥</span>
            ENTER VOLCANO
            <span>→</span>
          </button>

          <p className="volcano-warning">
            ⚠ THE GRID IS YOUR ONLY WAY OUT
          </p>
        </section>
      </main>
    );
  }

  if (completed) {
    return (
      <main className="level07-page volcano-complete">
        <div className="volcano-smoke"></div>
        <div className="lava-glow"></div>
        <div className="volcano-particles"></div>

        <section className="escape-complete-card">
          <div className="escape-emblem">
            <span>🏆</span>
          </div>

          <p className="level07-kicker">
            VOLCANO ESCAPE COMPLETE
          </p>

          <h1>
            MATRIX
            <span> MASTER</span>
          </h1>

          <p>
            You navigated every volcanic grid, collected the hidden
            crystals and escaped the eruption zone. Your command of
            rows, columns and 2D array positions is complete.
          </p>

          <div className="volcano-reward">
            <span>💎</span>
            <strong>+{xp} XP</strong>
            <small>2D MATRIX REWARD</small>
          </div>

          <div className="escape-actions">
            <button
              className="replay-volcano-button"
              onClick={restartLevel}
            >
              ↻ REPLAY ESCAPE
            </button>

            <button
              className="return-volcano-button"
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
    <main
      className={`level07-page volcano-game ${
        lavaPulse ? "lava-impact" : ""
      }`}
    >
      <div className="volcano-smoke"></div>
      <div className="lava-glow"></div>
      <div className="volcano-particles"></div>

      <header className="volcano-hud">
        <div className="volcano-title">
          <span>🌋</span>
          VOLCANO ESCAPE
        </div>

        <div className="volcano-stats">
          <div className="volcano-stat">
            ❤️ {hearts}
          </div>

          <div className="volcano-stat">
            💎 {collected.length}/{mission.crystals.length}
          </div>

          <div className="volcano-stat">
            ⭐ {xp} XP
          </div>

          <div className="move-stat">
            🧭 {moves} MOVES
          </div>
        </div>
      </header>

      <section className="volcano-progress">
        <div className="volcano-progress-label">
          <span>🔥 ESCAPE PROTOCOL</span>

          <span>
            ZONE {missionIndex + 1} / {missions.length}
          </span>
        </div>

        <div className="volcano-progress-track">
          <div
            className="volcano-progress-fill"
            style={{
              width: `${
                ((missionIndex +
                  (result === "escaped" ? 1 : 0)) /
                  missions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </section>

      <section className="volcano-game-card">
        <div className="zone-header">
          <div>
            <p>ACTIVE ZONE</p>
            <h2>{mission.title}</h2>
          </div>

          <div className="coordinate-display">
            ROW {player[0]}
            <span>×</span>
            COL {player[1]}
          </div>
        </div>

        <div className="mission-objective">
          <span>MISSION</span>
          <strong>
            Collect all crystals and reach the exit at
            <b>
              [{mission.exit[0]}][{mission.exit[1]}]
            </b>
          </strong>
        </div>

        <div
          className="matrix-board"
          style={{
            gridTemplateColumns: `repeat(${mission.size}, 1fr)`,
          }}
        >
          {Array.from({
            length: mission.size * mission.size,
          }).map((_, index) => {
            const row = Math.floor(index / mission.size);
            const column = index % mission.size;
            const type = getCellType(row, column);

            return (
              <div
                key={`${row}-${column}`}
                className={`matrix-cell matrix-${type}`}
              >
                <small>
                  [{row}][{column}]
                </small>

                {type === "player" && (
                  <span className="cell-icon player-icon">
                    🧗
                  </span>
                )}

                {type === "exit" && (
                  <span className="cell-icon exit-icon">
                    🚪
                  </span>
                )}

                {type === "lava" && (
                  <span className="cell-icon">
                    🔥
                  </span>
                )}

                {type === "crystal" && (
                  <span className="cell-icon">
                    💎
                  </span>
                )}

                {type === "crystal-collected" && (
                  <span className="cell-icon crystal-done">
                    ✓
                  </span>
                )}

                {type === "rock" && (
                  <span className="cell-icon">
                    🪨
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="matrix-legend">
          <span>
            <i className="legend-player"></i>
            PLAYER
          </span>

          <span>
            <i className="legend-crystal"></i>
            CRYSTAL
          </span>

          <span>
            <i className="legend-lava"></i>
            LAVA
          </span>

          <span>
            <i className="legend-rock"></i>
            BLOCKED
          </span>

          <span>
            <i className="legend-exit"></i>
            EXIT
          </span>
        </div>

        <div className="movement-panel">
          <div className="movement-title">
            <span>🧭 NAVIGATION</span>
            <small>ARROW KEYS / WASD</small>
          </div>

          <div className="movement-controls">
            <button onClick={() => movePlayer("UP")}>
              ▲
            </button>

            <div>
              <button onClick={() => movePlayer("LEFT")}>
                ◀
              </button>

              <button
                className="center-position"
                disabled
              >
                ●
              </button>

              <button onClick={() => movePlayer("RIGHT")}>
                ▶
              </button>
            </div>

            <button onClick={() => movePlayer("DOWN")}>
              ▼
            </button>
          </div>
        </div>

        {result && (
          <div
            className={`volcano-feedback ${
              result === "escaped"
                ? "feedback-escaped"
                : result === "lava"
                ? "feedback-lava"
                : "feedback-locked"
            }`}
          >
            <div className="volcano-feedback-icon">
              {result === "escaped"
                ? "🚪"
                : result === "lava"
                ? "🔥"
                : "🔒"}
            </div>

            <div>
              <strong>
                {result === "escaped"
                  ? "ZONE ESCAPED!"
                  : result === "lava"
                  ? "MAGMA STRIKE!"
                  : "EXIT LOCKED!"}
              </strong>

              <p>
                {result === "escaped"
                  ? "Excellent navigation. Your row and column control was precise."
                  : result === "lava"
                  ? "You stepped into a lava cell. Your position is still safe to retry this zone."
                  : "The exit requires every crystal in this zone before it can open."}
              </p>
            </div>
          </div>
        )}

        {result && (
          <button
            className="next-volcano-button"
            onClick={nextMission}
          >
            {result === "escaped"
              ? missionIndex === missions.length - 1
                ? "ESCAPE THE VOLCANO"
                : "ENTER NEXT ZONE →"
              : "CONTINUE ESCAPE ↻"}
          </button>
        )}
      </section>

      <footer className="volcano-footer">
        <span>🌋 ARRAYVERSE</span>
        <span>2D MATRIX // LEVEL 07</span>
        <span>🔥 ERUPTION STATUS: ACTIVE</span>
      </footer>
    </main>
  );
}

export default Level07;