function midFind(arr, target, start = 0, end = arr.length) {
  if (start > end) {
    return -1
  }
  var midIndex = Math.floor((start + end) / 2)
  var mid = arr[midIndex]

  if (target === mid) {
    // find it
    return midIndex
  } else if (target > mid) {
    return midFind(arr, target, midIndex + 1, end)
  } else {
    return midFind(arr, target, start, midIndex - 1)
  }
  return -1
}

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// [()()]

function is_match(left, right) {
  return (
    (left === "[" && right === "]") ||
    (left === "]" && right === "[") ||
    (left === "(" && right === ")") ||
    (left === ")" && right === "(")
  )
}

function balance(str) {
  let [start, ...others] = str
  let stack = [start]
  while (others.length > 0) {
    let temp = others.shift()
    if (!is_match(stack[stack.length - 1], temp)) {
      stack.push(temp)
    } else {
      stack.pop()
    }
  }

  return stack.length ? false : true
}

//
function fibonacciCatch(num) {
  let temp = [1, 1]
  ;(function fibonacci(n) {
    if (typeof temp[n] == "number") {
      console.log("n=" + n, "temp[n]=" + temp[n])

      return temp[n]
    } else {
      temp[n] = fibonacci(n - 1) + fibonacci(n - 2)
      return temp[n]
    }
  })(num - 1)
  return temp
}

// select sort

function sortSelect(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = arr[i]
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j]
        minIndex = j
      }
    }
    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

// insert sort
function sortInsert(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let j = i + 1
    let temp = arr[j]
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = temp
  }
  return arr
}

// quick sort
function sortQuick(arr) {
  if (arr.length <= 0) {
    return arr
  }
  let left = []
  let right = []
  let baseNum = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > baseNum) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }

  return sortQuick(left).concat([baseNum], sortQuick(right))
}

// search num
function search(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return true
    }
  }
  return false
}

// search bi
function biSearch(arr, target, start = 0, end = arr.length - 1) {
  let mid = Math.floor((start + end) / 2)
  if (start > end) {
    return false
  }
  let minNum = arr[mid]
  if (minNum === target) {
    return true
  } else if (minNum < target) {
    return biSearch(arr, target, mid + 1, end)
  } else {
    return biSearch(arr, target, start, mid - 1)
  }

  return false
}

// select only once
function selectOnlyOne(arr) {
  let res = arr.filter(item => {
    return arr.indexOf(item) === arr.lastIndexOf(item)
  })
  if (res) {
    return res[0]
  } else {
    return false
  }
}

// deepClone
function deepClone(obj) {
  if (obj == null || typeof obj !== "Object") {
    return obj
  }
  let newObj = obj.constructor()

  for (let key in newObj.getownperportyDescriptors()) {
    newObj[key] = deepClone(obj[key])
  }

  return newObj
}

//
function throttle(fn, interval) {
  let preTime = 0
  return function() {
    let newTime = new Date()

    if (newTime - preTime >= interval) {
      fn.apply(null, arguments)
      preTime = newTime
    }
  }
}

function snake(fn, interval) {
  let timer = null
  return function() {
    clearTimeout(timer)

    let fn_t = fn.apply(this)
    setTimeout(fn_t, interval)
  }
}

// 交集
function jcji(arr1, arr2) {
  return arr1.filter(item => {
    return arr2.includes(item)
  })
}

function plusOne(arr) {
  let temp = arr.join("")
  let tempNum = parseInt(temp)
  let newNum = tempNum + 1
  return [...String(newNum)]
}

function resverseNum(num) {
  let strNum = num.toString()
  let minus = strNum[0] === "-" ? "-" : ""

  let resverse = strNum
    .split("")
    .reverse()
    .join("")
  resverse = resverse.replace(/^0+|-$/g, "")
  return minus + resverse
}

function myPromise(task) {
  let that = this
  this.status = "pending"
  this.data = null
  this.onFulfilledFns = []
  this.onRejectedFns = []
  function resolve(data) {
    if (that.status == "pending") {
      that.status = "resolve"
      that.data = data
      that.onFulfilledFns.forEach(element => {
        return element(data)
      })
    }
  }
  function reject(data) {
    if (that.status == "pending") {
      that.status = "reject"
      that.data = data
      that.onRejectedFns.forEach(ele => {
        return ele(data)
      })
    }
  }

  try {
    task(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

myPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled == "function"
      ? onFulfilled
      : function(value) {
          return value
        }
  onRejected =
    typeof onRejected == "function"
      ? onRejected
      : function(value) {
          return value
        }

  var promise2
  let that = this
  if (that.status == "fulfilled") {
    promise2 = new myPromise(function(resolve, reject) {
      let x = onFulfilled(that.value)
      resolvePromise(promise2, x, resolve, reject)
    })
  } else if (that.status == "rejected") {
    promise2 = new myPromise(function(resolve, reject) {
      let x = onRejected(that.value)
      reject(x)
    })
  } else if (that.status == "pending") {
    promise2 = new myPromise(function(resolve, reject) {
      that.onFulfilledFns.push(function() {
        let x = onFulfilled(that.value)
        resolve(x)
      })
      that.onRejectedFns.push(function() {
        let x = onRejected(that.value)
        reject(x)
      })
    })
  } else {
    promise2 = new myPromise(function(resolve, reject) {
      reject("Promise内部状态错误")
    })
  }
  return promise2
}

myPromise.resolve = function(val) {
  return new myPromise(function(resolve, reject) {
    resolve(val)
  })
}

myPromise.reject = function(val) {
  return new myPromise(function(resolve, reject) {
    reject(val)
  })
}



function deepClone(obj,c={}){
    for(let i in obj ){
        if(obj.hasOwnProperty(i)){
            if(typeof obj[i] === 'object') {
                let c[i] = Array.isArray(obj[i])?[]:{}
                deepClone(obj[i],c[i])
            } else {
                c[i] = obj[i]
            }
        }
    }
}


function firstUniqueChar(str){
    let len = str.length
    for(let i=0;i<len;i++){
        let isEqual = false
        for(let j=i;j<len;j++){
            if(i!=j && str[i]==str[j]){
                isEqual = true
            }
        }
        if(!isEqual) {
            return i
        }
    }
    return -1
}

class A {
  
  getInstance(){
    var instance = null
    return function(){
      if (instance == null) {
        instance = new A()
      }
      return instance
    }
  }
}


function single(name){
  this.name = name
  this.instance = null
}

single.prototype.getName = function(){
  alert(this.name)
}

single.getName = function(){
  if(!this.instance ) {
    this.instance = new single()
  }

  return this.instance
}

var a = single.getName('z')
var b = single.getName('l')