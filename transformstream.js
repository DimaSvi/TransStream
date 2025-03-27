const fs = require('fs');
const { Transform } = require('stream');

// Створюємо Transform стрім
class ReverseWordsTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const reversedText = chunk
            .toString()
            .split(/\s+/) // Розбиваємо на слова
            .map(word => word.split('').reverse().join('')) // Перевертаємо кожне слово
            .join(' '); // Збираємо назад

        this.push(reversedText); // Передаємо далі
        callback();
    }
}

// Файли
const inputFile = 'input.txt';  // Вхідний файл (створи його самостійно)
const outputFile = 'output.txt'; // Файл для запису

// Стріми
const readStream = fs.createReadStream(inputFile, 'utf8');
const writeStream = fs.createWriteStream(outputFile);
const transformStream = new ReverseWordsTransform();

// Направляємо дані через pipe()
readStream.pipe(transformStream).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('✅ Файл оброблено! Результат у output.txt');
});
