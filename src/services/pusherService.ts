import Pusher from 'pusher-js';

// Replace with your actual credentials
const APP_KEY = 'd44e3d910d38a928e0be';
const APP_CLUSTER = 'eu';

const pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
  authEndpoint: 'https://frontend-test-api.aircall.dev/pusher/auth',
});

export default pusher;
