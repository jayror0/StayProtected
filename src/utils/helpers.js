
export const formatDate = (
  dateString,
  options = { year: "numeric", month: "long", day: "numeric" }
) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const getRatingColorClass = (rating) => {
  if (rating >= 4.5) return "text-success";
  if (rating >= 3.5) return "text-primary";
  if (rating >= 2.5) return "text-warning";
  return "text-danger";
};


export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const getCurrentUser = () => {
  try {
    const localData = localStorage.getItem("user");
    const sessionData = sessionStorage.getItem("user");
    const userData = localData || sessionData;

    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const setNotification = (title, message, type = "info") => {
  const notification = { title, message, type };
  localStorage.setItem("notification", JSON.stringify(notification));
};

export const generateTimeSlots = (
  startTime = "09:00",
  endTime = "17:00",
  intervalMinutes = 30
) => {
  const slots = [];
  const startDate = new Date(`2000-01-01T${startTime}:00`);
  const endDate = new Date(`2000-01-01T${endTime}:00`);

  let currentTime = new Date(startDate);

  while (currentTime <= endDate) {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    slots.push(`${formattedHours}:${formattedMinutes} ${ampm}`);

    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return slots;
};


export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";

  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else {
    return phoneNumber; 
  }
};

export const calculateAge = (birthdate) => {
  if (!birthdate) return null;

  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export default {
  formatDate,
  getRatingColorClass,
  truncateText,
  getCurrentUser,
  setNotification,
  generateTimeSlots,
  formatPhoneNumber,
  calculateAge,
};
