let getUser = JSON.parse(localStorage.getItem("users"));

function createToaster(config) {
  return function (notification, status) {
    let div = document.createElement("div");
    div.className = `fixed top-5 right-5 ${
      status == true ? "bg-green-800" : "bg-red-800"
    } text-white px-4 py-2 rounded-lg shadow-lg ${
      config.positionX === "right" ? "right-10" : "left-10"
    } ${config.positionY === "top" ? "top-10" : "bottom-10"}`;

    div.textContent = notification;
    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
    }, config.duration * 1000);
  };
}

let toaster = createToaster({
  positionX: "right",
  positionY: "top",
  theme: "dark",
  duration: 3,
});

function validatePassword(password) {
  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*]/;

  if (!minLength.test(password)) {
    return "Password must be at least 8 characters long.";
  }
  if (!upperCase.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!lowerCase.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!number.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!specialChar.test(password)) {
    return "Password must contain at least one special character (!@#$%^&*).";
  }
  return true;
}

function checkEmail(email) {
  for (let i = 0; i < getUser.length; i++) {
    if (getUser[i][1] === email) {
      return true;
    } else {
      return false;
    }
  }
}
function userForm(event) {
  //   event.preventDefault();
  let form = document.getElementById("userForm");
  form.querySelectorAll(".error-msg").forEach((el) => el.remove());

  let isValid = true;
  let nameInput = form.querySelector("input[type='text']");
  let nameValue = nameInput.value.trim();
  let emailInput = form.querySelector("input[type='email']");
  let emailValue = emailInput.value.trim();
  let passInput = form.querySelector("input[type='password']");
  let passValue = passInput.value;
  let confPass = form.querySelector("#confirm-password");
  let confPassValue = confPass.value;
  // console.log(confPassValue);

  let phoneInput = form.querySelector("input[type='tel']");
  let phoneValue = phoneInput.value.trim();
  let genderInput = form.querySelector("input[name='gender']:checked")
    ? form.querySelector("input[name='gender']:checked")
    : null;

  let genderValue = genderInput?.value || null;
  let allFieldError = form.querySelector(".showAllFieldError");
  let ageInput = form.querySelector("#age");
  let age = form.querySelector("#age").value;
  let hobbies = Array.from(
    form.querySelectorAll("input[type='checkbox']:checked")
  ).map((cb) => cb.value);
  let hobbiesError = form.querySelector("#hobbies");
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^[0-9]{10}$/;

  if (nameInput === "" || emailValue === "" || phoneValue === "") {
    showError(allFieldError, "All fields are required.");
    isValid = false;
  }
  if (!nameValue) {
    showError(nameInput, "Please Enter your name");
    isValid = false;
  }
  if (!emailRegex.test(emailValue)) {
    showError(emailInput, "Please enter a valid email address.");
    isValid = false;
  }

  if (validatePassword(!passValue === true)) {
    showError(
      passInput,
      validatePassword(passValue) == true ? "" : validatePassword(passInput)
    );
    isValid = true;
  }
  if (passValue === confPassValue) {
    isValid = true;
  } else {
    showError(confPass, "Password is not matched");
    isValid = false;
  }
  if (!phoneRegex.test(phoneValue)) {
    showError(phoneInput, "Phone number must be 10 digits.");
    isValid = false;
  }
  if (!genderValue || null) {
    showError(genderError, "Please select a gender.");
    isValid = false;
  }

  if (age <= 0 || age > 100) {
    showError(ageInput, "age should be greater then 0 or less then 100");
    isValid = false;
  }
  if (hobbies.length < 2) {
    showError(hobbiesError, "Please select at least two hobbies");
    isValid = false;
  }
  if (checkEmail(emailValue) === false) {
    // isValid = true;
  } else {
    showError(emailInput, "Email already Exist");
    isValid = false;
  }
  console.log(checkEmail(emailValue));

  let users = JSON.parse(localStorage.getItem("users")) || [];
  // console.log(isValid);

  if (isValid) {
    let userDetails = [
      form.querySelector("input[type='text']").value,
      form.querySelector("input[type='email']").value,
      form.querySelector("#confirm-password").value,
      form.querySelector("input[type='tel']").value,
      form.querySelector("input[type='number']").value,
      form.querySelector("input[name='gender']:checked")
        ? form.querySelector("input[name='gender']:checked").value
        : null,

      Array.from(form.querySelectorAll("input[type='checkbox']:checked")).map(
        (cb) => cb.value
      ),
    ];

    users.push(userDetails);
    localStorage.setItem("users", JSON.stringify(users));

    form.reset();
    toaster("Form submitted successfully", true);
    setTimeout(() => {
      window.location.href = "/Projects/login.html";
    }, 2000);
  }
  renderUsers();
}

function showError(inputElement, message) {
  let error = document.createElement("p");
  error.className = "error-msg text-red-500 text-sm mt-1";
  error.innerText = message;

  if (inputElement.tagName === "DIV") {
    inputElement.appendChild(error);
  } else {
    inputElement.parentElement.appendChild(error);
  }
}
// let getUser = JSON.parse(localStorage.getItem("users"));
// console.log(getUser[0]);

