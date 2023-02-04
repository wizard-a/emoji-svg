const fs = require('fs');
const request = require("request");
const path = require('path');

const { readFile, writeFile, downloadHttpFile } = require('./util')

// emoji 路径
const emojiPath = path.join(__dirname, '../assets/emoji.json');
// notion 路径
const emojiSvgBase = 'https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter'; // 1f604.svg

// svg图片下载文件夹
const downloadFolder = path.join(__dirname, 'images');


// 
const handleUnicodeId = (id) => {
  return id.split(' ').map(item => {
    return item.substring(1, item.length);
  }).join('-')
}


// 获取文件并下载
const getEmojiSvgFile = async (id) => {
  const fileName = id + '.svg';
  const webUrl = `${emojiSvgBase}/${fileName}`;
  const exist = fs.existsSync(downloadFolder);
  if (!exist) {
    fs.mkdirSync(downloadFolder);
  }
  return await downloadHttpFile(webUrl, downloadFolder);
}

// 从notion抓取所有的图片
const grabImages = async () => {
  const data = await readFile(emojiPath)
  const emojiJson = JSON.parse(data.toString());
  for (const first of emojiJson) {
    for (const second of first.children) {
      const id = handleUnicodeId(second.id);
      await getEmojiSvgFile(id)
    }
  }

}

// 开始抓取
grabImages();