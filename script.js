// -------------------------------
// SCENE 1: LOADING ANIMATION
// -------------------------------

let progress = 0;

const fill = document.getElementById("progressFill");
const percent = document.getElementById("percent");
const subtitle = document.getElementById("subtitle");

const scan = setInterval(() => {
    progress++;

    fill.style.width = progress + "%";
    percent.innerText = progress + "%";

    if (progress === 30) subtitle.innerText = "Scanning personality...";
    if (progress === 60) subtitle.innerText = "Checking kindness level...";
    if (progress === 85) subtitle.innerText = "Almost done...";

    if (progress >= 100) {
        clearInterval(scan);

        subtitle.innerText = "Scan complete ✔";

        setTimeout(() => {
            document.querySelector(".progressBox").style.display = "none";
            document.getElementById("scanResult").classList.remove("hidden");
        }, 800);
    }
}, 30);


// -------------------------------
// SCENE SWITCHING
// -------------------------------

document.getElementById("continueBtn").onclick = () => {
    document.querySelector(".container").classList.add("hidden");
    document.getElementById("scene2").classList.remove("hidden");

    typeRobotText();
};

document.getElementById("nextBtn").onclick = () => {
    document.getElementById("scene2").classList.add("hidden");
    document.getElementById("scene3").classList.remove("hidden");
};


// -------------------------------
// ROBOT TYPE TEXT
// -------------------------------

const robotLines = [
    "Hello HB...",
    "I'm analyzing your existence...",
    "This might take a second...",
    "Processing results...",
    "Conclusion: You're actually really important to someone 💙"
];

function typeRobotText() {
    let i = 0;
    const box = document.getElementById("robotText");
    const btn = document.getElementById("nextBtn");

    btn.disabled = true; // LOCK BUTTON

    const interval = setInterval(() => {
        box.innerText = robotLines[i];
        i++;

        if (i >= robotLines.length) {
            clearInterval(interval);

            // final message stays visible
            box.innerText = "Conclusion: You're actually really important to someone 💙";

            // unlock button after short delay
            setTimeout(() => {
                btn.disabled = false;
            }, 800);
        }
    }, 1500);
}

// -------------------------------
// FOLDERS / REASONS
// -------------------------------

const messages = [
    "You always manage to make things better without even trying.",
    "You're one of the few people who actually stayed no matter what.",
    "You make even boring days feel fun 😂",
    "Honestly... you're just different in a good way."
];

function showReason(i) {
    document.getElementById("messageBox").innerText = messages[i];
}


// -------------------------------
// FINAL SCREEN
// -------------------------------

document.getElementById("finalBtn").onclick = () => {
    document.getElementById("scene3").classList.add("hidden");
    document.getElementById("scene4").classList.remove("hidden");

    launchConfetti();
};


// -------------------------------
// RESTART
// -------------------------------

document.getElementById("restart").onclick = () => {
    location.reload();
};


// -------------------------------
// SIMPLE CONFETTI
// -------------------------------

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

function launchConfetti() {
    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            w: 6,
            h: 10,
            c: `hsl(${Math.random() * 360},100%,70%)`,
            speed: Math.random() * 3 + 2
        });
    }

    requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
        p.y += p.speed;

        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, p.w, p.h);
    });

    requestAnimationFrame(updateConfetti);
}