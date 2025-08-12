<script setup lang="ts">
import {
  ref
} from 'vue'
import {
  set
} from '@vueuse/core'

interface SystemInfo {
  cpuLoad: string
  diskTotal: string
  diskUsed: string
  ramTotal: string
  ramUsed: string
  uptime: string
}

const formatElapsedTime = (sec: number) => {
  const hours = String(Math.floor(sec / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
  const seconds = (sec % 60).toFixed(0).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

const sysInfo = ref<SystemInfo | undefined>(undefined)
/** @ts-expect-error Приём системных данных от Electron */
window.electronAPI.onSystemInfo((data) => {
  set(sysInfo, {
    cpuLoad: data.cpuLoad,
    diskTotal: data.diskTotal,
    diskUsed: data.diskUsed,
    ramTotal: data.ramTotal,
    ramUsed: data.ramUsed,
    uptime: formatElapsedTime(data.uptime),
  })
})
</script>

<template>
  <div class="sys-info-widget">
    <dl v-if="sysInfo">
      <dt>CPU</dt>
      <dd>{{ sysInfo.cpuLoad }}</dd>
      <dt>RAM</dt>
      <dd>{{ sysInfo.ramUsed }}Gb / {{ sysInfo.ramTotal }}Gb</dd>
      <dt>Disk</dt>
      <dd>{{ sysInfo.diskUsed }} / {{ sysInfo.diskTotal }}</dd>
      <dt>Uptime</dt>
      <dd>{{ sysInfo.uptime }}</dd>
    </dl>
    <code v-else>
      Loading...
    </code>
  </div>
</template>

<style scoped>
.sys-info-widget {
  font-family: monospace;
  font-size: 0.8rem;
  padding: .5rem;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: rgba(26, 26, 26, .2);
  }

  dl {
    dd:not(:last-child) {
      margin-right: 2rem;
      padding-right: 2rem;
      border-right: 2px solid rgba(255, 255, 255, 0.3);
    }
  }

  dt {
    margin-right: .5rem;

    &::after {
      content: ':'
    }
  }

  dd {
    opacity: .5;
    grid-column: 2;
    padding: 0;
    margin: 0;
  }

  dl {
    display: flex;
    margin: 0;
  }
}
</style>
