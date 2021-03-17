---
title: 用node写一个获取bing每日图片的小工具
date: 2020-07-30
updated: 2020-07-31
tags: [有意思的代码]
categories: [有意思的代码]
---



## 摘要&目录
**摘要：**办公室这么多块屏幕，闲置的屏幕总是显示一张桌面背景太枯燥了，我们来写一个获取bing每日图片的小工具
> 涉及到的工具和知识点：
    - node
    - 正则表示式
    - mac `launchctl` 语法规则 


**目录：**
[摘要&目录](#摘要目录)
[准备事项](#准备事项)
[bing每日图片代码正则解析](#bing每日图片代码正则解析)
[node端代码](#node端代码)
<!-- [mac `launchctl` 定时任务](#mac`launchctl`定时任务) -->
[完整代码](#完整代码)

## 准备事项
- 找到[Bing每日图片](https://bing.ioliu.cn/?p=1)地址: `https://bing.ioliu.cn/?p=1`，网站是[这位大佬写](https://github.com/xCss/bing)的
- 准备一个node环境
- 找一台Mac Book Pro 🤣

## bing每日图片代码正则解析
打开[Bing每日图片](https://bing.ioliu.cn/?p=1)网页后，打开控制台，我们看到第一个请求包含了整个网页的所有图片数据，看起来图片列表并不是通过xhr请求获取的，目测是服务端渲染？我们把第一个请求的`Response`直接拷贝下来，格式化后会看到小尺寸的图片地址：
`http://h2.ioliu.cn/bing/WCDBabyElephant_ZH-CN7844400740_640x480.jpg?imageslim`
怎么用正则匹配呢，推荐一个学习正则表达式的网站`https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md`，讲解非常清晰，可以在线联系。
我们直接看一个已经写好的[例子](https://regex101.com/r/Dzf9Aa/138)，可以看到匹配出了12个图片

## node端代码
首先我们根据链接`https://bing.ioliu.cn/?p=1`获取页面列表的代码
```js
    const fs = require('fs');
    const axios = require('axios');
    const request = require('request');
    const basePicPath = '/Users/yinxiangzheng/Pictures/BingDayPic/'; // 存放图片的地方
    const urlList = []
    const pageSize = 10
    async function downByPage(page = 1) {
        try {
            const res = await axios.get(`https://bing.ioliu.cn/?p=${page}`)
        } catch (error) {
            console.log(error);
        }
    }
```

根据获取的代码，使用正则表达式：`/data-progressive="(\S*)"/gm` 解析图片url
```js
    // 接上面的代码
    const regex = /data-progressive="(\S*)"/gm;
    const str = res.data;
    let m;
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            // match：  data-progressive="http://h2.ioliu.cn/bing/BenasqueValley_ZH-CN7931589735_640x480.jpg?imageslim"
            if (!match || groupIndex !== 1) {
                return
            }
            const url = match.replace('_640x480.jpg', '_1920x1080.jpg');
            if (urlList.indexOf(url) !== -1) {
                return
            }
            urlList.push(url)
            console.log('Downloaded...', url);
        });
    }
```

保存图片到本地
```js
    // 接上面的代码
    let fileName = `${basePicPath}${randomNum(10, 1000000000)}.jpg`
    request(url).pipe(fs.createWriteStream(fileName));
```

## 完整代码
```js
    /*
    * @Author: Yin Xiang Zheng
    * @LastEditors: Yin Xiang Zheng
    * @LastEditTime: 2020-12-29 17:37:40
    */
    const fs = require('fs');
    const axios = require('axios');
    const request = require('request');
    const basePicPath = '/Users/yinxiangzheng/Pictures/BingDayPic/'; // 存放图片的地方
    const urlList = []
    const pageSize = 10


    async function downByPage(page = 1) {
        try {
            const res = await axios.get(`https://bing.ioliu.cn/?p=${page}`)
            const regex = /data-progressive="(\S*)"/gm;
            const str = res.data;
            let m;
            while ((m = regex.exec(str)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                m.forEach((match, groupIndex) => {
                    // match：  data-progressive="http://h2.ioliu.cn/bing/BenasqueValley_ZH-CN7931589735_640x480.jpg?imageslim"
                    if (!match || groupIndex !== 1) {
                        return
                    }
                    const url = match.replace('_640x480.jpg', '_1920x1080.jpg');
                    if (urlList.indexOf(url) !== -1) {
                        return
                    }
                    urlList.push(url)
                    console.log('Downloaded...', url);
                    let fileName = `${basePicPath}${randomNum(10, 1000000000)}.jpg`
                    request(url).pipe(fs.createWriteStream(fileName));
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function delDir(path) {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    delDir(curPath); //递归删除文件夹
                } else {
                    fs.unlinkSync(curPath); //删除文件
                }
            });
            fs.rmdirSync(path);
        }
        fs.mkdirSync(basePicPath)
    }

    function randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }



    async function start() {
        delDir(basePicPath) // 清除文图片列表，只保留最新的图片
        for (let i = 1; i < pageSize; i++) {
            await downByPage(i)
        }
    }

    start()
```