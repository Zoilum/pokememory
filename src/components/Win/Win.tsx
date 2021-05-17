import "./Win.scss";
import VictoryTextImage from "./victory-text.png";
const Win = ({ restartGame }: { restartGame: Function }) => {
  return (
    <div className="win">
      <img src={VictoryTextImage} alt="pokemon-font" className="image" />
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
