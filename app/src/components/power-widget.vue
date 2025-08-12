<script setup lang="ts">
import PowerWidgetButton from './power-widget-button.vue'

const powerButtons = [
  {
    command: 'sleep',
    icon: 'sleep.svg',
    name: 'sleep',
  },
  {
    command: 'reboot',
    icon: 'reboot.svg',
    name: 'reboot',
  },
  {
    command: 'power',
    icon: 'power.svg',
    name: 'power',
  },
]

const pathToIconsFolder = 'public/power-icons/'
const holdTimeout = 1000

const runCommand = (command) => {
  console.log(command)
}


</script>

<template>
  <div
    ref="element"
    class="power-widget"
  >
    <PowerWidgetButton
      v-for="(button, key) in powerButtons"
      :key="key"
      class="power-widget-button"
      :hold-timeout="holdTimeout"
      :icon="pathToIconsFolder + button.icon"
      :name="button.name"
      @run="runCommand(button.command)"
    />
  </div>
</template>

<style scoped>
.power-widget {
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;
}

.power-widget-button {
  position: relative;
  width: 2.5rem;
  padding: .75rem;
}
</style>
