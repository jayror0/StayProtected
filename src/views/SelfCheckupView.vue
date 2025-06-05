<template>
  <div class="self-checkup-view">
    <div class="container py-4">
      <div class="page-header mb-4">
        <h2 class="mb-2">Self Checkup</h2>
        <p class="text-muted mb-0">Access tools to assess your health</p>
      </div>

    
      <div class="card intro-card mb-4">
        <div class="card-body p-4">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-7">
              <h3 class="card-title">Take Control of Your Health</h3>
              <p class="card-text mb-4">
                Our self-assessment tools can help you understand your symptoms
                and determine if you should seek medical attention. Remember,
                these tools are for informational purposes only and do not
                replace professional medical advice.
              </p>
              <div class="alert alert-warning d-flex align-items-start">
                <div class="alert-icon me-3">
                  <i class="bi bi-exclamation-triangle-fill"></i>
                </div>
                <div>
                  <strong>Important:</strong> If you are experiencing severe
                  symptoms such as chest pain, difficulty breathing, or other
                  emergency conditions, please seek immediate medical attention.
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-5 text-center mt-4 mt-md-0">
              <div class="icon-wrapper">
                <i class="bi bi-clipboard-pulse self-checkup-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-5">
        <div class="col-12 mb-4">
          <div class="section-header">
            <h3>Common Health Concerns</h3>
            <div class="section-line"></div>
          </div>
        </div>

        <div
          class="col-md-6 col-lg-4 mb-4"
          v-for="(checkup, index) in selfCheckups"
          :key="index"
        >
          <div class="card h-100 shadow-sm checkup-card">
            <div class="card-body p-4">
              <div
                class="card-icon mb-3"
                :class="`bg-${checkup.colorClass || 'primary'}-soft`"
              >
                <i class="bi" :class="checkup.icon || 'bi-clipboard-heart'"></i>
              </div>
              <h5 class="card-title">{{ checkup.title }}</h5>
              <p class="card-text mb-4">{{ checkup.description }}</p>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="toggleCheckup(index)"
              >
                {{ expandedCheckup === index ? "Read Less" : "Read More" }}
                <i
                  class="bi ms-1"
                  :class="
                    expandedCheckup === index
                      ? 'bi-chevron-up'
                      : 'bi-chevron-down'
                  "
                ></i>
              </button>
            </div>
            <div v-if="expandedCheckup === index" class="card-footer py-4 px-4">
              <div class="checkup-details">
                <div class="mb-4">
                  <h6 class="detail-title">
                    <i class="bi bi-exclamation-circle me-2"></i>
                    Symptoms to Watch For:
                  </h6>
                  <ul class="mb-3 symptom-list">
                    <li v-for="(symptom, i) in checkup.symptoms" :key="i">
                      {{ symptom }}
                    </li>
                  </ul>
                </div>

                <div class="mb-4">
                  <h6 class="detail-title">
                    <i class="bi bi-hospital me-2"></i>
                    When to See a Doctor:
                  </h6>
                  <ul class="mb-3 doctor-list">
                    <li
                      v-for="(condition, i) in checkup.whenToSeeDoctor"
                      :key="i"
                    >
                      {{ condition }}
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 class="detail-title">
                    <i class="bi bi-bandaid me-2"></i>
                    Self-Care Tips:
                  </h6>
                  <ul class="tips-list">
                    <li v-for="(tip, i) in checkup.selfCareTips" :key="i">
                      {{ tip }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5 mb-4">
        <div class="col-12 mb-4">
          <div class="section-header">
            <h3>Digital Health Assessment Tools</h3>
            <div class="section-line"></div>
          </div>
        </div>


        <div class="col-md-6 mb-4">
          <div class="card h-100 calculator-card">
            <div
              class="card-header bg-primary text-white p-3 d-flex align-items-center"
            >
              <i class="bi bi-calculator me-2"></i>
              <h5 class="mb-0">BMI Calculator</h5>
            </div>
            <div class="card-body p-4">
              <p class="card-text mb-4">
                Calculate your Body Mass Index to assess if you're at a healthy
                weight.
              </p>

              <form @submit.prevent="calculateBMI" class="calculator-form mb-3">
                <div class="mb-4">
                  <label for="height" class="form-label">Height (cm)</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="height"
                      v-model="bmiData.height"
                      min="100"
                      max="250"
                      placeholder="Enter height"
                      required
                    />
                    <span class="input-group-text">cm</span>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="weight" class="form-label">Weight (kg)</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="weight"
                      v-model="bmiData.weight"
                      min="30"
                      max="300"
                      placeholder="Enter weight"
                      required
                    />
                    <span class="input-group-text">kg</span>
                  </div>
                </div>

                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-calculator me-2"></i>Calculate BMI
                </button>
              </form>

              <div v-if="bmiResult" class="bmi-result p-4 mb-3 rounded">
                <h6 class="result-title">Your BMI Result:</h6>
                <div
                  class="d-flex justify-content-between align-items-center my-3"
                >
                  <span class="result-value">{{ bmiResult.bmi }}</span>
                  <span
                    class="badge rounded-pill"
                    :class="bmiResult.categoryClass"
                    >{{ bmiResult.category }}</span
                  >
                </div>
                <p class="result-interpretation mb-0">
                  {{ bmiResult.interpretation }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div class="card h-100 calculator-card">
            <div
              class="card-header bg-danger text-white p-3 d-flex align-items-center"
            >
              <i class="bi bi-heart-pulse me-2"></i>
              <h5 class="mb-0">Heart Rate Guide</h5>
            </div>
            <div class="card-body p-4">
              <p class="card-text mb-4">
                Understand what your heart rate means and the normal ranges
                based on your age.
              </p>

              <form
                @submit.prevent="checkHeartRate"
                class="calculator-form mb-3"
              >
                <div class="mb-4">
                  <label for="age" class="form-label">Your Age</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="age"
                      v-model="heartRateData.age"
                      min="1"
                      max="120"
                      placeholder="Enter your age"
                      required
                    />
                    <span class="input-group-text">years</span>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="restingHeartRate" class="form-label"
                    >Resting Heart Rate</label
                  >
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="restingHeartRate"
                      v-model="heartRateData.rate"
                      min="30"
                      max="200"
                      placeholder="Enter heart rate"
                      required
                    />
                    <span class="input-group-text">BPM</span>
                  </div>
                </div>

                <button type="submit" class="btn btn-danger">
                  <i class="bi bi-heart me-2"></i>Check Heart Rate
                </button>
              </form>

              <div v-if="heartRateResult" class="heart-rate-result p-4 rounded">
                <h6 class="result-title">Your Heart Rate Assessment:</h6>
                <div
                  class="d-flex justify-content-between align-items-center my-3"
                >
                  <span class="result-value">{{ heartRateData.rate }} BPM</span>
                  <span
                    class="badge rounded-pill"
                    :class="heartRateResult.categoryClass"
                    >{{ heartRateResult.category }}</span
                  >
                </div>
                <p class="result-interpretation mb-0">
                  {{ heartRateResult.interpretation }}
                </p>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-6 mb-4">
          <div class="card h-100 calculator-card">
            <div
              class="card-header bg-success text-white p-3 d-flex align-items-center"
            >
              <i class="bi bi-activity me-2"></i>
              <h5 class="mb-0">Blood Pressure Checker</h5>
            </div>
            <div class="card-body p-4">
              <p class="card-text mb-4">
                Check if your blood pressure readings are normal, elevated, or
                indicate hypertension.
              </p>

              <form
                @submit.prevent="checkBloodPressure"
                class="calculator-form mb-3"
              >
                <div class="mb-4">
                  <label for="systolic" class="form-label"
                    >Systolic Pressure (Top Number)</label
                  >
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="systolic"
                      v-model="bloodPressureData.systolic"
                      min="70"
                      max="250"
                      placeholder="Enter systolic pressure"
                      required
                    />
                    <span class="input-group-text">mmHg</span>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="diastolic" class="form-label"
                    >Diastolic Pressure (Bottom Number)</label
                  >
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      id="diastolic"
                      v-model="bloodPressureData.diastolic"
                      min="40"
                      max="150"
                      placeholder="Enter diastolic pressure"
                      required
                    />
                    <span class="input-group-text">mmHg</span>
                  </div>
                </div>

                <button type="submit" class="btn btn-success">
                  <i class="bi bi-activity me-2"></i>Check Blood Pressure
                </button>
              </form>

              <div
                v-if="bloodPressureResult"
                class="blood-pressure-result p-4 rounded"
              >
                <h6 class="result-title">Your Blood Pressure Assessment:</h6>
                <div
                  class="d-flex justify-content-between align-items-center my-3"
                >
                  <span class="result-value"
                    >{{ bloodPressureData.systolic }}/{{
                      bloodPressureData.diastolic
                    }}
                    mmHg</span
                  >
                  <span
                    class="badge rounded-pill"
                    :class="bloodPressureResult.categoryClass"
                    >{{ bloodPressureResult.category }}</span
                  >
                </div>
                <p class="result-interpretation mb-3">
                  {{ bloodPressureResult.interpretation }}
                </p>
                <div
                  v-if="bloodPressureResult.recommendations"
                  class="recommendations"
                >
                  <h6 class="text-muted mb-2">Recommendations:</h6>
                  <ul class="small text-muted mb-0">
                    <li
                      v-for="(
                        rec, index
                      ) in bloodPressureResult.recommendations"
                      :key="index"
                    >
                      {{ rec }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="disclaimer-section mb-3">
        <div class="alert alert-info d-flex align-items-start">
          <div class="alert-icon me-3">
            <i class="bi bi-info-circle-fill"></i>
          </div>
          <div>
            <h6 class="alert-heading mb-2">Disclaimer:</h6>
            <p class="mb-0">
              The information provided by these self-assessment tools is
              intended for general informational purposes only and should not be
              considered as medical advice. Always consult with a healthcare
              professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>


      <div class="contact-section text-center py-4 px-3 mb-4 rounded">
        <h4>Need further assistance?</h4>
        <p class="mb-4">
          Our medical professionals are available for instant consultations
        </p>
        <div class="d-grid gap-2 d-md-block">
          <router-link
            to="/instant-consultation"
            class="btn btn-primary me-md-2"
          >
            <i class="bi bi-chat-dots me-2"></i>Get Instant Consultation
          </router-link>
          <router-link to="/appointments" class="btn btn-outline-primary">
            <i class="bi bi-calendar-plus me-2"></i>Book an Appointment
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";


const expandedCheckup = ref(null);


const bmiData = ref({
  height: null,
  weight: null,
});
const bmiResult = ref(null);


const heartRateData = ref({
  age: null,
  rate: null,
});
const heartRateResult = ref(null);

const bloodPressureData = ref({
  systolic: null,
  diastolic: null,
});
const bloodPressureResult = ref(null);


const selfCheckups = [
  {
    title: "Cold & Flu Assessment",
    description:
      "Determine if your symptoms indicate a common cold or the flu, and learn when to seek medical attention.",
    symptoms: [
      "Fever or feeling feverish/chills",
      "Cough",
      "Sore throat",
      "Runny or stuffy nose",
      "Muscle or body aches",
      "Headaches",
      "Fatigue (tiredness)",
      "Vomiting and diarrhea (more common in children)",
    ],
    whenToSeeDoctor: [
      "Fever above 101.3°F (38.5°C) for more than three days",
      "Shortness of breath or difficulty breathing",
      "Pain or pressure in the chest or abdomen",
      "Sudden dizziness or confusion",
      "Severe or persistent vomiting",
    ],
    selfCareTips: [
      "Rest and stay hydrated",
      "Take over-the-counter medications for symptom relief",
      "Use a humidifier or take a hot shower to ease congestion",
      "Stay home to avoid spreading illness to others",
    ],
  },
  {
    title: "Headache Evaluation",
    description:
      "Identify what type of headache you might be experiencing and understand when it could indicate a more serious condition.",
    symptoms: [
      "Pain or pressure in the head",
      "Throbbing or pulsating sensation",
      "Pain on one or both sides of the head",
      "Sensitivity to light or sound",
      "Nausea or vomiting",
      "Visual disturbances (for migraines)",
    ],
    whenToSeeDoctor: [
      'Sudden, severe headache often described as "the worst headache of your life"',
      "Headache with fever, stiff neck, confusion, seizures, double vision, or weakness",
      "Headache after a head injury",
      "Chronic headaches that don't respond to over-the-counter treatments",
      "New headache pain if you're over age 50",
    ],
    selfCareTips: [
      "Rest in a quiet, dark room",
      "Apply a cold or warm compress to your head",
      "Practice relaxation techniques",
      "Stay hydrated and maintain regular sleep patterns",
      "Keep a headache diary to identify triggers",
    ],
  },
  {
    title: "Digestive Issues",
    description:
      "Assess common digestive symptoms and learn about potential causes and remedies.",
    symptoms: [
      "Abdominal pain or cramps",
      "Bloating or gas",
      "Diarrhea or constipation",
      "Nausea or vomiting",
      "Heartburn or acid reflux",
      "Changes in bowel habits",
    ],
    whenToSeeDoctor: [
      "Blood in stool or black, tarry stools",
      "Severe abdominal pain",
      "Unexplained weight loss",
      "Persistent diarrhea or vomiting",
      "Difficulty swallowing",
      "Symptoms that persist for more than a few days",
    ],
    selfCareTips: [
      "Stay hydrated, especially if experiencing diarrhea or vomiting",
      "Eat smaller, more frequent meals",
      "Avoid trigger foods (spicy, fatty, or acidic foods)",
      "Increase fiber intake for constipation",
      "Use over-the-counter remedies as appropriate",
    ],
  },
  {
    title: "Skin Conditions",
    description:
      "Evaluate common skin problems and determine if they require professional medical attention.",
    symptoms: [
      "Rash or skin discoloration",
      "Itching or burning sensation",
      "Bumps, blisters, or sores",
      "Dry, cracked, or scaly skin",
      "Swelling or redness",
    ],
    whenToSeeDoctor: [
      "Rapidly spreading rash",
      "Rash accompanied by fever",
      "Painful rash or open sores that don't heal",
      "Signs of infection (increased pain, swelling, warmth, or pus)",
      "Moles that change in size, shape, or color",
    ],
    selfCareTips: [
      "Keep the affected area clean and dry",
      "Avoid scratching to prevent infection",
      "Use mild, fragrance-free soaps and moisturizers",
      "Apply cold compresses for itching or burning",
      "Try over-the-counter hydrocortisone cream for mild irritation",
    ],
  },
  {
    title: "Stress & Anxiety Check",
    description:
      "Recognize signs of stress and anxiety, and explore strategies to manage these common mental health concerns.",
    symptoms: [
      "Persistent worry or fear",
      "Feeling restless or on edge",
      "Fatigue or difficulty sleeping",
      "Irritability",
      "Muscle tension",
      "Difficulty concentrating",
      "Physical symptoms like headaches or digestive issues",
    ],
    whenToSeeDoctor: [
      "Symptoms interfere with daily activities",
      "Anxiety or panic attacks that are severe or frequent",
      "Depression or thoughts of self-harm",
      "Using alcohol or drugs to cope with symptoms",
      "Physical symptoms with no apparent cause",
    ],
    selfCareTips: [
      "Practice deep breathing and meditation",
      "Engage in regular physical activity",
      "Maintain a consistent sleep schedule",
      "Limit caffeine and alcohol consumption",
      "Connect with supportive friends and family",
    ],
  },
  {
    title: "Back Pain Assessment",
    description:
      "Evaluate back pain symptoms and learn when they might indicate a serious condition requiring medical attention.",
    symptoms: [
      "Dull, aching pain in the lower back",
      "Stabbing or shooting pain",
      "Pain that radiates down the leg",
      "Muscle stiffness or limited flexibility",
      "Difficulty standing straight or walking",
    ],
    whenToSeeDoctor: [
      "Pain following a fall or injury",
      "Severe pain that doesn't improve with rest",
      "Pain accompanied by numbness or weakness in legs",
      "Pain along with unexplained weight loss or fever",
      "Pain that worsens at night or when lying down",
    ],
    selfCareTips: [
      "Apply ice for the first 48-72 hours, then switch to heat",
      "Maintain light activity – complete bed rest isn't recommended",
      "Practice good posture and ergonomics",
      "Strengthen core muscles through gentle exercises",
      "Try over-the-counter pain relievers as needed",
    ],
  },
];

const toggleCheckup = (index) => {
  if (expandedCheckup.value === index) {
    expandedCheckup.value = null;
  } else {
    expandedCheckup.value = index;
  }
};


const calculateBMI = () => {

  const heightInMeters = bmiData.value.height / 100;

  const bmi = bmiData.value.weight / (heightInMeters * heightInMeters);
  const roundedBMI = bmi.toFixed(1);

  let category, interpretation, categoryClass;

  if (bmi < 18.5) {
    category = "Underweight";
    interpretation =
      "You are below the healthy weight range. Consider consulting with a healthcare professional about nutrition and weight management.";
    categoryClass = "bg-info";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal Weight";
    interpretation =
      "You are within the healthy weight range. Maintain a balanced diet and regular physical activity.";
    categoryClass = "bg-success";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
    interpretation =
      "You are above the healthy weight range. Consider lifestyle changes that include healthy eating and increased physical activity.";
    categoryClass = "bg-warning";
  } else {
    category = "Obesity";
    interpretation =
      "Your BMI indicates obesity, which increases risk for various health conditions. Consider consulting with a healthcare provider for guidance.";
    categoryClass = "bg-danger";
  }

  bmiResult.value = {
    bmi: roundedBMI,
    category,
    interpretation,
    categoryClass,
  };
};


const checkHeartRate = () => {
  const age = parseInt(heartRateData.value.age);
  const rate = parseInt(heartRateData.value.rate);
  let category, interpretation, categoryClass;

 
  let minNormal, maxNormal;

  if (age <= 5) {
    minNormal = 80;
    maxNormal = 130;
  } else if (age <= 12) {
    minNormal = 70;
    maxNormal = 110;
  } else if (age <= 18) {
    minNormal = 60;
    maxNormal = 100;
  } else {
    minNormal = 60;
    maxNormal = 100;
  }

  if (rate < minNormal) {
    category = "Lower Than Average";
    interpretation =
      "Your resting heart rate is lower than the typical range for your age. If you're an athlete, this may be normal. Otherwise, consider discussing with a healthcare provider.";
    categoryClass = "bg-info";
  } else if (rate >= minNormal && rate <= maxNormal) {
    category = "Normal Range";
    interpretation =
      "Your resting heart rate is within the normal range for your age. This indicates good heart health.";
    categoryClass = "bg-success";
  } else if (rate > maxNormal && rate <= maxNormal + 20) {
    category = "Higher Than Average";
    interpretation =
      "Your heart rate is slightly elevated. This could be due to stress, caffeine, or other temporary factors. Monitor and check again when relaxed.";
    categoryClass = "bg-warning";
  } else {
    category = "Significantly Elevated";
    interpretation =
      "Your heart rate is significantly higher than normal. Consider consulting with a healthcare provider, especially if accompanied by other symptoms.";
    categoryClass = "bg-danger";
  }

  heartRateResult.value = {
    category,
    interpretation,
    categoryClass,
  };
};

const checkBloodPressure = () => {
  const systolic = parseInt(bloodPressureData.value.systolic);
  const diastolic = parseInt(bloodPressureData.value.diastolic);
  let category, interpretation, categoryClass, recommendations;


  if (systolic < 120 && diastolic < 80) {
    category = "Normal";
    interpretation =
      "Your blood pressure is in the normal range. This is excellent for your cardiovascular health.";
    categoryClass = "bg-success";
    recommendations = [
      "Maintain a healthy lifestyle with regular exercise",
      "Eat a balanced diet rich in fruits and vegetables",
      "Limit sodium intake",
      "Continue regular blood pressure monitoring",
    ];
  } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    category = "Elevated";
    interpretation =
      "Your blood pressure is elevated. You're at increased risk of developing high blood pressure.";
    categoryClass = "bg-warning";
    recommendations = [
      "Increase physical activity and exercise regularly",
      "Follow a heart-healthy diet (DASH diet recommended)",
      "Reduce sodium intake to less than 2,300mg daily",
      "Maintain a healthy weight",
      "Monitor blood pressure regularly",
    ];
  } else if (
    (systolic >= 130 && systolic <= 139) ||
    (diastolic >= 80 && diastolic <= 89)
  ) {
    category = "High Blood Pressure Stage 1";
    interpretation =
      "You have Stage 1 high blood pressure (hypertension). Lifestyle changes and possibly medication may be needed.";
    categoryClass = "bg-danger";
    recommendations = [
      "Consult with a healthcare provider soon",
      "Implement lifestyle modifications immediately",
      "Monitor blood pressure regularly at home",
      "Consider medication as prescribed by your doctor",
      "Reduce stress through relaxation techniques",
    ];
  } else if (systolic >= 140 || diastolic >= 90) {
    category = "High Blood Pressure Stage 2";
    interpretation =
      "You have Stage 2 high blood pressure (hypertension). Medical attention is strongly recommended.";
    categoryClass = "bg-danger";
    recommendations = [
      "Seek medical attention promptly",
      "Medication will likely be necessary",
      "Make immediate lifestyle changes",
      "Monitor blood pressure daily",
      "Follow up regularly with healthcare provider",
    ];
  } else if (systolic >= 180 || diastolic >= 120) {
    category = "Hypertensive Crisis";
    interpretation =
      "This indicates a hypertensive crisis. Seek immediate medical attention!";
    categoryClass = "bg-danger";
    recommendations = [
      "Seek emergency medical care immediately",
      "Call 911 or go to emergency room",
      "Do not wait - this requires immediate treatment",
      "Bring a list of current medications",
    ];
  }

  bloodPressureResult.value = {
    category,
    interpretation,
    categoryClass,
    recommendations,
  };
};
</script>

<style scoped>
/* Page Header */
.page-header {
  border-bottom: 2px solid rgba(13, 110, 253, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

/* Section Headers */
.section-header {
  position: relative;
  margin-bottom: 1rem;
}

.section-line {
  height: 3px;
  width: 60px;
  background-color: var(--primary-color);
  margin-top: 0.75rem;
}

/* Intro Card */
.intro-card {
  border-radius: 1rem;
  overflow: hidden;
  border: none;
  background: linear-gradient(
    to right,
    rgba(13, 110, 253, 0.05),
    rgba(13, 110, 253, 0.02)
  );
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background-color: rgba(13, 110, 253, 0.1);
  border-radius: 50%;
}

.self-checkup-icon {
  font-size: 4rem;
  color: var(--primary-color);
}

.alert-icon {
  display: flex;
  align-items: flex-start;
  font-size: 1.25rem;
  color: inherit;
}

/* Checkup Cards */
.checkup-card {
  border-radius: 1rem;
  transition: all 0.3s ease;
  overflow: hidden;
  border: none;
}

.checkup-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bg-primary-soft {
  background-color: rgba(13, 110, 253, 0.1);
  color: var(--primary-color);
}

.bg-danger-soft {
  background-color: rgba(220, 53, 69, 0.1);
  color: var(--danger-color);
}

.bg-warning-soft {
  background-color: rgba(255, 193, 7, 0.1);
  color: var(--warning-color);
}

.card-footer {
  background-color: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: var(--primary-color);
  font-weight: 600;
}

.checkup-details ul {
  padding-left: 1.75rem;
  margin-bottom: 1rem;
}

.checkup-details li {
  margin-bottom: 0.5rem;
}

.symptom-list li {
  color: var(--danger-color);
}

.doctor-list li {
  color: var(--dark-color);
}

.tips-list li {
  color: var(--success-color);
}

/* Calculator Cards */
.calculator-card {
  border-radius: 1rem;
  border: none;
  overflow: hidden;
}

.calculator-form input {
  border-radius: 0.5rem;
}

/* Result Components */
.bmi-result,
.heart-rate-result,
.blood-pressure-result {
  background-color: rgba(13, 110, 253, 0.05);
  border: 1px solid rgba(13, 110, 253, 0.1);
}

.result-title {
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 1rem;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.result-interpretation {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
}

.recommendations {
  background-color: rgba(108, 117, 125, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
}

.recommendations ul {
  margin-bottom: 0;
  padding-left: 1.2rem;
}

.recommendations li {
  margin-bottom: 0.25rem;
}

/* Blood Pressure Specific Styles */
.blood-pressure-result .badge.bg-danger {
  animation: pulse-danger 2s infinite;
}

@keyframes pulse-danger {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(220, 53, 69, 0);
  }
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .icon-wrapper {
    width: 100px;
    height: 100px;
  }

  .self-checkup-icon {
    font-size: 3.5rem;
  }

  .intro-card .card-body {
    padding: 1.5rem !important;
  }
}

@media (max-width: 768px) {
  .page-header h2 {
    font-size: 1.75rem;
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }

  .self-checkup-icon {
    font-size: 3rem;
  }

  .intro-card .alert {
    flex-direction: column;
  }

  .intro-card .alert-icon {
    margin-bottom: 0.5rem;
    margin-right: 0;
  }

  .card-icon {
    width: 45px;
    height: 45px;
    font-size: 1.25rem;
  }

  .calculator-form .btn {
    width: 100%;
  }

  .contact-section .btn {
    width: 100%;
    margin-right: 0 !important;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .section-header h3 {
    font-size: 1.35rem;
  }

  .section-line {
    width: 40px;
    height: 2px;
  }

  .card-body,
  .card-footer {
    padding: 1.25rem !important;
  }

  .result-value {
    font-size: 1.25rem;
  }

  .disclaimer-section .alert {
    flex-direction: column;
    text-align: center;
  }

  .disclaimer-section .alert-icon {
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
}
</style>
