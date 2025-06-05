<template>
  <div class="appointments-view">
    <div class="container py-4">
      <div class="page-header mb-4">
        <h2 class="mb-0">Book an Appointment</h2>
        <p class="text-muted mt-2">Find a specialist and schedule your visit</p>
      </div>


      <div class="row mb-4">
        <div class="col-lg-6">
          <div class="card shadow-sm search-card">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div class="icon-circle bg-primary bg-opacity-10 me-3">
                  <i class="bi bi-search text-primary"></i>
                </div>
                <h5 class="card-title mb-0">Find a Doctor</h5>
              </div>

              <div class="mb-3">
                <label for="specialty" class="form-label"
                  >Select Specialty</label
                >
                <select
                  class="form-select form-select-lg"
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
            </div>
          </div>

     
          <div class="quick-filters mt-3 d-flex flex-wrap gap-2">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="selectedSpecialty = 'general'"
            >
              General Physician
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="selectedSpecialty = 'cardiologist'"
            >
              Cardiologist
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="selectedSpecialty = 'pediatrician'"
            >
              Pediatrician
            </button>
          </div>
        </div>
      </div>


      <div
        v-if="selectedSpecialty && doctors.length > 0"
        class="doctors-list mb-4"
      >
        <div
          class="section-header d-flex align-items-center justify-content-between mb-3"
        >
          <h3 class="mb-0">Available Doctors</h3>
          <div class="d-none d-md-block">
            <span class="badge bg-info"
              >{{ doctors.length }} doctors found</span
            >
          </div>
        </div>

        <div class="row g-3 g-md-4">
          <div
            class="col-md-6 col-lg-4"
            v-for="doctor in doctors"
            :key="doctor.id"
          >
            <div class="card shadow-sm h-100 doctor-card">
              <div class="card-body p-4">
                <div
                  class="d-flex justify-content-between align-items-start mb-2"
                >
                  <div>
                    <h5 class="card-title mb-1">Dr. {{ doctor.name }}</h5>
                    <div class="doctor-specialty mb-2">
                      <span class="badge bg-primary">{{
                        formatSpecialty(doctor.speciality)
                      }}</span>
                      <span class="ms-2 text-muted small"
                        >{{ doctor.experience }} yrs exp</span
                      >
                    </div>
                  </div>
                  <div
                    class="doctor-avatar bg-primary bg-opacity-10 text-primary rounded-circle"
                  >
                    {{ doctor.name.charAt(0) }}
                  </div>
                </div>

                <div class="mb-3">
                  <div class="d-flex align-items-center">
                    <div class="me-2">
                      <span class="badge bg-success"
                        >{{ doctor.rating }}/5</span
                      >
                    </div>
                    <div class="stars">
                      <i
                        v-for="star in 5"
                        :key="star"
                        class="bi"
                        :class="
                          star <= doctor.rating
                            ? 'bi-star-fill text-warning'
                            : 'bi-star'
                        "
                      >
                      </i>
                    </div>
                  </div>
                </div>

                <p class="card-text doctor-bio">
                  {{
                    doctor.bio ||
                    "Specialized healthcare professional dedicated to providing quality patient care."
                  }}
                </p>

                <button
                  class="btn btn-primary w-100"
                  @click="selectDoctor(doctor)"
                >
                  <i class="bi bi-calendar-plus me-2"></i>Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div
        v-else-if="selectedSpecialty && doctors.length === 0"
        class="alert alert-info"
        role="alert"
      >
        No doctors found for this specialty. Please try another specialty.
      </div>

      <div v-if="selectedDoctor" class="booking-modal">
        <div class="modal-backdrop" @click="closeBookingModal"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Book Appointment with Dr. {{ selectedDoctor.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeBookingModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="bookAppointment">
         
              <div class="mb-3">
                <label for="patientName" class="form-label">Patient Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="patientName"
                  v-model="appointmentData.patientName"
                  required
                />
              </div>

  
              <div class="mb-3">
                <label for="phone" class="form-label">Phone Number</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  v-model="appointmentData.phone"
                  placeholder="XXX-XXX-XXXX"
                  required
                />
              </div>

 
              <div class="mb-3">
                <label for="date" class="form-label">Date of Appointment</label>
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  v-model="appointmentData.date"
                  :min="minDate"
                  required
                />
              </div>

         
              <div class="mb-4">
                <label for="timeSlot" class="form-label">Time Slot</label>
                <select
                  class="form-select"
                  id="timeSlot"
                  v-model="appointmentData.timeSlot"
                  required
                >
                  <option value="" disabled selected>Select a time slot</option>
                  <option
                    v-for="slot in availableTimeSlots"
                    :key="slot"
                    :value="slot"
                  >
                    {{ slot }}
                  </option>
                </select>
              </div>

   
              <div class="d-grid">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isBooking"
                >
                  <span
                    v-if="isBooking"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{ isBooking ? "Booking..." : "Book Now" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

   
      <div v-if="showCancelModal" class="booking-modal">
        <div class="modal-backdrop" @click="closeCancelModal"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cancel Appointment</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeCancelModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-warning mb-4">
              Are you sure you want to cancel your appointment with Dr.
              {{ activeAppointment.doctorName }}?
            </div>

            <div class="appointment-details mb-4">
              <h6>Appointment Details:</h6>
              <ul class="list-group">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>Patient Name:</span>
                  <span>{{ activeAppointment.patientName }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>Date:</span>
                  <span>{{ activeAppointment.date }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>Time:</span>
                  <span>{{ activeAppointment.timeSlot }}</span>
                </li>
              </ul>
            </div>

            <div class="d-flex gap-2">
              <button
                class="btn btn-secondary flex-grow-1"
                @click="closeCancelModal"
              >
                Go Back
              </button>
              <button
                class="btn btn-danger flex-grow-1"
                @click="cancelAppointment"
                :disabled="isCancelling"
              >
                <span
                  v-if="isCancelling"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {{ isCancelling ? "Cancelling..." : "Cancel Appointment" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasActiveAppointment" class="row mt-5">
        <div class="col-12">
          <div class="card border-primary">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">Your Upcoming Appointment</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <h5>
                    Appointment with Dr. {{ activeAppointment.doctorName }}
                  </h5>
                  <p class="mb-1">
                    <strong>Patient:</strong>
                    {{ activeAppointment.patientName }}
                  </p>
                  <p class="mb-1">
                    <strong>Date:</strong> {{ activeAppointment.date }}
                  </p>
                  <p class="mb-1">
                    <strong>Time:</strong> {{ activeAppointment.timeSlot }}
                  </p>
                  <p>
                    <strong>Specialty:</strong>
                    {{ formatSpecialty(activeAppointment.doctorSpecialty) }}
                  </p>
                </div>
                <div class="col-md-4 text-end">
                  <button
                    class="btn btn-outline-danger"
                    @click="showCancelModal = true"
                  >
                    Cancel Appointment
                  </button>
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
import { useRouter } from "vue-router";

const router = useRouter();


const selectedSpecialty = ref("");
const doctors = ref([]);
const selectedDoctor = ref(null);
const appointmentData = ref({
  patientName: "",
  phone: "",
  date: "",
  timeSlot: "",
});
const isBooking = ref(false);
const isCancelling = ref(false);
const showCancelModal = ref(false);
const activeAppointment = ref(null);
const hasActiveAppointment = ref(false);


const user = JSON.parse(localStorage.getItem("user") || "{}");

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

const availableTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

onMounted(() => {
  const savedAppointment = localStorage.getItem("appointment");
  if (savedAppointment) {
    activeAppointment.value = JSON.parse(savedAppointment);
    hasActiveAppointment.value = true;
  }

  if (user.name) {
    appointmentData.value.patientName = user.name;
  }

  if (user.phone) {
    appointmentData.value.phone = user.phone;
  }
});


const formatSpecialty = (specialty) => {
  if (!specialty) return "";
  return specialty.charAt(0).toUpperCase() + specialty.slice(1);
};


const searchDoctors = () => {
  if (!selectedSpecialty.value) return;

  setTimeout(() => {

    doctors.value = [
      {
        id: 1,
        name: "Jane Smith",
        speciality: selectedSpecialty.value,
        experience: 7,
        rating: 4.9,
        bio: "Compassionate doctor with expertise in chronic disease management and preventive care.",
      },
      {
        id: 2,
        name: "Robert Johnson",
        speciality: selectedSpecialty.value,
        experience: 5,
        rating: 4.7,
        bio: "Dedicated to delivering exceptional patient care with a focus on holistic health approaches.",
      },
      {
        id: 3,
        name: "Maria Garcia",
        speciality: selectedSpecialty.value,
        experience: 10,
        rating: 4.8,
        bio: "Experienced specialist committed to evidence-based medicine and innovative treatment methods.",
      },
    ];
  }, 500);
};


const selectDoctor = (doctor) => {
  selectedDoctor.value = doctor;
};

const closeBookingModal = () => {
  selectedDoctor.value = null;
};


const bookAppointment = () => {
  isBooking.value = true;

  setTimeout(() => {
    isBooking.value = false;

    const appointment = {
      id: Math.floor(Math.random() * 1000),
      doctorId: selectedDoctor.value.id,
      doctorName: selectedDoctor.value.name,
      doctorSpecialty: selectedDoctor.value.speciality,
      patientName: appointmentData.value.patientName,
      phone: appointmentData.value.phone,
      date: appointmentData.value.date,
      timeSlot: appointmentData.value.timeSlot,
    };

    localStorage.setItem("appointment", JSON.stringify(appointment));

    const notification = {
      title: "Appointment Booked",
      message: `Your appointment with Dr. ${selectedDoctor.value.name} is scheduled for ${appointmentData.value.date} at ${appointmentData.value.timeSlot}.`,
      type: "success",
    };

    localStorage.setItem("notification", JSON.stringify(notification));

    activeAppointment.value = appointment;
    hasActiveAppointment.value = true;
    selectedDoctor.value = null;

    appointmentData.value = {
      patientName: user.name || "",
      phone: user.phone || "",
      date: "",
      timeSlot: "",
    };

    window.location.reload();
  }, 1500);
};


const closeCancelModal = () => {
  showCancelModal.value = false;
};

const cancelAppointment = () => {
  isCancelling.value = true;

  setTimeout(() => {

    localStorage.removeItem("appointment");
    localStorage.removeItem("notification");

    activeAppointment.value = null;
    hasActiveAppointment.value = false;
    showCancelModal.value = false;
    isCancelling.value = false;

    window.location.reload();
  }, 1000);
};
</script>

<style scoped>

.page-header {
  border-bottom: 2px solid rgba(13, 110, 253, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.search-card {
  border-radius: 1rem;
  transition: all 0.3s ease;
  border: none;
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.doctor-card {
  border-radius: 1rem;
  transition: all 0.3s ease;
  border: none;
  overflow: hidden;
}

.doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}

.doctor-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
}

.doctor-specialty {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.doctor-bio {
  min-height: 3rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.stars {
  display: flex;
}

/* Quick filters */
.quick-filters .btn {
  border-radius: 2rem;
  padding: 0.375rem 1rem;
  white-space: nowrap;
}

/* Appointment Modal */
.booking-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
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
  border-radius: 1rem;
  width: 90%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  animation: modalFadeIn 0.3s ease-out forwards;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
  background-color: rgba(13, 110, 253, 0.03);
}

.modal-body {
  padding: 1.5rem;
}

/* Responsive styles */
@media (max-width: 992px) {
  .doctor-card {
    height: auto;
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .quick-filters {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }

  .modal-content {
    width: 95%;
  }

  .modal-body {
    padding: 1.25rem;
  }
}

@media (max-width: 576px) {
  .page-header h2 {
    font-size: 1.5rem;
  }

  .doctor-card .card-body {
    padding: 1rem;
  }

  .doctor-avatar {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }

  .appointment-details h6 {
    font-size: 1rem;
  }
}
</style>
