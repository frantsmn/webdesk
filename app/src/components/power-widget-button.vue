<script setup lang="ts">
import {
  get,
  set,
  useTimeout
} from '@vueuse/core'
import {
  onMounted,
  ref
} from 'vue'

interface Props {
  holdTimeout?: number
  icon: string
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  holdTimeout: 0,
})

const emit = defineEmits<{
  (e: 'run'): void
}>()

const button = ref<HTMLButtonElement | undefined>(undefined)
const isKeydown = ref(false)
const {start, stop} = useTimeout(props.holdTimeout, {
  callback: () => emit('run'),
  controls: true,
  immediate: false,
  immediateCallback: false
})

const onkeydown = () => {
  if (get(isKeydown)) {
    return
  }
  set(isKeydown, true)
  start()
  //console.log('down')
}
const onkeyup = () => {
  isKeydown.value = false
  stop()
  //console.log('up')
}

onMounted(() => get(button)?.style?.setProperty('--hold-timeout', `${props.holdTimeout}ms`))
</script>

<template>
  <button
    ref="button"
    @keydown.enter="onkeydown"
    @keyup.enter="onkeyup"
    @mousedown="onkeydown"
    @mouseup="onkeyup"
    @click.prevent
  >
    <svg
      class="circular-progress-svg"
      viewBox="0 0 100 100"
    >
      <circle
        :class="isKeydown ? 'progress-bar-value--keydown' : ''"
        class="progress-bar-value"
        cx="50"
        cy="50"
        r="45"
      />
    </svg>
    <img
      :src="props.icon"
      :alt="props.name"
      class="app-icon"
    >
  </button>
</template>

<style scoped>
button {
  --hold-timeout: 0ms;

  position: relative;
  width: 2.5rem;
  padding: .75rem;
  border-radius: 50% ;
  outline-style: hidden;
  outline-offset: -3px;
  outline-width: 2px;
}

.circular-progress-svg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
}

.progress-bar-value {
  fill: transparent;
  stroke-width: 4px;
}

.progress-bar-value {
  stroke: white; /* Progress color */
  stroke-dasharray: 283; /* Circumference of the circle */
  stroke-dashoffset: 283; /* Start at the end of the circle */
  transition: stroke-dashoffset var(--hold-timeout) ease;
}

.progress-bar-value--keydown {
  stroke-dashoffset: 0;
}
</style>
