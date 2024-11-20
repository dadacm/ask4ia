import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'Ask4IA',
  host: '10.0.2.2',
})
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();

// Let's add a global variable for easier debugging
declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

// Add Reactotron to the console object
console.tron = Reactotron;
