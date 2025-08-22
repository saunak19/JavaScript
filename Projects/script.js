function userForm(event) {
  //   event.preventDefault();
  let form = document.getElementById("userForm");
  form.querySelectorAll(".error-msg").forEach((el) => el.remove());
  let isValid = true;
  let nameInput = form.querySelector("input[type='text']");
  let nameValue = nameInput.value.trim();
  let emailInput = form.querySelector("input[type='email']");
  let emailValue = emailInput.value.trim();
  let phoneInput = form.querySelector("input[type='tel']");
  let phoneValue = phoneInput.value.trim();
  let genderInput = form.querySelector("input[name='gender']:checked")
    ? form.querySelector("input[name='gender']:checked")
    : null;

  let genderValue = genderInput?.value || null;
  let allFieldError = form.querySelector(".showAllFieldError");
  let ageError = form.querySelector("#ageError");
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
  if (!phoneRegex.test(phoneValue)) {
    showError(phoneInput, "Phone number must be 10 digits.");
    isValid = false;
  }
  if (!genderValue || null) {
    showError(genderError, "Please select a gender.");
    isValid = false;
  }
  if (age.value < 0 || age.value > 100) {
    showError(ageError, "age should be greater then 0 or less then 100");
    isValid = false;
  }
  if (hobbies.length < 2) {
    showError(hobbiesError, "Please select at least two hobbies");
    isValid = false;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (isValid) {
    let userDetails = [
      form.querySelector("input[type='text']").value,
      form.querySelector("input[type='email']").value,
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
    console.log("User added:", userDetails);
    console.log("All users:", users);
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
let getUser = JSON.parse(localStorage.getItem("users"));
console.log(getUser[0]);

function renderUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.getElementById("userTableBody");

  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const [name, email, phone, age, gender, skills] = user;

    const row = document.createElement("tr");
    row.className = "table-row border-b border-gray-200 hover:bg-gray-50";

    row.innerHTML = `
      <td class="p-3">${name}</td>
      <td class="p-3">${email}</td>
      <td class="p-3">${phone}</td>
      <td class="p-3">${age}</td>
      <td class="p-3">${gender || "-"}</td>
      <td class="p-3">
        
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
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}
