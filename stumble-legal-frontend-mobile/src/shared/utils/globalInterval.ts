// utils/GlobalIntervalManager.ts
let intervalId: NodeJS.Timeout | null = null;
let callback: (() => void) | null = null;
let intervalTime = 10000;

export const GlobalIntervalManager = {
  start(newCallback?: () => void, time?: number) {
    if (intervalId) return; // Already running

    if (newCallback) callback = newCallback;
    if (time) intervalTime = time;

    if (callback) {
      intervalId = setInterval(callback, intervalTime);
    }
  },

  stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },

  resume() {
    if (!intervalId && callback) {
      intervalId = setInterval(callback, intervalTime);
    }
  },

  isRunning() {
    return intervalId !== null;
  },
};
