import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Snowman from "./Snowman";

it("Will no longer show the letter buttons after six wrong guesses.", function() {

  const { container, debug } = render(<Snowman />);


  const bBtn = screen.getByText("b");
  fireEvent.click(bBtn);

  const cBtn = screen.getByText("c");
  fireEvent.click(cBtn);

  const dBtn = screen.getByText("d");
  fireEvent.click(dBtn);

  const fBtn = screen.getByText("f");
  fireEvent.click(fBtn);

  const gBtn = screen.getByText("g");
  fireEvent.click(gBtn);

  const hBtn = screen.getByText("h");
  fireEvent.click(hBtn);


  // Get the buttons by the className and see if they exist. They should not exist.
  expect(container.querySelector(".Snowman-button")).not.toBeInTheDocument();

  debug(container);
  //There should be a message saying "You lose"
  expect(container.querySelector(".Snowman-play-area")).toContainHTML("You lose");

  // Takes a snapshot to save what this test should look like.
  expect(container).toMatchSnapshot();
});

// it("Resets the game", function() {
//   const {container, debug} = render(<Snowman />)

//   const bBtn = screen.getByText("b");
//   fireEvent.click(bBtn);

//   const wrongGuesses = container.querySelector("p")

// });