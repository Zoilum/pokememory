export interface Pokemon {}

export interface MemoryCardInterface {
  index?: number;
  isSelected?: boolean;
  name: string;
  handleCardClick?: Function;
  cardImagePath: string;
  formattedName: string;
  species?: {
    url?: string;
  };
  types?: PokemonType[];
  typeName?: string;
  imageUrl?: string | undefined;
  backCoverImage?: string;
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}
