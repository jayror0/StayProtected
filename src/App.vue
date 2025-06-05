<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);
const notification = ref(null);
const showDisclaimer = ref(false);

const getNotificationIcon = (notification) => {
  if (!notification) return "bi bi-bell";

  const type = notification.type || "";
  const title = (notification.title || "").toLowerCase();

  if (type === "success" || title.includes("success"))
    return "bi bi-check-circle";
  if (type === "danger" || title.includes("error"))
    return "bi bi-exclamation-triangle";
  if (type === "warning") return "bi bi-exclamation-circle";
  if (type === "info") return "bi bi-info-circle";
  if (title.includes("welcome")) return "bi bi-hand-thumbs-up";
  if (title.includes("logged out")) return "bi bi-box-arrow-right";

  return "bi bi-bell";
};

const refreshUserState = () => {
  const localUserData = localStorage.getItem("user");
  const sessionUserData = sessionStorage.getItem("user");

  if (localUserData) {
    user.value = JSON.parse(localUserData);
  } else if (sessionUserData) {
    user.value = JSON.parse(sessionUserData);
  } else {
    user.value = null;
  }
};

const checkNotifications = () => {
  const notificationData = localStorage.getItem("notification");
  if (notificationData) {
    notification.value = JSON.parse(notificationData);
    setTimeout(() => {
      notification.value = null;
      localStorage.removeItem("notification");
    }, 5000);
  }
};

onMounted(() => {

  refreshUserState();
  checkNotifications();

  const disclaimerShown = localStorage.getItem("disclaimerShown");
  if (!disclaimerShown) {
    showDisclaimer.value = true;
  }


  window.addEventListener("storage", (e) => {
    if (e.key === "user") {
      refreshUserState();
    }
    if (e.key === "notification") {
      checkNotifications();
    }
  });


  window.addEventListener("userStateChanged", refreshUserState);
  window.addEventListener("notificationChanged", checkNotifications);
});

const logout = () => {

  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  localStorage.removeItem("notification");


  user.value = null;
  notification.value = null;


  const logoutNotification = {
    title: "Logged out",
    message: "You have been successfully logged out.",
  };
  localStorage.setItem("notification", JSON.stringify(logoutNotification));


  window.dispatchEvent(new CustomEvent("userStateChanged"));
  window.dispatchEvent(new CustomEvent("notificationChanged"));


  router.push("/");
};

const closeDisclaimer = () => {
  showDisclaimer.value = false;
  localStorage.setItem("disclaimerShown", "true");
};


const showDisclaimerAgain = () => {
  showDisclaimer.value = true;
};
</script>

