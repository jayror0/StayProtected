<template>
  <div class="health-tips-view">
    <div class="container py-4">
      <div class="page-header mb-4">
        <h2 class="mb-2">Health Tips and Guidance</h2>
        <p class="text-muted mb-0">Expert advice for your wellness journey</p>
      </div>

      <div class="card intro-card mb-4">
        <div class="card-body p-4">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-7">
              <h3 class="card-title mb-3">Empower Your Wellness Journey</h3>
              <p class="card-text">
                Browse our collection of expert health tips, preventive care
                advice, and wellness recommendations to help you lead a
                healthier life. These resources are available to everyone,
                whether you're a registered user or not.
              </p>
              <div class="d-flex align-items-center mt-4 health-stats">
                <div class="health-stat-item">
                  <span class="stat-number">50+</span>
                  <span class="stat-label">Health Tips</span>
                </div>
                <div class="health-stat-item">
                  <span class="stat-number">5</span>
                  <span class="stat-label">Categories</span>
                </div>
                <div class="health-stat-item">
                  <span class="stat-number">Weekly</span>
                  <span class="stat-label">Updates</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-5 text-center mt-4 mt-md-0">
              <div class="icon-wrapper">
                <i class="bi bi-lightbulb health-tips-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tabs-container mb-4">
        <ul class="nav nav-pills" id="healthTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="general-tab"
              data-bs-toggle="pill"
              data-bs-target="#general"
              type="button"
              role="tab"
              aria-controls="general"
              aria-selected="true"
            >
              <i class="bi bi-star me-2 d-none d-sm-inline-block"></i>General
              Wellness
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="nutrition-tab"
              data-bs-toggle="pill"
              data-bs-target="#nutrition"
              type="button"
              role="tab"
              aria-controls="nutrition"
              aria-selected="false"
            >
              <i class="bi bi-apple me-2 d-none d-sm-inline-block"></i>Nutrition
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="fitness-tab"
              data-bs-toggle="pill"
              data-bs-target="#fitness"
              type="button"
              role="tab"
              aria-controls="fitness"
              aria-selected="false"
            >
              <i class="bi bi-activity me-2 d-none d-sm-inline-block"></i
              >Fitness
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="mental-tab"
              data-bs-toggle="pill"
              data-bs-target="#mental"
              type="button"
              role="tab"
              aria-controls="mental"
              aria-selected="false"
            >
              <i class="bi bi-emoji-smile me-2 d-none d-sm-inline-block"></i
              >Mental Health
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="preventive-tab"
              data-bs-toggle="pill"
              data-bs-target="#preventive"
              type="button"
              role="tab"
              aria-controls="preventive"
              aria-selected="false"
            >
              <i class="bi bi-shield-check me-2 d-none d-sm-inline-block"></i
              >Preventive Care
            </button>
          </li>
        </ul>
      </div>


      <div class="tab-content" id="healthTabsContent">

        <div
          class="tab-pane fade show active"
          id="general"
          role="tabpanel"
          aria-labelledby="general-tab"
        >
          <div class="row g-4">
            <div
              v-for="(tip, index) in generalTips"
              :key="'general-' + index"
              class="col-md-6 col-lg-4"
            >
              <div class="card h-100 tip-card">
                <div class="card-body p-4">
                  <div
                    class="tip-icon mb-3"
                    :style="{
                      backgroundColor: 'rgba(13, 110, 253, 0.1)',
                      color: '#0d6efd',
                    }"
                  >
                    <i class="bi" :class="tip.icon || 'bi-lightbulb'"></i>
                  </div>
                  <h5 class="card-title mb-3">{{ tip.title }}</h5>
                  <p class="card-text tip-preview mb-4">{{ tip.preview }}</p>
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click="toggleTip('general', index)"
                  >
                    <span>{{
                      selectedTip.category === "general" &&
                      selectedTip.index === index
                        ? "Read Less"
                        : "Read More"
                    }}</span>
                    <i
                      class="bi ms-1"
                      :class="
                        selectedTip.category === 'general' &&
                        selectedTip.index === index
                          ? 'bi-chevron-up'
                          : 'bi-chevron-down'
                      "
                    ></i>
                  </button>

                  <div
                    v-if="
                      selectedTip.category === 'general' &&
                      selectedTip.index === index
                    "
                    class="mt-3 tip-details"
                  >
                    <p
                      v-for="(paragraph, i) in tip.details"
                      :key="i"
                      class="mb-2"
                    >
                      {{ paragraph }}
                    </p>
                    <div v-if="tip.bullets" class="mt-3">
                      <ul>
                        <li v-for="(bullet, i) in tip.bullets" :key="i">
                          {{ bullet }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="nutrition"
          role="tabpanel"
          aria-labelledby="nutrition-tab"
        >
          <div class="row g-4">
            <div
              v-for="(tip, index) in nutritionTips"
              :key="'nutrition-' + index"
              class="col-md-6 col-lg-4"
            >
              <div class="card h-100 tip-card">
                <div class="card-body p-4">
                  <div
                    class="tip-icon mb-3"
                    :style="{
                      backgroundColor: 'rgba(25, 135, 84, 0.1)',
                      color: '#198754',
                    }"
                  >
                    <i class="bi" :class="tip.icon || 'bi-apple'"></i>
                  </div>
                  <h5 class="card-title mb-3">{{ tip.title }}</h5>
                  <p class="card-text tip-preview mb-4">{{ tip.preview }}</p>
                  <button
                    class="btn btn-sm btn-outline-success"
                    @click="toggleTip('nutrition', index)"
                  >
                    <span>{{
                      selectedTip.category === "nutrition" &&
                      selectedTip.index === index
                        ? "Read Less"
                        : "Read More"
                    }}</span>
                    <i
                      class="bi ms-1"
                      :class="
                        selectedTip.category === 'nutrition' &&
                        selectedTip.index === index
                          ? 'bi-chevron-up'
                          : 'bi-chevron-down'
                      "
                    ></i>
                  </button>

                  <div
                    v-if="
                      selectedTip.category === 'nutrition' &&
                      selectedTip.index === index
                    "
                    class="mt-3 tip-details"
                  >
                    <p
                      v-for="(paragraph, i) in tip.details"
                      :key="i"
                      class="mb-2"
                    >
                      {{ paragraph }}
                    </p>
                    <div v-if="tip.bullets" class="mt-3">
                      <ul>
                        <li v-for="(bullet, i) in tip.bullets" :key="i">
                          {{ bullet }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="fitness"
          role="tabpanel"
          aria-labelledby="fitness-tab"
        >
          <div class="row g-4">
            <div
              v-for="(tip, index) in fitnessTips"
              :key="'fitness-' + index"
              class="col-md-6 col-lg-4"
            >
              <div class="card h-100 tip-card">
                <div class="card-body p-4">
                  <div
                    class="tip-icon mb-3"
                    :style="{
                      backgroundColor: 'rgba(220, 53, 69, 0.1)',
                      color: '#dc3545',
                    }"
                  >
                    <i class="bi" :class="tip.icon || 'bi-activity'"></i>
                  </div>
                  <h5 class="card-title mb-3">{{ tip.title }}</h5>
                  <p class="card-text tip-preview mb-4">{{ tip.preview }}</p>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="toggleTip('fitness', index)"
                  >
                    <span>{{
                      selectedTip.category === "fitness" &&
                      selectedTip.index === index
                        ? "Read Less"
                        : "Read More"
                    }}</span>
                    <i
                      class="bi ms-1"
                      :class="
                        selectedTip.category === 'fitness' &&
                        selectedTip.index === index
                          ? 'bi-chevron-up'
                          : 'bi-chevron-down'
                      "
                    ></i>
                  </button>

                  <div
                    v-if="
                      selectedTip.category === 'fitness' &&
                      selectedTip.index === index
                    "
                    class="mt-3 tip-details"
                  >
                    <p
                      v-for="(paragraph, i) in tip.details"
                      :key="i"
                      class="mb-2"
                    >
                      {{ paragraph }}
                    </p>
                    <div v-if="tip.bullets" class="mt-3">
                      <ul>
                        <li v-for="(bullet, i) in tip.bullets" :key="i">
                          {{ bullet }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="mental"
          role="tabpanel"
          aria-labelledby="mental-tab"
        >
          <div class="row g-4">
            <div
              v-for="(tip, index) in mentalHealthTips"
              :key="'mental-' + index"
              class="col-md-6 col-lg-4"
            >
              <div class="card h-100 tip-card">
                <div class="card-body p-4">
                  <div
                    class="tip-icon mb-3"
                    :style="{
                      backgroundColor: 'rgba(13, 202, 240, 0.1)',
                      color: '#0dcaf0',
                    }"
                  >
                    <i class="bi" :class="tip.icon || 'bi-emoji-smile'"></i>
                  </div>
                  <h5 class="card-title mb-3">{{ tip.title }}</h5>
                  <p class="card-text tip-preview mb-4">{{ tip.preview }}</p>
                  <button
                    class="btn btn-sm btn-outline-info"
                    @click="toggleTip('mental', index)"
                  >
                    <span>{{
                      selectedTip.category === "mental" &&
                      selectedTip.index === index
                        ? "Read Less"
                        : "Read More"
                    }}</span>
                    <i
                      class="bi ms-1"
                      :class="
                        selectedTip.category === 'mental' &&
                        selectedTip.index === index
                          ? 'bi-chevron-up'
                          : 'bi-chevron-down'
                      "
                    ></i>
                  </button>

                  <div
                    v-if="
                      selectedTip.category === 'mental' &&
                      selectedTip.index === index
                    "
                    class="mt-3 tip-details"
                  >
                    <p
                      v-for="(paragraph, i) in tip.details"
                      :key="i"
                      class="mb-2"
                    >
                      {{ paragraph }}
                    </p>
                    <div v-if="tip.bullets" class="mt-3">
                      <ul>
                        <li v-for="(bullet, i) in tip.bullets" :key="i">
                          {{ bullet }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade"
          id="preventive"
          role="tabpanel"
          aria-labelledby="preventive-tab"
        >
          <div class="row g-4">
            <div
              v-for="(tip, index) in preventiveTips"
              :key="'preventive-' + index"
              class="col-md-6 col-lg-4"
            >
              <div class="card h-100 tip-card">
                <div class="card-body p-4">
                  <div
                    class="tip-icon mb-3"
                    :style="{
                      backgroundColor: 'rgba(255, 193, 7, 0.1)',
                      color: '#ffc107',
                    }"
                  >
                    <i class="bi" :class="tip.icon || 'bi-shield-check'"></i>
                  </div>
                  <h5 class="card-title mb-3">{{ tip.title }}</h5>
                  <p class="card-text tip-preview mb-4">{{ tip.preview }}</p>
                  <button
                    class="btn btn-sm btn-outline-warning"
                    @click="toggleTip('preventive', index)"
                  >
                    <span>{{
                      selectedTip.category === "preventive" &&
                      selectedTip.index === index
                        ? "Read Less"
                        : "Read More"
                    }}</span>
                    <i
                      class="bi ms-1"
                      :class="
                        selectedTip.category === 'preventive' &&
                        selectedTip.index === index
                          ? 'bi-chevron-up'
                          : 'bi-chevron-down'
                      "
                    ></i>
                  </button>

                  <div
                    v-if="
                      selectedTip.category === 'preventive' &&
                      selectedTip.index === index
                    "
                    class="mt-3 tip-details"
                  >
                    <p
                      v-for="(paragraph, i) in tip.details"
                      :key="i"
                      class="mb-2"
                    >
                      {{ paragraph }}
                    </p>
                    <div v-if="tip.bullets" class="mt-3">
                      <ul>
                        <li v-for="(bullet, i) in tip.bullets" :key="i">
                          {{ bullet }}
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

      <div class="mt-5 mb-4">
        <h4 class="mb-4">Trusted Health Resources</h4>
        <div class="row g-3">
          <div class="col-md-4 col-sm-6 mb-3">
            <div class="card text-center h-100 trusted-resource-card">
              <div class="card-body p-4">
                <div
                  class="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3"
                >
                  <i class="bi bi-globe fs-3 text-primary"></i>
                </div>
                <h5 class="card-title">World Health Organization</h5>
                <p class="card-text">
                  Access international health guidelines and recommendations.
                </p>
                <div class="mt-auto pt-3">
                  <a
                    href="https://www.who.int/"
                    class="btn btn-primary btn-inline"
                    target="_blank"
                  >
                    <i class="bi bi-box-arrow-up-right me-2"></i>Visit Website
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 mb-3">
            <div class="card text-center h-100 trusted-resource-card">
              <div class="card-body p-4">
                <div
                  class="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3"
                >
                  <i class="bi bi-shield-check fs-3 text-success"></i>
                </div>
                <h5 class="card-title">Centers for Disease Control</h5>
                <p class="card-text">
                  Find information on diseases, prevention, and public health.
                </p>
                <div class="mt-auto pt-3">
                  <a
                    href="https://www.cdc.gov/"
                    class="btn btn-success btn-inline"
                    target="_blank"
                  >
                    <i class="bi bi-box-arrow-up-right me-2"></i>Visit Website
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 mb-3">
            <div class="card text-center h-100 trusted-resource-card">
              <div class="card-body p-4">
                <div
                  class="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3"
                >
                  <i class="bi bi-journal-medical fs-3 text-info"></i>
                </div>
                <h5 class="card-title">MedlinePlus</h5>
                <p class="card-text">
                  Access reliable, up-to-date health information for patients.
                </p>
                <div class="mt-auto pt-3">
                  <a
                    href="https://medlineplus.gov/"
                    class="btn btn-info btn-inline text-white"
                    target="_blank"
                  >
                    <i class="bi bi-box-arrow-up-right me-2"></i>Visit Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="alert alert-secondary mt-5 disclaimer">
        <div class="d-flex">
          <div class="flex-shrink-0">
            <i class="bi bi-info-circle me-2 disclaimer-icon"></i>
          </div>
          <div>
            <p class="mb-0 small">
              <strong>Disclaimer:</strong> The health information provided is
              for general educational purposes only. It is not intended to be a
              substitute for professional medical advice, diagnosis, or
              treatment. Always seek the advice of your physician or other
              qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const selectedTip = ref({
  category: null,
  index: null
});


