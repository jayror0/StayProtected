<template>
  <div class="signup-view">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-body p-5">
              <h2 class="text-center mb-4">Sign Up</h2>

            
              <div
                v-if="alertMessage"
                class="alert"
                :class="alertType"
                role="alert"
              >
                {{ alertMessage }}
              </div>

     
              <form @submit.prevent="handleSignup" novalidate>
      
                <div class="row mb-3">
                  <label class="form-label">Register as</label>
                  <div class="d-flex">
                    <div class="form-check me-4">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="userType"
                        id="patientRadio"
                        value="patient"
                        v-model="userType"
                        checked
                      />
                      <label class="form-check-label" for="patientRadio">
                        Patient
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="userType"
                        id="doctorRadio"
                        value="doctor"
                        v-model="userType"
                      />
                      <label class="form-check-label" for="doctorRadio">
                        Doctor
                      </label>
                    </div>
                  </div>
                </div>

       
                <div class="row">
               
                  <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="name"
                      placeholder="Enter your full name"
                      required
                      @blur="validateName"
                    />
                    <div v-if="nameError" class="text-danger mt-1 small">
                      {{ nameError }}
                    </div>
                  </div>

  
                  <div class="col-md-6 mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      v-model="phone"
                      placeholder="Enter your phone number"
                      required
                      @blur="validatePhone"
                    />
                    <div v-if="phoneError" class="text-danger mt-1 small">
                      {{ phoneError }}
                    </div>
                  </div>
                </div>

      
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    placeholder="Enter your email"
                    required
                    @blur="validateEmail"
                  />
                  <div v-if="emailError" class="text-danger mt-1 small">
                    {{ emailError }}
                  </div>
                </div>

                <div class="row">
   
                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label">Password</label>
                    <div class="input-group">
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
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="togglePasswordVisibility"
                      >
                        <i
                          :class="
                            showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                    <div v-if="passwordError" class="text-danger mt-1 small">
                      {{ passwordError }}
                    </div>
                  </div>

        
                  <div class="col-md-6 mb-4">
                    <label for="confirmPassword" class="form-label"
                      >Confirm Password</label
                    >
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      placeholder="Confirm your password"
                      required
                      @blur="validateConfirmPassword"
                    />
                    <div
                      v-if="confirmPasswordError"
                      class="text-danger mt-1 small"
                    >
                      {{ confirmPasswordError }}
                    </div>
                  </div>
                </div>


                <div v-if="userType === 'doctor'" class="doctor-fields">
                  <h5 class="mb-3">Professional Details</h5>

                  <div class="row">
  
                    <div class="col-md-6 mb-3">
                      <label for="speciality" class="form-label"
                        >Medical Speciality</label
                      >
                      <select
                        class="form-select"
                        id="speciality"
                        v-model="speciality"
                        required
                      >
                        <option value="" disabled selected>
                          Select your speciality
                        </option>
                        <option value="cardiologist">Cardiologist</option>
                        <option value="dermatologist">Dermatologist</option>
                        <option value="gynecologist">Gynecologist</option>
                        <option value="neurologist">Neurologist</option>
                        <option value="pediatrician">Pediatrician</option>
                        <option value="psychiatrist">Psychiatrist</option>
                        <option value="orthopedic">Orthopedic</option>
                        <option value="general">General Physician</option>
                      </select>
                      <div
                        v-if="specialityError"
                        class="text-danger mt-1 small"
                      >
                        {{ specialityError }}
                      </div>
                    </div>

    
                    <div class="col-md-6 mb-3">
                      <label for="experience" class="form-label"
                        >Years of Experience</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        id="experience"
                        v-model.number="experience"
                        min="1"
                        required
                      />
                      <div
                        v-if="experienceError"
                        class="text-danger mt-1 small"
                      >
                        {{ experienceError }}
                      </div>
                    </div>
                  </div>

     
                  <div class="mb-4">
                    <label for="bio" class="form-label">Professional Bio</label>
                    <textarea
                      class="form-control"
                      id="bio"
                      v-model="bio"
                      rows="3"
                      placeholder="Tell us about your professional background"
                    ></textarea>
                  </div>
                </div>

   
                <div class="mb-4 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="agree"
                    v-model="agreedToTerms"
                    required
                  />
                  <label class="form-check-label" for="agree">
                    I agree to the
                    <a href="#" @click.prevent="showTerms"
                      >Terms and Conditions</a
                    >
                  </label>
                  <div v-if="termsError" class="text-danger mt-1 small">
                    {{ termsError }}
                  </div>
                </div>


                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg"
                    :disabled="isLoading"
                  >
                    <span
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {{ isLoading ? "Creating Account..." : "Submit" }}
                  </button>
                </div>
              </form>

     
              <div class="text-center mt-4">
                <p>
                  Already have an account?
                  <router-link to="/login">Login Here</router-link>
                </p>
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


