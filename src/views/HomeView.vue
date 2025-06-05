<template>
  <div class="home">
    <section class="hero bg-primary text-white py-4 py-md-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 text-center text-lg-start">
            <h1 class="display-4 fw-bold hero-title">
              Stay Protected, Stay Healthy
            </h1>
            <p class="lead my-3 my-md-4">
              Your health is our priority. Book medical appointments, get
              instant consultations, and access health resources all in one
              place.
            </p>
            <div
              class="d-grid d-sm-flex gap-2 gap-sm-3 justify-content-center justify-content-lg-start"
            >
              <router-link
                to="/appointments"
                class="btn btn-light btn-lg px-4 fw-medium"
              >
                <i class="bi bi-calendar-plus me-2 d-none d-sm-inline-block"></i
                >Book Appointment
              </router-link>
              <router-link
                to="/instant-consultation"
                class="btn btn-outline-light btn-lg px-4"
              >
                <i class="bi bi-chat-heart me-2 d-none d-sm-inline-block"></i
                >Instant Consultation
              </router-link>
            </div>
          </div>
          <div class="col-lg-6 mt-5 mt-lg-0 text-center">
            <div class="hero-image-container">
              <img
                src="/img/hero-doctor.png"
                alt="Medical Professionals"
                class="img-fluid rounded-3 shadow hero-image"
                loading="lazy"
                onerror="this.src='https://placehold.co/600x400?text=Medical+Care'"
              />
              <div class="hero-image-overlay"></div>
              <div class="hero-image-badge">
                <span>Trusted by 10,000+ patients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="services py-4 py-md-5">
      <div class="container">
        <h2 class="text-center mb-4 mb-md-5 section-title">Our Services</h2>
        <div class="row g-3 g-md-4">

          <div class="col-sm-6 col-lg-3">
            <div class="card h-100 shadow-sm service-card">
              <div class="card-body text-center p-3 p-md-4">
                <div
                  class="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3 service-icon"
                >
                  <i class="bi bi-calendar-check text-primary"></i>
                </div>
                <h5 class="card-title">Book an Appointment</h5>
                <p class="card-text">
                  Schedule appointments with specialized doctors at your
                  convenient time.
                </p>
                <router-link
                  to="/appointments"
                  class="btn btn-outline-primary mt-3 stretched-link"
                  >Book Now</router-link
                >
              </div>
            </div>
          </div>


          <div class="col-sm-6 col-lg-3">
            <div class="card h-100 shadow-sm service-card">
              <div class="card-body text-center p-3 p-md-4">
                <div
                  class="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3 service-icon"
                >
                  <i class="bi bi-chat-dots text-success"></i>
                </div>
                <h5 class="card-title">Instant Consultation</h5>
                <p class="card-text">
                  Connect with available doctors immediately for urgent medical
                  advice.
                </p>
                <router-link
                  to="/instant-consultation"
                  class="btn btn-outline-success mt-3 stretched-link"
                  >Consult Now</router-link
                >
              </div>
            </div>
          </div>


          <div class="col-sm-6 col-lg-3">
            <div class="card h-100 shadow-sm service-card">
              <div class="card-body text-center p-3 p-md-4">
                <div
                  class="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-flex mb-3 service-icon"
                >
                  <i class="bi bi-clipboard-check text-warning"></i>
                </div>
                <h5 class="card-title">Self Checkup</h5>
                <p class="card-text">
                  Access tools for preliminary self-assessment of common health
                  issues.
                </p>
                <router-link
                  to="/self-checkup"
                  class="btn btn-outline-warning mt-3 stretched-link"
                  >Check Now</router-link
                >
              </div>
            </div>
          </div>

       
          <div class="col-sm-6 col-lg-3">
            <div class="card h-100 shadow-sm service-card">
              <div class="card-body text-center p-3 p-md-4">
                <div
                  class="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3 service-icon"
                >
                  <i class="bi bi-lightbulb text-info"></i>
                </div>
                <h5 class="card-title">Health Tips</h5>
                <p class="card-text">
                  Stay informed with expert health advice and wellness tips.
                </p>
                <router-link
                  to="/health-tips"
                  class="btn btn-outline-info mt-3 stretched-link"
                  >Learn More</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="why-us py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4 mb-md-5 section-title">
          Why Choose StayProtected?
        </h2>
        <div class="row align-items-center">
          <div class="col-lg-6 order-lg-2 mb-4 mb-lg-0">
            <div class="position-relative">
              <img
                src="/img/doctors-team.png"
                alt="Our Doctors"
                class="img-fluid rounded-3 shadow"
                loading="lazy"
                onerror="this.src='https://placehold.co/600x400?text=Our+Medical+Team'"
              />
              <div class="stats-overlay">
                <div class="stats-item">
                  <h3>100+</h3>
                  <p>Specialists</p>
                </div>
                <div class="stats-item">
                  <h3>24/7</h3>
                  <p>Support</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="features-list">
              <div class="feature-item d-flex mb-3 mb-md-4 align-items-start">
                <div
                  class="feature-icon flex-shrink-0 rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex"
                >
                  <i class="bi bi-person-check text-primary"></i>
                </div>
                <div class="ms-3">
                  <h5>Expert Doctors</h5>
                  <p>
                    Our platform connects you with highly qualified and
                    experienced medical professionals from various specialties.
                  </p>
                </div>
              </div>
              <div class="feature-item d-flex mb-3 mb-md-4 align-items-start">
                <div
                  class="feature-icon flex-shrink-0 rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex"
                >
                  <i class="bi bi-calendar2-check text-success"></i>
                </div>
                <div class="ms-3">
                  <h5>Convenient Booking</h5>
                  <p>
                    Book appointments or get instant consultations from the
                    comfort of your home, 24/7.
                  </p>
                </div>
              </div>
              <div class="feature-item d-flex mb-3 mb-md-4 align-items-start">
                <div
                  class="feature-icon flex-shrink-0 rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex"
                >
                  <i class="bi bi-file-earmark-medical text-info"></i>
                </div>
                <div class="ms-3">
                  <h5>Digital Reports</h5>
                  <p>
                    Access your medical reports online anytime, anywhere with
                    secure storage and easy sharing.
                  </p>
                </div>
              </div>
              <div class="feature-item d-flex align-items-start">
                <div
                  class="feature-icon flex-shrink-0 rounded-circle bg-warning bg-opacity-10 p-3 d-inline-flex"
                >
                  <i class="bi bi-star text-warning"></i>
                </div>
                <div class="ms-3">
                  <h5>Trusted Reviews</h5>
                  <p>
                    Read authentic reviews from other patients to choose the
                    right doctor for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials py-5">
      <div class="container">
        <h2 class="text-center mb-5">What Our Patients Say</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body p-4">
                <div class="d-flex mb-3">
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                </div>
                <p class="card-text mb-3">
                  "StayProtected made it so easy to find a specialist and book
                  an appointment. The doctor was excellent and the entire
                  experience was smooth."
                </p>
                <div class="d-flex align-items-center">
                  <div
                    class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style="width: 40px; height: 40px"
                  >
                    JD
                  </div>
                  <div class="ms-3">
                    <h6 class="mb-0">John Doe</h6>
                    <small class="text-muted">Patient</small>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body p-4">
                <div class="d-flex mb-3">
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-half text-warning"></i>
                </div>
                <p class="card-text mb-3">
                  "The instant consultation feature was a lifesaver when my
                  child had a high fever late at night. Got valuable advice
                  immediately!"
                </p>
                <div class="d-flex align-items-center">
                  <div
                    class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                    style="width: 40px; height: 40px"
                  >
                    JS
                  </div>
                  <div class="ms-3">
                    <h6 class="mb-0">Jane Smith</h6>
                    <small class="text-muted">Patient</small>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body p-4">
                <div class="d-flex mb-3">
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star-fill text-warning me-1"></i>
                  <i class="bi bi-star text-warning"></i>
                </div>
                <p class="card-text mb-3">
                  "I love the health tips section. The information is reliable
                  and has helped me make better health choices for myself and my
                  family."
                </p>
                <div class="d-flex align-items-center">
                  <div
                    class="rounded-circle bg-info text-white d-flex align-items-center justify-content-center"
                    style="width: 40px; height: 40px"
                  >
                    RJ
                  </div>
                  <div class="ms-3">
                    <h6 class="mb-0">Robert Johnson</h6>
                    <small class="text-muted">Patient</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta py-5 bg-primary text-white text-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="mb-3">Ready to prioritize your health?</h2>
            <p class="lead mb-4">
              Join thousands of happy patients who trust StayProtected for their
              healthcare needs.
            </p>
            <div class="d-grid gap-2 d-sm-flex justify-content-center">
              <router-link
                to="/signup"
                class="btn btn-light btn-lg px-5 fw-medium"
              >
                <i class="bi bi-person-plus me-2"></i>Sign Up Now
              </router-link>
              <router-link
                to="/appointments"
                class="btn btn-outline-light btn-lg px-5 d-none d-sm-inline-block"
              >
                Book Appointment
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
  border-radius: 0 0 2rem 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: rotate(-45deg);
  z-index: 1;
}

