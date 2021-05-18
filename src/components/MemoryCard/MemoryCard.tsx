import { MemoryCardInterface } from "../../interfaces/memory";
import "./Card.scss";
import Front from "./Front";
const MemoryCard = ({
  backCoverImage,
  isSelected,
  name,
  handleCardClick = () => {},
  cardImagePath,
  formattedName,
  typeName,
  frontTypeImageUrl,
}: MemoryCardInterface) => {
  return (
    <li
      className={`card${isSelected ? ` is-selected` : ``}`}
      onClick={() => handleCardClick()}
    >
      <div
        className={
          isSelected ? `front-face-wrapper` : `is-hidden front-face-wrapper`
        }
      >
        <Front
          name={name}
          cardImagePath={cardImagePath}
          formattedName={formattedName}
          frontTypeImageUrl={frontTypeImageUrl}
          typeName={typeName}
        ></Front>
      </div>
      <img
        alt={`${name}`}
        src={backCoverImage}
        className={
          isSelected
            ? "image back-face-wrapper is-hidden"
            : "image back-face-wrapper"
        }
      />
    </li>
  );
};

export default MemoryCard;
