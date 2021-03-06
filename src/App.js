import React from "react";
import axios from "axios";

const URL = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
  const [pokemons, setPokemons] = React.useState([]);
  const [error, setError] = React.useState(null);

  async function handleFetch(event) {
    let result;

    try {
      result = await axios.get(`${URL}`);

      setPokemons(result.data.results);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <div>
        <button type="button" onClick={handleFetch}>
          Fetch Pokemons
        </button>

        {error && <span>Something went wrong ...</span>}
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
