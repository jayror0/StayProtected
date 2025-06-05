<template>
  <div class="profile-view">
    <div class="container py-4">
      <h2 class="mb-4">Your Profile</h2>

      <div class="row">
        <div class="col-lg-4 mb-4 mb-lg-0">

          <div class="card shadow-sm">
            <div class="card-body text-center">
              <div class="profile-image-container mb-3">
                <div class="profile-avatar">
                  {{ userInitials }}
                </div>
              </div>

              <h5 class="card-title">{{ user.name }}</h5>
              <p class="text-muted mb-1">
                <i class="bi bi-person-badge me-2"></i>
                {{ formattedUserType }}
              </p>

        
              <div
                v-if="user.userType === 'doctor'"
                class="doctor-info mt-3 text-start"
              >
                <p class="mb-2">
                  <i class="bi bi-star-fill text-warning me-2"></i>
                  <strong>Rating:</strong> {{ user.rating || "No ratings yet" }}
                </p>
                <p class="mb-2">
                  <i class="bi bi-briefcase-fill me-2"></i>
                  <strong>Specialty:</strong>
                  {{ formatSpecialty(user.speciality) }}
                </p>
                <p>
                  <i class="bi bi-award me-2"></i>
                  <strong>Experience:</strong> {{ user.experience }} years
                </p>
                <div v-if="user.bio" class="mt-3">
                  <h6>About</h6>
                  <p class="small">{{ user.bio }}</p>
                </div>
              </div>

              <div class="d-grid mt-3">
                <button
                  class="btn btn-outline-primary"
                  @click="showEditForm = !showEditForm"
                >
                  <i class="bi bi-pencil me-2"></i>
                  {{ showEditForm ? "Cancel Edit" : "Edit Profile" }}
                </button>
              </div>
            </div>
          </div>

          <div class="card shadow-sm mt-4">
            <div class="card-header bg-light">
              <h5 class="mb-0">Contact Information</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <div class="d-flex align-items-center">
                  <div class="contact-icon">
                    <i class="bi bi-envelope"></i>
                  </div>
                  <div>
                    <div class="text-muted small">Email</div>
                    <div>{{ user.email }}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="d-flex align-items-center">
                  <div class="contact-icon">
                    <i class="bi bi-telephone"></i>
                  </div>
                  <div>
                    <div class="text-muted small">Phone</div>
                    <div>{{ user.phone }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-8">
      
          <div v-if="showEditForm" class="card shadow-sm mb-4">
            <div class="card-header bg-light">
              <h5 class="mb-0">Edit Profile</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="saveProfile">
              
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="editForm.name"
                    required
                  />
                </div>

       
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="user.email"
                    readonly
                  />
                  <small class="text-muted"
                    >Email cannot be changed as it is your unique
                    identifier.</small
                  >
                </div>


                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="editForm.phone"
                    placeholder="XXX-XXX-XXXX"
                    required
                  />
                </div>

   
                <div v-if="user.userType === 'doctor'" class="doctor-fields">
     
                  <div class="mb-3">
                    <label for="bio" class="form-label">Professional Bio</label>
                    <textarea
                      class="form-control"
                      id="bio"
                      v-model="editForm.bio"
                      rows="3"
                      placeholder="Tell us about your professional experience"
                    ></textarea>
                  </div>
                </div>

                <div class="d-flex gap-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isSubmitting"
                  >
                    <span
                      v-if="isSubmitting"
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {{ isSubmitting ? "Saving..." : "Save Changes" }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="showEditForm = false"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>


          <div v-else class="row g-4">
   
            <div class="col-md-12">
              <div class="card shadow-sm">
                <div class="card-header bg-light">
                  <h5 class="mb-0">Activity Summary</h5>
                </div>
                <div class="card-body">
                  <div class="row text-center">
                    <div class="col-4">
                      <div class="activity-stat">
                        <div
                          class="activity-icon bg-primary-soft rounded-circle mb-2"
                        >
                          <i class="bi bi-calendar-check text-primary"></i>
                        </div>
                        <h3>{{ stats.appointments }}</h3>
                        <div class="text-muted small">Appointments</div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="activity-stat">
                        <div
                          class="activity-icon bg-success-soft rounded-circle mb-2"
                        >
                          <i class="bi bi-chat-text text-success"></i>
                        </div>
                        <h3>{{ stats.consultations }}</h3>
                        <div class="text-muted small">Consultations</div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="activity-stat">
                        <div
                          class="activity-icon bg-warning-soft rounded-circle mb-2"
                        >
                          <i class="bi bi-star text-warning"></i>
                        </div>
                        <h3>{{ stats.reviews }}</h3>
                        <div class="text-muted small">Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

     
            <div v-if="user.userType === 'patient'" class="col-md-6">
              <div class="card shadow-sm h-100">
                <div class="card-header bg-light">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5 class="mb-0">Medical History</h5>
                    <button class="btn btn-sm btn-outline-primary">Edit</button>
                  </div>
                </div>
                <div class="card-body">
                  <div
                    v-if="medicalHistory.length === 0"
                    class="text-center p-4"
                  >
                    <i class="bi bi-clipboard-plus display-4 text-muted"></i>
                    <p class="mt-3">No medical history added yet.</p>
                    <button class="btn btn-sm btn-primary">
                      Add Medical History
                    </button>
                  </div>
                  <ul v-else class="list-group list-group-flush">
                    <li
                      v-for="(item, index) in medicalHistory"
                      :key="index"
                      class="list-group-item px-0"
                    >
                      <div class="d-flex justify-content-between">
                        <div>
                          <h6 class="mb-1">{{ item.condition }}</h6>
                          <small class="text-muted">{{ item.details }}</small>
                        </div>
                        <span class="badge bg-secondary">{{ item.year }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

        
            <div v-if="user.userType === 'doctor'" class="col-md-6">
              <div class="card shadow-sm h-100">
                <div class="card-header bg-light">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5 class="mb-0">Working Hours</h5>
                    <button class="btn btn-sm btn-outline-primary">Edit</button>
                  </div>
                </div>
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <li
                      v-for="(hours, day) in workingHours"
                      :key="day"
                      class="list-group-item px-0"
                    >
                      <div class="d-flex justify-content-between">
                        <span>{{ day }}</span>
                        <span>{{ hours }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

         
            <div v-if="user.userType === 'patient'" class="col-md-6">
              <div class="card shadow-sm h-100">
                <div class="card-header bg-light">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5 class="mb-0">Allergies</h5>
                    <button class="btn btn-sm btn-outline-primary">Edit</button>
                  </div>
                </div>
                <div class="card-body">
                  <div v-if="allergies.length === 0" class="text-center p-4">
                    <i class="bi bi-shield-check display-4 text-muted"></i>
                    <p class="mt-3">No allergies added yet.</p>
                    <button class="btn btn-sm btn-primary">
                      Add Allergies
                    </button>
                  </div>
                  <ul v-else class="list-unstyled">
                    <li
                      v-for="(allergy, index) in allergies"
                      :key="index"
                      class="mb-2"
                    >
                      <div class="d-flex align-items-center">
                        <div class="me-2">
                          <i class="bi bi-exclamation-triangle text-danger"></i>
                        </div>
                        <div>
                          <strong>{{ allergy.name }}</strong>
                          <p class="mb-0 small text-muted">
                            {{ allergy.reaction }}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

         
            <div v-if="user.userType === 'doctor'" class="col-md-6">
              <div class="card shadow-sm h-100">
                <div class="card-header bg-light">
                  <h5 class="mb-0">Recent Patients</h5>
                </div>
                <div class="card-body">
                  <div
                    v-if="recentPatients.length === 0"
                    class="text-center p-4"
                  >
                    <i class="bi bi-people display-4 text-muted"></i>
                    <p class="mt-3">No recent patients yet.</p>
                  </div>
                  <ul v-else class="list-group list-group-flush">
                    <li
                      v-for="(patient, index) in recentPatients"
                      :key="index"
                      class="list-group-item px-0"
                    >
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h6 class="mb-0">{{ patient.name }}</h6>
                          <small class="text-muted">{{ patient.date }}</small>
                        </div>
                        <div
                          class="badge"
                          :class="
                            patient.type === 'appointment'
                              ? 'bg-primary'
                              : 'bg-success'
                          "
                        >
                          {{
                            patient.type === "appointment"
                              ? "Appointment"
                              : "Instant"
                          }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";


const user = ref({
  name: "",
  email: "",
  phone: "",
  userType: "patient",
});


const editForm = ref({
  name: "",
  phone: "",
  bio: "",
});


const showEditForm = ref(false);
const isSubmitting = ref(false);


const medicalHistory = ref([
  {
    condition: "Appendectomy",
    details: "Surgical removal of appendix",
    year: "2022",
  },
  {
    condition: "Asthma",
    details: "Mild, controlled with inhaler",
    year: "2010",
  },
]);

const allergies = ref([
  { name: "Penicillin", reaction: "Hives and difficulty breathing" },
  { name: "Shellfish", reaction: "Skin rash and swelling" },
]);


const workingHours = ref({
  Monday: "9:00 AM - 5:00 PM",
  Tuesday: "9:00 AM - 5:00 PM",
  Wednesday: "10:00 AM - 6:00 PM",
  Thursday: "9:00 AM - 5:00 PM",
  Friday: "9:00 AM - 4:00 PM",
  Saturday: "Closed",
  Sunday: "Closed",
});

const recentPatients = ref([
  { name: "John Smith", date: "June 8, 2025", type: "appointment" },
  { name: "Mary Johnson", date: "June 7, 2025", type: "instant" },
  { name: "Robert Davis", date: "June 5, 2025", type: "appointment" },
]);


const stats = ref({
  appointments: 0,
  consultations: 0,
  reviews: 0,
});


const formatSpecialty = (specialty) => {
  if (!specialty) return "";
  return specialty.charAt(0).toUpperCase() + specialty.slice(1);
};


const userInitials = computed(() => {
  if (!user.value.name) return "";
  return user.value.name
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
});


const formattedUserType = computed(() => {
  if (user.value.userType === "doctor") {
    return "Doctor";
  } else {
    return "Patient";
  }
});


const saveProfile = () => {
  isSubmitting.value = true;


  setTimeout(() => {
  
    user.value.name = editForm.value.name;
    user.value.phone = editForm.value.phone;

    if (user.value.userType === "doctor" && editForm.value.bio) {
      user.value.bio = editForm.value.bio;
    }

 
    localStorage.setItem("user", JSON.stringify(user.value));


    isSubmitting.value = false;
    showEditForm.value = false;


    alert("Profile updated successfully");
  }, 1000);
};

onMounted(() => {

  const userData = localStorage.getItem("user");
  if (userData) {
    const parsedUser = JSON.parse(userData);
    user.value = parsedUser;

 
    editForm.value.name = parsedUser.name || "";
    editForm.value.phone = parsedUser.phone || "";
    editForm.value.bio = parsedUser.bio || "";
  }


  const appointment = localStorage.getItem("appointment");
  const instantConsultation = localStorage.getItem("instantConsultation");
  const consultations = JSON.parse(
    localStorage.getItem("consultations") || "[]"
  );
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");


  stats.value.appointments = appointment ? 1 : 0;
  stats.value.consultations = instantConsultation ? 1 : 0;
  stats.value.appointments += consultations.filter(
    (c) => c.type === "appointment"
  ).length;
  stats.value.consultations += consultations.filter(
    (c) => c.type === "instant"
  ).length;


  const userReviews = reviews.filter((r) => r.patientName === user.value.name);
  stats.value.reviews = userReviews.length;
});
</script>

<style scoped>
.profile-image-container {
  display: flex;
  justify-content: center;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #0d6efd;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(13, 110, 253, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  color: #0d6efd;
}

.activity-stat {
  padding: 1rem 0.5rem;
}

.activity-icon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 1.5rem;
}

.bg-primary-soft {
  background-color: rgba(13, 110, 253, 0.1);
}

.bg-success-soft {
  background-color: rgba(25, 135, 84, 0.1);
}

.bg-warning-soft {
  background-color: rgba(255, 193, 7, 0.1);
}

.doctor-info {
  border-top: 1px solid #dee2e6;
  padding-top: 1rem;
}

.card {
  border: none;
  border-radius: 0.5rem;
}

.card-header {
  border-bottom: 1px solid #dee2e6;
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
