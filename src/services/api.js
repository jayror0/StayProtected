// Mock API service for StayProtected app

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockData = {
  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "General Medicine",
      experience: "15 years",
      rating: 4.9,
      availability: ["Monday", "Wednesday", "Friday"],
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "Dr. Johnson is a board-certified physician with extensive experience in primary care and preventive medicine.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Cardiology",
      experience: "10 years",
      rating: 4.8,
      availability: ["Tuesday", "Thursday", "Saturday"],
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      bio: "Dr. Chen specializes in cardiovascular health and is dedicated to providing personalized care for heart conditions.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrics",
      experience: "8 years",
      rating: 4.7,
      availability: ["Monday", "Tuesday", "Thursday"],
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Dr. Rodriguez is passionate about children's health and creating a comfortable environment for young patients.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Orthopedics",
      experience: "12 years",
      rating: 4.6,
      availability: ["Wednesday", "Friday", "Saturday"],
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      bio: "Dr. Wilson is an expert in musculoskeletal conditions and sports injuries with a focus on minimally invasive treatments.",
    },
    {
      id: 5,
      name: "Dr. Lisa Wong",
      specialization: "Dermatology",
      experience: "9 years",
      rating: 4.9,
      availability: ["Monday", "Wednesday", "Friday"],
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      bio: "Dr. Wong provides comprehensive care for skin conditions and is known for her attention to detail and patient education.",
    },
  ],
  appointments: [],
  healthTips: [
    {
      id: 1,
      category: "Nutrition",
      title: "Balanced Diet Tips",
      content:
        "A balanced diet should include fruits, vegetables, lean proteins, whole grains, and healthy fats.",
      author: "Dr. Sarah Johnson",
      date: "2025-05-29",
    },
    {
      id: 2,
      category: "Fitness",
      title: "Daily Exercise Routine",
      content:
        "Aim for at least 30 minutes of moderate exercise most days of the week. Mix cardio, strength training, and flexibility exercises.",
      author: "Dr. James Wilson",
      date: "2025-06-02",
    },
    {
      id: 3,
      category: "Mental Health",
      title: "Stress Management",
      content:
        "Practice mindfulness techniques such as deep breathing, meditation, or yoga to manage stress levels.",
      author: "Dr. Emily Rodriguez",
      date: "2025-06-05",
    },
    {
      id: 4,
      category: "Sleep",
      title: "Improving Sleep Quality",
      content:
        "Maintain a consistent sleep schedule, create a relaxing bedtime routine, and limit screen time before bed.",
      author: "Dr. Michael Chen",
      date: "2025-05-25",
    },
    {
      id: 5,
      category: "Hydration",
      title: "Water Intake Guidelines",
      content:
        "Drink at least 8 glasses of water daily. Increase intake during hot weather or when physically active.",
      author: "Dr. Lisa Wong",
      date: "2025-06-08",
    },
  ],
  reviews: [
    {
      id: 1,
      doctorId: 1,
      patientName: "Alex Thompson",
      rating: 5,
      comment:
        "Dr. Johnson was extremely thorough and took time to explain everything. Highly recommend!",
      date: "2025-05-20",
    },
    {
      id: 2,
      doctorId: 2,
      patientName: "Sophia Garcia",
      rating: 4,
      comment:
        "Dr. Chen is knowledgeable and professional. The wait time was a bit long though.",
      date: "2025-05-15",
    },
    {
      id: 3,
      doctorId: 3,
      patientName: "Daniel Kim",
      rating: 5,
      comment:
        "My kids love Dr. Rodriguez! She makes them feel comfortable and explains things in a way they understand.",
      date: "2025-06-01",
    },
  ],
  reports: [
    {
      id: 1,
      title: "Annual Physical Examination",
      doctor: "Dr. Sarah Johnson",
      date: "2025-05-15",
      department: "General Medicine",
      summary:
        "Regular annual checkup. All vitals normal. Recommended routine blood work.",
      status: "Completed",
      fileUrl: "#",
    },
    {
      id: 2,
      title: "Blood Test Results",
      doctor: "Dr. Michael Chen",
      date: "2025-04-22",
      department: "Laboratory",
      summary:
        "Complete blood count and metabolic panel. Cholesterol slightly elevated.",
      status: "Completed",
      fileUrl: "#",
    },
    {
      id: 3,
      title: "Cardiologist Consultation",
      doctor: "Dr. Michael Chen",
      date: "2025-03-10",
      department: "Cardiology",
      summary:
        "EKG performed. Heart rhythm normal. Follow-up in 6 months recommended.",
      status: "Completed",
      fileUrl: "#",
    },
    {
      id: 4,
      title: "X-Ray Results",
      doctor: "Dr. James Wilson",
      date: "2025-02-05",
      department: "Radiology",
      summary: "Chest X-ray shows no abnormalities. Lungs clear.",
      status: "Completed",
      fileUrl: "#",
    },
    {
      id: 5,
      title: "Allergy Test Report",
      doctor: "Dr. Lisa Wong",
      date: "2025-01-20",
      department: "Immunology",
      summary:
        "Skin prick test performed. Allergies to pollen and dust mites confirmed.",
      status: "Pending Review",
      fileUrl: "#",
    },
  ],
  selfCheckupQuestions: [
    {
      id: "fever",
      question: "Do you have a fever over 100.4°F (38°C)?",
      followUp: "How long have you had the fever?",
      recommendations: [
        "Stay hydrated by drinking plenty of fluids.",
        "Take over-the-counter fever reducers as directed.",
        "Rest and monitor your temperature.",
        "Seek medical attention if fever persists for more than 3 days or is accompanied by severe symptoms.",
      ],
    },
    {
      id: "cough",
      question: "Are you experiencing a persistent cough?",
      followUp: "Is your cough dry or productive (producing mucus)?",
      recommendations: [
        "Stay hydrated and use cough drops to soothe irritation.",
        "Use a humidifier to add moisture to the air.",
        "Avoid irritants such as smoke or strong odors.",
        "Consult a doctor if the cough persists for more than 2 weeks or is accompanied by shortness of breath or chest pain.",
      ],
    },
    {
      id: "headache",
      question: "Do you have a headache?",
      followUp: "How severe is your headache on a scale of 1-10?",
      recommendations: [
        "Rest in a quiet, dark room.",
        "Apply a cold or warm compress to your forehead or neck.",
        "Stay hydrated and consider over-the-counter pain relievers.",
        "Seek immediate medical attention if you experience 'the worst headache of your life', sudden onset, or if it's accompanied by confusion, stiff neck, or vision changes.",
      ],
    },
    {
      id: "fatigue",
      question: "Are you experiencing unusual fatigue?",
      followUp: "How long have you been feeling fatigued?",
      recommendations: [
        "Ensure you're getting 7-9 hours of sleep per night.",
        "Maintain a balanced diet and stay hydrated.",
        "Engage in regular, moderate physical activity.",
        "Consider stress-reduction techniques such as meditation or deep breathing.",
        "Consult a healthcare provider if fatigue persists for more than two weeks or significantly impacts daily activities.",
      ],
    },
    {
      id: "rash",
      question: "Do you have a skin rash or unusual skin changes?",
      followUp:
        "Where is the rash located and how does it appear (e.g., red, itchy, blistered)?",
      recommendations: [
        "Avoid scratching the affected area.",
        "Use mild, fragrance-free soap and moisturizer.",
        "Apply cool compresses to reduce itching.",
        "Seek medical attention if the rash is widespread, painful, or accompanied by fever or other symptoms.",
      ],
    },
  ],
};

