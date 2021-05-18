# Pokèmemory

A simple application that automatically fetches 4 random pokemons, and generates a playable "Memory" game.

## Demo

You can try the Demo here 👉 https://pokememory.vercel.app/

## Technologies

This project was built using Create React App and Typescript.
No other external libraries were used.

## Next Steps

- **Write Unit Tests**:
  - Develop mocks in App.test.tsx
- **Refactor style**:
  - Optimize css using its cascade system, find common layouts/stylings.
  - Extend use of css variables.
  - Use mixin for shared layouts/stylings.
- **Refactor TS**:
  - Make code more "composable", using the functional approach where possible
- **Unify card's Front-Face template**:
  - Create one "Pokémon's-type-based dynamic-colored" container, instead of fetching external images
- **Display Pokémon's stats**:
  - Power
  - Abilities
  - ecc.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
