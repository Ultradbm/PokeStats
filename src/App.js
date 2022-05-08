/** @format */

import "./App.css";
import { useEffect, useState } from "react";

import { Pokemon } from "./Components/Pokemon";
import { PokemonList } from "./Components/PokemonList";

function App() {
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const responseJSON = await response.json();
      console.log(responseJSON.results);
      setPokemonData(responseJSON.results);
    };
    fetchItems();
  }, []);

  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <div className="title">PokeStats</div>
      <input
        className="search-bar"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      <PokemonList pokemonData={pokemonData} searchTerm={search} />
    </div>
  );
}

export default App;
