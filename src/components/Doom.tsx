import { useState } from "react";

const DOOM_PLAYER_URL = "/doom/index.html";

function Doom() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="doom-player">
      <iframe
        title="DOOM browser game"
        src={DOOM_PLAYER_URL}
        allow="autoplay; fullscreen; gamepad; pointer-lock"
        allowFullScreen
        scrolling="no"
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="pixel-loading-screen" role="progressbar" aria-label="Loading DOOM">
          <div className="pixel-loading-bar"><div className="pixel-loading-fill" /></div>
        </div>
      )}
    </div>
  );
}

export default Doom;
