import { useState } from "react";

const MUSIC_SUGGESTIONS = [
  'Oorum Blood (From "Dude")',
  'Nallaru Po (From "Dude")',
  'Alaakaa Loova (From "OM")',
  'Nee Gunde Lona (From "Dude")',
  'Aane Wala Star (From "PR01")',
  'Aasa Kooda (From "Think Indie")',
  'God Mode (From "Karuppu")',
  'Katchi Sera (From "Think Indie")',
  'Verappa - Extended (From "Karuppu")',
  'Radhimaa (From "Think Indie")',
  'Pavazha Malli (From "Think Indie")',
  'Baagundu Po (From "Dude (Telugu)")',
  'Ooroda Oththa Don (From "Baththa")',
  'Boom Boom (From "Dude (Telugu)")',
  'Singari (From "Dude (Telugu)")',
  'The Wild Theme (From "OM")',
  'Karuppa Kooda Va (From "Karuppu")',
];

const INITIAL_PLAYLIST = [
  MUSIC_SUGGESTIONS[0],
  MUSIC_SUGGESTIONS[5],
  MUSIC_SUGGESTIONS[7],
];

function MusicPlaylist() {
  const [songs, setSongs] = useState(INITIAL_PLAYLIST);
  const [songInput, setSongInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchIndex, setSearchIndex] = useState(null);
  const [status, setStatus] = useState("MUSIC ARRAY READY");

  const handleAdd = () => {
    const value = songInput.trim();

    if (!value) {
      setStatus("SELECT A SONG");
      return;
    }

    if (!MUSIC_SUGGESTIONS.includes(value)) {
      setStatus("SONG NOT AVAILABLE");
      return;
    }

    if (songs.includes(value)) {
      setStatus("SONG ALREADY EXISTS");
      return;
    }

    setSongs((prev) => [...prev, value]);
    setSongInput("");
    setSearchIndex(null);
    setStatus(`${value} ADDED TO PLAYLIST`);
  };

  const handleDelete = () => {
    if (selectedIndex === "") {
      setStatus("SELECT A SONG INDEX");
      return;
    }

    const index = Number(selectedIndex);

    if (index < 0 || index >= songs.length) {
      setStatus("INVALID INDEX");
      return;
    }

    const removed = songs[index];

    setSongs((prev) => prev.filter((_, i) => i !== index));
    setSelectedIndex("");
    setSearchIndex(null);
    setStatus(`${removed} REMOVED FROM PLAYLIST`);
  };

  const handleUpdate = () => {
    if (selectedIndex === "") {
      setStatus("SELECT A SONG INDEX");
      return;
    }

    const value = songInput.trim();

    if (!value) {
      setStatus("SELECT A NEW SONG");
      return;
    }

    if (!MUSIC_SUGGESTIONS.includes(value)) {
      setStatus("SONG NOT AVAILABLE");
      return;
    }

    const index = Number(selectedIndex);

    if (index < 0 || index >= songs.length) {
      setStatus("INVALID INDEX");
      return;
    }

    if (
      songs.some(
        (song, i) => song === value && i !== index
      )
    ) {
      setStatus("SONG ALREADY EXISTS");
      return;
    }

    const oldSong = songs[index];

    setSongs((prev) =>
      prev.map((song, i) =>
        i === index ? value : song
      )
    );

    setSongInput("");
    setSearchIndex(null);
    setStatus(`${oldSong} UPDATED`);
  };

  const handleSearch = () => {
    const value = searchInput.trim();

    if (!value) {
      setStatus("ENTER A SONG NAME");
      return;
    }

    const index = songs.indexOf(value);

    if (index === -1) {
      setSearchIndex(null);
      setStatus("SONG NOT FOUND");
      return;
    }

    setSearchIndex(index);
    setStatus(`SONG FOUND AT INDEX ${index}`);
  };

  const handleReset = () => {
    setSongs(INITIAL_PLAYLIST);
    setSongInput("");
    setSearchInput("");
    setSelectedIndex("");
    setSearchIndex(null);
    setStatus("MUSIC ARRAY RESET");
  };

  return (
    <section className="pg-music-lab">

      {/* HEADER */}

      <div className="pg-music-header">
        <div>
          <span>PLAYGROUND 02 // REAL WORLD ARRAY</span>

          <h1>
            🎵 MUSIC PLAYLIST
            <strong> ARRAY LAB</strong>
          </h1>

          <p>
            Build and control a music playlist using array operations.
          </p>
        </div>

        <div className="pg-live-indicator">
          <span className="pg-status-dot"></span>
          LIVE
        </div>
      </div>


      {/* PLAYLIST */}

      <div className="pg-music-array-panel">

        <div className="pg-panel-title">
          <span>LIVE PLAYLIST ARRAY</span>

          <strong>
            SIZE : {songs.length}
          </strong>
        </div>

        <div className="pg-music-list">

          {songs.length === 0 ? (
            <div className="pg-music-empty">
              <span>♫</span>
              <strong>PLAYLIST EMPTY</strong>
              <small>Add a song to begin.</small>
            </div>
          ) : (
            songs.map((song, index) => (
              <button
                type="button"
                key={`${song}-${index}`}
                className={
                  searchIndex === index
                    ? "pg-music-item pg-music-found"
                    : "pg-music-item"
                }
                onClick={() =>
                  setSelectedIndex(String(index))
                }
              >
                <span className="pg-music-index">
                  [{index}]
                </span>

                <span className="pg-music-icon">
                  ♫
                </span>

                <span className="pg-music-name">
                  {song}
                </span>

                <span className="pg-music-arrow">
                  →
                </span>
              </button>
            ))
          )}

        </div>
      </div>


      {/* OPERATIONS */}

      <div className="pg-music-operation-grid">

        {/* INSERT */}

        <div className="pg-operation-card">

          <div className="pg-operation-number">
            01
          </div>

          <h3>INSERT SONG</h3>

          <p>
            Add a song to the playlist array.
          </p>

          <select
            value={songInput}
            onChange={(e) =>
              setSongInput(e.target.value)
            }
          >
            <option value="">
              Select Song
            </option>

            {MUSIC_SUGGESTIONS.map((song) => (
              <option key={song} value={song}>
                {song}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="pg-operation-button"
            onClick={handleAdd}
          >
            + ADD SONG
          </button>

        </div>


        {/* DELETE */}

        <div className="pg-operation-card">

          <div className="pg-operation-number">
            02
          </div>

          <h3>DELETE SONG</h3>

          <p>
            Select an index and remove the song.
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

            {songs.map((song, index) => (
              <option
                key={index}
                value={index}
              >
                Index {index} — {song}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="pg-operation-button pg-delete"
            onClick={handleDelete}
          >
            − DELETE SONG
          </button>

        </div>


        {/* UPDATE */}

        <div className="pg-operation-card">

          <div className="pg-operation-number">
            03
          </div>

          <h3>UPDATE SONG</h3>

          <p>
            Replace a song at an index.
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

            {songs.map((song, index) => (
              <option
                key={index}
                value={index}
              >
                Index {index} — {song}
              </option>
            ))}
          </select>

          <select
            value={songInput}
            onChange={(e) =>
              setSongInput(e.target.value)
            }
          >
            <option value="">
              Select New Song
            </option>

            {MUSIC_SUGGESTIONS.map((song) => (
              <option key={song} value={song}>
                {song}
              </option>
            ))}
          </select>

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

          <h3>SEARCH SONG</h3>

          <p>
            Find a song inside the array.
          </p>

          <select
            value={searchInput}
            onChange={(e) =>
              setSearchInput(e.target.value)
            }
          >
            <option value="">
              Select Song
            </option>

            {MUSIC_SUGGESTIONS.map((song) => (
              <option key={song} value={song}>
                {song}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="pg-operation-button pg-search"
            onClick={handleSearch}
          >
            ◉ SEARCH
          </button>

        </div>

      </div>


      {/* STATUS */}

      <div className="pg-status-panel">

        <div>
          <span>LAST OPERATION</span>
          <strong>{status}</strong>
        </div>

        <button
          type="button"
          onClick={handleReset}
        >
          RESET PLAYLIST
        </button>

      </div>


      {/* CONCEPT */}

      <div className="pg-concept">

        <div className="pg-concept-heading">
          <span>ARRAY CONCEPT</span>

          <h2>
            Playlist Songs = Array Elements
          </h2>
        </div>

        <div className="pg-concept-grid">

          <div>
            <strong>INSERT</strong>
            <small>Add a song</small>
          </div>

          <div>
            <strong>DELETE</strong>
            <small>Remove a song</small>
          </div>

          <div>
            <strong>UPDATE</strong>
            <small>Change a song</small>
          </div>

          <div>
            <strong>SEARCH</strong>
            <small>Find a song</small>
          </div>

        </div>

      </div>

    </section>
  );
}

export default MusicPlaylist;