function renderUsers() {
  const tbody = document.getElementById("userTableBody");

  if (!tbody) {
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  tbody.innerHTML = "";
  users.forEach((user, index) => {
    const [name, email, , phone, age, gender, skills] = user;

    const row = document.createElement("tr");
    row.className = "table-row border-b border-gray-200 hover:bg-gray-50";

    row.innerHTML = `
      <td class="p-3">${name}</td>
      <td class="p-3">${email}</td>
      <td class="p-3">${phone}</td>
      <td class="p-3">${age}</td>
      <td class="p-3">${gender || "-"}</td>
      <td class="p-3">${skills}</td>
      <td class="p-3">
        <button class="text-blue-500 hover:text-blue-700 mr-2" title="Edit user" onclick="openUpdateModal(${index})">
                                        <i class="fas fa-edit"></i>
                                    </button>
        <button class="text-red-500 hover:text-red-700" title="Delete user" onclick="deleteUser(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}
renderUsers();

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let text = "Are you sure you want to delete this?";
  if (confirm(text) == true) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
  } else {
  }
}

// function loginUser() {
//   let loginForm = document.getElementById("loginForm");
//   let userEmail = document.getElementById("loginEmail");
//   let password = document.getElementById("loginPassword");
//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   function checkEmailAndPass(email, password) {
//     for (let i = 0; i < users.length; i++) {
//       console.log(users[i][1] === email);
//       console.log(users[i]);
//       if (users[i][1] === email) {
//         if (users[i][2] === password) {
//           return true;
//         } else {
//           return false;
//         }
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
//   if (checkEmailAndPass(userEmail.value, password.value) === true) {
//     toaster("Login successful. Redirecting...", true);
//     setTimeout(() => {
//       window.location.href = "/Projects/dashboard.html";
//     }, 2000);
//     localStorage.setItem("isLoggedIn", true);
//   } else {
//     toaster("Please Enter valid Email and Password", false);
//   }

//   loginForm.reset();
// }

function loginUser() {
  let loginForm = document.getElementById("loginForm");
  let userEmail = document.getElementById("loginEmail").value.trim();
  let userPassword = document.getElementById("loginPassword").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];

  function checkEmailAndPass(email, password) {
    for (let i = 0; i < users.length; i++) {
      let storedEmail = users[i][1];
      let storedPass = users[i][2];

      if (storedEmail === email && storedPass === password) {
        return true;
      }
    }
    return false;
  }
  const now = new Date();
  const hours = now.getHours();
  let minutes = now.getMinutes();
  const seconds = now.getSeconds();
  if (checkEmailAndPass(userEmail, userPassword)) {
    minutes = minutes == 58 ? 3 : minutes == 59 ? 2 : minutes + 2;
    let isLogin = {
      status: true,
      time: minutes + 10,
    };
    toaster("Login successful. Redirecting...", true);
    localStorage.setItem("isLoggedIn", JSON.stringify(isLogin));
    setTimeout(() => {
      window.location.href = "/Projects/dashboard.html";
    }, 2000);
  } else {
    toaster("Please enter a valid Email and Password", false);
  }

  loginForm.reset();
}

function openUpdateModal(index) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  document.getElementById("updateIndex").value = index;
  document.getElementById("updateName").value = users[index][0] || "";
  document.getElementById("updateEmail").value = users[index][1] || "";
  document.getElementById("updatePhone").value = users[index][3] || "";
  document.getElementById("updateAge").value = users[index][4] || "";

  document.querySelectorAll('input[name="updateGender"]').forEach((radio) => {
    radio.checked = radio.value === users[index][5];
  });

  document.querySelectorAll(".updateHobby").forEach((checkbox) => {
    checkbox.checked = users[index][6].includes(checkbox.value);
  });

  updateModal.style.display = "flex";
}

function closeUpdateModal() {
  updateModal.style.display = "none";
}

document.getElementById("submitUpdate").addEventListener("click", function () {
  const index = document.getElementById("updateIndex").value;
  let nameInput = document.getElementById("updateName");
  let emailInput = document.getElementById("updateEmail");
  let phoneInput = document.getElementById("updatePhone");
  let ageInput = document.getElementById("updateAge");
  let genderInput = document.querySelector(
    'input[name="updateGender"]:checked'
  );
  let hobbyInput = document.querySelectorAll(".updateHobby:checked");
  validationForm(
    nameInput,
    emailInput,
    phoneInput,
    ageInput,
    genderInput,
    hobbyInput
  );

  if (validationForm() == true) {
    const updatedUser = [
      nameInput.value,
      emailInput.value,
      ,
      phoneInput.value,
      ageInput.value,
      genderInput?.value || "",
      Array.from(document.querySelectorAll(".updateHobby:checked")).map(
        (cb) => cb.value
      ),
    ];

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users[index]) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));

      if (typeof renderUsers === "function") {
        renderUsers();
      }

      alert("User updated successfully!");
      closeUpdateModal();
    }
  }
});

function validationForm(...inputElements) {
  let isValid = true;
  inputElements.map((input) => {
    if (input.id == "updateName") {
      console.log(input);
      if (!input.value) {
        // showError(input, "Please Enter your name");
        isValid = false;
      }
    }
  });

  return isValid;
}
console.log(validationForm());
