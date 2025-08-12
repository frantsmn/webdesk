<script setup lang="ts">

</script>

<template>
  <div class="background-widget">
    <img
      class="background-widget"
      src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg"
      alt="background image"
    >
  </div>
</template>

<style scoped>
@keyframes filter {
  0% {
    --c0: rgb(42, 123, 155);
    --c1: rgb(199, 87, 197);
    --c2: rgb(1, 12, 37);
  }
  20% {
    --c0: rgb(4, 64, 190);
    --c1: rgb(236, 115, 34);
    --c2: rgb(45, 0, 86);
  }
  40% {
    --c0: rgb(137, 4, 190);
    --c1: rgb(10, 84, 51);
    --c2: rgb(49, 11, 1);
  }
  60% {
    --c0: rgb(166, 49, 72);
    --c1: rgb(8, 54, 107);
    --c2: rgb(34, 47, 19);
  }
  80% {
    --c0: rgb(213, 181, 55);
    --c1: rgb(100, 23, 29);
    --c2: rgb(5, 29, 52);
  }
  100% {
    --c0: rgb(42, 123, 155);
    --c1: rgb(199, 87, 197);
    --c2: rgb(1, 12, 37);
  }
}

@property --c0 {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(255, 255, 255, 0);
}

@property --c1 {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(255, 255, 255, 0);;
}

@property --c2 {
  syntax: "<color>";
  inherits: false;
  initial-value: rgba(255, 255, 255, 0);
}

.background-widget {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  transition: 10s;
  transition-property: --c0, --c1, --c2;
  background: linear-gradient(180deg, var(--c0) 0%, var(--c1) 50%, var(--c2) 100%);

  img {
    opacity: .5;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.background-widget.animation {
  animation: filter 50s ease 0s infinite normal forwards;
}
</style>
