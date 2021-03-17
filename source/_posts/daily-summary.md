---
title: 日常总结
date: 2020-07-23
tags: [JS常用工具函数]
---
总结了一些在工作中常用js工具函数
> 更新：函数越来越多，直接将其打包放在GitHub中，日后使用时直接安装npm包
> #### npm地址
> ```js
>    npm install js-tool-function
> ```



## 开始



#### 去重插入
``` javascript
pushIfNotExist = function(array, elem) {
  if (array.indexOf(elem) == -1) {
    array.push(elem);
  }
  return array;
}
```



#### 去重合并数组
``` javascript
pushApply = function(a, b=[]) {
  a.forEach(function(value) {
    pushIfNotExist(b, value);
  });
}
```

#### 获取ArrayOfObject 中的valu
``` javascript
getFields = function (arrayOfObject, key) {
    let output = [];
    for (let i = 0; i < arrayOfObject.length; ++i)
        output.push(arrayOfObject[i][key]);
    return output;
}
```


#### 美化日期间隔
``` js
timeDifference = function(previous) {
    const current = Date.now();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return '刚刚';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' 分钟前';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' 小时前';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' 天前';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' 月前';
    } else {
        return '一年前';
    }
}
```


#### 编译阿里云OSS文件URL
> 我不知道为什么阿里底层存储URL的逻辑会是这样，但是如果文件名中带有复杂字符串，浏览器默认的编译结果和阿里OSS编译的结果不一样，导致无法打开文件，实际上文件确实已经存储在OSS中了
``` js
getAliOSSUrl = function(url) {
    return encodeURIComponent(url)
        .replace(/%2F/g, '/')
        .replace(/\+/g, '%2B')
        .replace('%3A', ':')
},
```


#### 获取字符串的HashCode
> 使用场景：有十个长度的颜色的数组，colorArr = [#000, #fff, ...]，数据库中有一百个title，让每个title都有属于自己的颜色： ***colorArr[getHashCode(title) % colorArr.length]***
``` js
getHashCode = function(str, caseSensitive) {
    if (!caseSensitive) {
        str = str.toLowerCase();
    }
    let hash = 1315423911, i, ch;
    for (i = str.length - 1; i >= 0; i--) {
        ch = str.charCodeAt(i);
        hash ^= ((hash << 5) + ch + (hash >> 2));
    }
    return (hash & 0x7FFFFFFF);
},
```


#### 数组判断是否包含
``` javascript
hasElement = function(array, elem) {
  return isNonEmptyArray(array) && array.indexOf(elem) != -1;
}
```

#### 判断是否为IOS系统
``` javascript
isIOS = function() {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
```


#### 判断是否为Android系统
``` javascript
isAndroid = function() {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}
```


#### 一个简单的debounce函数，用于触底加载
``` javascript
debounce = function(func, wait, immediate) {
  let timeout
  return function(e) {
    let context = e
    let later = function() {
      timeout = null
      if (!immediate) {
        func.apply(context)
      }
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (immediate && !timeout) {
      func.apply(context)
    }
  }
}
```


#### 简单的模版渲染函数
``` javascript
// "Hello, {name}, are you feeling {adjective}?".formatUnicorn({name:"Gabriel", adjective: "OK"});
String.prototype.formatUnicorn = String.prototype.formatUnicorn || function () {
  let str = this.toString();
  if (arguments.length) {
    let t = typeof arguments[0];
    let key;
    let args = ("string" === t || "number" === t) ? Array.prototype.slice.call(arguments) : arguments[0];
    for (key in args) {
      str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
    }
  }
  return str;
};
```


#### 数组转对象
``` js
array2object = function(array = [], keys = {}) {
  let res = {}
  for (let i = 0; i < array.length; i++) {
    res[keys[i]] = true;
  }
  return res;
}
```