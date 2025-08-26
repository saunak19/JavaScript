export const UserModel = {
  getUsers: function () {
    return JSON.parse(localStorage.getItem("users")) || [];
  },

  saveUsers: function (users) {
    localStorage.setItem("users", JSON.stringify(users));
  },

  addUser: function (user) {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
    return users;
  },

  updateUser: function (index, user) {
    const users = this.getUsers();
    if (users[index]) {
      // Keep the original password
      user[2] = users[index][2];
      users[index] = user;
      this.saveUsers(users);
    }
    return users;
  },

  deleteUser: function (index) {
    const users = this.getUsers();
    users.splice(index, 1);
    this.saveUsers(users);
    return users;
  },

  validatePassword: function (password) {
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
  },

  checkEmailExists: function (email, excludeIndex = null) {
    const users = this.getUsers();
    for (let i = 0; i < users.length; i++) {
      if (excludeIndex !== null && i === excludeIndex) continue;
      if (users[i][1] === email) {
        return true;
      }
    }
    return false;
  },

  validateUser: function (userData, isUpdate = false, index = null) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!userData.name)
      errors.push({ field: "name", message: "Please enter your name" });
    if (!userData.email || !emailRegex.test(userData.email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address.",
      });
    }
    if (!isUpdate) {
      const passwordValidation = this.validatePassword(userData.password);
      if (passwordValidation !== true) {
        errors.push({ field: "password", message: passwordValidation });
      }
      if (userData.password !== userData.confirmPassword) {
        errors.push({
          field: "confirmPassword",
          message: "Passwords do not match.",
        });
      }
    }
    if (!userData.phone || !phoneRegex.test(userData.phone)) {
      errors.push({
        field: "phone",
        message: "Phone number must be 10 digits.",
      });
    }
    if (!userData.gender) {
      errors.push({ field: "gender", message: "Please select a gender." });
    }
    if (!userData.age || userData.age <= 0 || userData.age > 100) {
      errors.push({
        field: "age",
        message: "Age should be between 1 and 100.",
      });
    }
    if (!userData.hobbies || userData.hobbies.length < 2) {
      errors.push({
        field: "hobbies",
        message: "Please select at least two hobbies.",
      });
    }

    // Check for duplicate email (excluding current user in update)
    if (!isUpdate && this.checkEmailExists(userData.email)) {
      errors.push({ field: "email", message: "Email already exists." });
    } else if (
      isUpdate &&
      this.checkEmailExists(userData.email, parseInt(index))
    ) {
      errors.push({ field: "email", message: "Email already exists." });
    }

    return errors;
  },
};
