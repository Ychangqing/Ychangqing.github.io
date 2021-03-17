---
title: 每天一道算法题
date: 2020-07-30
updated: 2020-07-31
tags: [每日一题]
---
## 每天一道leetcode算法题！！！

#### 2020-07-31 [盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)
``` javascript
// 刚开始考虑的是暴力解题法，使用reduce，每次循环减去数组的第一个，然后用这个数组从前向后算出面积，取最大值

var maxArea = function (height) {
  let max = 0
  height.reduce((pre, cur, curIindex, arr) => {
    let a = pre > cur ? cur * curIindex : pre * curIindex
    arr.slice(curIindex).reduce((sPre, sCur, sCurIindex, sarr) => {
      let b = sPre > sCur ? sCur * sCurIindex : sPre * sCurIindex
      max = max > b ? max : b
      return sPre
    })
    max = max > a ? max : a
    return pre
  })
  return max
}
```
``` javascript
// 后来看了社区的双向指针，优化如下：
var maxArea = function (height) {
  let before = 0
  let after = height.length - 1
  while(before < after) {
    
  }
}
```


#### 2020-12-03 数组移位 插入操作
``` javascript
/**
 * 给定一个有限数组，在指定下标位置插入元素（注意：假设给定下标从0开始，插入后保证数组长度不变）
 * 示例：
 * 数组：var arr = [0, 1, 2, 3, 4, 5, empty, empty, empty, empty]
 * 输入：(3, 'elm')
 * 输出：[0, 1, 2, 'elm', 3, 4, 5, empty, empty, empty]
 * 
 * 时间复杂度：O(n)
 */
var arr = new Array(10)
for (let i = 0; i < 6; i++) {
    arr[i] = i
}

function insert(i, elm) {
    if (i<0 || i > arr.length - 1) {
        return arr
    }
    for (let j = arr.length - 1; j > i; j--) {
        arr[j] =  arr[j-1]
    }
    arr[i] = elm
}
insert(3, 'elm')
```



#### 2020-12-03 数组移位 删除操作
``` javascript
/**
 * 给定一个有限数组，删除指定下标的元素，其余元素均前移（注意：假设下标从0开始，删除后保证数组长度不变）
 * 示例：
 * 数组：var arr = [0, 1, 2, 3, 4, 5, empty, empty, empty, empty]
 * 输入：(3)
 * 输出：[0, 1, 2, 4, 5, empty, empty, empty, empty, empty]
 * 
 * 时间复杂度：O(n)
 */
var arr = new Array(10)
for (let i = 0; i < 6; i++) {
    arr[i] = i
}

function deleteElm(i) {
    if (i < 0 || i > arr.length - 1) {
        return arr
    }
    for (let j = i; j < arr.length; j++) {
        arr[j] = arr[j + 1]
    }
}
deleteElm(3)
```

#### 2020-12-04 [最富有客户的资产总量](https://leetcode-cn.com/problems/richest-customer-wealth/)
```javascript
/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function(accounts) {
    if (!accounts || accounts.length === 0) {
        return 0
    }
    let count = 0
    for (let i = 0; i < accounts.length; i++) {
        const element = accounts[i];
        const sCount = element.reduce((pre, cur) => {
            return pre + cur
        }, 0)
        if (sCount > count) count = sCount
    }
    return count
};
```


#### 2020-12-05 [一维数组的动态和](https://leetcode-cn.com/problems/running-sum-of-1d-array/)
```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
    if (!nums || nums.length == 0) {
        return []
    }
    for (let i = 0; i < nums.length; i++) {
        nums[i] += nums[i - 1] || 0
    }
    return nums
};
```

#### 2020-12-05 [设计 Goal 解析器](https://leetcode-cn.com/problems/goal-parser-interpretation/)
> [正则表达式教程](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)
```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
    if (!nums || nums.length == 0) {
        return []
    }
    let res = []
    for (let i = 0; i < nums.length; i++) {
        let elm = nums[i]
        if (i === 0) {
            res.push(elm)
            continue
        }
        res.push(elm + res[i - 1])
    }
    return res
};
```


