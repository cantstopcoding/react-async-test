import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("axios");

describe("App", () => {
  test("renders learn react link", () => {
    render(<App />);
  });

  test("fetches pokemons from API and display them", async () => {
    const pokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    ];
    const promise = Promise.resolve({ data: { results: pokemons } });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await userEvent.click(screen.getByRole("button"));

    await act(() => promise);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<App />);

    await userEvent.click(screen.getByRole("button"));

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  });
});
