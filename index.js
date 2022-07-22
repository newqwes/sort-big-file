const fs = require('fs');

const { customSort } = require('./customSort');

const WORD_COUNT = 10000;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const getRandomWordSize = () => Math.round(Math.random() * 10 + 2);

const getRandomLetter = () => ALPHABET[Math.round(Math.random() * (ALPHABET.length - 1))];

const generateFileWithRandomWords = async () => {
  const writeStream = fs.createWriteStream('randomWords.csv');

  for (let i = 0; i <= WORD_COUNT; i++) {
    let word = '';

    for (let y = 0; y <= getRandomWordSize(); y++) {
      word += getRandomLetter();
    }

    const overWatermark = writeStream.write(i === WORD_COUNT ? word : `${word}, `);

    if (!overWatermark) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
  }

  writeStream.end();
};

const GENERATE_NEW_WORDS = false;

if (GENERATE_NEW_WORDS) {
  generateFileWithRandomWords();
} else {
  customSort();
}
