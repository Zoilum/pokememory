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
      <div className={isSelected ? "" : "is-hidden"}>
        <Front
          name={name}
          cardImagePath={cardImagePath}
          formattedName={formattedName}
          typeName={typeName}
          frontTypeImageUrl={frontTypeImageUrl}
        ></Front>
      </div>
      <img
        alt={`${name}`}
        src={backCoverImage}
        className={isSelected ? "image back-face is-hidden" : "image back-face"}
      />
    </li>
  );
};

export default MemoryCard;
