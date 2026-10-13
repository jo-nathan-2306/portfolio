const DOOM_PLAYER_URL = "/doom/index.html";

function Doom() {
  return (
    <div className="doom-player">
      <iframe
        title="DOOM browser game"
        src={DOOM_PLAYER_URL}
        allow="autoplay; fullscreen; gamepad; pointer-lock"
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
}

export default Doom;