#### 2020-12-05 [剑指 Offer 58 - II. 左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)
```javascript
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 * 截取字符串的方法：https://www.runoob.com/w3cnote/js-extract-string.html
 * substring()、substr()、slice()
 */
var reverseLeftWords = function (s, n) {
    if (!s || s.length <= n) {
        return s
    }
    let str = s.slice(n, s.length) + s.slice(0, n)
    return str
};
```

#### 2020-12-05 [面试题 02.03. 删除中间节点](https://leetcode-cn.com/problems/delete-middle-node-lcci/)
```javascript
/**
 * 这个题描述不清晰
 * 1·删除中间节点
 */
var deleteNode = function (node) {
    function displayNode(_node, arr = []) {
        if (!_node) {
            return arr
        }
        arr.push(_node.val)
        if (_node.next) {
            return displayNode(_node.next, arr)
        }
        return arr
    }
    let nodeValArr = displayNode(node)
    let mIndex = parseInt(nodeValArr.length / 2)
    let i = 0
    while (node.next) {
        if (mIndex === i) {
            node.val = node.next.val
            node.next = node.next.next
            break
        }
        i += 1
        node = node.next
    }
};
/**
 * 2·删除第一个和最后一个以外的节点？
 */
var deleteNode = function (node) {
    node.val = node.next.val
    node.next = node.next.next
};
```

#### 2020-12-05 [1512. 好数对的数目](https://leetcode-cn.com/problems/number-of-good-pairs/)
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    let i = 0, j = 0, goodNum = 0
    if (nums.length<1) {
        return goodNum
    }
    for (; i < nums.length; i++) {
        const elm = nums[i];
        j = i+1
        while (j < nums.length) {
            if (elm === nums[j]) {
                goodNum += 1
            }
            j ++
        }
    }
    return goodNum
};
```


#### 2020-12-05 [1431. 拥有最多糖果的孩子](https://leetcode-cn.com/problems/kids-with-the-greatest-number-of-candies/)
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var kidsWithCandies = function (candies, extraCandies) {
    let max = JSON.parse(JSON.stringify(candies)).sort((a, b) => b - a)[0]
    let res = []
    for (let i = 0; i < candies.length; i++) {
        const element = candies[i];
        res.push(element + extraCandies >= max)
    }
    return res
};
```


#### 2020-12-05 [771. 宝石与石头](https://leetcode-cn.com/problems/jewels-and-stones/)
```javascript
var numJewelsInStones = function(jewels, stones) {
    let reg = new RegExp(jewels.split('').join('|'), "g");
    let arr = stones.match(reg);
    return arr ? arr.length : 0
};
```

#### 2020-12-05 [1470. 重新排列数组](https://leetcode-cn.com/problems/shuffle-the-array/)
```javascript
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
    if (n <= 1 || nums.length <= 1) {
        return nums
    }
    let shuffleNums = []
    for (let i = 0; i < nums.length / 2; i++) {
        const element = nums[i];
        shuffleNums.push(element)
        shuffleNums.push(nums[i + n])
    }
    return shuffleNums
};
```


#### 2020-12-05 [1486. 数组异或操作](https://leetcode-cn.com/problems/xor-operation-in-an-array)
```javascript
var xorOperation = function (n, start) {
    let res = 0
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            res = start + 2 * i
            continue
        }
        res = res ^ (start + 2 * (i))
    }
    return res
};
```


#### 2020-12-05 [LCP 01. 猜数字](https://leetcode-cn.com/problems/guess-numbers/)
```javascript
var game = function(guess, answer) {
    let res = 0
    guess.forEach((item, index) => {
        if (answer[index] === item) {
            res += 1
        }
    })
    return res
};
```

#### 2020-12-05 [1684. 统计一致字符串的数目](https://leetcode-cn.com/problems/count-the-number-of-consistent-strings/)
```javascript
var countConsistentStrings = function(allowed, words) {

};
```


