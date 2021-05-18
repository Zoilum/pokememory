import { MemoryCardInterface } from "../../interfaces/memory";

const Front = ({
  name,
  cardImagePath,
  formattedName,
  frontTypeImageUrl,
  typeName,
}: MemoryCardInterface) => {
  return (
    <div className={"front"}>
      <img alt={`${name}`} src={frontTypeImageUrl} className="background" />
      <p className="name">{formattedName}</p>
      <div className={`image-wrapper ${typeName}`}>
        <img alt={`${name}`} src={cardImagePath} className="image" />
      </div>
    </div>
  );
};
export default Front;
