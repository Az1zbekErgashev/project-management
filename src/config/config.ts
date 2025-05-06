declare global {
  interface Window {
    runConfig: {
      frontendUrl: string;
      backendUrl: string;
      nodeEnv: string;
      appDateFormat: string;
      latviaLocationSrc: string;
      uzbekistanLocationSrc: string;
      candedateBaseUrl: string;
    };
  }
}

export const routes = {
  api: {
    frontendUrl: window?.runConfig?.frontendUrl,
    baseUrl: window?.runConfig?.backendUrl,
    nodeEnv: window.runConfig?.nodeEnv,
    appDateFormat: window.runConfig?.appDateFormat,
    latviaLocationSrc: window.runConfig?.latviaLocationSrc,
    uzbekistanLocationSrc: window.runConfig?.uzbekistanLocationSrc,
    candedateBaseUrl: window.runConfig?.candedateBaseUrl,
  },
};
