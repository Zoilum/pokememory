import { MemoryCardInterface } from "../../interfaces/memory";
import Front from "./Front";
const MemoryCard = ({
  backCoverImage,
  isSelected,
  name,
  handleCardClick = () => {},
  cardImagePath,
  formattedName,
  typeName,
}: MemoryCardInterface) => {
  return (
    <li
      className={`card${isSelected ? ` is-selected` : ``}`}
      onClick={() => handleCardClick()}
    >
      {isSelected ? (
        <Front
          name={name}
          cardImagePath={cardImagePath}
          formattedName={formattedName}
          typeName={typeName}
        ></Front>
      ) : (
        <img alt={`${name}`} src={backCoverImage} className="image back-face" />
      )}
    </li>
  );
};

export default MemoryCard;