const toggleTip = (category, index) => {
  if (selectedTip.value.category === category && selectedTip.value.index === index) {
    selectedTip.value = { category: null, index: null };
  } else {
    selectedTip.value = { category, index };
  }
};


const generalTips = [
  {
    title: 'The Importance of Sleep',
    preview: 'Quality sleep is essential for overall health. Learn how much sleep you need and tips for better rest.',
    details: [
      'Sleep is not a luxury—it\'s essential to good health. When you sleep, your body is working to support healthy brain function and physical health. In children and teens, sleep also supports growth and development.',
      'The ongoing state of sleep deficiency can raise your risk for chronic health problems, as well as affect how well you think, react, work, learn, and interact with others.'
    ],
    bullets: [
      'Most adults need 7-9 hours of quality sleep each night',
      'Stick to a regular sleep schedule, even on weekends',
      'Create a restful environment: cool, dark, and quiet',
      'Avoid screens (phones, tablets, TVs) for at least an hour before bedtime',
      'Limit caffeine after midday and avoid large meals before bedtime',
      'Regular physical activity can help you fall asleep faster and enjoy deeper sleep'
    ]
  },
  {
    title: 'Staying Hydrated',
    preview: 'Water is vital for every system in your body. Discover how to stay properly hydrated and recognize dehydration signs.',
    details: [
      'Water makes up about 60% of your body weight and is involved in many essential functions including regulating body temperature, removing waste, and lubricating joints.',
      'Even mild dehydration can drain your energy and make you feel tired. More severe dehydration can cause serious health problems.'
    ],
    bullets: [
      'Most people should aim for 8-10 cups (64-80 oz) of water daily',
      'Your water needs increase with exercise, hot weather, and during illness',
      'Signs of dehydration include thirst, dry mouth, dark urine, fatigue, dizziness, and headaches',
      'Foods with high water content (fruits, vegetables) contribute to hydration',
      'Carry a reusable water bottle and sip throughout the day',
      'Set reminders or use apps to track your water intake'
    ]
  },
  {
    title: 'The Power of Handwashing',
    preview: 'Proper handwashing is one of the most effective ways to prevent the spread of infections and illnesses.',
    details: [
      'Handwashing with soap and water is one of the simplest yet most effective ways to stop the spread of germs. When done correctly, it can prevent one in three diarrhea-related illnesses and one in five respiratory infections.',
      'During disease outbreaks, handwashing becomes even more critical in protecting yourself and others.'
    ],
    bullets: [
      'Wash hands for at least 20 seconds (about the time it takes to sing "Happy Birthday" twice)',
      'Key times to wash: before eating or preparing food, after using the restroom, after blowing your nose, after touching garbage, and after being in public spaces',
      'Use warm water and soap, scrubbing all surfaces of hands including between fingers and under nails',
      'If soap and water aren\'t available, use a hand sanitizer with at least 60% alcohol',
      'Teach children proper handwashing techniques early'
    ]
  },
  {
    title: 'Managing Screen Time',
    preview: 'In our digital world, balancing screen time is important for physical and mental health. Learn healthy digital habits.',
    details: [
      'While technology offers many benefits, excessive screen time has been linked to a variety of health issues including eye strain, sleep disruption, reduced physical activity, and impacts on mental health.',
      'Creating healthy boundaries with technology can help improve your overall wellbeing without requiring you to disconnect completely.'
    ],
    bullets: [
      'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain',
      'Avoid screens 1-2 hours before bedtime to improve sleep quality',
      'Use screen time tracking tools to become aware of your habits',
      'Create tech-free zones and times in your home, such as during meals',
      'Balance screen activities with physical activities, face-to-face social interaction, and time in nature',
      'Consider using blue light filters, especially in evening hours'
    ]
  }
];


