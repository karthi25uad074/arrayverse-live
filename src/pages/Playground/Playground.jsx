import { useState } from "react";
import TrainScene from "./components/TrainScene";
import MusicPlaylist from "./components/MusicPlaylist";
import Navbar from "../../shared/Navbar/Navbar";
import "./Playground.css";

const INITIAL_COACHES = ["S1", "S2"];

function Playground() {
  const [activeLab, setActiveLab] = useState(null);

  const [coaches, setCoaches] = useState(INITIAL_COACHES);
  const [coachInput, setCoachInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [searchIndex, setSearchIndex] = useState(null);
  const [status, setStatus] = useState("TRAIN ARRAY READY");

  const handleAdd = () => {
    const value = coachInput.trim().toUpperCase();

    if (!value) {
      setStatus("ENTER A COACH NUMBER");
      return;
    }

    if (coaches.includes(value)) {
      setStatus(`${value} ALREADY EXISTS`);
      return;
    }

    setCoaches((prev) => [...prev, value]);
    setCoachInput("");
    setSearchIndex(null);
    setStatus(`${value} INSERTED INTO ARRAY`);
  };

  const handleDelete = () => {
    if (selectedIndex === "") {
      setStatus("SELECT A COACH INDEX");
      return;
    }

    const index = Number(selectedIndex);

    if (index < 0 || index >= coaches.length) {
      setStatus("INVALID INDEX");
      return;
    }

    const removed = coaches[index];

    setCoaches((prev) => prev.filter((_, i) => i !== index));
    setSelectedIndex("");
    setSearchIndex(null);
    setStatus(`${removed} DELETED FROM ARRAY`);
  };

  const handleUpdate = () => {
    if (selectedIndex === "") {
      setStatus("SELECT A COACH INDEX");
      return;
    }

    const value = coachInput.trim().toUpperCase();

    if (!value) {
      setStatus("ENTER NEW COACH NUMBER");
      return;
    }

    const index = Number(selectedIndex);

    if (index < 0 || index >= coaches.length) {
      setStatus("INVALID INDEX");
      return;
    }

    if (
      coaches.some(
        (coach, i) => coach === value && i !== index
      )
    ) {
      setStatus(`${value} ALREADY EXISTS`);
      return;
    }

    const oldValue = coaches[index];

    setCoaches((prev) =>
      prev.map((coach, i) =>
        i === index ? value : coach
      )
    );

    setCoachInput("");
    setSearchIndex(null);
    setStatus(`${oldValue} UPDATED TO ${value}`);
  };

  const handleSearch = () => {
    const value = searchInput.trim().toUpperCase();

    if (!value) {
      setStatus("ENTER COACH NUMBER");
      return;
    }

    const index = coaches.indexOf(value);

    if (index === -1) {
      setSearchIndex(null);
      setStatus(`${value} NOT FOUND`);
      return;
    }

    setSearchIndex(index);
    setStatus(`${value} FOUND AT INDEX ${index}`);
  };

  const handleReset = () => {
    setCoaches(INITIAL_COACHES);
    setCoachInput("");
    setSearchInput("");
    setSelectedIndex("");
    setSearchIndex(null);
    setStatus("TRAIN ARRAY RESET");
  };

  /* ==============================
     PLAYGROUND HUB
  ============================== */

  if (activeLab === null) {
    return (
      <div className="pg-page">
        <Navbar />
        <div className="pg-hub">

          <div className="pg-hub-header">
            <div className="pg-eyebrow">
              ARRAYVERSE // PLAYGROUND
            </div>

            <h1>
              REAL WORLD
              <span>ARRAY LABS</span>
            </h1>

            <p>
              Explore array concepts through interactive
              real-world simulations.
            </p>

            <div className="pg-hub-status">
              <span className="pg-status-dot"></span>
              SIMULATION SYSTEM ONLINE
            </div>
          </div>

          <div className="pg-lab-grid">

            {/* TRAIN */}

            <button
              type="button"
              className="pg-lab-card pg-train-card"
              onClick={() => setActiveLab("train")}
            >
              <div className="pg-card-glow"></div>

              <div className="pg-lab-icon">
                🚆
              </div>

              <div className="pg-lab-number">
                PLAYGROUND 01
              </div>

              <h2>
                TRAIN ARRAY LAB
              </h2>

              <p>
                Build and control a 3D train using
                array operations.
              </p>

              <div className="pg-tags">
                <span>INSERT</span>
                <span>DELETE</span>
                <span>UPDATE</span>
                <span>SEARCH</span>
              </div>

              <div className="pg-enter">
                ENTER TRAIN LAB
                <span>→</span>
              </div>
            </button>


            {/* LOCKED 2 */}

            <button
  type="button"
  className="pg-lab-card pg-music-card"
  onClick={() => setActiveLab("music")}
>
  <div className="pg-card-glow"></div>

  <div className="pg-lab-icon">
    🎵
  </div>

  <div className="pg-lab-number">
    PLAYGROUND 02
  </div>

  <h2>
    MUSIC PLAYLIST LAB
  </h2>

  <p>
    Build and control a music playlist using
    array operations.
  </p>

  <div className="pg-tags">
    <span>INSERT</span>
    <span>DELETE</span>
    <span>UPDATE</span>
    <span>SEARCH</span>
  </div>

  <div className="pg-enter">
    ENTER MUSIC LAB
    <span>→</span>
  </div>
</button>


            {/* LOCKED 3 */}

            <div className="pg-lab-card pg-locked-card">

              <div className="pg-lock-layer">
                <div className="pg-lock">
                  🔒
                </div>

                <span>COMING SOON</span>
              </div>

              <div className="pg-lab-icon">
                ⚡
              </div>

              <div className="pg-lab-number">
                PLAYGROUND 03
              </div>

              <h2>
                NEXT ARRAY LAB
              </h2>

              <p>
                Another interactive real-world
                array experience is coming.
              </p>

              <div className="pg-tags">
                <span>LOCKED</span>
                <span>???</span>
                <span>???</span>
              </div>
            </div>

          </div>

          <div className="pg-hub-footer">
            <div>
              <span>ARRAYVERSE</span>
              <strong>
                CHOOSE → INTERACT → UNDERSTAND
              </strong>
            </div>

            <div>
              <span>PLAYGROUND</span>
              <strong>
                REAL WORLD × ARRAYS
              </strong>
            </div>
          </div>

        </div>
      </div>
    );
  }
if (activeLab === "music") {
  return (
    <div className="pg-page pg-music-page">
      <Navbar />

      <MusicPlaylist />
    </div>
  );
}

  /* ==============================
     TRAIN LAB
  ============================== */

  return (
    <div className="pg-page pg-train-page">
    <Navbar />
      <header className="pg-train-header">

        <button
          type="button"
          className="pg-back-button"
          onClick={() => setActiveLab(null)}
        >
          ← PLAYGROUND
        </button>

        <div className="pg-train-heading">
          <span>
            PLAYGROUND 01 // REAL WORLD ARRAY
          </span>

          <h1>
            🚆 TRAIN ARRAY LAB
          </h1>
        </div>

        <div className="pg-live-indicator">
          <span className="pg-status-dot"></span>
          LIVE
        </div>

      </header>


      {/* 3D SCENE */}

      <section className="pg-train-scene">
        <TrainScene
          coaches={coaches}
          searchIndex={searchIndex}
        />
      </section>


      {/* ARRAY */}

      <section className="pg-array-panel">

        <div className="pg-panel-title">
          <span>LIVE ARRAY</span>
          <strong>
            SIZE : {coaches.length}
          </strong>
        </div>

        <div className="pg-array-row">

          <div className="pg-engine-cell">
            ENGINE
          </div>

          {coaches.map((coach, index) => (
            <button
              type="button"
              key={`${coach}-${index}`}
              className={
                searchIndex === index
                  ? "pg-array-cell pg-found"
                  : "pg-array-cell"
              }
              onClick={() =>
                setSelectedIndex(String(index))
              }
            >
              <small>
                [{index}]
              </small>

              <strong>
                {coach}
              </strong>
            </button>
          ))}

        </div>
      </section>


      {/* OPERATIONS */}

      <section className="pg-operation-grid">

        {/* INSERT */}

        <div className="pg-operation-card">

          <div className="pg-operation-number">
            01
          </div>

          <h3>INSERT COACH</h3>

          <p>
            Add a new coach to the train.
          </p>

          <input
            value={coachInput}
            onChange={(e) =>
              setCoachInput(e.target.value)
            }
            placeholder="Example: S3"
            maxLength={8}
          />

          <button
            type="button"
            className="pg-operation-button"
            onClick={handleAdd}
          >
            + ADD COACH
          </button>

        </div>


        {/* DELETE */}

        <div className="pg-operation-card">

          <div className="pg-operation-number">
            02
          </div>

          <h3>DELETE COACH</h3>

          <p>
            Select an index and remove it.
          </p>

          <select
            value={selectedIndex}
            onChange={(e) =>
              setSelectedIndex(e.target.value)
            }
          >
            <option value="">
              Select Index
            </option>

            {coaches.map((coach, index) => (
              <option
                key={index}
                value={index}
              >
                Index {index} — {coach}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="pg-operation-button pg-delete"
            onClick={handleDelete}
          >
            − DELETE COACH
          </button>

        </div>


        {/* UPDATE */}

        <div className="pg-operation-card">

          <div className="pg-operation-number">
            03
          </div>

          <h3>UPDATE COACH</h3>

          <p>
            Replace a coach at an index.
          </p>

          <select
            value={selectedIndex}
            onChange={(e) =>
              setSelectedIndex(e.target.value)
            }
          >
            <option value="">
              Select Index
            </option>

            {coaches.map((coach, index) => (
              <option
                key={index}
                value={index}
              >
                Index {index} — {coach}
              </option>
            ))}
          </select>

          <input
            value={coachInput}
            onChange={(e) =>
              setCoachInput(e.target.value)
            }
            placeholder="Example: B1"
            maxLength={8}
          />

          <button
            type="button"
            className="pg-operation-button pg-update"
            onClick={handleUpdate}
          >
            ↻ UPDATE
          </button>

        </div>


        {/* SEARCH */}

        <div className="pg-operation-card">

          <div className="pg-operation-number">
            04
          </div>

          <h3>SEARCH COACH</h3>

          <p>
            Find a coach inside the array.
          </p>

          <input
            value={searchInput}
            onChange={(e) =>
              setSearchInput(e.target.value)
            }
            placeholder="Example: S2"
            maxLength={8}
          />

          <button
            type="button"
            className="pg-operation-button pg-search"
            onClick={handleSearch}
          >
            ◉ SEARCH
          </button>

        </div>

      </section>


      {/* STATUS */}

      <section className="pg-status-panel">

        <div>
          <span>LAST OPERATION</span>
          <strong>{status}</strong>
        </div>

        <button
          type="button"
          onClick={handleReset}
        >
          RESET TRAIN
        </button>

      </section>


      {/* CONCEPT */}

      <section className="pg-concept">

        <div className="pg-concept-heading">
          <span>ARRAY CONCEPT</span>

          <h2>
            Train Coaches = Array Elements
          </h2>
        </div>

        <div className="pg-concept-grid">

          <div>
            <strong>INSERT</strong>
            <small>Add a coach</small>
          </div>

          <div>
            <strong>DELETE</strong>
            <small>Remove a coach</small>
          </div>

          <div>
            <strong>UPDATE</strong>
            <small>Change a coach</small>
          </div>

          <div>
            <strong>SEARCH</strong>
            <small>Find a coach</small>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Playground;
