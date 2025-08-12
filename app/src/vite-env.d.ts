/// <reference types="vite/client" />

type OnSystemInfoCallback = (data: {
  /** CPU 1 min load average */
  cpuLoad: number
  /** Disk total (Mb) */
  diskTotal: number
  /** Disk usage (Mb) */
  diskUsed: number
  /** RAM usage (Gb) */
  ramTotal: number
  /** RAM total (Gb) */
  ramUsed: number
  /** Uptime (sec) */
  uptime: number
}) => void

declare global {
  interface Window {
    electronAPI: {
      onSystemInfo: (callback: OnSystemInfoCallback) => void
    };
  }

  //...
}