<template>
  <div>

    <div
      v-if="showDisclaimer"
      class="modal fade show d-block"
      style="background-color: rgba(0, 0, 0, 0.5)"
      tabindex="-1"
      role="dialog"
      aria-labelledby="disclaimerModalLabel"
      aria-modal="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-warning text-dark">
            <h5 class="modal-title" id="disclaimerModalLabel">
              <i class="bi bi-exclamation-triangle me-2"></i>
              Testing Environment Notice
            </h5>
          </div>
          <div class="modal-body">
            <div class="alert alert-warning mb-3" role="alert">
              <strong>Important Disclaimer:</strong>
            </div>
            <p class="mb-3">
              <strong
                >This StayProtected website is for testing and demonstration
                purposes only.</strong
              >
            </p>
            <ul class="list-unstyled mb-3">
              <li class="mb-2">
                <i class="bi bi-info-circle text-info me-2"></i>
                All data and information displayed are fictional and for testing
                only
              </li>
              <li class="mb-2">
                <i class="bi bi-shield-exclamation text-warning me-2"></i>
                Do not use this platform for actual medical consultations or
                health decisions
              </li>
              <li class="mb-2">
                <i class="bi bi-database text-secondary me-2"></i>
                No real medical data is stored or processed
              </li>
              <li class="mb-2">
                <i class="bi bi-person-check text-success me-2"></i>
                User accounts and profiles are simulated for demonstration
              </li>
            </ul>
            <p class="text-muted small mb-0">
              For actual medical needs, please consult with qualified healthcare
              professionals and use certified medical platforms.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="closeDisclaimer"
            >
              <i class="bi bi-check-circle me-2"></i>
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>


    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <strong class="text-primary">StayProtected</strong>
          <span class="badge bg-warning text-dark ms-2 small">TESTING</span>
        </router-link>

        <div class="d-flex align-items-center ms-auto me-2 d-lg-none">
          <template v-if="user">
            <router-link
              to="/profile"
              class="btn btn-sm btn-icon btn-inline me-1"
              aria-label="Profile"
            >
              <i class="bi bi-person-circle"></i>
            </router-link>
          </template>
        </div>

        <button
          class="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 pt-2 pt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link py-2" to="/appointments">
                <i class="bi bi-calendar-check me-2"></i> Appointments
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link py-2" to="/instant-consultation">
                <i class="bi bi-chat-dots me-2"></i> Instant Consultation
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link py-2" to="/self-checkup">
                <i class="bi bi-clipboard-pulse me-2"></i> Self Checkup
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link py-2" to="/health-tips">
                <i class="bi bi-lightbulb me-2"></i> Health Tips
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link py-2" to="/reviews">
                <i class="bi bi-star me-2"></i> Reviews
              </router-link>
            </li>
          </ul>

          <ul class="navbar-nav pt-2 pt-lg-0">
            <template v-if="user">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi bi-person-circle me-2 d-inline d-lg-none"></i>
                  <span>{{ user.name }}</span>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end shadow-sm"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <router-link
                      class="dropdown-item d-flex align-items-center"
                      to="/profile"
                    >
                      <i class="bi bi-person me-2"></i> Your Profile
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item d-flex align-items-center"
                      to="/reports"
                    >
                      <i class="bi bi-file-medical me-2"></i> Your Reports
                    </router-link>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="#"
                      @click.prevent="logout"
                    >
                      <i class="bi bi-box-arrow-right me-2"></i> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </template>
            <template v-else>
              <div class="d-flex flex-column flex-lg-row gap-2">
                <li class="nav-item">
                  <router-link class="nav-link py-2" to="/login">
                    <i
                      class="bi bi-box-arrow-in-right me-2 d-inline d-lg-none"
                    ></i>
                    Login
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="nav-link btn btn-primary text-white px-3 btn-sm-mobile"
                    to="/signup"
                  >
                    <i class="bi bi-person-plus me-2 d-inline d-lg-none"></i>
                    Sign Up
                  </router-link>
                </li>
              </div>
            </template>
          </ul>
        </div>
      </div>
    </nav>

   
    <div
      v-if="notification"
      class="alert fade show m-0"
      :class="
        notification.type ? `alert-${notification.type}` : 'alert-primary'
      "
      role="alert"
    >
      <div class="container d-flex justify-content-between align-items-center">
        <div>
          <i :class="getNotificationIcon(notification)" class="me-2"></i>
          <strong>{{ notification.title }}</strong
          >: {{ notification.message }}
        </div>
        <button
          type="button"
          class="btn-close"
          @click="notification = null"
        ></button>
      </div>
    </div>


    <main class="container py-4">
      <router-view />
    </main>


    <footer class="bg-light py-4">
      <div class="container text-center">
        <p class="mb-2">
          &copy; {{ new Date().getFullYear() }} StayProtected. All rights
          reserved.
        </p>
        <p class="mb-0 text-muted small">
          <a
            href="#"
            @click.prevent="showDisclaimerAgain"
            class="text-warning text-decoration-none"
          >
            <i class="bi bi-exclamation-triangle me-1"></i>
            Testing Environment Notice
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
.navbar-nav .nav-link.btn {
  padding: 0.375rem 0.75rem;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Enhanced navigation styles */
.navbar-brand {
  font-size: 1.25rem;
}

.navbar .nav-link {
  position: relative;
  transition: all 0.3s ease;
}

.navbar .nav-link:hover {
  color: var(--primary-color);
}

/* Better icon alignment */
.navbar .nav-link i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.navbar .nav-link:hover i {
  transform: translateY(-1px);
}

/* Responsive nav styles */
@media (max-width: 991px) {
  .navbar-collapse {
    margin-top: 0.75rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .navbar-nav .nav-item {
    padding: 0.25rem 0;
  }

  .navbar-nav .nav-item:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .navbar-nav .nav-link {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
  }

  .navbar-nav .nav-link:active {
    background-color: rgba(13, 110, 253, 0.1);
  }

  .dropdown-menu {
    border: none;
    background-color: rgba(0, 0, 0, 0.02);
    box-shadow: none;
    margin: 0.25rem 0;
    padding: 0.5rem;
  }

  .dropdown-item {
    border-radius: 0.375rem;
    padding: 0.75rem 1rem;
  }
}

/* Button for small mobile screens */
@media (max-width: 576px) {
  .btn-sm-mobile {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}

/* Utility classes for nav icons */
.btn-icon {
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(13, 110, 253, 0.1);
  color: var(--primary-color);
}

/* Enhanced active nav link styles */
.router-link-active {
  font-weight: 600;
  color: #0d6efd !important;
}

.router-link-active i {
  color: #0d6efd;
}

@media (min-width: 992px) {
  .router-link-active:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0.75rem;
    right: 0.75rem;
    height: 2px;
    background-color: #0d6efd;
  }
}

/* Notification banner responsive styles */
.alert {
  padding: 0.5rem 0;
  border: none;
  border-radius: 0;
}

@media (max-width: 576px) {
  .alert .container {
    flex-direction: column;
    text-align: center;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    gap: 0.5rem;
  }

  .alert .btn-close {
    margin-top: 0.25rem;
    position: relative;
  }
}

/* Main content responsive padding */
@media (max-width: 576px) {
  main.container {
    padding-top: 1.25rem !important;
    padding-bottom: 1.25rem !important;
  }
}

/* Footer responsive styling */
footer {
  margin-top: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

@media (max-width: 576px) {
  footer {
    margin-top: 1.5rem;
    padding: 1.25rem 0;
    font-size: 0.875rem;
  }
}

/* Modal styles */
.modal-content {
  border-radius: 0.5rem;
  overflow: hidden;
}

.modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.modal-body {
  font-size: 0.875rem;
  color: #495057;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0b5ed7;
}

/* Modal backdrop override for disclaimer */
.modal.show {
  display: block !important;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Disclaimer modal specific styles */
.modal-content {
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header.bg-warning {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 2px solid #f0ad4e;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
}

/* Responsive modal styles */
@media (max-width: 576px) {
  .modal-dialog {
    margin: 1rem;
  }

  .modal-body {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .modal-footer {
    padding: 0.75rem 1rem;
  }
}
</style>
