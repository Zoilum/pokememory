import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import { MemoryCardInterface } from "./interfaces/memory";
import MemoryCard from "./components/MemoryCard/MemoryCard";
import Spinner from "./components/Spinner/Spinner";
import Win from "./components/Win/Win";
import Pyro from "./components/Pyro/Pyro";
import backCoverImage from "./images/backCover.png";
import victoryTextImage from "./images/victory-text.png";
import {
  getPokemonsCount,
  preloadImgs,
  getRandomPokemonsInRange,
  getPokemonsImagesUrl,
  getFormattedName,
  getType,
  duplicateCards,
  shuffleCards,
  shouldCheckCards,
  checkMatchingCards,
  getPokemonsFrontTypeImage,
} from "./utils";

function App() {
  const [cards, setCards] = useState<MemoryCardInterface[]>([]);
  const [selectedCards, setSelectedCards] = useState<MemoryCardInterface[]>([]);
  const [hasPlayerWon, setHasPlayerWon] = useState<Boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [spinnerStatus, setSpinnerStatus] = useState<string>("fetching");
  const [shouldShowSpinner, setShouldShowSpinner] = useState<boolean>(true);

  const startGame = useCallback(async (cards: MemoryCardInterface[] = []) => {
    setCards(shuffleCards(duplicateCards(cards)));
  }, []);

  const waitAndSetSpinner = useCallback(
    async (isVisible: boolean, spinnerStatus: string, delay: number = 0) => {
      if (delay) {
        setSpinnerStatus(spinnerStatus);
        return new Promise((resolve) =>
          setTimeout(() => resolve(setShouldShowSpinner(isVisible)), 1000)
        );
      } else {
        return setSpinner(isVisible, spinnerStatus);
      }
    },
    []
  );

  const initGame = useCallback(async () => {
    setSpinner(true, "fetching");
    const pokemonsCount = await getPokemonsCount();
    if (pokemonsCount) {
      try {
        const pokemons = await getRandomPokemonsInRange(pokemonsCount);
        const pokemonsImageUrls = await getPokemonsImagesUrl(pokemons);
        const pokemonsFrontTypesImageUrls = await getPokemonsFrontTypeImage(
          pokemons
        );
        try {
          await preloadImgs([
            ...pokemonsImageUrls,
            ...pokemonsFrontTypesImageUrls,
            backCoverImage,
            victoryTextImage,
          ]);
          await waitAndSetSpinner(false, "success", 1000);
          const mappedCards = mapCards(
            pokemons,
            pokemonsImageUrls,
            pokemonsFrontTypesImageUrls
          );
          startGame(mappedCards);
        } catch (err) {
          handleLoadingError();
        }
      } catch {
        handleLoadingError();
      }
    }
    return [];
  }, [startGame, waitAndSetSpinner]);

  const resetGame = useCallback(() => {
    setCards([]);
    setSelectedCards([]);
    setCount(0);
    setHasPlayerWon(false);
  }, []);

  const foldCardAndUpdate = useCallback(
    (card: MemoryCardInterface, index: number) => {
      card.isSelected = false;
      setCards([...cards.slice(0, index), card, ...cards.slice(index + 1)]);
      setSelectedCards([]);
      setCount(0);
    },
    [cards, setCards]
  );

  const endGame = useCallback(async () => {
    const delayInMs = 190;
    setTimeout(async () => {
      await Promise.all(
        cards.map((card: MemoryCardInterface, index: number) => {
          return new Promise((resolve) =>
            setTimeout(
              () => resolve(foldCardAndUpdate(card, index)),
              delayInMs * index
            )
          );
        })
      );
      setTimeout(() => {
        setHasPlayerWon(true);
      }, delayInMs);
    }, 500);
  }, [cards, foldCardAndUpdate]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (shouldCheckCards(selectedCards)) {
      const [card1, card2]: MemoryCardInterface[] = selectedCards;
      const shouldIncrementCount: boolean = card1.index === card2.index;

      if (!shouldIncrementCount) {
        setTimeout(() => {
          const newCards = checkMatchingCards(
            cards,
            card1.index!,
            card2.index!
          );
          setSelectedCards([]);
          setCards(newCards);
        }, 1000);

        return;
      }
      setSelectedCards([]);
      setCount(count + 1);
    } else if (count === 4 && !hasPlayerWon) {
      endGame();
    }
  }, [cards, count, selectedCards, hasPlayerWon, endGame]);

  const handleCardClick = (clickedIndex: number) => {
    if (selectedCards.length === 2 || hasPlayerWon) {
      return;
    }
    const newCards = cards.map((card: MemoryCardInterface, index: number) => {
      if (index === clickedIndex) {
        if (card.isSelected) {
          return card;
        }
        card.isSelected = !card.isSelected;
        setSelectedCards([...selectedCards, card]);
      }
      return card;
    });
    setCards(newCards);
  };

  const mapCards = (
    pokemons: MemoryCardInterface[],
    pokemonsImages: string[],
    pokemonsFrontTypesImages: string[]
  ) => {
    return pokemons.map((pokemon, index) => {
      pokemon.index = index;
      pokemon.isSelected = false;
      pokemon.imageUrl = pokemonsImages[index];
      pokemon.frontTypeImageUrl = pokemonsFrontTypesImages[index];
      return pokemon;
    });
  };

  const restartGame = () => {
    resetGame();
    initGame();
  };

  const handleLoadingError = () => {
    setSpinnerStatus("failure");
  };

  const setSpinner = (isVisible: boolean, spinnerStatus: string) => {
    setShouldShowSpinner(isVisible);
    setSpinnerStatus(spinnerStatus);
  };

  return shouldShowSpinner ? (
    <div className="spinner-wrapper">
      {spinnerStatus === "failure" ? (
        <h1 className="text-center">
          SOMETHING WENT WRONG, PLEASE REFRESH THE PAGE
        </h1>
      ) : (
        ""
      )}
      <div>
        <Spinner loadingStatus={spinnerStatus}></Spinner>
      </div>
    </div>
  ) : (
    <div className="memory">
      <div className={hasPlayerWon ? "" : "is-hidden"}>
        <Pyro></Pyro>
        <Win
          restartGame={restartGame}
          victoryImageText={victoryTextImage}
        ></Win>
      </div>
      <ul className="board">
        {cards.map(
          ({ isSelected, name, imageUrl, types, frontTypeImageUrl }, index) => {
            return (
              <MemoryCard
                key={index}
                index={index}
                isSelected={isSelected}
                name={name}
                handleCardClick={() => handleCardClick(index)}
                cardImagePath={imageUrl!}
                formattedName={getFormattedName(name)}
                typeName={getType(types)}
                backCoverImage={backCoverImage}
                frontTypeImageUrl={frontTypeImageUrl}
              ></MemoryCard>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default App;
