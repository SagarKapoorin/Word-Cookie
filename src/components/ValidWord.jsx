import React, { useState } from 'react';
import { useWordChecker } from 'react-word-checker';

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

const CombinationGenerator = () => {
  const [Rletters, setRletters] = useState('');
  const [validCombinations, setValidCombinations] = useState([]);
  const { wordExists } = useWordChecker("en");

  const handleGenerate = async () => {
    const combinations = generateCombinations('son', 3, 8); 
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

  return (
    <div>
      <h1>Combination Generator</h1>
      <input
        type="text"
        value={Rletters}
        onChange={(e) => setRletters(e.target.value)}
        placeholder="Enter Rletters"
      />
      <button onClick={handleGenerate}>Generate Combinations</button>
      <h2>Valid Combinations:</h2>
      <ul>
        {validCombinations.map((comb, index) => (
          <li key={index}>{comb}</li>
        ))}
      </ul>
    </div>
  );
};

export default CombinationGenerator;
