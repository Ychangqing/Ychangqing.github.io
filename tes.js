/*
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-18 14:58:33
 */
// https://ask.qcloudimg.com/http-save/yehe-2790081/iflcmtr8e0.png?imageView2/2/w/1620
class Scheduler {
    constructor() {
        this.runCount = 0
        this.taskList = []
        this.pendingList = []
    }
    add(promiseCrator) {
        'sss'.s
        return new Promise(resolve => {
            this.taskList.push([promiseCrator, resolve])
            this.runTask()
        })
        1  2 0
        2  2 1
        4  2 2
        8  2 3
        16 2 4
        32 2 5
    }



    runTask() {
        if (this.taskList.length && this.runCount < 2) {
            const [promiseCrator, resolve] = this.taskList.shift()
            this.runCount += 1
            promiseCrator().then(() => {
                resolve()
                this.runCount -= 1
                this.runTask()
            })
        }
    }
}

const timeout = (time) => new Promise((resolve, reject) => {
    setTimeout(resolve, time);
})
const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(10000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')