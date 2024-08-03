import React, { useState } from 'react';

// Utility function to parse and calculate the result
const calculate = (input) => {
    if (!input) return 0;

    let delimiters = [',', '\n'];
    let numbers = input;

    // Handle custom delimiters
    if (input.startsWith("//")) {
        const delimiterEnd = input.indexOf('\n');
        const delimiterSection = input.substring(2, delimiterEnd);
        // Updated regular expression
        delimiters = delimiterSection.match(/\[(.*?)\]/g).map(d => d.slice(1, -1)); // Remove the square brackets
        numbers = input.substring(delimiterEnd + 1);
    }

    // Create a regex pattern for the delimiters
    const delimiterRegex = new RegExp(`[${delimiters.join('')}]`, 'g');
    const numberArray = numbers.split(delimiterRegex).map(num => parseInt(num, 10));

    // Check for negative numbers
    const negatives = numberArray.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new Error(`negatives not allowed: ${negatives.join(', ')}`);
    }

    // Filter out numbers greater than 1000
    return numberArray.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
};

const StringCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setInput(e.target.value);
    };

    // Handle calculation
    const handleCalculate = () => {
        try {
            const res = calculate(input);
            setResult(res);
            setError(null);
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <h1>String Calculator</h1>
            <textarea
                value={input}
                onChange={handleChange}
                placeholder="Enter numbers here..."
                rows="6"
                cols="50"
            />
            <br />
            <button onClick={handleCalculate}>Calculate</button>
            {result !== null && <div>Result: {result}</div>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        </div>
    );
};

export default StringCalculator;
