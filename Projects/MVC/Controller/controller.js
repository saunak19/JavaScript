export const UserController = {
  init: function (UserModel, UserView) {
    this.UserModel = UserModel;
    this.UserView = UserView;
    this.setupEventListeners();
    this.loadUsers();
  },

  setupEventListeners: function () {
    const userForm = document.getElementById("userForm");
    if (userForm) {
      userForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    // Update form submission
    const submitUpdate = document.getElementById("submitUpdate");
    if (submitUpdate) {
      submitUpdate.addEventListener("click", () => this.handleUpdateSubmit());
    }

    // Cancel update
    const cancelUpdate = document.getElementById("cancelUpdate");
    if (cancelUpdate) {
      cancelUpdate.addEventListener("click", () =>
        this.UserView.closeUpdateModal()
      );
    }
  },

  loadUsers: function () {
    const users = this.UserModel.getUsers();
    this.UserView.renderUsers(users);
  },

  handleFormSubmit: function (event) {
    event.preventDefault();
    this.UserView.clearAllErrors();

    const formData = this.UserView.getFormData("userForm");
    const errors = this.UserModel.validateUser(formData);

    if (errors.length > 0) {
      errors.forEach((error) => {
        const fieldElement =
          document.getElementById(error.field) ||
          document.querySelector(`.${error.field}Error`) ||
          document.querySelector(".showAllFieldError");
        this.UserView.showError(fieldElement, error.message);
      });
      return;
    }

    // Format user data for storage
    const userData = [
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.age,
      formData.gender,
      formData.hobbies,
    ];

    this.UserModel.addUser(userData);
    this.UserView.showToast("User registered successfully!", true);
    this.loadUsers();

    // Reset form
    document.getElementById("userForm").reset();
  },

  handleUpdateSubmit: function () {
    this.UserView.clearAllErrors();

    const index = document.getElementById("updateIndex").value;
    const formData = this.UserView.getUpdateFormData();
    const errors = this.UserModel.validateUser(formData, true, index);

    if (errors.length > 0) {
      errors.forEach((error) => {
        const fieldElement =
          document.getElementById(
            `update${
              error.field.charAt(0).toUpperCase() + error.field.slice(1)
            }`
          ) || document.querySelector(`.${error.field}Error`);
        this.UserView.showError(fieldElement, error.message);
      });
      return;
    }

    // Format user data for storage
    const userData = [
      formData.name,
      formData.email,
      "",
      formData.phone,
      formData.age,
      formData.gender,
      formData.hobbies,
    ];

    this.UserModel.updateUser(index, userData);
    this.UserView.showToast("User updated successfully!", true);
    this.loadUsers();
    this.UserView.closeUpdateModal();
  },

  deleteUser: function (index) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.UserModel.deleteUser(index);
      this.UserView.showToast("User deleted successfully!", true);
      this.loadUsers();
    }
  },

  openUpdateModal: function (index) {
    const users = this.UserModel.getUsers();
    this.UserView.openUpdateModal(users[index], index);
  },
};
