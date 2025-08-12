<script setup lang="ts">
import {
  computed,
} from 'vue'
import {
  get,
  useNow
} from '@vueuse/core'

const hourFormatter = new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', hour12: false})
const minuteFormatter = new Intl.DateTimeFormat('ru-RU', {minute: '2-digit'})
const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
const monthFormatter = new Intl.DateTimeFormat('en-US', {month: 'long'})
const dayFormatter = new Intl.DateTimeFormat('en-US', {day: 'numeric'})

const now = useNow()
const hours = computed(() => hourFormatter.format(get(now)))
const minutes = computed(() => {
  const minute = minuteFormatter.format(get(now))

  return Number.parseInt(minute) < 10 ? `0${minute}` : minute
})
const weekday = computed(() => weekdayFormatter.format(get(now)))
const month = computed(() => monthFormatter.format(get(now)))
const day = computed(() => dayFormatter.format(get(now)))
</script>

<template>
  <div class="time-widget font1">
    <div class="month-day">
      {{ month }} {{ day }}
    </div>
    <div class="weekday">
      {{ weekday }}
    </div>

    <div class="clock">
      <div class="hours">
        {{ hours }}
      </div>
      <div class="minutes">
        {{ minutes }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Signika:wght@500..700&display=swap');
.font1{
   font-family: "Outfit", sans-serif;
   font-optical-sizing: auto;
   font-style: normal;
}

.font2{
  font-family: "Signika", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}


.time-widget {
  pointer-events: none;
  user-select: none;

  height: 100%;
  padding-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .clock{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2.5rem;

    /* Маска прозрачности */
    mask-image: linear-gradient(
      to bottom,
      black 10%,
      rgba(0,0,0,0.5) 70%,
      transparent 100%
    );
  }

  .hours{
    line-height: .8;
    font-size: 12rem;
    font-weight: 600;
  };

  .minutes{
    line-height: .9;
    font-size: 12rem;
    font-weight: 600;
  };

  .weekday {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  .month-day {
    font-size: 1.5rem;
  }


}
</style>
