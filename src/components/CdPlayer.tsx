import { useState, useRef, useEffect } from "react";

type Track = {
  title: string;
  artist: string;
  duration: number;
  src: string;
  cover: string;
};

const TRACKS: Track[] = [
  { title: "Alive", artist: "Pearl Jam", duration: 203, src: "", cover: "https://i.scdn.co/image/ab67616d00001e022d0e5ab5bd2e234fbcffa3e0" },

  { title: "Runaway", artist: "Linkin Park", duration: 183, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "Bring Me to Life", artist: "Evanescence", duration: 187, src: "", cover: "https://i.scdn.co/image/ab67616d0000b27325f49ab23f0ec6332efef432" },

  { title: "Points of Authority", artist: "Linkin Park", duration: 200, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "Heart Shaped Box", artist: "Nirvana", duration: 231, src: "", cover: "https://i.scdn.co/image/ab67616d0000b273aca059cebc1841277db22d1c" },

  { title: "My Last Breath", artist: "Evanescence", duration: 187, src: "", cover: "https://i.scdn.co/image/ab67616d0000b27325f49ab23f0ec6332efef432" },

  { title: "Papercut", artist: "Linkin Park", duration: 184, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "Bleed The Freak", artist: "Alice in Chains", duration: 176, src: "", cover: "https://i.scdn.co/image/ab67616d0000b2733cf83c82a8e976d7b51e2d00" },

  { title: "Crawling", artist: "Linkin Park", duration: 209, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "Everybody's Fool", artist: "Evanescence", duration: 187, src: "", cover: "https://i.scdn.co/image/ab67616d0000b27325f49ab23f0ec6332efef432" },

  { title: "Even Flow", artist: "Pearl Jam", duration: 203, src: "", cover: "https://i.scdn.co/image/ab67616d00001e022d0e5ab5bd2e234fbcffa3e0" },

  { title: "Forgotten", artist: "Linkin Park", duration: 194, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "Nookie", artist: "Limp Bizkit", duration: 198, src: "", cover: "https://i.scdn.co/image/ab67616d0000b2733783782de74f61e36795bf9c" },

  { title: "With You", artist: "Linkin Park", duration: 203, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "One Step Closer", artist: "Linkin Park", duration: 155, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "Sk8er Boi", artist: "Avril Lavigne", duration: 231, src: "", cover: "https://i.scdn.co/image/ab67616d0000b273f7ec724fbf97a30869d06240" },

  { title: "In the End", artist: "Linkin Park", duration: 214, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "By Myself", artist: "Linkin Park", duration: 189, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "A Place for My Head", artist: "Linkin Park", duration: 184, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },

  { title: "Cure for the Itch", artist: "Linkin Park", duration: 157, src: "", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lp6BO9X_9pcCzt0ZHOzdg6fm8K6Lx4evKQ&s" },
];

// removed unused helper 'pad' to satisfy noUnusedLocals

export default function CdPlayer() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(80);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const track = TRACKS[trackIdx];

  function handleNext() { setTrackIdx((i) => (i + 1) % TRACKS.length); setElapsed(0); }
  function handlePrev() { setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length); setElapsed(0); }
  function handlePlay() { setPlaying(true); }
  function handlePause() { setPlaying(false); }
  function handleStop() { setPlaying(false); setElapsed(0); }

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= track.duration - 1) { handleNext(); return 0; }
          return e + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, trackIdx]);

  return (
    <>
      <style>{`
        .cdp-root {
          display: flex;
          flex-direction: row;
          align-items: center;
          background: #c0c0c0;
          font-family: 'W95F', 'MS Sans Serif', sans-serif;
          font-size: 12px;
          padding: 6px 8px;
          gap: 10px;
          user-select: none;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
        }
        .cdp-cover {
          width: 100px;
          height: 100px;
          flex-shrink: 0;
          border-top: 2px solid #808080;
          border-left: 2px solid #808080;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          object-fit: cover;
          display: block;
          image-rendering: pixelated;
        }
        .cdp-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }
        .cdp-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .cdp-label {
          width: 38px;
          text-align: right;
          flex-shrink: 0;
          font-size: 12px;
        }
        .cdp-field {
          flex: 1;
          min-width: 0;
          border-top: 1px solid #808080;
          border-left: 1px solid #808080;
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
          background: #fff;
          padding: 1px 4px;
          font-size: 12px;
          font-family: 'W95F', 'MS Sans Serif', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cdp-tag {
          border-top: 1px solid #808080;
          border-left: 1px solid #808080;
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
          background: #c0c0c0;
          padding: 1px 5px;
          font-size: 11px;
          flex-shrink: 0;
        }
        .cdp-slider {
          flex: 1;
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          background: #808080;
          border-top: 1px solid #808080;
          border-left: 1px solid #808080;
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
          outline: none;
          cursor: default;
          min-width: 0;
        }
        .cdp-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 16px;
          background: #c0c0c0;
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          border-right: 1px solid #808080;
          border-bottom: 1px solid #808080;
          cursor: default;
        }
        .cdp-btns {
          display: flex;
          gap: 3px;
          align-items: center;
        }
        .cdp-btn {
          background: #c0c0c0;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          border-right: 2px solid #808080;
          border-bottom: 2px solid #808080;
          outline: 1px solid #000;
          min-width: 32px;
          height: 26px;
          cursor: default;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
          flex-shrink: 0;
        }
        .cdp-btn:active, .cdp-btn.active {
          border-top: 2px solid #808080;
          border-left: 2px solid #808080;
          border-right: 2px solid #fff;
          border-bottom: 2px solid #fff;
          background: #b0b0b0;
        }
      `}</style>

      <div className="cdp-root">
        <img
          key={track.cover}
          src={track.cover}
          alt="cover"
          className="cdp-cover"
        />

        <div className="cdp-right">
          <div className="cdp-row">
            <span className="cdp-label">Artist:</span>
            <span className="cdp-field">{track.artist}</span>
            <span className="cdp-tag">D:</span>
          </div>

          <div className="cdp-row">
            <span className="cdp-label">Track:</span>
            <span className="cdp-field">{track.title}</span>
            <span className="cdp-tag">D:</span>
          </div>

          <div className="cdp-row">
            <span className="cdp-label" style={{ fontSize: 11 }}>Vol:</span>
            <input
              type="range"
              className="cdp-slider"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>

          <div className="cdp-btns">
            <button className="cdp-btn" onClick={handlePrev} title="Previous">
              <svg width="14" height="11" viewBox="0 0 14 11">
                <polygon points="7,0 1,5.5 7,11" fill="#000" />
                <polygon points="13,0 7,5.5 13,11" fill="#000" />
                <rect x="0" y="0" width="2" height="11" fill="#000" />
              </svg>
            </button>
            <button className="cdp-btn" onClick={handleNext} title="Next">
              <svg width="14" height="11" viewBox="0 0 14 11">
                <polygon points="1,0 7,5.5 1,11" fill="#000" />
                <polygon points="7,0 13,5.5 7,11" fill="#000" />
                <rect x="12" y="0" width="2" height="11" fill="#000" />
              </svg>
            </button>
            <button className={`cdp-btn${playing ? " active" : ""}`} onClick={handlePlay} title="Play">
              <svg width="11" height="11" viewBox="0 0 11 11">
                <polygon points="0,0 11,5.5 0,11" fill="#000" />
              </svg>
            </button>
            <button className={`cdp-btn${!playing && elapsed > 0 ? " active" : ""}`} onClick={handlePause} title="Pause">
              <svg width="11" height="11" viewBox="0 0 11 11">
                <rect x="0" y="0" width="4" height="11" fill="#000" />
                <rect x="7" y="0" width="4" height="11" fill="#000" />
              </svg>
            </button>
            <button className="cdp-btn" onClick={handleStop} title="Stop">
              <svg width="11" height="11" viewBox="0 0 11 11">
                <rect x="0" y="0" width="11" height="11" fill="#000" />
              </svg>
            </button>
            <button className="cdp-btn" onClick={handleStop} title="Eject" style={{ marginLeft: 2 }}>
              <svg width="13" height="11" viewBox="0 0 13 11">
                <polygon points="6.5,0 12,6 1,6" fill="#000" />
                <rect x="0" y="8" width="13" height="3" fill="#000" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}