import { MemoryCardInterface } from "../../interfaces/memory";

const Front = ({
  name,
  cardImagePath,
  formattedName,
  typeName,
  frontTypeImageUrl,
}: MemoryCardInterface) => {
  return (
    <div className={`front-face ${typeName ? typeName : ``}`}>
      <img alt={`${name}`} src={frontTypeImageUrl} className="background" />
      <p className="name">{formattedName}</p>
      <div className="image-wrapper">
        <img alt={`${name}`} src={cardImagePath} className="image" />
      </div>
    </div>
  );
};
export default Front;
