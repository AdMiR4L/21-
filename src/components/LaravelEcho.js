import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
const LaravelEcho = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY, // Set your Pusher key here
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER, // Set your cluster here
    encrypted: true,
    forceTLS: false, //
    authEndpoint: `${process.env.REACT_APP_API}broadcasting/auth`, // Your Laravel auth endpoint for broadcasting
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Use the correct token
        },
    },
});

export default LaravelEcho;
