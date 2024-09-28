import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const NotificationComponent = ({ user }) => {
    const [notifications, setNotifications] = useState([]);

    // This will run when the component mounts
    useEffect(() => {
        // Register the service worker and subscribe to push notifications
        subscribeUserToPush();

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
            authEndpoint: `${process.env.REACT_APP_API}pusher/auth`, // Custom auth route
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Use the correct token
                },
            },
        });

        const channel = pusher.subscribe(`private-notifications.${user.id}`); // Replace with actual user ID

        channel.bind('App\\Events\\SendRolesNotification', (data) => {
            console.log('Notification received:', data);
            setNotifications((prevNotifications) => [...prevNotifications, data.message]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [user.id]); // Run this effect when the user.id changes

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <div key={index}>
                        <p>{notification}</p>
                    </div>
                ))
            ) : (
                <p>No notifications yet.</p>
            )}
        </div>
    );
};

export default NotificationComponent;

// Push notification subscription function
const subscribeUserToPush = async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;

        const existingSubscription = await registration.pushManager.getSubscription();

        if (!existingSubscription) {
            const vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY'; // Replace with your actual VAPID public key
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            try {
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey,
                });

                // Send the subscription to your server to store it
                await fetch('/api/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('User subscribed to push notifications:', subscription);
            } catch (err) {
                console.error('Failed to subscribe user:', err);
            }
        }
    }
};

// Utility function to convert VAPID key
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
