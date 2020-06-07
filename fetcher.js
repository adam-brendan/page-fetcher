const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = process.argv[2];
const path = process.argv[3];

const writeFile = (body) => {
    fs.writeFile(path, body, (err) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${body.length} bytes to ${path}.`);
    });
}

request(url, (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode); 
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
        writeFile(body);
    } else {
        rl.question(`Are you sure you want to overwrite the file ${path}? Y/N   `, (response) => {
            if (response === "Y") {
                writeFile(body);
                rl.close();
            } else {
                rl.close();
            }
        })
    }
  });
  
});