const nutritionTips = [
  {
    title: 'Building a Balanced Plate',
    preview: 'Learn how to create nutritionally complete meals using the plate method for balanced eating.',
    details: [
      'Creating balanced meals doesn\'t have to be complicated. The plate method is a simple visual guide to help you get the right proportions of different food groups.',
      'This approach helps ensure you\'re getting a good mix of nutrients while managing portion sizes naturally.'
    ],
    bullets: [
      'Fill half your plate with non-starchy vegetables and fruits',
      'Reserve one quarter of your plate for lean protein sources',
      'Use the remaining quarter for whole grains or starchy vegetables',
      'Add a small amount of healthy fats like olive oil, avocado, or nuts',
      'Choose water, unsweetened tea, or coffee as your beverage',
      'Aim for variety in colors and types of foods to get a wide range of nutrients'
    ]
  },
  {
    title: 'Understanding Food Labels',
    preview: 'Decode nutrition facts panels and ingredient lists to make more informed food choices.',
    details: [
      'Food labels provide valuable information that can help you make healthier choices, but they can be confusing to navigate. Learning to read and understand these labels is an important skill for managing your nutrition.',
      'Beyond just looking at calories, understanding the whole label can help you compare products and choose foods that align with your health goals.'
    ],
    bullets: [
      'Check serving sizes first – all nutrition information is based on one serving',
      'Consider total calories if you\'re managing weight',
      'Look for foods lower in added sugars, sodium, and saturated fats',
      'Choose foods with higher amounts of fiber, protein, and beneficial nutrients',
      'Read the ingredients list – items are listed in order of quantity (highest to lowest)',
      'Be aware of different names for sugar (anything ending in "ose", syrups, juices, etc.)'
    ]
  },
  {
    title: 'Healthy Meal Prep Strategies',
    preview: 'Save time, money, and improve nutrition with practical meal preparation techniques.',
    details: [
      'Meal prepping is one of the most effective ways to maintain healthy eating habits in a busy lifestyle. By planning and preparing meals in advance, you remove many of the barriers to healthy eating.',
      'Even starting with just one meal or prepping components rather than full meals can make a significant difference in your nutrition.'
    ],
    bullets: [
      'Start small – try prepping just breakfasts or lunches for the week',
      'Batch cook staples like brown rice, quinoa, or roasted vegetables',
      'Use one day to prep multiple meals (many people choose Sunday)',
      'Invest in quality food storage containers',
      'Freeze portions for later use to prevent food waste',
      'Include a variety of colors, textures, and flavors to prevent meal fatigue',
      'Prepare healthy snacks in portion-controlled containers'
    ]
  },
  {
    title: 'Mindful Eating Practices',
    preview: 'Improve your relationship with food through awareness and attention to eating habits.',
    details: [
      'Mindful eating involves paying full attention to the experience of eating and drinking, both inside and outside the body. It includes awareness of the colors, smells, textures, flavors, temperatures, and even the sounds of our food.',
      'This practice can help you enjoy your food more while potentially eating less, recognize hunger and fullness cues, and develop a healthier relationship with eating.'
    ],
    bullets: [
      'Eat without distractions – no TV, phones, or computers',
      'Slow down and take time to enjoy your food – aim for at least 20 minutes per meal',
      'Notice the colors, smells, textures, and flavors of your food',
      'Put your fork down between bites',
      'Check in with your hunger level throughout the meal',
      'Express gratitude for your food and those who helped bring it to your table',
      'Pay attention to how different foods make you feel, both during and after eating'
    ]
  }
];

