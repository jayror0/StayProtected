<script setup>
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import apiService from "../services/api.js";
import { formatDate, getCurrentUser } from "../utils/helpers.js";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ErrorDisplay from "../components/ErrorDisplay.vue";

const reports = ref([]);
const isLoading = ref(true);
const error = ref(null);
const searchTerm = ref("");
const selectedDateRange = ref("all");
const dateRanges = [
  { value: "all", label: "All Time" },
  { value: "last7days", label: "Last 7 Days" },
  { value: "last30days", label: "Last 30 Days" },
  { value: "last3months", label: "Last 3 Months" },
  { value: "last6months", label: "Last 6 Months" },
  { value: "lastyear", label: "Last Year" },
];


const fetchReports = async () => {
  isLoading.value = true;
  error.value = null;

  try {

    const user = getCurrentUser();

    if (!user) {
      throw new Error("User not authenticated");
    }


    const response = await apiService.getReports(user.id);

    if (!response.success) {
      throw new Error(response.error || "Failed to fetch reports");
    }

    reports.value = response.data;
  } catch (err) {
    error.value = err.message;
    console.error("Error fetching reports:", err);
  } finally {
    isLoading.value = false;
  }
};


onMounted(fetchReports);

const filteredReports = computed(() => {
  let filtered = [...reports.value];


  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (report) =>
        report.title.toLowerCase().includes(term) ||
        report.doctor.toLowerCase().includes(term) ||
        report.department.toLowerCase().includes(term) ||
        report.summary.toLowerCase().includes(term)
    );
  }


  if (selectedDateRange.value !== "all") {
    const now = new Date();
    let cutoffDate;

    switch (selectedDateRange.value) {
      case "last7days":
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "last30days":
        cutoffDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case "last3months":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "last6months":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "lastyear":
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
    }

    filtered = filtered.filter((report) => new Date(report.date) >= cutoffDate);
  }

  return filtered;
});

const downloadReport = (report) => {

  Swal.fire({
    title: "Downloading Report",
    text: `${report.title} is being prepared for download.`,
    icon: "info",
    confirmButtonText: "OK",
  });
};

const viewReportDetails = (report) => {
  Swal.fire({
    title: report.title,
    html: `
      <div class="text-start">
        <p><strong>Doctor:</strong> ${report.doctor}</p>
        <p><strong>Date:</strong> ${formatDate(report.date)}</p>
        <p><strong>Department:</strong> ${report.department}</p>
        <p><strong>Status:</strong> ${report.status}</p>
        <p><strong>Summary:</strong> ${report.summary}</p>
      </div>
    `,
    width: "600px",
    confirmButtonText: "Close",
  });
};
</script>

<template>
  <div class="reports-view container py-5">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">Medical Reports</h2>
      </div>
      <div class="card-body">
        <p class="text-muted mb-4">
          View and download your medical reports. All reports are confidential
          and secure.
        </p>

    
        <div class="row mb-4">
          <div class="col-md-6 mb-3 mb-md-0">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                v-model="searchTerm"
                class="form-control"
                placeholder="Search reports..."
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-calendar-range"></i>
              </span>
              <select v-model="selectedDateRange" class="form-select">
                <option
                  v-for="range in dateRanges"
                  :key="range.value"
                  :value="range.value"
                >
                  {{ range.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <LoadingSpinner
          v-if="isLoading"
          message="Loading your medical reports..."
        />


        <ErrorDisplay
          v-else-if="error"
          :message="error"
          :retry="fetchReports"
        />


        <div v-else-if="filteredReports.length === 0" class="text-center py-5">
          <i
            class="bi bi-file-earmark-x text-muted"
            style="font-size: 3rem"
          ></i>
          <p class="mt-3">No reports found matching your criteria.</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Report</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in filteredReports" :key="report.id">
                <td>
                  <div class="fw-bold">{{ report.title }}</div>
                  <div class="small text-muted">{{ report.department }}</div>
                </td>
                <td>{{ report.doctor }}</td>
                <td>{{ formatDate(report.date) }}</td>
                <td>
                  <span
                    class="badge"
                    :class="
                      report.status === 'Completed'
                        ? 'bg-success'
                        : 'bg-warning'
                    "
                  >
                    {{ report.status }}
                  </span>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="viewReportDetails(report)"
                    >
                      <i class="bi bi-eye me-1"></i> View
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      @click="downloadReport(report)"
                    >
                      <i class="bi bi-download me-1"></i> Download
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

    
        <div class="alert alert-info mt-4">
          <h5>
            <i class="bi bi-info-circle me-2"></i>About Your Medical Reports
          </h5>
          <p class="mb-2">
            Your medical reports are stored securely and can be accessed
            anytime. If you have any questions about a specific report, please
            contact your healthcare provider.
          </p>
          <p class="mb-0">
            Reports marked as "Pending Review" are still being processed by your
            doctor and may be updated with additional information.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reports-view {
  min-height: calc(100vh - 200px);
}

.table th,
.table td {
  padding: 1rem;
}

@media (max-width: 767.98px) {
  .btn-group {
    display: flex;
    flex-direction: column;
  }

  .btn-group .btn {
    margin-bottom: 0.25rem;
    border-radius: 0.375rem !important;
  }
}
</style>
