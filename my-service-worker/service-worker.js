self.addEventListener('push', function (event) {
    const data = event.data ? event.data.json() : {};

    const options = {
        body: data.body,
        icon: data.icon,
        image: data.image,
        badge: data.badge,
        actions: data.actions,
        vibrate: data.vibrate,
        sound: data.sound,
        data: {
            url: data.data.url,
            actions: data.actions
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    let urlToOpen = event.notification.data.url;
    if (event.action === 'shop_now') {
        urlToOpen = event.notification.data.url;
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
