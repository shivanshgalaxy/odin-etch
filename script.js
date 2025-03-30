const container = document.querySelector(".canvas-container");

const colorSelector = document.querySelector("#color-selector");

let color = "#000";
let isRainbowMode = false;

colorSelector.addEventListener("input", (event) => {
    color = event.target.value;
})

function changeColor(event) {
    const degrees = Math.floor(Math.random() * 360) + 1;
    const setColor = isRainbowMode ? `hsl(${degrees} 100% 50%)` : color;

    event.target.style.backgroundColor = `${setColor}`;
}

function createGrid(canvasSize=16){
    for (let rows = 0; rows < canvasSize **  2; ++rows) {
        const cell = document.createElement("div");
        cell.style.flex = `1 1 calc(100% / ${canvasSize})`;
        cell.style.aspectRatio = "1 / 1";
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
    setActive(event);
    color = colorSelector.value;
})

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", (event) => {
    isRainbowMode = true;
    setActive(event);
});

const transparentButton = document.querySelector("#transparency");
transparentButton.addEventListener("click", (event) => {
    setActive(event);
});

const eraseButton = document.querySelector("#erase");
eraseButton.addEventListener("click", (event) => {
    isRainbowMode = false;
    setActive(event);
    color = "#fff";
})

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    const canvas = document.querySelector(".canvas-container");
    canvas.innerHTML = "";
    createGrid();
})

let isDown = false;
container.addEventListener("mousedown", () => isDown = true);
document.addEventListener("mouseup", () => isDown = false);

createGrid();