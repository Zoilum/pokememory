import { MemoryCardInterface } from "../../interfaces/memory";

const Front = ({
  name,
  cardImagePath,
  formattedName,
  typeName,
}: MemoryCardInterface) => {
  return (
    <div className={`front-face ${typeName ? typeName : ``}`}>
      <p className="name">{formattedName}</p>
      <div className="image-wrapper">
        <img alt={`${name}`} src={cardImagePath} className="image" />
      </div>
    </div>
  );
};
export default Front;
