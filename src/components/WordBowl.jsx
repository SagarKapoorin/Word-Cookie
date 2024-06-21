import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { setLevel, setScore, setWordMatched, setword } from "../state";
import { useWordChecker } from 'react-word-checker';
import WordResult from "./WordResult";
const generateCombinations = (Rletters, minLen = 3, maxLen = 8) => {
  console.log(Rletters);
  const results = new Set();

  const generate = (prefix, remaining) => {
    if (prefix.length >= minLen && prefix.length <= maxLen) {
      results.add(prefix);
    }
    if (prefix.length >= maxLen) {
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      generate(prefix + remaining[i], remaining.slice(0, i) + remaining.slice(i + 1));
    }
  };

  generate('', Rletters);
  return Array.from(results);
};

function WordBowl() {
  const [s, sets] = useState("");
  const [clickedButtons, setClickedButtons] = useState([]);
  const convertArrayToString = (arr) => {
    return arr.join('').toLowerCase();
  };
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [word, setWord] = useState('');
  const level1=useSelector((state) => state.current_level);
  const arr = useSelector((state) => state.levels[level1]);
  const  p=useSelector((state)=>state.levels);
  const dispatch = useDispatch();

  const { words, isLoading, wordExists } = useWordChecker("en");
  const { letters, no_of_words, word_sizes } = arr;
  const [b,setb]=useState(true);
  const matched = useSelector((state) => state.word_matched);
  const [arr1, setArr] = useState([]);
  const [validCombinations, setValidCombinations] = useState([]);

  const handleGenerate = async () => {
    const combinations = generateCombinations(convertArrayToString(p[level1].letters), 2, 8);
    const validCombs = [];
    const chunkSize = 10;

    const checkCombinationsBatch = async (batch) => {
      const promises = batch.map(combination => wordExists(combination));
      const results = await Promise.all(promises);
      results.forEach((isValid, index) => {
        if (isValid) {
          validCombs.push(batch[index]);
        }
      });
    };

    for (let i = 0; i < combinations.length; i += chunkSize) {
      const chunk = combinations.slice(i, i + chunkSize);
      await checkCombinationsBatch(chunk);

      if (validCombs.length >= 15) {
        break;
      }
    }
    setValidCombinations(validCombs);
  };

  const resetWordState = () => {
    setSelectedLetters([]);
    dispatch(setword(""));
    setClickedButtons([]);

    setWord('');
    setSelectedLetters([]);
    setSelectedIndices(new Set());
  };

  useEffect(() => {
    if (word === "") {
      resetWordState();
     
    }
   
  }, [word]);


  const handleCharClick = async (char, index) => {
    const wordFormed = selectedLetters.join('');

    setWord(wordFormed);
    setSelectedLetters([]);
    setSelectedIndices(new Set());
    if (clickedButtons.includes(index)) return;

    let exists = await wordExists(wordFormed);
    if (wordFormed === "") {
      exists = false;
    }
    if (arr1.some(a => a === wordFormed)) {
      exists = false;
    }

    dispatch(setWordMatched(exists));
    if (exists) {
      setSelectedLetters([]);
      dispatch(setword(""));
      setArr([...arr1, wordFormed]);
      if (arr1.length + 1 >= no_of_words) {
        setTimeout(() => {
          setArr([]);
          handleGenerate();
          dispatch(setScore());
          dispatch(setLevel());
       
          resetWordState();
        }, 3000);
      }
    } else {
      if (s.length + 1 < letters.length) {
        // setSelectedLetters(wordFormed);
      } else {
        resetWordState();
      }
      dispatch(setword(wordFormed));
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.dataset.letter && !selectedIndices.has(target.dataset.index)) {
      setSelectedLetters([target.dataset.letter]);
      setSelectedIndices(new Set([target.dataset.index]));
    }
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.dataset.letter && !selectedIndices.has(target.dataset.index)) {
      setSelectedLetters((prev) => [...prev, target.dataset.letter]);
      setSelectedIndices((prev) => new Set(prev).add(target.dataset.index));
    }
  };

  useEffect(() => {
    setWord(selectedLetters.join(''));
  }, [selectedLetters]);
  useEffect(()=>{
    setb(false);
  },[])
  useEffect(()=>{
    handleGenerate();
  },[b])
  useEffect(()=>{
    handleGenerate();
  },[level1])
  return (
    <Box>
      <h4>Words Needed to form: {no_of_words}</h4>
      <h4>Current Word: {word}</h4>
      <WordResult arr={arr1} />
      <Box className={`character-container`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleCharClick}>
        {letters.map((char, index) => (
          <div key={index} className={`letter letter-${index}`}>
            <button
              onClick={() => handleCharClick(char, index)}
              className={`button ${clickedButtons.includes(index) ? 'clicked' : ''}`}
              disabled={clickedButtons.includes(index)}
              data-letter={char}
              data-index={index}
              style={{
                backgroundColor: selectedIndices.has(index.toString()) ? '#add8e6' : '#f0f0f0',
                border: '2px solid #ccc',
                fontSize: '24px',
                width: '50px',
                height: '50px',
                userSelect: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              {char}
            </button>
          </div>
        ))}
      </Box>
      <div>
        <h2>Valid Combinations:</h2>
        <ul>
          {validCombinations.map((comb, index) => (
            <li key={index}>{comb}</li>
          ))}
        </ul>
      </div>
    </Box>
  );
}

export default WordBowl;
