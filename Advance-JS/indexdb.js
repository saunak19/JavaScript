//Indexed - DB

let openRequest = indexedDB.open("collageDB", 2);

openRequest.onsuccess = (e) => {
  console.log("From success");
  let db = openRequest.result;
  let transaction = db.transaction("students", "readwrite");
  let storeObject = transaction.objectStore("students");

  //   let request = storeObject.put({
  //     id: 2,
  //     name: "ahir",
  //     email: "ahir@gmail.com",
  //   });
  //   let index = storeObject.index("name");
  //   let request = index.get("ahir");
  let request = storeObject.delete(1);
  request.onsuccess = (e) => {
    console.log(e.target.result);
  };
  request.onerror = (e) => {
    console.log(e.target.error);
  };
};
openRequest.onupgradeneeded = (e) => {
  console.log("Upgrade needed");
  let db = openRequest.result;
  if (!db.objectStoreNames.contains("students")) {
    let request = db.createObjectStore("students", { keyPath: "id" });
    request.createIndex("name", "name", { unique: false });
    request.createIndex("email", "email", { unique: true });
  }
};

openRequest.onerror = (e) => {
  console.log("Error: ".e);
};

document.getElementById("loadUsers").addEventListener("click", () => {
  console.log("Button clicked");

  if (!db) {
    console.error("DB not initialized yet");
    return;
  }

  let transaction = db.transaction("users", "readonly");
  let storeObject = transaction.objectStore("users");
  let request = storeObject.getAll();

  request.onsuccess = (e) => {
    let users = e.target.result;
    let tbody = document.querySelector("#usersTable tbody");

    tbody.innerHTML = "";
    users.forEach((user) => {
      let row = `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.phone}</td>
            <td>${user.age}</td>
            <td>${user.gender}</td>
            <td>${user.hobbies}</td>
            <td><button id='delete'>delete</button></td>
          </tr>`;
      tbody.innerHTML += row;
    });
  };

  request.onerror = (e) => {
    console.error("Error fetching users:", e.target.error);
  };
});
