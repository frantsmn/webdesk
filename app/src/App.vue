<script setup lang="ts">
import GamepadsWidget from './components/gamepads-widget.vue'
import SysInfoWidget from './components/sys-info-widget.vue'
import AppsLauncherWidget from './components/apps-launcher-widget.vue'
import BackgroundWidget from './components/background-widget.vue'
import ClockWidget from './components/clock-widget.vue'
import PowerWidget from './components/power-widget.vue'
</script>

<template>
  <BackgroundWidget />
  <div class="root">
    <aside class="aside-left">
      <GamepadsWidget />
    </aside>
    <div class="top">
      <SysInfoWidget />
    </div>
    <main class="center">
      <ClockWidget />
    </main>
    <div class="bottom">
      <AppsLauncherWidget />
    </div>
    <aside class="aside-right">
      <PowerWidget />
    </aside>
  </div>
</template>

<style scoped>
.root {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: auto 1fr 20%;
}

.aside-left {
  grid-row: span 2 / span 2;
  padding: .5rem;
  max-width: 100%;
}

.top {
  padding: .5rem;
  grid-column: span 1 / span 1;
  grid-column-start: 2;
  grid-row-start: 1;
}

.center {
  padding: .5rem;
  grid-column: span 1 / span 1;
  grid-row: span 1 / span 1;
  grid-column-start: 2;
  grid-row-start: 2;
}

.bottom {
  padding: .5rem;
  grid-column: span 3 / span 3;
  grid-column-start: 1;
  grid-row-start: 3;
}

.aside-right {
  padding: .5rem;
  grid-row: span 2 / span 2;
  grid-column-start: 3;
  grid-row-start: 1;
}
</style>
