export const UserView = {
  renderUsers: function (users) {
    const tbody = document.getElementById("userTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    users.forEach((user, index) => {
      const [name, email, , phone, age, gender, hobbies] = user;

      const row = document.createElement("tr");
      row.className =
        "border-b border-gray-200 hover:bg-gray-50 even:bg-gray-100";

      row.innerHTML = `
                <td class="py-3 px-6">${name}</td>
                <td class="py-3 px-6">${email}</td>
                <td class="py-3 px-6">${phone}</td>
                <td class="py-3 px-6">${age}</td>
                <td class="py-3 px-6">${gender || "-"}</td>
                <td class="py-3 px-6">${hobbies.join(", ")}</td>
                <td class="py-3 px-6 text-center">
                    <button class="text-blue-500 hover:text-blue-700 mr-2" title="Edit user" onclick="UserController.openUpdateModal(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-500 hover:text-red-700" title="Delete user" onclick="UserController.deleteUser(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

      tbody.appendChild(row);
    });
  },

  showError: function (inputElement, message) {
    // Remove any existing error
    this.clearError(inputElement);

    let error = document.createElement("p");
    error.className = "error-msg text-red-500 text-sm mt-1";
    error.innerText = message;

    if (inputElement.tagName === "DIV") {
      inputElement.appendChild(error);
    } else {
      inputElement.parentElement.appendChild(error);
    }
  },

  clearError: function (inputElement) {
    const errorElement =
      inputElement.tagName === "DIV"
        ? inputElement.querySelector(".error-msg")
        : inputElement.parentElement.querySelector(".error-msg");

    if (errorElement) {
      errorElement.remove();
    }
  },

  clearAllErrors: function () {
    document.querySelectorAll(".error-msg").forEach((el) => el.remove());
  },

  showToast: function (notification, isSuccess = true) {
    const toaster = createToaster({
      positionX: "right",
      positionY: "top",
      theme: "dark",
      duration: 3,
    });

    toaster(notification, isSuccess);
  },

  openUpdateModal: function (user, index) {
    document.getElementById("updateIndex").value = index;
    document.getElementById("updateName").value = user[0] || "";
    document.getElementById("updateEmail").value = user[1] || "";
    document.getElementById("updatePhone").value = user[3] || "";
    document.getElementById("updateAge").value = user[4] || "";

    // Set gender
    document.querySelectorAll('input[name="updateGender"]').forEach((radio) => {
      radio.checked = radio.value === user[5];
    });

    // Set hobbies
    document.querySelectorAll(".updateHobby").forEach((checkbox) => {
      checkbox.checked = user[6].includes(checkbox.value);
    });

    document.getElementById("updateModal").classList.remove("hidden");
  },

  closeUpdateModal: function () {
    document.getElementById("updateModal").classList.add("hidden");
  },

  getFormData: function (formId) {
    const form = document.getElementById(formId);
    return {
      name: form.querySelector("#name").value.trim(),
      email: form.querySelector("#email").value.trim(),
      password: form.querySelector("#password").value,
      confirmPassword: form.querySelector("#confirm-password").value,
      phone: form.querySelector("#phone").value.trim(),
      age: form.querySelector("#age").value,
      gender: form.querySelector("input[name='gender']:checked")?.value || null,
      hobbies: Array.from(
        form.querySelectorAll("input[type='checkbox']:checked")
      ).map((cb) => cb.value),
    };
  },

  getUpdateFormData: function () {
    return {
      name: document.getElementById("updateName").value.trim(),
      email: document.getElementById("updateEmail").value.trim(),
      phone: document.getElementById("updatePhone").value.trim(),
      age: document.getElementById("updateAge").value,
      gender:
        document.querySelector('input[name="updateGender"]:checked')?.value ||
        null,
      hobbies: Array.from(
        document.querySelectorAll(".updateHobby:checked")
      ).map((cb) => cb.value),
    };
  },
};
