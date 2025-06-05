<script setup>

defineProps({
  message: {
    type: String,
    default: "Loading...",
  },
  size: {
    type: String,
    validator: (value) => ["sm", "md", "lg"].includes(value),
    default: "md",
  },
  color: {
    type: String,
    default: "primary",
  },
  overlay: {
    type: Boolean,
    default: false,
  },
});

const sizeMap = {
  sm: "1rem",
  md: "2rem",
  lg: "3rem",
};
</script>

<template>
  <div :class="['loading-spinner', { 'loading-overlay': overlay }]">
    <div class="spinner-content">
      <div
        :class="`spinner-border text-${color}`"
        role="status"
        :style="{ width: sizeMap[size], height: sizeMap[size] }"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <p v-if="message" class="mt-3 mb-0">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-content {
  text-align: center;
}
</style>
