<template>
  <div class="instant-consultation-view">
    <div class="container py-4">
      <h2 class="mb-4">Instant Consultation</h2>

      <div class="card mb-4 shadow-sm border-0">
        <div class="card-body p-0">
          <div class="row g-0 align-items-center">
            <div class="col-md-8">
              <div class="p-4">
                <div class="badge bg-success mb-2 py-2 px-3">
                  Available 24/7
                </div>
                <h4 class="card-title mb-3">Get Immediate Medical Advice</h4>
                <p class="card-text mb-4">
                  Connect with available doctors right now for urgent concerns
                  or quick medical advice. No appointment needed – get help
                  immediately!
                </p>
                <ul class="check-list mb-0">
                  <li>
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    <span>Immediate access to healthcare professionals</span>
                  </li>
                  <li>
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    <span>No waiting for appointment dates</span>
                  </li>
                  <li>
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    <span>Quick medical guidance for non-emergency issues</span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-md-4 text-center p-4 d-flex align-items-center justify-content-center bg-success bg-opacity-10"
            >
              <div class="rounded-circle bg-white p-3 shadow-sm">
                <i class="bi bi-headset consultation-icon text-success"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div class="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                  <i class="bi bi-search fs-4 text-primary"></i>
                </div>
                <h5 class="card-title mb-0">Find Available Doctors</h5>
              </div>

              <p class="text-muted mb-4">
                Select your required medical specialty to see doctors available
                for instant consultation right now.
              </p>

              <div class="specialty-selection mb-3">
                <label for="specialty" class="form-label fw-medium"
                  >Search by Specialty</label
                >
                <select
                  class="form-select form-select-lg shadow-sm"
                  id="specialty"
                  v-model="selectedSpecialty"
                  @change="searchDoctors"
                >
                  <option value="" selected>Select a specialty</option>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="gynecologist">Gynecologist</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="pediatrician">Pediatrician</option>
                  <option value="psychiatrist">Psychiatrist</option>
                  <option value="orthopedic">Orthopedic</option>
                  <option value="general">General Physician</option>
                </select>
              </div>

              <div
                class="specialty-icons d-flex justify-content-center mt-4 pt-2 pb-2 overflow-auto"
              >
                <div
                  class="specialty-icon-item mx-2 text-center"
                  v-for="specialty in [
                    'cardiologist',
                    'dermatologist',
                    'gynecologist',
                    'neurologist',
                    'pediatrician',
                    'psychiatrist',
                    'orthopedic',
                    'general',
                  ]"
                  @click="
                    selectedSpecialty = specialty;
                    searchDoctors();
                  "
                  :class="{ active: selectedSpecialty === specialty }"
                >
                  <div class="icon-wrapper mb-2">
                    <i class="bi" :class="getSpecialtyIcon(specialty)"></i>
                  </div>
                  <small>{{ formatSpecialty(specialty) }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div
        v-if="selectedSpecialty && availableDoctors.length > 0"
        class="row mb-5"
      >
        <div class="col-12">
          <div
            class="section-header d-flex flex-wrap justify-content-between align-items-center mb-4"
          >
            <h3 class="mb-0">
              <i
                class="bi bi-circle-fill text-success me-2"
                style="font-size: 0.5rem; vertical-align: middle"
              ></i>
              Doctors Available Now
            </h3>
            <div class="d-flex align-items-center">
              <span class="text-muted me-2">Sort by:</span>
              <select class="form-select form-select-sm">
                <option>Rating (High to Low)</option>
                <option>Experience (Most to Least)</option>
              </select>
            </div>
          </div>
        </div>

        <div
          class="col-lg-4 col-md-6 mb-4"
          v-for="doctor in availableDoctors"
          :key="doctor.id"
        >
          <div class="card shadow-sm h-100 online-doctor-card border-0">
            <div class="card-body p-4">
              <div class="position-relative mb-4">
                <span class="online-badge">
                  <i class="bi bi-circle-fill online-indicator me-1"></i
                  >Available Now
                </span>

                <div class="doctor-avatar d-flex align-items-center">
                  <div
                    class="avatar-placeholder bg-primary bg-opacity-10 text-primary me-3"
                  >
                    {{ doctor.name.charAt(0) }}
                  </div>
                  <div>
                    <h5 class="card-title mb-1">Dr. {{ doctor.name }}</h5>
                    <span class="badge bg-primary mb-0">{{
                      formatSpecialty(doctor.speciality)
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="doctor-info mb-4">
                <div class="row g-3">
                  <div class="col-6">
                    <div class="info-item">
                      <small class="text-muted d-block">Experience</small>
                      <span class="fw-medium"
                        >{{ doctor.experience }} years</span
                      >
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="info-item">
                      <small class="text-muted d-block">Rating</small>
                      <div class="d-flex align-items-center">
                        <span class="fw-medium me-2">{{ doctor.rating }}</span>
                        <div class="stars">
                          <i
                            v-for="star in 5"
                            :key="star"
                            class="bi"
                            :class="
                              star <= Math.floor(doctor.rating)
                                ? 'bi-star-fill text-warning'
                                : star <= Math.ceil(doctor.rating) &&
                                  star > Math.floor(doctor.rating)
                                ? 'bi-star-half text-warning'
                                : 'bi-star text-muted'
                            "
                          >
                          </i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-grid">
                <button class="btn btn-success" @click="selectDoctor(doctor)">
                  <i class="bi bi-telephone-fill me-2"></i>
                  Consult Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        v-else-if="selectedSpecialty && availableDoctors.length === 0"
        class="alert alert-info"
        role="alert"
      >
        <i class="bi bi-info-circle-fill me-2"></i>
        No doctors available for this specialty right now. Please try another
        specialty or check back later.
      </div>

  
      <div v-if="selectedDoctor" class="consultation-modal">
        <div class="modal-backdrop" @click="closeConsultationModal"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Instant Consultation with Dr. {{ selectedDoctor.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeConsultationModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-success mb-3">
              <i class="bi bi-clock-fill me-2"></i>
              Doctor is available now! Fill in your details to connect
              immediately.
            </div>

            <form @submit.prevent="startConsultation">
      
              <div class="mb-3">
                <label for="patientName" class="form-label">Patient Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="patientName"
                  v-model="consultationData.patientName"
                  required
                />
              </div>

        
              <div class="mb-4">
                <label for="phone" class="form-label">Phone Number</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  v-model="consultationData.phone"
                  placeholder="XXX-XXX-XXXX"
                  required
                />
              </div>

       
              <div class="d-grid">
                <button
                  type="submit"
                  class="btn btn-success"
                  :disabled="isProcessing"
                >
                  <span
                    v-if="isProcessing"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{
                    isProcessing ? "Connecting..." : "Start Consultation Now"
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <div v-if="showCancelModal" class="consultation-modal">
        <div class="modal-backdrop" @click="closeCancelModal"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">End Consultation</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeCancelModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-warning mb-4">
              Are you sure you want to end your consultation with Dr.
              {{ activeConsultation.doctorName }}?
            </div>

            <div class="consultation-details mb-4">
              <h6>Consultation Details:</h6>
              <ul class="list-group">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>Patient Name:</span>
                  <span>{{ activeConsultation.patientName }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>Start Time:</span>
                  <span>{{ activeConsultation.startTime }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>Duration:</span>
                  <span>{{ consultationDuration }}</span>
                </li>
              </ul>
            </div>

            <div class="d-flex gap-2">
              <button
                class="btn btn-secondary flex-grow-1"
                @click="closeCancelModal"
              >
                Continue Consultation
              </button>
              <button
                class="btn btn-danger flex-grow-1"
                @click="endConsultation"
                :disabled="isEnding"
              >
                <span
                  v-if="isEnding"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {{ isEnding ? "Ending..." : "End Consultation" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasActiveConsultation" class="row mt-5 mb-4">
        <div class="col-12">
          <div class="card border-0 active-consultation-card">
            <div class="card-header bg-success text-white py-3">
              <div class="d-flex align-items-center">
                <div class="rounded-circle bg-white p-2 me-3">
                  <i class="bi bi-telephone-fill text-success"></i>
                </div>
                <div>
                  <span class="d-block small">Active Session</span>
                  <h5 class="mb-0 fw-bold">Consultation in Progress</h5>
                </div>
                <div class="ms-auto">
                  <span class="badge bg-white text-success p-2 active-time">
                    <i class="bi bi-clock-fill me-1"></i>
                    {{ consultationDuration }}
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body p-4">
              <div class="row g-4">
                <div class="col-md-8">
                  <div class="consultation-details">
                    <div class="active-doctor mb-4">
                      <div class="d-flex align-items-center">
                        <div
                          class="avatar-placeholder bg-success bg-opacity-10 text-success me-3"
                        >
                          {{ activeConsultation.doctorName.charAt(0) }}
                        </div>
                        <div>
                          <h5 class="mb-1">
                            Dr. {{ activeConsultation.doctorName }}
                          </h5>
                          <span class="badge bg-primary">{{
                            formatSpecialty(activeConsultation.doctorSpecialty)
                          }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="consultation-info">
                      <div class="info-row d-flex mb-2">
                        <div
                          class="info-label text-muted me-2"
                          style="width: 100px"
                        >
                          Patient:
                        </div>
                        <div class="info-value fw-medium">
                          {{ activeConsultation.patientName }}
                        </div>
                      </div>
                      <div class="info-row d-flex mb-2">
                        <div
                          class="info-label text-muted me-2"
                          style="width: 100px"
                        >
                          Started at:
                        </div>
                        <div class="info-value fw-medium">
                          {{ activeConsultation.startTime }}
                        </div>
                      </div>
                      <div class="info-row d-flex mb-0">
                        <div
                          class="info-label text-muted me-2"
                          style="width: 100px"
                        >
                          Session ID:
                        </div>
                        <div class="info-value fw-medium">
                          #{{ activeConsultation.id }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex flex-column h-100 justify-content-center">
                    <div class="alert alert-warning mb-3">
                      <small
                        ><i class="bi bi-exclamation-triangle-fill me-2"></i
                        >Ending this consultation will close your current
                        session.</small
                      >
                    </div>
                    <button
                      class="btn btn-danger"
                      @click="showCancelModal = true"
                    >
                      <i class="bi bi-telephone-x-fill me-2"></i>
                      End Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!hasActiveConsultation && !selectedSpecialty"
        class="mt-5 mb-4"
      >
        <h4 class="mb-4">How It Works</h4>
        <div class="row g-3">
          <div class="col-md-4 col-sm-6 mb-3">
            <div class="card h-100 how-it-works-card">
              <div class="card-body text-center p-4">
                <div
                  class="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3 mx-auto"
                >
                  <i class="bi bi-search fs-1 text-primary"></i>
                </div>
                <h5 class="card-title">1. Select Specialty</h5>
                <p class="card-text">
                  Choose the medical specialty that matches your health concern.
                </p>
                <div class="step-indicator d-none d-md-block">
                  <div class="step-line bg-primary"></div>
                  <div class="step-number bg-primary">1</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 mb-3">
            <div class="card h-100 how-it-works-card">
              <div class="card-body text-center p-4">
                <div
                  class="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3 mx-auto"
                >
                  <i class="bi bi-person-check fs-1 text-success"></i>
                </div>
                <h5 class="card-title">2. Choose a Doctor</h5>
                <p class="card-text">
                  Select from available doctors who are online and ready to
                  help.
                </p>
                <div class="step-indicator d-none d-md-block">
                  <div class="step-line bg-success"></div>
                  <div class="step-number bg-success">2</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 mb-3">
            <div class="card h-100 how-it-works-card">
              <div class="card-body text-center p-4">
                <div
                  class="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3 mx-auto"
                >
                  <i class="bi bi-chat-text fs-1 text-info"></i>
                </div>
                <h5 class="card-title">3. Start Consultation</h5>
                <p class="card-text">
                  Enter your details and connect immediately with the doctor.
                </p>
                <div class="step-indicator d-none d-md-block">
                  <div class="step-number bg-info">3</div>
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


const selectedSpecialty = ref("");
const availableDoctors = ref([]);
const selectedDoctor = ref(null);
const consultationData = ref({
  patientName: "",
  phone: "",
});
const isProcessing = ref(false);
const isEnding = ref(false);
const showCancelModal = ref(false);
const activeConsultation = ref(null);
const hasActiveConsultation = ref(false);
const startTimestamp = ref(null);
const consultationDuration = ref("0 minutes");
let durationInterval = null;

const user = JSON.parse(localStorage.getItem("user") || "{}");


onMounted(() => {
  const savedConsultation = localStorage.getItem("instantConsultation");
  if (savedConsultation) {
    activeConsultation.value = JSON.parse(savedConsultation);
    hasActiveConsultation.value = true;
    startTimestamp.value = new Date(
      activeConsultation.value.startTimestamp
    ).getTime();
    updateConsultationDuration();


    durationInterval = setInterval(updateConsultationDuration, 60000); 
  }


  if (user.name) {
    consultationData.value.patientName = user.name;
  }

  if (user.phone) {
    consultationData.value.phone = user.phone;
  }
});


onBeforeUnmount(() => {
  if (durationInterval) {
    clearInterval(durationInterval);
  }
});


const formatSpecialty = (specialty) => {
  if (!specialty) return "";
  return specialty.charAt(0).toUpperCase() + specialty.slice(1);
};


const getSpecialtyIcon = (specialty) => {
  const icons = {
    cardiologist: "bi-heart-pulse",
    dermatologist: "bi-bandaid",
    gynecologist: "bi-gender-female",
    neurologist: "bi-brain",
    pediatrician: "bi-people",
    psychiatrist: "bi-emoji-smile",
    orthopedic: "bi-bone",
    general: "bi-activity",
  };
  return icons[specialty] || "bi-shield-plus";
};


const updateConsultationDuration = () => {
  if (!startTimestamp.value) return;

  const now = Date.now();
  const durationMs = now - startTimestamp.value;
  const durationMinutes = Math.floor(durationMs / (1000 * 60));

  if (durationMinutes < 60) {
    consultationDuration.value = `${durationMinutes} minute${
      durationMinutes !== 1 ? "s" : ""
    }`;
  } else {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    consultationDuration.value = `${hours} hour${
      hours !== 1 ? "s" : ""
    } ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
};


const searchDoctors = () => {
  if (!selectedSpecialty.value) return;


  setTimeout(() => {
   
    availableDoctors.value = [
      {
        id: 1,
        name: "Emily Chen",
        speciality: selectedSpecialty.value,
        experience: 8,
        rating: 4.9,
        isOnline: true,
      },
      {
        id: 2,
        name: "David Wilson",
        speciality: selectedSpecialty.value,
        experience: 5,
        rating: 4.6,
        isOnline: true,
      },
      {
        id: 3,
        name: "Susan Taylor",
        speciality: selectedSpecialty.value,
        experience: 12,
        rating: 4.8,
        isOnline: true,
      },
    ];
  }, 500);
};

const selectDoctor = (doctor) => {
  selectedDoctor.value = doctor;
};

l
const closeConsultationModal = () => {
  selectedDoctor.value = null;
};


const startConsultation = () => {
  isProcessing.value = true;

 
  setTimeout(() => {
    isProcessing.value = false;

  
    const now = new Date();
    const startTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  
    const consultation = {
      id: Math.floor(Math.random() * 1000),
      doctorId: selectedDoctor.value.id,
      doctorName: selectedDoctor.value.name,
      doctorSpecialty: selectedDoctor.value.speciality,
      patientName: consultationData.value.patientName,
      phone: consultationData.value.phone,
      startTime: startTime,
      startTimestamp: now.toISOString(),
    };

    localStorage.setItem("instantConsultation", JSON.stringify(consultation));

    const notification = {
      title: "Consultation Started",
      message: `You are now consulting with Dr. ${selectedDoctor.value.name}.`,
      type: "success",
    };

    localStorage.setItem("notification", JSON.stringify(notification));


    activeConsultation.value = consultation;
    hasActiveConsultation.value = true;
    selectedDoctor.value = null;
    startTimestamp.value = now.getTime();
    updateConsultationDuration();


    durationInterval = setInterval(updateConsultationDuration, 60000); 


    consultationData.value = {
      patientName: user.name || "",
      phone: user.phone || "",
    };


    window.location.reload();
  }, 1500);
};


const closeCancelModal = () => {
  showCancelModal.value = false;
};


const endConsultation = () => {
  isEnding.value = true;


  setTimeout(() => {

    localStorage.removeItem("instantConsultation");
    localStorage.removeItem("notification");


    if (durationInterval) {
      clearInterval(durationInterval);
    }


    activeConsultation.value = null;
    hasActiveConsultation.value = false;
    showCancelModal.value = false;
    isEnding.value = false;


    window.location.reload();
  }, 1000);
};
</script>

<style scoped>
.consultation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  backdrop-filter: blur(3px);
}

.modal-content {
  background-color: white;
  border-radius: var(--border-radius-md);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: transform var(--transition-speed) ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: var(--space-lg);
}

.consultation-icon {
  font-size: 4rem;
  color: #20c997;
  transition: transform var(--transition-speed);
}

.consultation-icon:hover {
  transform: scale(1.05);
}

/* Check list styling */
.check-list {
  list-style: none;
  padding-left: 0;
  margin-top: var(--space-md);
}

.check-list li {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-sm);
  padding: var(--space-xs) 0;
}

.check-list li i {
  font-size: 1.2rem;
  margin-right: var(--space-sm);
  flex-shrink: 0;
}

/* Doctor card styling */
.online-doctor-card {
  border-left: 4px solid #20c997;
  transition: transform var(--transition-speed),
    box-shadow var(--transition-speed);
  cursor: pointer;
}

.online-doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.1);
}

.stars {
  display: flex;
}

.online-badge {
  font-size: 0.8rem;
  color: #20c997;
  display: flex;
  align-items: center;
  background-color: rgba(32, 201, 151, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
}

.online-indicator {
  color: #20c997;
  font-size: 0.5rem;
  margin-right: var(--space-xs);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

/* How it works section */
.how-it-works-card {
  transition: transform var(--transition-speed),
    box-shadow var(--transition-speed);
  overflow: hidden;
  border: none;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

.how-it-works-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

/* Active consultation styling */
.active-consultation-card {
  overflow: hidden;
  border-color: #20c997;
  border-width: 2px;
  transition: all var(--transition-speed);
}

.active-consultation-card:hover {
  box-shadow: 0 0.5rem 1rem rgba(32, 201, 151, 0.15);
}

/* Step indicators */
.step-indicator {
  position: relative;
  height: 30px;
  margin-top: var(--space-md);
}

.step-line {
  position: absolute;
  top: 15px;
  right: -50%;
  width: 100%;
  height: 2px;
  z-index: 1;
}

.step-number {
  position: absolute;
  top: 0;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  z-index: 2;
}

/* Specialty icons styling */
.specialty-icons {
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.specialty-icons::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.specialty-icon-item {
  display: inline-block;
  width: 80px;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.specialty-icon-item:hover {
  transform: translateY(-3px);
}

.specialty-icon-item .icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: #f8f9fa;
  transition: all var(--transition-speed);
}

.specialty-icon-item .icon-wrapper i {
  font-size: 1.5rem;
  color: var(--secondary-color);
}

.specialty-icon-item.active .icon-wrapper {
  background-color: var(--primary-color);
  box-shadow: 0 0.25rem 0.75rem rgba(13, 110, 253, 0.25);
}

.specialty-icon-item.active .icon-wrapper i {
  color: white;
}

.specialty-icon-item.active small {
  color: var(--primary-color);
  font-weight: 600;
}

/* Doctor card styling enhancements */
.doctor-avatar {
  padding-bottom: var(--space-sm);
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.doctor-info {
  padding: var(--space-sm) 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.info-item {
  padding: var(--space-xs) 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .consultation-icon {
    font-size: 3.5rem;
    margin: var(--space-md) 0;
  }

  .modal-body {
    padding: var(--space-md);
  }

  .modal-content {
    width: 95%;
    margin: 0 var(--space-xs);
  }

  .online-doctor-card {
    margin-bottom: var(--space-md);
  }

  .how-it-works-card {
    margin-bottom: var(--space-md);
  }
}

@media (max-width: 576px) {
  .consultation-icon {
    font-size: 3rem;
  }

  .modal-header {
    padding: var(--space-sm) var(--space-md);
  }

  .modal-body {
    padding: var(--space-md);
  }

  .modal-content {
    width: 100%;
    max-height: 95vh;
    border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
    position: fixed;
    bottom: 0;
    top: auto;
    margin: 0;
  }

  .how-it-works-card .rounded-circle {
    padding: 0.75rem !important;
  }

  .how-it-works-card .fs-1 {
    font-size: 1.75rem !important;
  }

  .online-badge {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
