const pianoKeys = document.querySelectorAll(".keys .key");
const audioContext = new AudioContext();

// Define the sound URLs for each key in a dictionary
const soundUrls =
{
    a: "tunes/a.wav",
    w: "tunes/w.wav",
    s: "tunes/s.wav",
    e: "tunes/e.wav",
    d: "tunes/d.wav",
    f: "tunes/f.wav",
    t: "tunes/t.wav",
    g: "tunes/g.wav",
    y: "tunes/y.wav",
    h: "tunes/h.wav",
    u: "tunes/u.wav",
    j: "tunes/j.wav",
    k: "tunes/k.wav",
};

// Load sounds
const sounds = { };
for (const key in soundUrls)
{
    //makes new audio from tunes folder to use
    //const tune = new Audio(soundUrls[key]);
    sounds[key] = tune;
}

/*there is an audio object for each note called tune that is created and inserted into sounds therefore, you can play more than one note at a time*/

/* Function to play a sound (Not block-scoped)
function playWebSound(key)
{
    
    const tune = sounds[key];
    tune.currentTime = 0;
    tune.play();
}
*/

function playWebSound(key) {
    const tuneUrl = sounds[key];
    
    // Fetch the audio file
    fetch(tuneUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        // Create a new AudioBufferSourceNode
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
  
        // Connect the source to the AudioContext's destination (output)
        source.connect(audioContext.destination);
  
        // Start playing the sound
        source.start();
      })
      .catch(error => console.error('Error decoding audio data:', error));
  }
  


// Event listener for key, event variable for the key pressed (a, w, s, etc.)
document.addEventListener("keydown", (event) =>
{
    const key = event.key.toLowerCase();
    if (sounds.hasOwnProperty(key))
    {
        // if statement used so the sound will not continue to start over and over when holding down a key
        if (!event.repeat)
        {
            playWebSound(key);
            const clickedKey = document.querySelector(`[data-note="${key}"]`); // getting clicked key element
            clickedKey.classList.add("active");
        }
    }
});
document.addEventListener("keyup", (event) =>
{
    const key = event.key.toLowerCase();
    if (sounds.hasOwnProperty(key))
    {
        const clickedKey = document.querySelector(`[data-note="${key}"]`); // getting clicked key element
        clickedKey.classList.remove("active");
    }
});

// Event listener for clicking on note, use pianoKey instead of key
pianoKeys.forEach((key) =>
{
    const pianoKey = key.dataset.note;
    key.addEventListener("mousedown", () =>
    {
        playWebSound(pianoKey);
        const clickedKey = document.querySelector(`[data-note="${pianoKey}"]`);
        clickedKey.classList.add("active");
    });

    key.addEventListener("mouseup", () =>
    {
        if (sounds.hasOwnProperty(pianoKey))
        {
            const clickedKey = document.querySelector(`[data-note="${pianoKey}"]`);
            clickedKey.classList.remove("active");
        }
    });

    // Touch event listeners
    key.addEventListener("touchstart", (event) => {
        playWebSound(pianoKey);

        const clickedKey = document.querySelector(`[data-note="${pianoKey}"]`);
        clickedKey.classList.add("active");
    });

    key.addEventListener("touchend", (event) => {
        event.preventDefault();
        if (sounds.hasOwnProperty(pianoKey)) {
        const clickedKey = document.querySelector(`[data-note="${pianoKey}"]`);
        clickedKey.classList.remove("active");
        }
    });
});


function hideKeys()
{
    const label = document.querySelectorAll('.keys .key span');
    label.forEach((l) =>
    {
        l.style.visibility = "hidden";
    })
}

function showKeys()
{
    const label = document.querySelectorAll('.keys .key span');
    label.forEach((l) =>
    {
        l.style.visibility = "visible";
    })
}

const keySwitch = document.querySelector('input[type="checkbox"]');

keySwitch.addEventListener("change", () =>
{
    if (keySwitch.checked)
    {showKeys();}
    else
        hideKeys();

});

