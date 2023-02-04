const fs = require('fs');
const request = require("request");
const path = require('path');

// 读文件
const readFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(data);
    })

  })
}

// 写文件
const writeFile = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, { flag: 'w' }, (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(true);
    })
  })
}

/**
* 获取网络文件到本地
* @param {*} webUrl 
* @param {*} path 
*/
const downloadHttpFile = async (webUrl, folderPath) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(webUrl);
    let stream = fs.createWriteStream(path.join(folderPath, fileName));
    request(webUrl).pipe(stream).on("close", function (err) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(true)
      console.log("文件[" + fileName + "]下载完毕");
    });

  })
}

module.exports = {
  readFile,
  writeFile,
  downloadHttpFile
}