.hero-title {
  font-size: calc(1.75rem + 1.5vw);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.hero-image-container {
  position: relative;
  z-index: 2;
}

.hero-image {
  max-height: 400px;
  object-fit: contain;
  transition: transform 0.6s ease;
  border: 5px solid rgba(255, 255, 255, 0.3);
}

.hero-image-container:hover .hero-image {
  transform: scale(1.02);
}

.hero-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(
    to top,
    rgba(13, 110, 253, 0.7),
    rgba(13, 110, 253, 0)
  );
  border-radius: 0 0 1rem 1rem;
  z-index: 1;
}

.hero-image-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transform: rotate(5deg);
}

/* Services Section */
.services {
  position: relative;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  border-radius: 1rem;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.service-icon {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 50%;
  font-size: 1.75rem;
}

/* Why Choose Us Section */
.why-us {
  position: relative;
  overflow: hidden;
}

.why-us::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(
    90deg,
    var(--primary-color),
    var(--info-color),
    var(--success-color),
    var(--warning-color)
  );
}

.feature-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stats-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 15px;
}

.stats-item {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stats-item h3 {
  color: var(--primary-color);
  font-weight: 700;
  margin: 0;
  font-size: 1.5rem;
}

.stats-item p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--dark-color);
}

/* Testimonials Section */
.testimonials {
  position: relative;
}

