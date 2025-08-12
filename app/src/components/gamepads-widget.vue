<script setup lang="ts">
import {
  ref
} from 'vue'
import {
  set,
  useDateFormat
} from '@vueuse/core'

interface GamepadInfo {
  axes: number
  buttonsAmount: number
  connected: string
  id: string
  index: number
  lastUpdateTime: string
  mapping: GamepadMappingType
}

const gamepads = ref<GamepadInfo[]>([])

const updateGamepadsInfo = () => {
  const gamepadsData = navigator.getGamepads ? navigator.getGamepads() : []
  const gamepadsInfo = gamepadsData.map((gamepad) => {
    if (!gamepad) {
      return undefined
    }
    const {axes, buttons, connected, id, index, mapping, timestamp} = gamepad

    return {
      axes: axes.length,
      buttonsAmount: buttons.length,
      connected: connected ? 'true' : 'false',
      id,
      index,
      lastUpdateTime: useDateFormat(new Date(timestamp + performance.timeOrigin), 'HH:mm:ss').value,
      mapping,
    }
  }
  ).filter((info) => info !== undefined)

  set(gamepads, gamepadsInfo)
}

setInterval(updateGamepadsInfo, 1000)
window.addEventListener('gamepadconnected', updateGamepadsInfo)
window.addEventListener('gamepaddisconnected', updateGamepadsInfo)
</script>

<template>
  <div
    class="gamepads-widget dm-sans"
  >
    <template v-if="gamepads.length">
      <dl
        v-for="gamepad in gamepads"
        :key="gamepad.index"
      >
        <dt>index</dt>
        <dd>{{ gamepad.index }}</dd>
        <dt>connected</dt>
        <dd>{{ gamepad.connected }}</dd>
        <dt>lastUpdateTime</dt>
        <dd>{{ gamepad.lastUpdateTime }}</dd>
        <dt>id</dt>
        <dd>{{ gamepad.id }}</dd>
        <dt>buttonsAmount</dt>
        <dd>{{ gamepad.buttonsAmount }}</dd>
        <dt>axes</dt>
        <dd>{{ gamepad.axes }}</dd>
        <dt>mapping</dt>
        <dd>{{ gamepad.mapping }}</dd>
      </dl>
    </template>
    <code v-else>
      Gamepads not connected
    </code>
  </div>
</template>

<style scoped>
.gamepads-widget {
  font-family: monospace;
  font-size: 0.8rem;
  padding: .5rem;
  border-radius: 0.2rem;

  &:hover {
    background-color: rgba(26, 26, 26, .2);
  }

  & > :not(:last-child) {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    /* #66aaff */
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
  }

  dl {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: .5rem;
  }

  dt {
    opacity: .8;
    grid-column: 1;
    font-weight: bold;

    &::after {
      content: ':'
    }
  }

  dd {
    opacity: .6;
    grid-column: 2;
  }

  & code {
    opacity: .5;
  }
}
</style>
