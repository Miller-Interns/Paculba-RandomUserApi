<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      name: { first: 'User', last: 'Name' },
      picture: { medium: '' },
    }),
  },
})
</script>

<template>
  <div class="user-container">
    <div class="avatar">
      <img
        v-if="user.picture.medium"
        :src="user.picture.medium"
        :alt="`${user.name.first}'s avatar`"
        class="avatar-image"
      />
    </div>

    <span class="user-name">{{ user.name.first }} {{ user.name.last }}</span>
  </div>
</template>

<style scoped>
.user-container {
  background-color: #eae3dd; /* The light beige background from the image */
  width: 100%;
  height: 55px;
  border-radius: 27.5px; /* This creates the perfectly rounded ends (height / 2) */
  display: flex;
  align-items: center;
  padding: 0 7px; /* Provides spacing at the edges, especially for the avatar */
  gap: 12px; /* Creates a clean space between the avatar and the name */
  box-sizing: border-box;
}

.avatar {
  width: 41px;
  height: 41px;
  border-radius: 50%; /* Makes the div a perfect circle */
  background-color: #8a7d78; /* The darker taupe color for the placeholder circle */
  flex-shrink: 0; /* Prevents the circle from resizing */
  overflow: hidden; /* Ensures the image inside is clipped to the circle's shape */
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Scales the image to fill the space without distortion */
}

.user-name {
  font-family: 'Poppins', sans-serif; /* Using a clean, modern font */
  font-weight: 500;
  color: #3f3836; /* A dark, brownish color for good contrast */
  font-size: 0.9rem;
  white-space: nowrap; /* Prevents the name from breaking into two lines */
  overflow: hidden; /* Hides parts of the name that don't fit */
  text-overflow: ellipsis; /* Adds "..." if the name is too long */
}
</style>
