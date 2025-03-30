const container = document.querySelector(".canvas-container");
const colorSelector = document.querySelector("#color-selector");
const gridSizeSlider = document.querySelector("#grid-size");

let color = "#000";
let isRainbowMode = false;
let isTransparentMode = false;

colorSelector.addEventListener("input", (event) => {
    color = event.target.value;
})

function changeColor(event) {
    if(isTransparentMode) {
        const currentColor = event.target.style.backgroundColor;
        const colorElements = currentColor.split(",");
        const red = colorElements[0].replace("rgb(", "").replace("rgba(", "");
        const green = colorElements[1].trim();
        const blue = colorElements[2].trim().replace(")", "");
        let alpha = colorElements[3];
        alpha = alpha === undefined ? "1" : alpha;
        alpha = Number(alpha.replace(")", "")) - 0.1;
        event.target.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    } else {
        const degrees = Math.floor(Math.random() * 360) + 1;
        const setColor = isRainbowMode ? `hsl(${degrees} 100% 50%)` : color;
        event.target.style.backgroundColor = `${setColor}`;
    }
}

function createGrid(){
    const canvasSize = gridSizeSlider.value;
    container.innerHTML = "";
    for (let rows = 0; rows < canvasSize **  2; ++rows) {
        const cell = document.createElement("div");
        cell.style.flex = `1 1 calc(100% / ${canvasSize})`;
        cell.style.aspectRatio = "1 / 1";
        cell.style.backgroundColor = "rgb(255, 255, 255)";
        cell.addEventListener("mouseover", (event) => {
            if (isDown) {
                changeColor(event);
            }
        });

        cell.addEventListener("click", (event) => {
            changeColor(event);
        })
        container.appendChild(cell);
    }
}

function setActive(event) {
    const currentActive = document.querySelector(".active");
    currentActive.classList.remove("active");
    event.target.classList.add("active");
}


const colorButton = document.querySelector("#color");
colorButton.addEventListener("click", (event) => {
    isRainbowMode = false;
    isTransparentMode = false;
    setActive(event);
    color = colorSelector.value;
})

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", (event) => {
    isRainbowMode = true;
    isTransparentMode = false;
    setActive(event);
});

const transparentButton = document.querySelector("#transparency");
transparentButton.addEventListener("click", (event) => {
    isRainbowMode = false;
    isTransparentMode = true;
    setActive(event);
});

const eraseButton = document.querySelector("#erase");
eraseButton.addEventListener("click", (event) => {
    isRainbowMode = false;
    isTransparentMode = false;
    setActive(event);
    color = "rgba(255, 255, 255, 1)";
})

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    createGrid();
})

gridSizeSlider.addEventListener("change", (event) => {
    createGrid();
})

gridSizeSlider.addEventListener("input", (event) => {
    const gridSizeLabel = document.querySelector("#grid-size-label");
    gridSizeLabel.textContent = `${event.target.value} x ${event.target.value}`;
})

let isDown = false;
container.addEventListener("mousedown", () => isDown = true);
document.addEventListener("mouseup", () => isDown = false);

createGrid();