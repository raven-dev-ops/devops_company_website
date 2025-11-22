export const logTelemetry = (event, data = {}) => {
  try {
    if (typeof window === 'undefined') return;
    const entry = { event, data, ts: Date.now() };
    if (Array.isArray(window.__RAVEN_TELEMETRY__)) {
      window.__RAVEN_TELEMETRY__.push(entry);
    } else {
      window.__RAVEN_TELEMETRY__ = [entry];
    }
    if (window.console?.debug) {
      window.console.debug('[raven-telemetry]', entry);
    }
  } catch {
    /* no-op */
  }
};
