const fs = require('fs').promises;

async function copyFile(file) {
  try {
    const originalData = await fs.readFile(file);
    const dataSplit = originalData.toString().split('\n');
    // adjust if you need to remove a column from original csv file
    const headers = dataSplit[0].split(',');
    const removeLast = headers.slice(0, headers.length - 1).toString();
    await fs.writeFile('newPhotos.csv', removeLast);
    for (let i = 1; i < dataSplit.length; i++) {
      const id = dataSplit[i].split(',')[0];
      const name = dataSplit[i].split(',')[1];
      const price = dataSplit[i].split(',')[2];
      const newLine = `\n${id},${name},${price}`;
      await fs.writeFile('newPhotos.csv', newLine, {flag: 'a'});
    }
  } catch (error) {
    console.log(`unable to copy file: ${error.message}`);
  }
}

// call function on relevant file to copy
copyFile('photos.csv');
