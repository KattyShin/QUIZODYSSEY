// Create a Howler.js sound instance
const sound = new Howl({
    src: ['audio/map.wav'],
    autoplay: true,  // you may want to disable autoplay
    volume: 1.0
  });
  
  // Add a user gesture listener to resume AudioContext
  window.addEventListener('click', function () {
    if (sound.state() !== 'loaded') {
      sound.once('load', function () {
        sound.play();  // Play after load
      });
    }
  });
  