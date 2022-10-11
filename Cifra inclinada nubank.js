'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'decodeString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER numberOfRows
 *  2. STRING encodedString
 */

function decodeString(numberOfRows, encodedString) {
    const columns = encodedString.length/numberOfRows;
    var decodingString = '';
    const GO_TO_THE_NEXT_COLUMN = 1;
    
    for(var i = 0; i < columns; i++){
        decodingString = decodingString + encodedString[i]

        for(var j = 1; j < numberOfRows; j++){
            const GET_NEXT_CHARACTER_POSITION = i+j*(columns+GO_TO_THE_NEXT_COLUMN);
            const newString = encodedString[GET_NEXT_CHARACTER_POSITION] ?? ''
            decodingString = decodingString + newString   
        }
    }
    const decodedString = decodingString.replaceAll(' ','').replaceAll('_',' ');
    return decodedString;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const numberOfRows = parseInt(readLine().trim(), 10);

    const encodedString = readLine();

    const result = decodeString(numberOfRows, encodedString);

    ws.write(result + '\n');

    ws.end();
}