const fitnessTips = [
  {
    title: 'Starting a Sustainable Exercise Routine',
    preview: 'Practical advice for beginning a fitness program you can maintain long-term.',
    details: [
      'The most effective exercise routine is one you can stick with consistently. Many people start with ambitious plans but quickly become overwhelmed or lose motivation.',
      'Building a sustainable exercise habit requires balancing effectiveness with enjoyment and practicality within your lifestyle.'
    ],
    bullets: [
      'Start small – even 10 minutes daily is better than an hour once a week',
      'Choose activities you enjoy rather than what you think you "should" do',
      'Schedule workouts like important appointments',
      'Set specific, measurable goals beyond just weight loss',
      'Find an accountability partner or group for motivation',
      'Plan for obstacles and have backup options (indoor activities for bad weather, etc.)',
      'Track your progress to stay motivated, but be flexible with your plans'
    ]
  },
  {
    title: 'Benefits of Strength Training',
    preview: 'Discover why building muscle is essential for everyone, regardless of age or gender.',
    details: [
      'Strength training is often misunderstood as being only for those who want to build large muscles. In reality, it\'s one of the most important forms of exercise for overall health and function, especially as we age.',
      'Regular strength training helps preserve muscle mass, strengthen bones, manage weight, enhance mobility and balance, and improve many aspects of cardiovascular and metabolic health.'
    ],
    bullets: [
      'Aim for at least two strength training sessions per week',
      'Focus on all major muscle groups: legs, hips, back, chest, abdomen, shoulders, and arms',
      'Begin with bodyweight exercises if you\'re new to strength training',
      'Progress gradually by increasing weight, repetitions, or sets',
      'Proper form is more important than how much weight you lift',
      'Allow 48 hours of recovery between working the same muscle groups',
      'Combine with aerobic exercise for comprehensive fitness'
    ]
  },
  {
    title: 'Incorporating Movement Throughout Your Day',
    preview: 'Learn how to reduce sedentary time and add physical activity to your daily routine.',
    details: [
      'Recent research shows that even if you exercise regularly, sitting for prolonged periods can negatively impact your health. The human body is designed to move throughout the day.',
      'Finding ways to incorporate more movement into your daily routine can complement structured exercise and significantly improve your overall health and energy levels.'
    ],
    bullets: [
      'Take short "movement breaks" every hour – stand up, stretch, or walk around',
      'Try a standing desk or alternate between sitting and standing while working',
      'Take the stairs instead of elevators when possible',
      'Park farther away from entrances when shopping',
      'Walk or bike for short errands instead of driving',
      'Do simple exercises while watching TV (squats during commercials, etc.)',
      'Schedule walking meetings instead of sitting ones when appropriate',
      'Use fitness trackers to monitor and increase daily steps'
    ]
  },
  {
    title: 'The Importance of Recovery',
    preview: 'Understand why rest and recovery are essential components of any fitness program.',
    details: [
      'Recovery is often the most overlooked aspect of fitness. While exercise creates the stimulus for improvements in strength, endurance, and health, it\'s during recovery that your body actually makes these adaptations.',
      'Without adequate recovery, you risk diminishing returns, burnout, injury, and even regression in fitness levels. Proper recovery allows you to train more consistently over time, leading to better long-term results.'
    ],
    bullets: [
      'Schedule at least 1-2 complete rest days per week',
      'Consider active recovery like gentle walking or yoga on rest days',
      'Prioritize sleep – most fitness adaptations happen during sleep',
      'Stay hydrated before, during, and after exercise',
      'Consume protein and carbohydrates within 30-60 minutes after intense workouts',
      'Listen to your body – persistent fatigue, decreased performance, and unusual soreness are signs you need more recovery',
      'Incorporate stress management practices like meditation to support overall recovery'
    ]
  }
];