const apiService = {
  login: async (email, password) => {
    await delay(800);

    if (email === "user@example.com" && password === "password") {
      return {
        success: true,
        data: {
          user: {
            name: "John Doe",
            email: "user@example.com",
            phone: "123-456-7890",
            id: "1",
            userType: "patient",
          },
        },
      };
    }

    return {
      success: false,
      error: "Invalid credentials",
    };
  },

  register: async (userData) => {
    await delay(1000);

    return {
      success: true,
      data: {
        user: {
          ...userData,
          id: Math.floor(Math.random() * 10000).toString(),
        },
      },
    };
  },

  getDoctors: async (filters = {}) => {
    await delay(800);

    let doctors = [...mockData.doctors];

    if (filters.specialization) {
      doctors = doctors.filter((doctor) =>
        doctor.specialization
          .toLowerCase()
          .includes(filters.specialization.toLowerCase())
      );
    }

    if (filters.name) {
      doctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    return {
      success: true,
      data: doctors,
    };
  },

  getDoctorById: async (id) => {
    await delay(500);

    const doctor = mockData.doctors.find(
      (doctor) => doctor.id === parseInt(id)
    );

    if (!doctor) {
      return {
        success: false,
        error: "Doctor not found",
      };
    }

    return {
      success: true,
      data: doctor,
    };
  },


  getAppointments: async (userId) => {
    await delay(600);

    return {
      success: true,
      data: mockData.appointments,
    };
  },

  createAppointment: async (appointmentData) => {
    await delay(1000);

    const newAppointment = {
      id: Math.floor(Math.random() * 10000),
      ...appointmentData,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    mockData.appointments.push(newAppointment);

    return {
      success: true,
      data: newAppointment,
    };
  },

  getHealthTips: async (category = null) => {
    await delay(600);

    let tips = [...mockData.healthTips];

    if (category && category !== "all") {
      tips = tips.filter(
        (tip) => tip.category.toLowerCase() === category.toLowerCase()
      );
    }

    return {
      success: true,
      data: tips,
    };
  },

  getReviews: async (doctorId = null) => {
    await delay(700);

    let reviews = [...mockData.reviews];

    if (doctorId) {
      reviews = reviews.filter(
        (review) => review.doctorId === parseInt(doctorId)
      );
    }

    return {
      success: true,
      data: reviews,
    };
  },

  addReview: async (reviewData) => {
    await delay(800);

    const newReview = {
      id: Math.floor(Math.random() * 10000),
      ...reviewData,
      date: new Date().toISOString().split("T")[0],
    };

    mockData.reviews.push(newReview);

    return {
      success: true,
      data: newReview,
    };
  },

  getReports: async (userId) => {
    await delay(800);

    return {
      success: true,
      data: mockData.reports,
    };
  },

  getReportById: async (reportId) => {
    await delay(500);

    const report = mockData.reports.find(
      (report) => report.id === parseInt(reportId)
    );

    if (!report) {
      return {
        success: false,
        error: "Report not found",
      };
    }

    return {
      success: true,
      data: report,
    };
  },

  getSelfCheckupQuestions: async () => {
    await delay(600);

    return {
      success: true,
      data: mockData.selfCheckupQuestions,
    };
  },
};

export default apiService;
