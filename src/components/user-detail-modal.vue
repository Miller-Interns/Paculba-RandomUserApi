<script setup lang="ts">
import type { User } from '@/interfaces/interface-user'

// The modal expects the full user object to display.
defineProps<{
  user: User
}>()

// It will emit a 'close' event when the user wants to close it.
const emit = defineEmits(['close'])

const formattedDob = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="$emit('close')">×</button>

      <div class="modal-header">
        <img
          :src="user.picture.large"
          :alt="`${user.name.first} ${user.name.last}`"
          class="modal-avatar"
        />
        <h2 class="modal-fullname">
          {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
        </h2>
        <p class="modal-username">@{{ user.login.username }}</p>
      </div>

      <div class="modal-body">
        <div class="info-group">
          <h3 class="info-title">Contact Information</h3>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Cell:</strong> {{ user.cell }}</p>
        </div>

        <div class="info-group">
          <h3 class="info-title">Location</h3>
          <p>
            {{ user.location.street.number }} {{ user.location.street.name }},<br />
            {{ user.location.city }}, {{ user.location.state }} {{ user.location.postcode }}<br />
            {{ user.location.country }}
          </p>
        </div>

        <div class="info-group">
          <h3 class="info-title">Personal Details</h3>
          <p><strong>Gender:</strong> {{ user.gender }}</p>
          <p>
            <strong>Birthday:</strong> {{ formattedDob(user.dob.date) }} ({{ user.dob.age }} years
            old)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Use the same font for consistency */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* A darker overlay for better focus */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-content {
  font-family: 'Poppins', sans-serif;
  background: #fdfbf9; /* A very light beige, softer than pure white */
  color: #3f3836;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
  color: #8a7d78; /* Use theme color */
  cursor: pointer;
  transition: color 0.2s;
}

.close-button:hover {
  color: #3f3836;
}

.modal-header {
  text-align: center;
  border-bottom: 1px solid #eae3dd; /* Use theme color */
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.modal-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #eae3dd; /* Use theme color */
  margin-bottom: 1rem;
}

.modal-fullname {
  font-weight: 600;
  font-size: 1.75rem;
  margin: 0;
  text-transform: capitalize;
}

.modal-username {
  color: #8a7d78; /* Use theme color */
  margin: 0.25rem 0 0;
  font-weight: 400;
}

.info-group {
  margin-bottom: 1.5rem;
}

.info-title {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8a7d78;
  border-bottom: 1px solid #eae3dd;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
}

.info-group p {
  margin: 0.4rem 0;
  line-height: 1.6;
}

.info-group strong {
  font-weight: 500;
  color: #3f3836;
}
</style>
