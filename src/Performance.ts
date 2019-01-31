export default class Performance {
  static get elapsedTime() {
    const isSupported = 'performance' in window && 'now' in window.performance;
    if (isSupported) {
      return window.performance.now();
    } else {
      return null;
    }
  }
}
