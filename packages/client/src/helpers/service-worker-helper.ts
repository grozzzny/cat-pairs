export const startServiceWorker = () => {
  if (typeof navigator !== 'undefined') {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          // eslint-disable-next-line no-console
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('ServiceWorker registration failed: ', error);
        }
      });
    }
  }
};
