import React from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

function WordResult({ arr }) {
    const dispatch=useDispatch();
    return (
        <Box className="found-words-board">
            <h3>Found Words</h3>
            <ul>
                {arr.length>0 && arr.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
                
            </ul>
        </Box>
    );
}

export default WordResult;
