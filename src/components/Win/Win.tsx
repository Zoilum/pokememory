import "./Win.scss";

const Win = ({
  restartGame,
  victoryImageText,
}: {
  restartGame: Function;
  victoryImageText: string;
}) => {
  return (
    <div className="win">
      <img src={victoryImageText} alt="pokemon-font" className="image" />
      <button onClick={() => restartGame()} className="button">
        RESTART GAME
      </button>
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </div>
  );
};
export default Win;
