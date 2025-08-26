// Database
let openRequest = indexedDB.open("test", 1);

openRequest.onupgradeneeded = (e) => {
  console.log("Upgrade needed");
  let db = openRequest.result;
  if (!db.objectStoreNames.contains("users")) {
    let request = db.createObjectStore("users", { keyPath: "id" });
    request.createIndex("name", "name", { unique: false });
    request.createIndex("email", "email", { unique: true });
    request.createIndex("password", "password");
    request.createIndex("phone", "phone", { unique: true });
    request.createIndex("age", "age", { unique: false });
    request.createIndex("gender", "gender");
    request.createIndex("hobbies", "hobbies");
  }
};
function userForm(event) {
  //   event.preventDefault();
  let form = document.getElementById("userForm");

  let userObj = {
    name: form.querySelector("input[type='text']").value,
    email: form.querySelector("input[type='email']").value,
    password: form.querySelector("#confirm-password").value,
    phone: form.querySelector("input[type='tel']").value,
    age: form.querySelector("input[type='number']").value,
    gender: form.querySelector("input[name='gender']:checked")
      ? form.querySelector("input[name='gender']:checked").value
      : null,
    hobbies: Array.from(
      form.querySelectorAll("input[type='checkbox']:checked")
    ).map((cb) => cb.value),
  };

  return userObj;
}

document.getElementById("userForm").addEventListener("submit", () => {
  console.log(userForm().name);

  openRequest.onsuccess = (e) => {
    console.log("form success");
    let db = openRequest.result;
    let transaction = db.transaction("users", "readwrite");
    let storeObject = transaction.objectStore("users");

    let request = storeObject.put({
      id: 3,
      name: "shiv",
      email: "shiv@gmail.com",
      password: "pass",
      phone: "635466656",
      age: "54",
      gender: "male",
      hobbies: "reading,camping",
    });
    request.onsuccess = (e) => {
      console.log(e.target.result);
    };
  };
});

// {
//     id: 3,
//     name: userObj.name,
//     email: userObj.email,
//     password: userObj.password,
//     phone: userObj.phone,
//     age: userObj.age,
//     gender: userObj.gender,
//     hobbies: userObj.hobbies,
//   }
