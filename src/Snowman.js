import React, { useState } from "react";

import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";
import {randomWord, ENGLISH_WORDS} from './words.js'


/** Snowman game: plays hangman-style game with a melting snowman.
 *
 * Props:
 * - maxWrong: how many wrong moves is a player allowed?
 * - images: array of images for wrong guess
 * - words: array of words to pick answer from
 *
 * State:
 * - nWrong: # wrong guesses so far
 * - guessed: set of guessed letters (good and bad) so far
 * - answer: selected secret word*
 */

function Snowman(props) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const { maxWrong, images, words } = props;

  const [nWrong, setNWrong] = useState(0);
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState(randomWord(words));

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  function guessedWord() {
    return answer
        .split("")
        .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  function handleGuess(evt) {
    let ltr = evt.target.value;

    setGuessed(g => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    setNWrong(n => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button
            key={ltr}
            value={ltr}
            onClick={handleGuess}
            disabled={guessed.has(ltr)}
            className="Snowman-button"
        >
          {ltr}
        </button>
    ));
  }

  /** This should pick a new random word and reset the guessed list 
   * and number of wrong guesses. */

  function handleRestart(){
    setNWrong(0)
    setGuessed(new Set())
    setAnswer(randomWord(words))
  }
  
  const playArea = nWrong >= maxWrong ? "You lose" : generateButtons()
  /** render: render game */
  return (
      <div className="Snowman">
        <img src={(images)[nWrong]} alt={nWrong} />
        <p className="Snowman-wrong-guess-no">Number wrong: {nWrong}</p>
        <p className="Snowman-word">{guessedWord()}</p>
        <p className="Snowman-play-area">{playArea}</p>
        <button className="Snowman-restart-btn" onClick={handleRestart}>Restart Game</button>
      </div>
  );
}

// if the nWrong is >= 6 we will show the string "You lose"

Snowman.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6],
  words: ["apple"],
};


export default Snowman;
