/*
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-19 10:56:56
 */
// https://ask.qcloudimg.com/http-save/yehe-2790081/iflcmtr8e0.png?imageView2/2/w/1620
class BinarySearchTree {
    constructor() {
        this.Node = function (key) {
            this.key = key
            this.left = this.right = null
            return this
        }
        this.root = null
    }

    insert(key) {
        const newNode = this.Node(key)
        console.log(newNode, this.Node(1));
        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(newNode, this.root)
        }
    }

    insertNode(newNode, root) {
        if (newNode.key < root.key) {
            if (root.left === null) {
                root.left = newNode
            } else {
                this.insertNode(newNode, root.left)
            }
        } else {
            if (root.right === null) {
                root.right = newNode
            } else {
                this.insertNode(newNode, root.right)
            }
        }
    }
}

const binarySearchTree = new BinarySearchTree()
binarySearchTree.insert(5)
binarySearchTree.insert(4)
binarySearchTree.insert(3)
console.log(binarySearchTree.root);