const mentalHealthTips = [
  {
    title: 'Stress Management Techniques',
    preview: 'Practical strategies to reduce stress and build resilience in everyday life.',
    details: [
      'Stress is a natural part of life, but chronic stress can have serious impacts on both mental and physical health. Developing effective stress management skills is essential for wellbeing in today\'s fast-paced world.',
      'Different techniques work for different people and situations, so having multiple strategies in your toolkit is important.'
    ],
    bullets: [
      'Practice deep breathing: inhale slowly through your nose for 4 counts, hold for 1 count, exhale through your mouth for 6 counts',
      'Try progressive muscle relaxation by tensing and then releasing each muscle group',
      'Incorporate mindfulness meditation, even just 5-10 minutes daily',
      'Physical activity is one of the most effective stress reducers',
      'Connect with supportive friends and family regularly',
      'Set boundaries and practice saying "no" to prevent overwhelm',
      'Break large tasks into smaller, manageable steps',
      'Limit exposure to stressful news and social media'
    ]
  },
  {
    title: 'Building Healthy Sleep Habits',
    preview: 'Sleep and mental health are closely connected. Learn how to improve your sleep quality.',
    details: [
      'Sleep is fundamental to mental health, with poor sleep linked to increased risk of depression, anxiety, and other mental health issues. Likewise, mental health conditions can make it harder to sleep well.',
      'Developing good "sleep hygiene" – habits and practices that are conducive to sleeping well – can create a positive cycle that benefits both sleep quality and mental wellbeing.'
    ],
    bullets: [
      'Maintain a consistent sleep schedule, even on weekends',
      'Create a relaxing pre-sleep routine to signal your body it\'s time to wind down',
      'Make your bedroom cool, dark, quiet, and comfortable',
      'Limit exposure to screens at least 1 hour before bedtime',
      'Avoid caffeine after noon and alcohol close to bedtime',
      'Regular exercise promotes better sleep, but try to finish workouts at least 3 hours before bedtime',
      'If you can\'t fall asleep after 20 minutes, get up and do something relaxing until you feel sleepy'
    ]
  },
  {
    title: 'Practicing Mindfulness and Present Awareness',
    preview: 'Learn how mindfulness can reduce anxiety and increase enjoyment of life.',
    details: [
      'Mindfulness is the practice of purposefully focusing your attention on the present moment—and accepting it without judgment. It has roots in Buddhist meditation but has become widely practiced in various secular forms.',
      'Research suggests mindfulness reduces stress, anxiety, and depression while improving focus, relationship satisfaction, and overall wellbeing. It helps break cycles of rumination and worry by anchoring awareness in the present.'
    ],
    bullets: [
      'Start with short, formal practices (5 minutes) and gradually extend the time',
      'Use guided meditations through apps like Headspace, Calm, or Insight Timer',
      'Practice informal mindfulness by fully engaging in everyday activities like eating or walking',
      'When your mind wanders (which is normal), gently bring attention back to the present moment',
      'Try the STOP practice: Stop, Take a breath, Observe what\'s happening internally and externally, Proceed',
      'Approach mindfulness with curiosity rather than trying to achieve a specific state',
      'Consistency matters more than duration – daily practice yields the greatest benefits'
    ]
  },
  {
    title: 'Recognizing Signs of Depression and Anxiety',
    preview: 'Know the warning signs and when to seek help for common mental health conditions.',
    details: [
      'Depression and anxiety are among the most common mental health conditions, affecting millions of people worldwide. While everyone experiences sadness and worry at times, clinical depression and anxiety disorders are more persistent and can significantly impact daily functioning.',
      'Recognizing the signs early and seeking appropriate help can prevent symptoms from worsening and support recovery. Remember that these conditions are medical issues, not personal weaknesses, and effective treatments are available.'    ],
    bullets: [
      'Depression signs include: persistent sadness or emptiness, loss of interest in activities once enjoyed, changes in appetite or weight, sleep disturbances, fatigue, feelings of worthlessness, difficulty concentrating, and thoughts of death or suicide',
      'Anxiety signs include: excessive worry that\'s difficult to control, restlessness, being easily fatigued, difficulty concentrating, irritability, muscle tension, sleep disturbances, and physical symptoms like rapid heartbeat or shortness of breath',
      'If symptoms persist for more than two weeks or interfere with daily activities, consider seeking professional help',
      'Talk to your primary care provider or a mental health professional',
      'For immediate crisis support in the US, call or text 988 to reach the Suicide and Crisis Lifeline',
      'Self-care practices can support professional treatment but aren\'t substitutes for needed care'
    ]
  }
];

