const canvas = document.querySelector("#draw");
const ctx = canvas.getContext('2d');
const checkbox = document.querySelectorAll('#options .option input[type="checkbox"]');
const color = document.querySelector('#options .option input[type="color"]');
const width = document.querySelector('#options .option #width');
const clear = document.querySelector('#options .option #clear');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;

//defaults
let strokeStyle = '#BADA55';
let lineWidth = 15;

//function variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let grow = 15;
let direction = true;

//options register
let optionsArray = [
  {variable: "rainbow", value: false, function: "fRainbow"},
  {variable: "growShrink", value: false, function: "fGrowShrink"}
];
let rainbow = optionsArray[0]['value'];
let growShrink = optionsArray[1]['value'];

//functions
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function widthSet() {
  lineWidth = this.value;
}

function colorSet() {
  strokeStyle = this.value;
}

function checkboxSet() {
  const optionToSet = optionsArray.find(option => option.variable === this.dataset['variable']);
  optionToSet.value = !optionToSet.value;
}

function fRainbow() {
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  hue++;
  if(hue >= 360) hue = 0;
}

function fGrowShrink() {
  if(grow >= (lineWidth * 4) || grow <= 1) direction = !direction;
  if(direction) {
    grow++;
  }  else {
    grow--;
  }
  ctx.lineWidth = grow;
}

function draw(e) {
  if(!isDrawing) return; //return if no click
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  optionsArray.forEach(option => {
    if(option.value === true) {
      window[option.function]();
    }
  });

  //drawing start
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  //drawing end

}
//event listeners
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
checkbox.forEach(option => option.addEventListener("change", checkboxSet));
color.addEventListener('change', colorSet);
width.addEventListener('input', widthSet);
clear.addEventListener('click', clearCanvas);
