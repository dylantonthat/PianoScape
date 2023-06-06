const pianoKeys = document.querySelectorAll(".keys .key");

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
    const tune = new Audio(soundUrls[key]);
    sounds[key] = tune;
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
            playSound(key);
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
        playSound(pianoKey);
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
        playSound(pianoKey);

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

// Function to play a sound (Not block-scoped)
function playSound(key)
{
    /*there is an audio object for each note called tune that is created and inserted into sounds
    therefore, you can play more than one note at a time
    */
    const tune = sounds[key];
    tune.currentTime = 0;
    tune.play();
}


function hideKeys()
{
    const label = document.querySelectorAll('.keys .key span');
    label.forEach((label) =>
    {
        label.style.visibility = "hidden";
    })
}

function showKeys()
{
    const label = document.querySelectorAll('.keys .key span');
    label.forEach((label) =>
    {
        label.style.visibility = "visible";
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

