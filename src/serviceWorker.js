function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

let sw = null;
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return;
  }
  
  if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return;
  }

  // uninstall SW
  // navigator.serviceWorker.getRegistrations().then(function(registrations) {
  //   for (let registration of registrations) {
  //     registration.unregister();
  //   }
  // });

  navigator.serviceWorker.register('/serviceWorker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    sw = registration;
  })
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}

export function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
    if (permissionResult === 'granted') {
      subscribeUserToPush();
    }
  });
}

function subscribeUserToPush() {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BAKRxvj4DqwpwEG5909h4OflX2zypFf-N6avK8LqU6G2Yx7xGwHu7CjA5xdvrIiRsFm4g1PC4aoOy0UQ--HEriQ'
      )
    };

    if (sw) {
      return sw.pushManager.subscribe(subscribeOptions)
      .then(function(pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        showNotificationSample();
        return pushSubscription;

    });
    }
}

function showNotificationSample() {
  const title = 'Covid 19 Status - Tamilnadu';
  const options = {
    body: 'Affected - 67',
    icon: '/assets/covid.jpeg',
    badge: '/assets/covid.jpeg'
  };
  sw.showNotification(title, options);
}
