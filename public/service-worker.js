self.addEventListener('push', function (event) {
    const data = event.data.json(); // Extract the push notification payload
    console.log('Push Notification received: ', data);

    const options = {
        body: data.body,
        icon: '/icon.png', // Change this path to your app's notification icon
        badge: '/badge.png', // Optional: Add a badge icon
        data: {
            url: data.url, // URL to open when notification is clicked
        },
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification click event
self.addEventListener('notificationclick', function (event) {
    event.notification.close(); // Close the notification

    event.waitUntil(
        clients.openWindow(event.notification.data.url) // Open the URL on click
    );
});