const preventiveTips = [
  {
    title: 'Essential Health Screenings by Age',
    preview: 'Understand which preventive screenings are recommended at different life stages.',
    details: [
      'Regular health screenings can detect problems early, when they\'re often easier to treat. Many conditions, including some cancers, heart disease, and diabetes, may not cause symptoms in their early stages.',
      'Recommendations vary based on age, sex, family history, and risk factors. This guide provides general information, but your healthcare provider may recommend a different schedule based on your personal health profile.'
    ],
    bullets: [
      'Adults 18-39: Blood pressure (at least every 2 years), cholesterol (every 4-6 years), diabetes (every 3 years starting at 45 or earlier with risk factors), depression screening',
      'Women 18-39: Cervical cancer screening (Pap test every 3 years starting at 21), clinical breast exam',
      'Adults 40-64: Continue previous screenings, plus colorectal cancer screening (starting at 45), lung cancer screening for long-term smokers',
      'Women 40-64: Mammograms (discuss starting age and frequency with your doctor), continued cervical cancer screening',
      'Men 40-64: Prostate cancer screening discussion starting at 50 (or 45 for high-risk groups)',
      'Adults 65+: Continue appropriate screenings, plus osteoporosis screening, especially for women',
      'All adults: Skin checks, dental exams twice yearly, eye exams every 1-2 years, immunizations as recommended'
    ]
  },
  {
    title: 'Vaccination Throughout Life',
    preview: 'Immunizations aren\'t just for children – learn about vaccines recommended for adults.',
    details: [
      'Vaccines are one of the most successful public health interventions in history, preventing millions of illnesses and deaths. While childhood vaccination is widely recognized as important, many adults aren\'t aware of or don\'t receive recommended vaccines.',
      'Adult vaccination helps protect not only the individual but also helps prevent the spread of disease to those who cannot be vaccinated due to age or medical conditions.'
    ],
    bullets: [
      'Flu (Influenza): Recommended annually for all adults',
      'Td/Tdap (Tetanus, diphtheria, pertussis): Tdap once, then Td/Tdap booster every 10 years',
      'Shingles (Herpes Zoster): Two-dose series recommended for adults 50+',
      'Pneumococcal vaccines: Recommended for adults 65+ and younger adults with certain medical conditions',
      'COVID-19: Follow current public health recommendations for primary series and boosters',
      'HPV: Recommended through age 26 if not adequately vaccinated previously',
      'Additional vaccines may be recommended based on factors like health conditions, occupation, and travel',
      'Keep records of your vaccinations and discuss your immunization status with your healthcare provider'
    ]
  },
  {
    title: 'Maintaining Heart Health',
    preview: 'Preventive strategies to support cardiovascular health and reduce heart disease risk.',
    details: [
      'Heart disease remains the leading cause of death globally, but many risk factors are modifiable through lifestyle choices. Research shows that up to 80% of premature heart disease and stroke can be prevented.',
      'A heart-healthy lifestyle benefits not just your cardiovascular system but improves overall health and quality of life.'
    ],
    bullets: [
      'Know your numbers: blood pressure, cholesterol, blood sugar, and BMI',
      'Eat a heart-healthy diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats',
      'Limit sodium, added sugars, and unhealthy fats',
      'Aim for at least 150 minutes of moderate aerobic activity weekly',
      'Maintain a healthy weight or work toward weight loss if needed',
      'Don\'t smoke or use tobacco products, and avoid secondhand smoke',
      'Limit alcohol consumption (no more than 1 drink daily for women, 2 for men)',
      'Manage stress through healthy coping mechanisms',
      'Get adequate sleep – 7-9 hours for most adults',
      'Take medications as prescribed and attend regular medical check-ups'
    ]
  },
  {
    title: 'Sun Safety and Skin Protection',
    preview: 'Protect yourself from harmful UV radiation and reduce skin cancer risk.',
    details: [
      'Skin cancer is the most common cancer in the United States, with more cases diagnosed each year than all other cancers combined. The good news is that skin cancer is also one of the most preventable cancers.',
      'Sun protection is important year-round, not just during summer months or sunny days. UV rays can penetrate clouds and reflect off surfaces like water, sand, and snow.'
    ],
    bullets: [
      'Use broad-spectrum sunscreen with SPF 30+ daily, even on cloudy days',
      'Apply sunscreen 15-30 minutes before going outside and reapply every 2 hours or after swimming/sweating',
      'Seek shade, especially between 10 AM and 4 PM when UV rays are strongest',
      'Wear protective clothing, including wide-brimmed hats and sunglasses with UV protection',
      'Be extra cautious near reflective surfaces like water, snow, and sand',
      'Avoid tanning beds – they increase skin cancer risk significantly',
      'Perform regular skin self-exams and note any changes in moles or new skin growths',
      'See a dermatologist annually for a professional skin check, especially if you have risk factors'
    ]
  }
];
</script>

