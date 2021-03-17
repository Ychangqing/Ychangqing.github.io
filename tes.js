// https://ask.qcloudimg.com/http-save/yehe-2790081/iflcmtr8e0.png?imageView2/2/w/1620
class Scheduler {
    constructor() {
        this.maxCount = 0
        this.taskList = []
        this.pendingList = []
    }
    add(promiseCrator) {
        if (this.maxCount > 2) {
            this.pendingList.push(promiseCrator)
        }
        return this.runTask(promiseCrator)
    }

    runTask(promiseCrator) {
        this.maxCount += 1
        return new Promise(resolve => {
            promiseCrator().then(() => {
                this.maxCount -= 1
                resolve()
            })
        })
    }
}

const timeout = (time) => new Promise((resolve, reject) => {
    setTimeout(resolve, time);
})
const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')