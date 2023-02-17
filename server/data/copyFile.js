/* eslint-disable no-console */
const fs = require('fs');

async function copyFile(file) {
  try {
    const originalData = await fs.readFile(file);
    const dataSplit = originalData.toString().split('\n');
    // adjust to remove specific columns from data
    const headers = dataSplit[0].split(',');
    const removeLast = headers.slice(0, headers.length - 1).toString();
    await fs.writeFile('sample1.csv', removeLast);
    for (let i = 1; i < dataSplit.length; i++) {
      const id = dataSplit[i].split(',')[0];
      const name = dataSplit[i].split(',')[1];
      const price = dataSplit[i].split(',')[2];
      const newLine = `\n${id},${name},${price}`;
      await fs.writeFile('sample1.csv', newLine, { flag: 'a' });
    }
  } catch (error) {
    console.log(`unable to copy file: ${error.message}`);
  }
}

// async to leverage await keyword
async function editAndCopyFile() {
  try {
    // will split up the data and pass data along in chunks to the readStream variable
    const readStream = fs.createReadStream('related.csv');
    const writeStream = fs.createWriteStream('relatedCombined.csv');
    // event 'data' on the createReadStream that allows us to listen for when we receive the chunks
    readStream.on('data', (chunk) => {
      // break string into array of array, split on the new line
      const organized = chunk.toString().split('\n');

      const tempObject = {};

      let headers = organized[0].split(',')[1] + ',' + organized[0].split(',')[2] + '\n';
      writeStream.write(headers);

      for (let i = 1; i < organized.length; i++) {
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

      for (var key in tempObject) {
        const productId = key;
        const relatedProducts = tempObject[key];
        let newLine = productId + ',' + relatedProducts + '\n';
        writeStream.write(newLine);
      }
    });
  } catch (error) {
    console.log(`unable to copy file: ${error.message}`);
  }
}

// call relevant function on relevant file
// copyFile('sample.csv');
editAndCopyFile('sample.csv');

// async function editAndCopyFile(file) {
//   try {
//     // leveraging await to resolve promise
//     const originalData = await fs.readFile(file);
//     console.log('original ', originalData.toString());
//     const dataSplit = originalData.toString().split('\n');
//     const headers = dataSplit[0].split(',');
//     await fs.writeFile('sample1.csv', headers);
//     for (let i = 1; i < dataSplit.length; i++) {
//       const id = dataSplit[i].split(',')[0];
//       const name = dataSplit[i].split(',')[1];
//       const price = dataSplit[i].split(',')[2];
//       const newLine = `\n${id},${name},${price}`;
//       await fs.writeFile('sample1.csv', newLine, {flag: 'a'});
//     }
//   } catch (error) {
//     console.log(`unable to copy file: ${error.message}`);
//   }
// }
