const fs = require('fs');

// async to leverage await keyword
async function editAndCopyFile() {
  try {
    // will split up the data and pass data along in chunks to the readStream variable
    const readStream = fs.createReadStream('related.csv');
    const writeStream = fs.createWriteStream('relatedCombined.csv');
    // event 'data' on the createReadStream that allows us to listen for when we receive the chunks
    readStream.on('data', (chunk) => {
      // break string into array of arrays, split on the new line
      const organized = chunk.toString().split('\n');

      const tempObject = {};

      // need to update headers structure based on specific file being copied
      const headers = `${organized[0].split(',')[1]},${organized[0].split(',')[2]}\n`;
      writeStream.write(headers);

      for (let i = 1; i < organized.length; i += 1) {
        const sub = organized[i].split(',');
        const productNumber = parseInt(sub[1], 10);
        let relatedNumber = parseInt(sub[2], 10);
        if (tempObject[productNumber] !== undefined) {
          relatedNumber = relatedNumber.toString();
          if (tempObject[productNumber].indexOf(relatedNumber) === -1) {
            tempObject[productNumber] += ',';
            tempObject[productNumber] += relatedNumber;
          }
        } else {
          relatedNumber = relatedNumber.toString();
          tempObject[productNumber] = relatedNumber;
        }
      }

      for (const key in tempObject) {
        const productId = key;
        const relatedProducts = tempObject[key];
        const newLine = `${productId},${relatedProducts}\n`;
        writeStream.write(newLine);
      }
    });
  } catch (error) {
    console.log(`unable to copy file: ${error.message}`);
  }
}

// edit argument with whichever file you need to copy
editAndCopyFile('sample.csv');
