<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  retry: {
    type: Function,
    default: null,
  },
  icon: {
    type: String,
    default: "exclamation-triangle",
  },
  iconColor: {
    type: String,
    default: "danger",
  },
});
</script>

<template>
  <div class="error-display text-center py-5">
    <i :class="`bi bi-${icon} text-${iconColor}`" style="font-size: 3rem"></i>
    <p class="mt-3 mb-1 lead">{{ message }}</p>
    <p v-if="$slots.details" class="text-muted mb-3 small">
      <slot name="details"></slot>
    </p>
    <button v-if="retry" class="btn btn-primary mt-2" @click="retry">
      <i class="bi bi-arrow-clockwise me-1"></i> Try Again
    </button>
    <div v-if="$slots.actions" class="mt-3">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style scoped>
.error-display {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
