/** @format */

import { Pokemon } from "./Pokemon";

export const PokemonList = ({ pokemonData, searchTerm }) => {
  return (
    <div className="grid-container">
      {pokemonData &&
        pokemonData.map((pokemon, index) => {
          return (
            <div className="pokemon-outer" key={index}>
              <Pokemon pokemonData={pokemon} searchTerm={searchTerm} />
            </div>
          );
        })}
    </div>
  );
};
