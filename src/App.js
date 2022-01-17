import React from "react";
import axios from "axios";

const URL = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
  const [pokemons, setPokemons] = React.useState([]);

  async function handleFetch(event) {
    let result;

    result = await axios.get(`${URL}`);

    setPokemons(result.data.results);
  }

  return (
    <>
      <div>
        <button type="button" onClick={handleFetch}>
          Fetch Pokemons
        </button>

        <ul>
          {pokemons.map((p, k) => (
            <li key={k + 1}>
              <a href={p.url}>{p.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
