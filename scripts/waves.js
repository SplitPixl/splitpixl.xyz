let colorsLight = [
    '#5ddea5',
    '#4bcec9',
    '#3cb5e0',
    '#3c81ce',
    '#405fba'
]

let colorsDark = [...colorsLight]
colorsDark.reverse()

function getColors() {
    const darkMode = getComputedStyle(document.body).getPropertyValue('--dark-mode') === 'true'
    if (darkMode) {
        return colorsDark
    } else {
        return colorsLight
    }
}

const ctx = document.querySelector("#waves-canvas").getContext('2d')

function resize() {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight * 1.1
}

function drawWave(color, midline, amplitude, speed, waveId) {
    ctx.fillStyle = color
    ctx.fill(wavePath(midline, amplitude, speed, waveId))
}

function wavePath(midline, amplitude, speed, waveId) {
    const path = new Path2D()
    path.lineTo(0, 0)
    const resolution = ctx.canvas.width / 4
    for (let x = 0; x <= ctx.canvas.width; x += (ctx.canvas.width / resolution)) {
        path.lineTo(x, waveY(x, midline, amplitude, speed, waveId))
    }
    path.lineTo(ctx.canvas.width, waveY(ctx.canvas.width, midline, amplitude, speed, waveId))
    path.lineTo(ctx.canvas.width, 0)
    path.closePath()
    return path
}

function waveY(x, midline, amplitude, speed, waveId) {
    let direction = 1
    if (waveId % 2) {
        direction = -1
    }
    const y = Math.abs(
        Math.sin(
            ((x * direction) / (ctx.canvas.width / 10)) + (
                (time * speed) / 1000) * Math.PI
        ) * amplitude
    )
        + midline
    return y
}

function animate(t) {
    time = t
    const w = ctx.canvas.width
    const h = ctx.canvas.height
    const colors = getColors()
    ctx.clearRect(0, 0, w, h)

    for (let i = 0; i < colors.length; i++) {
        const color = colors[i]
        const amplitude = (ctx.canvas.height - window.innerHeight) / 2
        // const midline = (((colors.length - (i + .5)) / colors.length) * ctx.canvas.height) + amplitude
        const midline = (ctx.canvas.height - amplitude) - (ctx.canvas.height * (i / colors.length))
        const speed = 1 / ((colors.length - i + 1) * 2)
        drawWave(color, midline, amplitude, speed, i)
    }

    requestAnimationFrame((tt) => { animate(tt); })
}

window.addEventListener('resize', () => { resize(); })
resize()
requestAnimationFrame((t) => { animate(t); })
