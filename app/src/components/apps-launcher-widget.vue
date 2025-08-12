<script setup lang="ts">
import {
  ref,
  watch,
} from 'vue'
import {
  get,
  set,
} from '@vueuse/core'
import appsData from '../../public/apps.json'

interface AppEntry {
  command: string
  icon: string
  name: string
}

const pathToIconsFolder = 'public/icons/'
const apps = ref<AppEntry[]>(appsData)

const launcher = ref<HTMLElement | undefined>(undefined)
const focusedIndex = ref<number | undefined>(undefined)
const setFocusedIndex = (index: number): void => {
  console.log('setFocusedIndex', index)
  focusedIndex.value = index
}

watch(focusedIndex, (index) => {
  const indexUnref = get(index)

  if (indexUnref === undefined) {
    const focusedElement = document.activeElement as HTMLElement | undefined

    focusedElement?.blur()
  } else {
    const child = get(launcher)?.children[indexUnref] as HTMLElement | undefined

    child?.focus()
  }
})

function runApp(command: string) {
  window.electronAPI.runCommand(command, (err: any) => {
    if (err) console.error(err)
  })
}

function focusElement(direction: 'next' | 'prev'): number | undefined {
  const activeIndex = get(focusedIndex)
  const itemsAmount = get(launcher)?.children?.length ?? 0

  if (activeIndex === undefined || itemsAmount === 0) {
    set(focusedIndex, 0)
    return
  }

  switch (direction) {
  case 'next': {
    const targetIndex = activeIndex < itemsAmount - 1 ? activeIndex + 1 : 0

    set(focusedIndex, targetIndex)
    break
  }
  case 'prev': {
    const targetIndex = activeIndex > 0 ? activeIndex - 1 : itemsAmount - 1

    set(focusedIndex, targetIndex)
    break
  }
  }
}

function handleKeydown(e: KeyboardEvent) {
  switch (e.key) {
  case 'ArrowLeft': {
    focusElement('prev')
    break
  }
  case 'ArrowRight': {
    focusElement('next')
    break
  }
  case 'Enter': {
    const index = get(focusedIndex)

    if (index === undefined) {
      set(focusedIndex, 0)
      // prevents run selected app
      e.preventDefault()
    } else {
      runApp(get(apps)[index].command)
    }
    break
  }
  case 'Escape': {
    set(focusedIndex, undefined)
    break
  }
  default:
    break
  }
}
</script>

<template>
  <div
    ref="launcher"
    class="app-launcher"
    @keydown="handleKeydown"
  >
    <button
      v-for="(app, index) in apps"
      :key="app.name"
      class="app-tile"
      @focus="setFocusedIndex(index)"
      @click="runApp(app.command)"
    >
      <img
        :src="pathToIconsFolder + app.icon"
        :alt="app.name"
        class="app-icon"
      >
      <span class="app-name">
        {{ app.name }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.app-launcher {
  width: 100%;
  height: 100%;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 30px;

  padding: .5rem;
  border-radius: 0.2rem;
}

.app-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  transform: scale(1.0001);
  flex: 0 0 auto;
  backdrop-filter: blur(4px);
  background-color: rgba(26, 26, 26, 0.4);
  padding: 0.6em 1.2em;
  border-radius: 12px;

  &:focus,
  &:hover {
    transform: scale(1.2);
  }
}

.app-icon {
  display: block;
  width: 80px;
  height: 80px;
}

.app-name {
  margin-top: 8px;
  color: white;
}
</style>
