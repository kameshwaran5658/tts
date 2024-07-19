// Populate voice variants
function populateVoiceList() {
    var voices = window.speechSynthesis.getVoices();
    var voiceSelect = document.getElementById('voice-select');
    voiceSelect.innerHTML = '';
  
    voices.forEach(function(voice, index) {
      var option = document.createElement('option');
      option.value = voice.name;
      option.textContent = voice.name + ' (' + voice.lang + ')';
      voiceSelect.appendChild(option);
    });
  }
  
  // Initialize voice variants
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  // Function to convert text to speech
  function convertToSpeech() {
    var text = document.getElementById('text-input').value.trim();
    
    // Check if the text is empty
    if (text === '') {
      // Notify the user to enter text using speech synthesis
      var errorMessage = 'Please enter text.';
      var errorSpeech = new SpeechSynthesisUtterance(errorMessage);
      window.speechSynthesis.speak(errorSpeech);
      
      // Display error message
      document.getElementById('error-message').innerText = errorMessage;
      return;
    }
  
    var speechOutput = new SpeechSynthesisUtterance(text);
    var marker = document.createElement('span');
    marker.classList.add('marker');
    var speechOutputDiv = document.getElementById('speech-output');
    speechOutput.onboundary = function(event) {
      if (event.name === 'word') {
        marker.textContent = text.substring(event.charIndex, event.charIndex + event.charLength);
        speechOutputDiv.innerHTML = '';
        speechOutputDiv.appendChild(marker);
      }
    };
  
    // Set voice variant
    var selectedVoice = document.getElementById('voice-select').value;
    var voices = window.speechSynthesis.getVoices();
    var voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      speechOutput.voice = voice;
    }
  
    // Set speech speed and pitch
    var speed = parseFloat(document.getElementById('speech-speed').value);
    var pitch = parseFloat(document.getElementById('speech-pitch').value);
    speechOutput.rate = speed;
    speechOutput.pitch = pitch;
  
    window.speechSynthesis.speak(speechOutput);
    document.getElementById('error-message').innerText = '';
  }
  
  // Function to stop speech
  function stopSpeech() {
    window.speechSynthesis.cancel();
    document.getElementById('speech-output').innerText = '';
    document.getElementById('error-message').innerText = '';
  }
  
  // Function to clear text input
  function clearTextInput() {
    document.getElementById('text-input').value = '';
  }
  
  // Function to voice welcome message
  function voiceWelcomeMessage() {
    var welcomeMessage = "Welcome to K TEXT TO SPEECH CONVERTER";
    var welcomeSpeech = new SpeechSynthesisUtterance(welcomeMessage);
    window.speechSynthesis.speak(welcomeSpeech);
  }
  
  // Voice welcome message on page load
  voiceWelcomeMessage();
  
  // Event listeners for the buttons
  document.getElementById('btn-text-to-speech').addEventListener('click', convertToSpeech);
  document.getElementById('btn-stop').addEventListener('click', stopSpeech);
  document.getElementById('btn-clear').addEventListener('click', clearTextInput);
// Function to reset speech speed and pitch
function resetSpeechSettings() {
    document.getElementById('speech-speed').value = 1;
    document.getElementById('speech-pitch').value = 1;
}

// Event listener for the reset button
document.getElementById('btn-reset').addEventListener('click', resetSpeechSettings);
  