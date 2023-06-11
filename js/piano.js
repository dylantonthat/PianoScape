const pianoKeys = document.querySelectorAll(".keys .key");

// Define the sound URLs for each key in a dictionary
const soundUrls =
{
    a: "tunes/a.mp3",
    w: "tunes/w.mp3",
    s: "tunes/s.mp3",
    e: "tunes/e.mp3",
    d: "tunes/d.mp3",
    f: "tunes/f.mp3",
    t: "tunes/t.mp3",
    g: "tunes/g.mp3",
    y: "tunes/y.mp3",
    h: "tunes/h.mp3",
    u: "tunes/u.mp3",
    j: "tunes/j.mp3",
    k: "tunes/k.mp3",
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

// Function to play a sound (Not block-scoped)
function playWebSound(key)
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

