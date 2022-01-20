import { render, screen, act } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import App from "./App";


describe("App", () => {
  test("fetches pokemons from API and display them", async () => {
    const pokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    ];
    const promise = Promise.resolve({ data: { results: pokemons } });

    // mockimplementationonce of fetch API to return a promise

    render(<App />);
    global.fetch = jest.fn(() => promise);

    userEvent.click(screen.getByRole("button"));
    await act(() => promise);
    // const { getAllByRole } = within(list);
    // const items = getAllByRole("listitems");

    const list =  screen.getByRole("list");
    screen.debug()
    expect(list).toBeInTheDocument();
    screen.debug()
    expect(screen.getByRole("list")).toHaveLength(2);
  });

  test("fetches pokemons from an API and fails", async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<App />);

    userEvent.click(screen.getByRole("button")); // await taken away

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
      global.fetch.mockClear()

  });
});
