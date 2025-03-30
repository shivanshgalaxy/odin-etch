const container = document.querySelector(".canvas-container");

function changeColor(event) {
    event.target.style.backgroundColor = "#000";
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
        container.appendChild(cell);
    }
}

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