const userType = ref("patient");
const name = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const speciality = ref("");
const experience = ref(null);
const bio = ref("");
const agreedToTerms = ref(false);
const showPassword = ref(false);


const nameError = ref("");
const phoneError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const specialityError = ref("");
const experienceError = ref("");
const termsError = ref("");
const alertMessage = ref("");
const alertType = ref("alert-info");
const isLoading = ref(false);


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};


const showTerms = () => {
  alert("Terms and Conditions will be displayed here.");
};


const validateName = () => {
  nameError.value = "";
  if (!name.value.trim()) {
    nameError.value = "Name is required";
    return false;
  }
  return true;
};

const validatePhone = () => {
  phoneError.value = "";
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  if (!phone.value.trim()) {
    phoneError.value = "Phone number is required";
    return false;
  } else if (!phoneRegex.test(phone.value)) {
    phoneError.value =
      "Please enter a valid phone number in format XXX-XXX-XXXX";
    return false;
  }
  return true;
};

const validateEmail = () => {
  emailError.value = "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value.trim()) {
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
  } else if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters long";
    return false;
  }
  return true;
};

const validateConfirmPassword = () => {
  confirmPasswordError.value = "";
  if (!confirmPassword.value) {
    confirmPasswordError.value = "Please confirm your password";
    return false;
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = "Passwords do not match";
    return false;
  }
  return true;
};

const validateSpeciality = () => {
  if (userType.value !== "doctor") return true;

  specialityError.value = "";
  if (!speciality.value) {
    specialityError.value = "Please select a speciality";
    return false;
  }
  return true;
};

const validateExperience = () => {
  if (userType.value !== "doctor") return true;

  experienceError.value = "";
  if (!experience.value) {
    experienceError.value = "Please enter years of experience";
    return false;
  } else if (experience.value < 0) {
    experienceError.value = "Experience years cannot be negative";
    return false;
  }
  return true;
};

const validateTerms = () => {
  termsError.value = "";
  if (!agreedToTerms.value) {
    termsError.value = "You must agree to the terms and conditions";
    return false;
  }
  return true;
};

const handleSignup = () => {

  alertMessage.value = "";

 
  const validations = [
    validateName(),
    validatePhone(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword(),
    validateTerms(),
  ];


  if (userType.value === "doctor") {
    validations.push(validateSpeciality());
    validations.push(validateExperience());
  }

  if (validations.includes(false)) {
    return;
  }

  isLoading.value = true;


  setTimeout(() => {
    isLoading.value = false;

    const user = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      userType: userType.value,
      id: Math.floor(Math.random() * 1000), 
    };

    if (userType.value === "doctor") {
      user.speciality = speciality.value;
      user.experience = experience.value;
      user.bio = bio.value;
      user.rating = 0;
    }


    localStorage.setItem("user", JSON.stringify(user));


    alertType.value = "alert-success";
    alertMessage.value =
      "Account created successfully! Redirecting to home page...";

    setTimeout(() => {
      router.push("/");
    }, 1500);
  }, 1500);
};
</script>

<style scoped>
.signup-view {
  min-height: calc(100vh - 200px);
}

.card {
  border: none;
  border-radius: 1rem;
}

.form-control:focus,
.form-select:focus,
.btn:focus,
.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #0d6efd;
}

.doctor-fields {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>
