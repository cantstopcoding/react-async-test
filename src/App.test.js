import { render, screen, act, within } from "@testing-library/react";
// import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "./App";

// jest.mock("axios");

describe("App", () => {
  test("fetches pokemons from API and display them", async () => {
    const pokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    ];
    const promise = Promise.resolve({ data: { results: pokemons } });

    // axios.get.mockImplementationOnce(() => promise);

    fetch = jest.fn();

    fetch.mockImplementationOnce(() => promise);

    render(<App />);

    // const list = screen.getByRole("list", {
    //   name: /fruits/i,
    // });
    // const { getAllByRole } = within(list);
    // const items = getAllByRole("listitem");
    // expect(items.length).toBe(5);

    await userEvent.click(screen.getByRole("button"));

    await act(() => promise);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("fetches pokemons from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<App />);

    userEvent.click(screen.getByRole("button")); // await taken away

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  });
});
