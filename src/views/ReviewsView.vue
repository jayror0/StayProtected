<template>
  <div class="reviews-view">
    <div class="container py-4">
      <h2 class="mb-4">Doctor Reviews</h2>
      <div class="row mb-4">
        <div class="col-md-12">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="row align-items-center">
                <div class="col-md-9">
                  <div class="d-flex align-items-center mb-3">
                    <div
                      class="rounded-circle bg-primary bg-opacity-10 p-2 me-3"
                    >
                      <i class="bi bi-chat-quote-fill text-primary fs-4"></i>
                    </div>
                    <h4 class="card-title mb-0">Your Feedback Matters</h4>
                  </div>
                  <p class="card-text mb-md-0 mb-4">
                    Your reviews help other patients choose the right doctor and
                    help our doctors improve their service. Share your
                    experience with any doctor you've had a consultation with to
                    guide others in their healthcare journey.
                  </p>
                </div>
                <div class="col-md-3 text-center">
                  <div class="feedback-stats">
                    <div class="stat-circle mx-auto mb-2">
                      <span class="stat-number">97%</span>
                    </div>
                    <p class="stat-text">
                      of patients find reviews helpful when choosing a doctor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <div class="row mb-5">
        <div class="col-md-12">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h3 class="mb-0">Your Recent Consultations</h3>
            <div class="d-flex align-items-center">
              <span class="badge rounded-pill bg-light text-dark border me-2">
                <i class="bi bi-filter me-1"></i> Filter
              </span>
              <select class="form-select form-select-sm" style="width: auto">
                <option>All Types</option>
                <option>Appointments</option>
                <option>Instant Consultations</option>
              </select>
            </div>
          </div>

          <div
            v-if="consultations.length === 0"
            class="alert alert-info d-flex align-items-center"
          >
            <div class="flex-shrink-0">
              <i class="bi bi-info-circle fs-4 me-3"></i>
            </div>
            <div>
              You don't have any recent consultations to review. Book an
              appointment or instant consultation to share your experience
              afterward.
              <div class="mt-2">
                <button class="btn btn-sm btn-primary">Book Appointment</button>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="d-none d-md-block">
              <div class="table-responsive shadow-sm rounded">
                <table class="table table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="ps-3">Doctor</th>
                      <th>Specialty</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Review Given</th>
                      <th class="text-end pe-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(consultation, index) in consultations"
                      :key="index"
                      class="consultation-row"
                      @click="
                        consultation.reviewed
                          ? null
                          : openReviewModal(consultation)
                      "
                    >
                      <td class="ps-3">
                        <strong>Dr. {{ consultation.doctorName }}</strong>
                      </td>
                      <td>
                        {{ formatSpecialty(consultation.doctorSpecialty) }}
                      </td>
                      <td>{{ consultation.date || consultation.startTime }}</td>
                      <td>
                        <span
                          class="badge"
                          :class="
                            consultation.type === 'appointment'
                              ? 'bg-primary'
                              : 'bg-success'
                          "
                        >
                          {{
                            consultation.type === "appointment"
                              ? "Appointment"
                              : "Instant"
                          }}
                        </span>
                      </td>
                      <td>
                        <span v-if="consultation.reviewed" class="text-success">
                          <i class="bi bi-check-circle-fill me-1"></i>Reviewed
                        </span>
                        <span v-else class="text-muted">
                          <i class="bi bi-dash-circle me-1"></i>Not yet
                        </span>
                      </td>
                      <td class="text-end pe-3">
                        <button
                          class="btn btn-sm action-btn"
                          :class="
                            consultation.reviewed
                              ? 'btn-outline-secondary'
                              : 'btn-outline-primary'
                          "
                          @click.stop="openReviewModal(consultation)"
                          :disabled="consultation.reviewed"
                        >
                          <i
                            class="bi me-1"
                            :class="
                              consultation.reviewed ? 'bi-check-lg' : 'bi-star'
                            "
                          ></i>
                          {{
                            consultation.reviewed ? "Reviewed" : "Give Review"
                          }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="d-md-none">
              <div
                v-for="(consultation, index) in consultations"
                :key="index"
                class="card mb-3 shadow-sm consultation-card"
              >
                <div class="card-body p-3">
                  <div
                    class="d-flex justify-content-between align-items-start mb-2"
                  >
                    <h5 class="card-title mb-0">
                      Dr. {{ consultation.doctorName }}
                    </h5>
                    <span
                      class="badge"
                      :class="
                        consultation.type === 'appointment'
                          ? 'bg-primary'
                          : 'bg-success'
                      "
                    >
                      {{
                        consultation.type === "appointment"
                          ? "Appointment"
                          : "Instant"
                      }}
                    </span>
                  </div>
                  <p class="text-muted mb-2">
                    {{ formatSpecialty(consultation.doctorSpecialty) }}
                  </p>
                  <p class="small mb-2">
                    <i class="bi bi-calendar3 me-2"></i
                    >{{ consultation.date || consultation.startTime }}
                  </p>

                  <hr class="my-2" />

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <span v-if="consultation.reviewed" class="text-success">
                      <i class="bi bi-check-circle-fill me-1"></i>Reviewed
                    </span>
                    <span v-else class="text-muted">
                      <i class="bi bi-dash-circle me-1"></i>Not reviewed
                    </span>

                    <button
                      class="btn btn-sm action-btn"
                      :class="
                        consultation.reviewed
                          ? 'btn-outline-secondary'
                          : 'btn-outline-primary'
                      "
                      @click="openReviewModal(consultation)"
                      :disabled="consultation.reviewed"
                    >
                      <i
                        class="bi me-1"
                        :class="
                          consultation.reviewed ? 'bi-check-lg' : 'bi-star'
                        "
                      ></i>
                      {{ consultation.reviewed ? "Reviewed" : "Give Review" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12">
          <div
            class="mb-4 d-flex flex-wrap align-items-center justify-content-between"
          >
            <h3 class="mb-0 me-3">All Doctor Reviews</h3>

            <div class="d-flex align-items-center mt-3 mt-md-0">
              <div class="dropdown me-3 d-none d-md-block">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="filterDropdown"
                >
                  <i class="bi bi-funnel me-1"></i> Filter by
                </button>
              </div>

              <div class="dropdown me-3 d-none d-md-block">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="sortDropdown"
                >
                  <i class="bi bi-sort-down me-1"></i> Sort by
                </button>
              </div>
            </div>
          </div>

          <div class="search-container">
            <i class="bi bi-search search-icon"></i>
            <input
              type="text"
              class="form-control form-control-lg search-input"
              placeholder="Search doctors by name or specialty..."
              v-model="searchQuery"
              @input="filterReviews"
            />
          </div>

 
          <div class="d-flex d-md-none mb-3 filter-chips overflow-auto">
            <div class="filter-chip active me-2">All Reviews</div>
            <div class="filter-chip me-2">Highest Rated</div>
            <div class="filter-chip me-2">Most Recent</div>
            <div class="filter-chip me-2">Specialists</div>
            <div class="filter-chip me-2">General Physicians</div>
          </div>

          <div
            v-if="filteredReviews.length === 0"
            class="alert alert-info d-flex"
          >
            <div class="flex-shrink-0">
              <i class="bi bi-info-circle fs-4 me-3"></i>
            </div>
            <div>
              <p class="mb-1">
                No reviews found. Be the first to review a doctor!
              </p>
              <button class="btn btn-sm btn-primary mt-2">
                Book a Consultation
              </button>
            </div>
          </div>

          <div v-else class="row g-4">
            <div
              v-for="(review, index) in filteredReviews"
              :key="index"
              class="col-lg-4 col-md-6"
            >
              <div class="card h-100 review-card">
                <div class="card-body p-4">
                  <div class="review-header mb-3">
                    <div
                      class="d-flex justify-content-between align-items-start"
                    >
                      <div>
                        <h5 class="card-title mb-1">
                          Dr. {{ review.doctorName }}
                        </h5>
                        <span class="badge bg-primary">{{
                          formatSpecialty(review.doctorSpecialty)
                        }}</span>
                      </div>
                      <div class="rating-badge">
                        <span class="badge rating-pill">
                          <i class="bi bi-star-fill text-warning me-1"></i>
                          {{ review.rating }}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="stars mb-3">
                    <i
                      v-for="star in 5"
                      :key="star"
                      class="bi"
                      :class="
                        star <= Math.floor(review.rating)
                          ? 'bi-star-fill text-warning'
                          : star <= Math.ceil(review.rating) &&
                            star > Math.floor(review.rating)
                          ? 'bi-star-half text-warning'
                          : 'bi-star'
                      "
                    >
                    </i>
                  </div>

                  <div class="review-content">
                    <p class="card-text review-comment">
                      "{{ review.comment }}"
                    </p>
                  </div>

                  <div
                    class="review-footer d-flex justify-content-between mt-3 pt-3 border-top text-muted small"
                  >
                    <div>
                      <i class="bi bi-person me-1"></i>
                      {{ review.patientName }}
                    </div>
                    <div>
                      <i class="bi bi-calendar me-1"></i>
                      {{ review.date }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div
            v-if="filteredReviews.length > 6"
            class="d-flex justify-content-center mt-4"
          >
            <nav aria-label="Reviews pagination">
              <ul class="pagination">
                <li class="page-item disabled">
                  <a
                    class="page-link"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                    >Previous</a
                  >
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
 
      <div v-if="selectedConsultation" class="review-modal">
        <div class="modal-backdrop" @click="closeReviewModal"></div>
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h5 class="modal-title mb-1">
                Review Dr. {{ selectedConsultation.doctorName }}
              </h5>
              <span class="badge bg-primary">{{
                formatSpecialty(selectedConsultation.doctorSpecialty)
              }}</span>
            </div>
            <button
              type="button"
              class="btn-close"
              @click="closeReviewModal"
            ></button>
          </div>
          <div class="modal-body">
         
            <div class="consultation-summary p-3 mb-4 bg-light rounded">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <div
                  class="badge"
                  :class="
                    selectedConsultation.type === 'appointment'
                      ? 'bg-primary'
                      : 'bg-success'
                  "
                >
                  {{
                    selectedConsultation.type === "appointment"
                      ? "Appointment"
                      : "Instant Consultation"
                  }}
                </div>
                <div class="text-muted small">
                  <i class="bi bi-calendar me-1"></i>
                  {{
                    selectedConsultation.date || selectedConsultation.startTime
                  }}
                </div>
              </div>
            </div>

            <form @submit.prevent="submitReview">
              <div class="mb-4">
                <label for="patientName" class="form-label fw-medium"
                  >Your Name</label
                >
                <div class="input-group">
                  <span class="input-group-text bg-light">
                    <i class="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    id="patientName"
                    v-model="reviewData.patientName"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label d-block text-center fw-medium"
                  >Your Rating</label
                >
                <div class="rating-input p-3">
                  <i
                    v-for="star in 5"
                    :key="star"
                    class="bi rating-star"
                    :class="
                      star <= reviewData.rating ? 'bi-star-fill' : 'bi-star'
                    "
                    @click="reviewData.rating = star"
                  >
                  </i>
                </div>
                <div
                  v-if="ratingError"
                  class="text-danger small text-center mt-1"
                >
                  <i class="bi bi-exclamation-circle me-1"></i>
                  {{ ratingError }}
                </div>
                <div v-if="reviewData.rating > 0" class="text-center mt-1">
                  <span class="text-success">
                    {{ getRatingText(reviewData.rating) }}
                  </span>
                </div>
              </div>

              <div class="mb-4">
                <label for="comment" class="form-label fw-medium"
                  >Your Comments</label
                >
                <textarea
                  class="form-control"
                  id="comment"
                  v-model="reviewData.comment"
                  rows="4"
                  placeholder="Share your experience with the doctor..."
                  required
                ></textarea>
                <small class="text-muted d-block mt-1">
                  <i class="bi bi-info-circle me-1"></i>
                  Your review will help others make informed decisions
                </small>
              </div>

              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="isSubmitting"
                >
                  <span
                    v-if="isSubmitting"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{ isSubmitting ? "Submitting..." : "Submit Review" }}
                </button>
                <button
                  type="button"
                  class="btn btn-link text-muted"
                  @click="closeReviewModal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";


const consultations = ref([]);
const reviewData = ref({
  patientName: "",
  rating: 0,
  comment: "",
});
const selectedConsultation = ref(null);
const isSubmitting = ref(false);
const ratingError = ref("");
const allReviews = ref([]);
const searchQuery = ref("");
const filteredReviews = ref([]);


const formatSpecialty = (specialty) => {
  if (!specialty) return "";
  return specialty.charAt(0).toUpperCase() + specialty.slice(1);
};

const filterReviews = () => {
  if (!searchQuery.value.trim()) {
    filteredReviews.value = [...allReviews.value];
    return;
  }

  const query = searchQuery.value.toLowerCase();
  filteredReviews.value = allReviews.value.filter(
    (review) =>
      review.doctorName.toLowerCase().includes(query) ||
      review.doctorSpecialty.toLowerCase().includes(query)
  );
};


const openReviewModal = (consultation) => {
  selectedConsultation.value = consultation;
  reviewData.value = {
    patientName: consultation.patientName || "",
    rating: 0,
    comment: "",
  };
  ratingError.value = "";
};

const closeReviewModal = () => {
  selectedConsultation.value = null;
};


const getRatingText = (rating) => {
  switch (rating) {
    case 1:
      return "Poor experience";
    case 2:
      return "Below average";
    case 3:
      return "Average experience";
    case 4:
      return "Good experience";
    case 5:
      return "Excellent experience";
    default:
      return "";
  }
};


const submitReview = () => {

  if (reviewData.value.rating === 0) {
    ratingError.value = "Please select a rating";
    return;
  }

  isSubmitting.value = true;


  setTimeout(() => {
    const newReview = {
      id: Date.now(),
      doctorId: selectedConsultation.value.doctorId,
      doctorName: selectedConsultation.value.doctorName,
      doctorSpecialty: selectedConsultation.value.doctorSpecialty,
      patientName: reviewData.value.patientName,
      rating: reviewData.value.rating,
      comment: reviewData.value.comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };


    allReviews.value.unshift(newReview);
    filterReviews();


    const index = consultations.value.findIndex(
      (c) =>
        c.doctorId === selectedConsultation.value.doctorId &&
        c.id === selectedConsultation.value.id
    );

    if (index !== -1) {
      consultations.value[index].reviewed = true;

 
      let storedConsultations = JSON.parse(
        localStorage.getItem("consultations") || "[]"
      );
      storedConsultations = storedConsultations.map((c) => {
        if (
          c.id === selectedConsultation.value.id &&
          c.doctorId === selectedConsultation.value.doctorId
        ) {
          return { ...c, reviewed: true };
        }
        return c;
      });
      localStorage.setItem(
        "consultations",
        JSON.stringify(storedConsultations)
      );
    }


    localStorage.setItem("reviews", JSON.stringify(allReviews.value));

    isSubmitting.value = false;
    closeReviewModal();
  }, 1000);
};

onMounted(() => {

  const appointment = JSON.parse(localStorage.getItem("appointment") || "null");
  const instantConsultation = JSON.parse(
    localStorage.getItem("instantConsultation") || "null"
  );
  const storedConsultations = JSON.parse(
    localStorage.getItem("consultations") || "[]"
  );

  const allConsultations = [];

 
  if (appointment) {
    allConsultations.push({
      ...appointment,
      type: "appointment",
      reviewed: false,
    });
  }

  if (instantConsultation) {
    allConsultations.push({
      ...instantConsultation,
      type: "instant",
      reviewed: false,
    });
  }


  allConsultations.push(...storedConsultations);


  consultations.value = allConsultations;


  const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  allReviews.value = storedReviews;
  filteredReviews.value = [...storedReviews];


  if (allReviews.value.length === 0) {
    allReviews.value = [
      {
        id: 1,
        doctorId: 101,
        doctorName: "Michael Williams",
        doctorSpecialty: "cardiologist",
        patientName: "Sarah Johnson",
        rating: 5,
        comment:
          "Dr. Williams was very thorough and took the time to explain everything in detail. I appreciate his patient-centered approach and clear communication.",
        date: "May 28, 2025",
      },
      {
        id: 2,
        doctorId: 102,
        doctorName: "Elizabeth Chen",
        doctorSpecialty: "dermatologist",
        patientName: "Robert Brown",
        rating: 4,
        comment:
          "Dr. Chen was knowledgeable and efficient. The appointment was quick but comprehensive. Would recommend for skin issues.",
        date: "May 25, 2025",
      },
      {
        id: 3,
        doctorId: 103,
        doctorName: "James Rodriguez",
        doctorSpecialty: "pediatrician",
        patientName: "Emily Wilson",
        rating: 5,
        comment:
          "Dr. Rodriguez has an amazing way with children. My son was nervous at first but quickly felt comfortable. Very patient and kind doctor.",
        date: "May 23, 2025",
      },
      {
        id: 4,
        doctorId: 104,
        doctorName: "Sarah Patel",
        doctorSpecialty: "neurologist",
        patientName: "David Thompson",
        rating: 3,
        comment:
          "Dr. Patel was professional and knowledgeable. The wait time was longer than expected, but the consultation itself was helpful.",
        date: "May 20, 2025",
      },
    ];

    filteredReviews.value = [...allReviews.value];
    localStorage.setItem("reviews", JSON.stringify(allReviews.value));
  }
});
</script>

<style scoped>
.review-modal {
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
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
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

/* Stars and rating */
.stars {
  display: flex;
}

.rating-input {
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
}

.rating-star {
  cursor: pointer;
  color: #e0e0e0;
  margin-right: 0.25rem;
  transition: transform var(--transition-speed), color var(--transition-speed);
}

.rating-star:hover {
  transform: scale(1.2);
}

.rating-star.bi-star-fill {
  color: #ffc107;
}

/* Review cards styling */
.review-card {
  transition: transform var(--transition-speed),
    box-shadow var(--transition-speed);
  border: none;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.review-comment {
  font-style: italic;
  position: relative;
  padding: var(--space-md);
  background-color: #f8f9fa;
  border-radius: var(--border-radius-sm);
  margin: var(--space-md) 0;
}

.review-comment::before {
  content: '"';
  position: absolute;
  top: 0px;
  left: 10px;
  font-size: 2.5rem;
  color: var(--primary-color);
  opacity: 0.2;
  font-family: Georgia, serif;
}

/* Consultations list styling */
.consultation-row {
  transition: background-color var(--transition-speed);
  cursor: pointer;
}

.consultation-row:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

.action-btn {
  opacity: 0.8;
  transition: all var(--transition-speed);
}

.consultation-row:hover .action-btn {
  opacity: 1;
  transform: translateY(-2px);
}

/* Search bar styling */
.search-container {
  position: relative;
  margin-bottom: var(--space-lg);
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #6c757d;
}

.search-input {
  padding-left: 40px;
  border-radius: var(--border-radius-md);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .rating-input {
    font-size: 1.25rem;
  }

  .table-responsive {
    border-radius: var(--border-radius-sm);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }
}

/* Stats styling */
.feedback-stats {
  padding: var(--space-md) 0;
}

.stat-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d6efd, #0b5ed7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 0.5rem 1rem rgba(13, 110, 253, 0.2);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-text {
  font-size: 0.875rem;
  margin-bottom: 0;
  color: var(--secondary-color);
}

/* Filter chips styling */
.filter-chips {
  padding-bottom: var(--space-xs);
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.filter-chips::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.filter-chip {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background-color: #f8f9fa;
  font-size: 0.875rem;
  color: var(--secondary-color);
  cursor: pointer;
  transition: all var(--transition-speed);
  white-space: nowrap;
}

.filter-chip:hover {
  background-color: #e9ecef;
}

.filter-chip.active {
  background-color: var(--primary-color);
  color: white;
}

/* Rating pill styling */
.rating-pill {
  background: linear-gradient(135deg, #ffc107, #fd7e14);
  color: white;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.5rem rgba(255, 193, 7, 0.2);
}

@media (max-width: 576px) {
  .modal-body {
    padding: var(--space-md);
  }

  .modal-content {
    width: 95%;
  }

  .table-responsive {
    max-height: 400px;
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

  .stat-circle {
    width: 65px;
    height: 65px;
  }

  .stat-number {
    font-size: 1.25rem;
  }
}
</style>
