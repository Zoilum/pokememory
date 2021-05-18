import { MemoryCardInterface, PokemonType } from "./interfaces/memory";

const preLoadImg = async (url: string) => {
  return new Promise((resolve, reject) => {
    const loadImg = new Image();
    loadImg.src = url;
    try {
      loadImg.onload = () => resolve(url);
      loadImg.onerror = (err) => reject(err);
    } catch (err) {}
  });
};

const preloadImgs = async (urls: string[]) => {
  return Promise.all(
    urls.map((image) => {
      try {
        return preLoadImg(image);
      } catch (err) {
        return "err";
      }
    })
  );
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getRandomInts = (qty: number, max: number) => {
  return Array.from(Array(qty)).map((x) => {
    return getRandomInt(max);
  });
};

const getPokemons = async () => {
  return fetch("https://pokeapi.co/api/v2/pokemon-species/?limit=0");
};

const getPokemonsCount = async () => {
  const rawResponse = await getPokemons();
  const parsedResponse = await rawResponse.json();
  return parsedResponse.count;
};

const getPokemonById = async (pokemonId: number) => {
  try {
    const rawResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    if (rawResponse.status >= 200 && rawResponse.status < 400) {
      return rawResponse.json();
    } else {
      throw new Error("No pokemon found");
    }
  } catch (err) {
    throw new Error("No pokemon found");
  }
};

const getRandomPokemonsInRange = async (max: number = 800) => {
  return Promise.all(
    getRandomInts(4, max).map(async (randomNum) => {
      try {
        const pokemon = await getPokemonById(randomNum);
        if (pokemon) {
          return pokemon;
        } else {
          throw new Error("No pokemon found");
        }
      } catch (err) {
        throw new Error("No pokemon found");
      }
    })
  );
};

const getPokemonImageUrl = (pokemonId = "") => {
  return `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`;
};

const getPokemonsImagesUrl = async (pokemons: MemoryCardInterface[]) => {
  return pokemons.map(({ species }) => {
    const splittedString = species?.url?.split("/");
    return getPokemonImageUrl(
      splittedString && splittedString[splittedString.length - 2]
    );
  });
};

const getFormattedName = (name: string) =>
  `${name.substr(0, 1).toUpperCase()}${name.substr(1)}`;

const getType = (types: PokemonType[] = []) => {
  return types[0].type?.name;
};

const duplicateCards = (pokemonsArr: MemoryCardInterface[]) => {
  return pokemonsArr.reduce((res: MemoryCardInterface[], current) => {
    return [...res, current, { ...current }];
  }, []);
};

const shuffleCards = (cards: MemoryCardInterface[]) => {
  return cards.sort((a, b) => 0.5 - Math.random());
};

const shouldCheckCards = (cards: MemoryCardInterface[]) => {
  return cards && cards.length > 1;
};

const checkMatchingCards = (
  cards: MemoryCardInterface[],
  card1Index: number,
  card2Index: number
) => {
  return cards.map((card: MemoryCardInterface) => {
    if (card1Index === card.index || card2Index === card.index) {
      card.isSelected = false;
    }
    return card;
  });
};

const getPokemonFrontTypeImageUrl = async (type: string) => {
  let module;
  try {
    module = await import(`./images/frontTypes/${type}.png`);
  } catch (err) {
    module = await import("./images/frontTypes/normal.png");
  }
  return module.default;
};

const getPokemonsFrontTypeImage = (pokemons: MemoryCardInterface[]) => {
  return Promise.all(
    pokemons.map((pokemon: MemoryCardInterface) => {
      const type = getType(pokemon.types);
      return getPokemonFrontTypeImageUrl(type);
    })
  );
};

export {
  preLoadImg,
  preloadImgs,
  getPokemonsCount,
  getRandomPokemonsInRange,
  getPokemonsImagesUrl,
  getFormattedName,
  getType,
  duplicateCards,
  shuffleCards,
  shouldCheckCards,
  checkMatchingCards,
  getPokemonsFrontTypeImage,
};
