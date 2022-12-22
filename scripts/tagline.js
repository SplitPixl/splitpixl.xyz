const ele = document.getElementById("tagline")

let lines = [
    "Software Engineer",
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "Indie Game Developer",
    "Telecommunications Historian",
    "Idiot Orange Cat",
    "Roingus Enjoyer",
    "C# Developer",
    "3D Artist",
    "\"I Make The Funny\"",
    "\"i'm splitpixl\"",
    "An Enigma",
    "Internet Explorer",
    "Dial-up Internet Service Provider",
    "Computer Graphics Artist",
    "Virtual Reality Enthusiast",
    "Electronics Hobbyist",
    "Creator",
    "Scuba Certified",
    "Linux User",
    "Friend",
    "Creature"
]

let usedLines = [];

function change() {
    if (lines.length === 0) {
        lines = usedLines;
        usedLines = [];
    }
    let idx = Math.floor(Math.random() * lines.length)
    let line = lines[idx]
    lines.splice(idx, 1)
    ele.innerText = line
    usedLines.push(line)
}

function animateChange() {
    ele.classList.add("hide")
    setTimeout(() => {
        change()
        ele.classList.remove("hide")
    }, 300)
}

let interval = setInterval(animateChange, 5000)
animateChange()

ele.addEventListener("click", (e) => {
    clearInterval(interval)
    animateChange()
    interval = setInterval(animateChange, 5000)
})

ele.classList.remove("remove")