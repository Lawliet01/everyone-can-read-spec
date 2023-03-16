class Promise {

    constructor(executor) {
        // 1. 判断方法是否被合法调用：必须由new表达式、super方法触发，且传入的第一个参数executor必须是一个函数。
        if (!new.target) throw new TypeError("Promise constructor cannot be invoked without 'new'")
        if (typeof executor !== 'function') throw new TypeError("Promise resolver  is not a function")

        // 2. 创建promise实例对象，并初始化其内部插槽
        const promise = Object.create(Promise.prototype)
        promise.__PromiseState = "pending"
        promise.__PromiseFulfillReactions = []
        promise.__PromiseRejectReactions = []
        promise.__PromiseIsHandled = false

        // 3. 创建resolve，reject两个内置函数
        let {
            resolve,
            reject
        } = createResolvingFunction(promise)

        // 4. 分别以resolve，reject作为executor的参数，执行executor；如果executor的执行有误，直接reject promise。
        try {
            executor.call(undefined, resolve, reject)
        } catch (e) {
            reject.call(undefined, e)
        }

        // 5. 返回promise对象。
        return promise
    }
    // ...
    then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {

            // 封装onFufilled
            let onFulfilledJobCallback = function (value) {
                try {
                    let handerResult = onFulfilled.call(undefined, value);
                    resolve(handerResult)
                } catch (e) {
                    reject(e)
                }
            }
            // 封装onRejected
            let onRejectedJobCallback = function (reason) {
                try {
                    let handerResult = onRejected.call(undefined, reason);
                    resolve(handerResult)
                } catch (e) {
                    reject(e)
                }
            }

            // 根据old_promise状态触发
            if (this.__PromiseState === "pending") {
                this.__PromiseFulfillReactions.push(onFulfilledJobCallback)
                this.__PromiseRejectReactions.push(onRejectedJobCallback)
            } else if (this.__PromiseState === "fulfilled") {
                queueMicrotask(onFulfilledJobCallback.bind(undefined, this.__PromiseResult))
            } else if (this.__PromiseState === "rejected") {
                queueMicrotask(onRejectedJobCallback.bind(undefined, this.__PromiseResult))
            }
        })
    }
    static resolve(x) {
        if (x instanceof Promise) return x
        return new Promise(resolve => resolve(x))
    }
    static reject(r) {
        return new Promise((_, reject) => reject(r))
    }

    catch (onRejected) {
        return this.then(undefined, onRejected)
    }; 
    
    finally(onFinally) {
        // ... 省略对edge cases的处理
        let thenFinally = function (value) {
            let result = onFinally.call(undefined) // ①
            return Promise.resolve(result).then(() => {
                return value
            }) // ②
        }
        let catchFinally = function (reason) {
            let result = onFinally.call(undefined) // ①
            return Promise.resolve(result).then(() => {
                throw reason
            }) // ②
        }
        return this.then(thenFinally, catchFinally) // ③
    }
    // ...
    static all(iterable) {
        return new Promise((resolve, reject) => {

            let promises = [...iterable].map(i => Promise.resolve(i))
            let values = [...iterable].map(_ => undefined)
            let remainingElementsCount = 0 // 计算未fulfilled的p

            promises.forEach((p, index) => {
                remainingElementsCount++
                p.then(
                    (x) => { // onFulfilled
                        remainingElementsCount--
                        values[index] = x
                        if (remainingElementsCount === 0) {
                            // 此时其他所有的p状态都为`fulfilled`
                            resolve(values)
                        }
                    },
                    (reason) => reject(reason)) // onRejected
            })
        })
    }

    static allSettled(iterable) {
        return new Promise((resolve) => {
            let promises = [...iterable].map(i => Promise.resolve(i))
            let values = [...iterable].map(_ => undefined)
            let remainingElementsCount = 0 // 计算未settled的p

            promises.forEach((p, index) => {
                remainingElementsCount++
                p.then(
                    (x) => { // onFulfilled
                        remainingElementsCount--
                        values[index] = {
                            status: "fulfilled",
                            value: x
                        }
                        if (remainingElementsCount === 0) {
                            // 此时其他所有的p状态都为fulfilled或rejected
                            resolve(values)
                        }
                    },
                    (reason) => { // onRejected
                        remainingElementsCount--
                        values[index] = {
                            status: "rejected",
                            reason
                        }
                        if (remainingElementsCount === 0) {
                            // 此时其他所有的p状态都为fulfilled或rejected
                            resolve(values)
                        }
                    })
            })
        })
    }
}


function createResolvingFunction(promise) {
    let alreadyResolve = false // 使得resolve、reject只允许触发一次

    return {
        resolve: function (value) { // resolve内置函数
            if (alreadyResolve) return undefined;
            alreadyResolve = true

            // 修改内部插槽
            let reactions = promise.__PromiseFulfillReactions
            promise.__PromiseState = "fulfilled"
            promise.__PromiseFulfillReactions = undefined
            promise.__PromiseRejectReactions = undefined
            promise.__PromiseResult = value

            // 触发handler
            for (let reaction of reactions) {
                queueMicrotask(reaction.bind(undefined, value))
            }

        },
        reject: function (reason) { // reject内置函数
            if (alreadyResolve) return undefined;
            alreadyResolve = true

            // 修改内部插槽
            let reactions = promise.__PromiseRejectReactions
            promise.__PromiseState = "rejected"
            promise.__PromiseFulfillReactions = undefined
            promise.__PromiseRejectReactions = undefined
            promise.__PromiseResult = reason

            // 触发handler
            for (let reaction of reactions) {
                queueMicrotask(reaction.bind(undefined, reason))
            }
        }
    }
}


// 测试
new Promise((resolve) => {
    resolve(1)
}).then((x) => {
    console.log(1)
})

new Promise((reject) => {
    reject(new Error)
}).then(reason => {
    console.log(reason)
})

Promise.resolve(1).finally(() => {console.log('finally')})

Promise.all([1,2,3, Promise.reject(4)])
    .then(() => {}, (err) => {console.log(err)})

Promise.allSettled([1,2,3, Promise.reject(1)]).then((x) => {console.log(x)})