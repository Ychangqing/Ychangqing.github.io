---
title: 二叉树
date: 2020-07-23
tags: [JS常用工具函数]
---

#### 截取数组 splice slice
``` javascript
// splice
var a = [1,2,3,4,5];  //定义数组
var b = a.splice(2);  //从第三个元素开始执行删除
console.log(b);  //[1,2]
console.log(a);  //[3,4,5]

// slice
var a = [1,2,3,4,5];  //定义数组
var b = a.slice(2);  //从第三个元素开始执行删除
console.log(b);  //[1,2]
console.log(a);  //[1,2,3,4,5]
```




#### 反转数组 reverse
``` javascript
var a = [1,2,3];
console.log(a.reverse);
```