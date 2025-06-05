<template>
  <div class="login-view">
    <div class="container py-md-5 py-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="auth-card">
            <div class="card shadow border-0">
              <div
                class="card-header bg-primary text-white text-center py-3 border-0"
              >
                <h2 class="mb-0 fw-bold">Welcome Back</h2>
              </div>
              <div class="card-body p-4 p-md-5">
              
                <div
                  v-if="errorMessage"
                  class="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{{ errorMessage }}</div>
                </div>
                
                <form @submit.prevent="handleLogin">
            
                  <div class="mb-4">
                    <label for="email" class="form-label">Email Address</label>
                    <div class="input-group input-group-lg">
                      <span class="input-group-text bg-light">
                        <i class="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="email"
                        placeholder="Enter your email"
                        required
                        @blur="validateEmail"
                      />
                    </div>
                    <div v-if="emailError" class="text-danger mt-2 small">
                      <i class="bi bi-info-circle me-1"></i>{{ emailError }}
                    </div>
                  </div>

                  
                  <div class="mb-4">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group input-group-lg">
                      <span class="input-group-text bg-light">
                        <i class="bi bi-lock"></i>
                      </span>
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        id="password"
                        v-model="password"
                        placeholder="Enter your password"
                        required
                        @blur="validatePassword"
                      />
                      <button
                        class="btn btn-outline-secondary px-3"
                        type="button"
                        @click="togglePasswordVisibility"
                        aria-label="Toggle password visibility"
                      >
                        <i
                          :class="
                            showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                    <div v-if="passwordError" class="text-danger mt-2 small">
                      <i class="bi bi-info-circle me-1"></i>{{ passwordError }}
                    </div>
                  </div>

     
                  <div
                    class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2"
                  >
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="rememberMe"
                        v-model="rememberMe"
                      />
                      <label class="form-check-label" for="rememberMe"
                        >Remember me</label
                      >
                    </div>
                    <a
                      href="#"
                      class="text-decoration-none fw-medium"
                      @click.prevent="forgotPassword"
                    >
                      Forgot Password?
                    </a>
                  </div>

       
                  <div class="d-grid">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg px-5 py-3"
                      :disabled="isLoading"
                    >
                      <span
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {{ isLoading ? "Logging in..." : "Login" }}
                    </button>
                  </div>
                </form>

         
                <div class="text-center mt-4 pt-2">
                  <p class="mb-0">
                    Don't have an account?
                    <router-link to="/signup" class="fw-medium"
                      >Sign Up Here</router-link
                    >
                  </p>
                </div>
              </div>
            </div>

         
            <div class="quick-links text-center mt-4">
              <div class="d-flex justify-content-center gap-3">
                <router-link to="/" class="btn btn-sm btn-light">
                  <i class="bi bi-house me-1"></i> Home
                </router-link>
                <router-link to="/health-tips" class="btn btn-sm btn-light">
                  <i class="bi bi-lightbulb me-1"></i> Health Tips
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);


const emailError = ref("");
const passwordError = ref("");
const errorMessage = ref("");
const isLoading = ref(false);


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = "";

  if (!email.value) {
    emailError.value = "Email is required";
    return false;
  } else if (!emailRegex.test(email.value)) {
    emailError.value = "Please enter a valid email address";
    return false;
  }

  return true;
};


const validatePassword = () => {
  passwordError.value = "";

  if (!password.value) {
    passwordError.value = "Password is required";
    return false;
  }

  return true;
};

const forgotPassword = () => {
  if (!email.value) {
    errorMessage.value = "Please enter your email address first";
    return;
  }

  if (!validateEmail()) {
    return;
  }

  errorMessage.value = "";
  alert(`Password reset instructions sent to ${email.value}`);
};

const handleLogin = () => {

  errorMessage.value = "";

 
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) {
    return;
  }

  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;


    if (email.value === "user@example.com" && password.value === "password") {
   
      const user = {
        name: "John Doe",
        email: email.value,
        phone: "123-456-7890",
        id: "1",
        userType: "patient",
      };
   
      if (rememberMe.value) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      const notification = {
        title: "Welcome back",
        message: `Good to see you again, ${user.name}!`,
      };
      localStorage.setItem("notification", JSON.stringify(notification)); 
      window.dispatchEvent(new CustomEvent("userStateChanged"));
      window.dispatchEvent(new CustomEvent("notificationChanged"));

     
      setTimeout(() => {
        router.push("/");
      }, 100);
    } else {
   
      errorMessage.value = "Invalid email or password. Please try again.";
    }
  }, 1000);
};
</script>

<style scoped>
.login-view {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  position: relative;
}

.login-view::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: rgba(13, 110, 253, 0.03);
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  z-index: 0;
}

.auth-card {
  position: relative;
  z-index: 1;
}

.card {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #0d6efd, #0b5ed7);
}

.form-control,
.input-group-text {
  border-color: #e9ecef;
}

.input-group-text {
  color: #6c757d;
}

.form-control:focus,
.btn:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #0d6efd;
}

.btn-primary {
  background: linear-gradient(135deg, #0d6efd, #0b5ed7);
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary::after {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
  transform: rotateZ(60deg) translate(-5em, 7.5em);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: rotateZ(60deg) translate(-5em, 7.5em);
  }
  100% {
    transform: rotateZ(60deg) translate(0, -7.5em);
  }
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.quick-links .btn {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
}

.quick-links .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Responsive styles */
@media (max-width: 768px) {
  .login-view {
    min-height: calc(100vh - 150px);
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: #fff;
  }

  .login-view::before {
    width: 100%;
    height: 30%;
    clip-path: polygon(100% 0, 0% 0, 100% 100%);
    opacity: 0.5;
  }

  .card {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05) !important;
  }

  .card-body {
    padding: 1.5rem !important;
  }
}

@media (max-width: 576px) {
  .input-group-lg .input-group-text,
  .input-group-lg .form-control {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
  }

  .card-header h2 {
    font-size: 1.5rem;
  }

  .login-view::before {
    display: none;
  }

  .quick-links {
    margin-top: 1rem !important;
  }

  .quick-links .btn {
    width: 100%;
    border-radius: 0.5rem;
  }

  .quick-links .d-flex {
    flex-direction: column;
    gap: 0.5rem !important;
  }
}
</style>
