"use strict";

class UserData {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === "ellie" && password == "dream") ||
          (id === "coder" && password == "academy")
        ) {
          resolve(id);
        } else {
          reject(new Error("not found"));
        }
      }, 2000);
    });
  }

  getRoles(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user === "ellie") {
          resolve({ name: "ellie", role: "admin" });
        } else {
          reject(new Error("not found"));
        }
      }, 2000);
    });
  }
}

const userStorage = new UserData();
const id = prompt("enter your id");
const password = prompt("enter your password");
// userStorage
//   .loginUser(id, password)
//   .then(userStorage.getRoles)
//   .then((user) => alert(`Hello ${user.name}, you have a ${user.role} role`));

async function userCheck() {
  try {
    const userInfo = await userStorage.loginUser(id, password);
    const user = await userStorage.getRoles(userInfo);

    alert(`Hello ${user.name}, you have a ${user.role} role`);
  } catch (error) {
    console.log(error);
  }
}

//1. async & await
function fetchUser1() {
  return new Promise((resolve, reject) => {
    resolve("ellie");
  });
}

const user1 = fetchUser1();
user1.then(console.log);
console.log(user1);

//위 코드랑 동일
async function fetchUser2() {
  return "ellie";
}
const user2 = fetchUser2();

// 2. await
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(2000);
  return "🍎";
}

async function getBanana() {
  await delay(1000);
  return "🍌";
}

// function getLemon(){
//   return delay(3000).then(()=> '🍋')
// }

//callback hell
function pickFruit1() {
  return getApple().then((apple) => {
    return getBanana().then((banana) => `${apple} + ${banana}`);
  });
}
// pickFruit1().then(console.log);

async function pickFruit2() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`;
}
// pickFruit2().then(console.log);

//위의 코드를 바로 동기적으로 처리
async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;

  return `${apple} + ${banana}`;
}
// pickFruits().then(console.log);

// 3. useful APIs - Promise.all 배열
function pickAllFruit() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}
pickAllFruit().then(console.log);

// useful APIs - Promise.race 가장 먼저 반환되는 값 출력
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);