.testimonials .card {
  border-radius: 1rem;
}

.testimonials .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

/* CTA Section */
.cta {
  background: linear-gradient(135deg, #0a58ca, #0d6efd);
  position: relative;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
}

.cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.section-title {
  position: relative;
  font-weight: 700;
  margin-bottom: 2.5rem;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--primary-color);
}

/* Media queries for responsive design */
@media (max-width: 992px) {
  .hero-image-container {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .testimonial-card {
    margin-bottom: 1.5rem;
  }

  .why-us .feature-item {
    padding-right: 1rem;
  }

  .stats-overlay {
    position: relative;
    bottom: auto;
    left: auto;
    justify-content: center;
    margin-top: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 2rem;
    padding-bottom: 3rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero p.lead {
    font-size: 1.1rem;
  }

  .hero-image-badge {
    top: 10px;
    right: 10px;
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
  }

  .service-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .feature-icon {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }

  .cta {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .cta h2 {
    font-size: 1.75rem;
  }

  .stats-item {
    padding: 0.5rem 1rem;
  }

  .stats-item h3 {
    font-size: 1.25rem;
  }
}

@media (max-width: 576px) {
  .hero {
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 2.5rem;
    border-radius: 0 0 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  .hero p.lead {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .hero-image-container {
    max-width: 90%;
    margin: 0 auto;
  }

  .hero-image {
    max-height: 250px;
  }

  .service-icon {
    width: 55px;
    height: 55px;
    font-size: 1.35rem;
  }

  .service-card {
    margin-bottom: 0.5rem;
  }

  .service-card h5 {
    font-size: 1.15rem;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .section-title::after {
    width: 40px;
    height: 2px;
    bottom: -10px;
  }

  .feature-icon {
    width: 40px;
    height: 40px;
    padding: 0.5rem !important;
    font-size: 1rem;
  }

  .why-us h5 {
    font-size: 1.1rem;
  }

  .stats-overlay {
    gap: 10px;
    margin-top: 1rem;
  }

  .stats-item {
    padding: 0.4rem 0.8rem;
  }

  .stats-item h3 {
    font-size: 1.1rem;
  }

  .stats-item p {
    font-size: 0.7rem;
  } 

  .cta {
    border-radius: 0.75rem 0.75rem 0 0;
  }

  .cta .lead {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
}
</style>