<style scoped>
.health-tips-icon {
  font-size: 4rem;
  color: #ffc107;
  transition: transform var(--transition-speed);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 50%;
  background-color: rgba(255, 193, 7, 0.1);
  transition: transform var(--transition-speed);
}

.icon-wrapper:hover {
  transform: scale(1.05);
}

.intro-card {
  border: none;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-speed),
    box-shadow var(--transition-speed);
}

.intro-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.15);
}

/* Health stats styling */
.health-stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.health-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--secondary-color);
}

/* Tip cards styling */
.tip-preview {
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: var(--space-md);
  transition: height var(--transition-speed);
}

.tip-details {
  background-color: #f8f9fa;
  padding: var(--space-md);
  border-radius: var(--border-radius-sm);
  border-left: 4px solid #0d6efd;
  margin-top: var(--space-md);
  animation: fadeIn 0.3s ease;
}

.tip-card {
  transition: transform var(--transition-speed),
    box-shadow var(--transition-speed);
  border: none;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

.tip-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.tip-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  font-size: 1.25rem;
  transition: transform var(--transition-speed);
}

.tip-icon:hover {
  transform: scale(1.1);
}

/* Tab Navigation */
.tabs-container {
  position: relative;
  overflow: hidden;
}

.nav-pills {
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding-bottom: var(--space-sm);
}

.nav-pills::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.nav-pills .nav-link {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-speed);
  font-weight: 500;
  white-space: nowrap;
}

.nav-pills .nav-link.active {
  background-color: #0d6efd;
  box-shadow: 0 0.25rem 0.5rem rgba(13, 110, 253, 0.2);
  transform: translateY(-2px);
}

.nav-pills .nav-link:not(.active):hover {
  background-color: rgba(13, 110, 253, 0.1);
}

/* Resources and disclaimer */
.trusted-resource-card {
  transition: transform var(--transition-speed),
    box-shadow var(--transition-speed);
  height: 100%;
}

.trusted-resource-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

ul {
  padding-left: 1.5rem;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .health-stats {
    justify-content: space-around;
  }

  .health-stat-item {
    margin-bottom: var(--space-sm);
  }

  .stat-number {
    font-size: 1.25rem;
  }
}

@media (max-width: 576px) {
  .health-tips-icon {
    font-size: 3rem;
  }

  .icon-wrapper {
    padding: 1rem;
  }

  .health-stats {
    justify-content: space-between;
  }

  .nav-pills .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .card-body {
    padding: var(--space-md);
  }

  .alert {
    padding: var(--space-md);
  }
}
</style>
