const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let isDrawing = false
let selectedTool = 'pencil'

function startDrawing(e) {
  isDrawing = true
  draw(e)
}

function draw(e) {
  if (!isDrawing) return
  const x = e.clientX - canvas.offsetLeft
  const y = e.clientY - canvas.offsetTop
  ctx.lineTo(x, y)
  ctx.stroke()
}

function stopDrawing() {
  isDrawing = false
  ctx.beginPath()
}

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseout', stopDrawing)
canvas.addEventListener('mouseup', stopDrawing)

document.getElementById('clearButton').addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
})

document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', function () {
    const color = this.style.backgroundColor
    ctx.strokeStyle = color
  })
})

document.getElementById('brushSize').addEventListener('change', function () {
  const brushSize = this.value
  ctx.lineWidth = brushSize
})

document.getElementById('pencilTool').addEventListener('mousedown', function () {
  selectedTool = 'pencil'
  ctx.globalCompositeOperation = 'source-over'
})

document.getElementById('brushTool').addEventListener('mousedown', function () {
  selectedTool = 'brush'
  ctx.globalCompositeOperation = 'multiply'
})

document.getElementById('eraserTool').addEventListener('mousedown', function () {
  selectedTool = 'eraser'
  ctx.globalCompositeOperation = 'destination-out'
})

document.getElementById('colorPicker').addEventListener('input', function () {
  const color = this.value
  ctx.strokeStyle = color
})

document.getElementById('saveButton').addEventListener('click', function () {
  const link = document.createElement('a')
  const dataUrl = canvas.toDataURL('image/png')
  link.href = dataUrl
  link.download = 'draw.png'
  link.click()
})
