
document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // ELEMENTS
  // =========================================

  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.getElementById("pwdToggle");
  const roleButtons = document.querySelectorAll("#lm .role-card");
  const subtitleText = document.querySelector("#lm .login-sub");
  const formMessage = document.getElementById("loginError");
  const submitButton = loginForm?.querySelector('button[type="submit"]');
  const btnText = document.getElementById("btnText");
  const emailLabel = document.getElementById("emailLabel");
  const rememberMe = loginForm?.querySelector('input[name="remember"]');

  if (
    !loginForm ||
    !emailInput ||
    !passwordInput ||
    !submitButton
  ) {
    console.error("Login form elements are missing. Check your HTML IDs.");
    return;
  }

  // =========================================
  // PASSWORD SHOW / HIDE
  // =========================================

  function resetPasswordToggle() {
    passwordInput.type = "password";

    if (passwordToggle) {
      passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
      passwordToggle.setAttribute("aria-label", "Show password");
    }
  }

  if (passwordToggle) {
    passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';

    passwordToggle.addEventListener("click", (event) => {
      event.preventDefault();

      const showPassword = passwordInput.type === "password";

      passwordInput.type = showPassword ? "text" : "password";

      passwordToggle.innerHTML = showPassword
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';

      passwordToggle.setAttribute(
        "aria-label",
        showPassword ? "Hide password" : "Show password"
      );
    });
  }

  // =========================================
  // VALIDATION
  // =========================================

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePassword(value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/.test(value);
  }

  function showError(message) {
    if (!formMessage) {
      alert(message);
      return;
    }

    formMessage.textContent = message;
    formMessage.style.color = "var(--coral-500, #b54747)";
    formMessage.classList.add("show");
  }

  function showSuccess(message) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.style.color = "#16845c";
    formMessage.classList.add("show");
  }

  function hideMessage() {
    if (!formMessage) return;

    formMessage.textContent = "";
    formMessage.classList.remove("show");
  }

  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
      hideMessage();
    });
  });

  // =========================================
  // ROLE SELECTOR: COUPLE / PLANNER
  // =========================================

  let selectedRole = "couple";

  function updateRole(role) {
    selectedRole = role;

    roleButtons.forEach((button) => {
      const active = button.dataset.role === role;

      button.classList.toggle("active", active);
      button.classList.toggle("on", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (btnText) {
      btnText.textContent =
        role === "planner"
          ? "Sign in as Planner"
          : "Sign in as Couple";
    }

    if (emailLabel) {
      emailLabel.textContent =
        role === "planner" ? "Planner Email" : "Email Address";
    }

    emailInput.placeholder =
      role === "planner"
        ? "planner@example.com"
        : "you@example.com";

    if (subtitleText) {
      subtitleText.textContent =
        role === "planner"
          ? "Sign in to manage your wedding celebrations."
          : "Sign in to continue planning your beautiful day.";
    }

    hideMessage();
  }

  roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateRole(button.dataset.role);
    });
  });

  // =========================================
  // LOGIN
  // =========================================

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    hideMessage();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const activeRole = document.querySelector(
      "#lm .role-card.active, #lm .role-card.on"
    );

    const role = activeRole?.dataset.role || selectedRole;

    if (!validateEmail(emailValue)) {
      emailInput.style.borderColor = "var(--coral-500, #b54747)";
      showError("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    if (!passwordValue) {
      passwordInput.style.borderColor = "var(--coral-500, #b54747)";
      showError("Please enter your password.");
      passwordInput.focus();
      return;
    }

    if (!validatePassword(passwordValue)) {
      passwordInput.style.borderColor = "var(--coral-500, #b54747)";
      showError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      passwordInput.focus();
      return;
    }

    const originalHTML = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.classList.add("loading");
    submitButton.innerHTML =
      '<span>Signing in...</span><strong class="login-spinner"></strong>';

    // DEMO LOGIN ONLY: this does not verify real account credentials.
    setTimeout(() => {
      const currentUser = {
        name: emailValue.split("@")[0],
        email: emailValue,
        role: role
      };

      try {
        // Remove stale login data from both storage locations.
        localStorage.removeItem("stacklyCurrentUser");
        sessionStorage.removeItem("stacklyCurrentUser");

        const storage = rememberMe?.checked
          ? localStorage
          : sessionStorage;

        storage.setItem(
          "stacklyCurrentUser",
          JSON.stringify(currentUser)
        );
      } catch (error) {
        console.error("Could not save login information:", error);

        submitButton.disabled = false;
        submitButton.classList.remove("loading");
        submitButton.innerHTML = originalHTML;

        showError("Unable to save your session. Please check browser storage settings.");
        return;
      }

      showSuccess(
        `Welcome back! Redirecting to your ${
          role === "planner" ? "Planner" : "Couple"
        } dashboard...`
      );

      // Redirect to the correct dashboard.
      const dashboard =
        role === "planner" ? "planner.html" : "couple.html";

      window.location.href = dashboard;
    }, 800);
  });

  // =========================================
  // INITIAL ROLE
  // =========================================

  updateRole("couple");
});
