//selectors:
const mainGridElem = document.getElementById("grid");
const headerSelectors = document.querySelectorAll(".header-selector");
const allOptionsContainers = document.querySelectorAll(".all-options");
const StartAlgoBtn = document.querySelector(".start-algo-btn button");
const clearBoardBtn = document.querySelector(".clear-board-btn");
const clearPathBtn = document.querySelector(".clear-path-btn");
const addBombBtn = document.querySelector(".other-header-tools .bomb-icon-btn");
//speed of Visualizer.
let visSpeed = 25;
//import:
import {
  gridArr,
  startNodePos,
  targetNodePos,
  numOfCols,
  numOfRows,
  drawShortedPath,
} from "./visScript.js";
import { dijkstraAlgo } from "./algorithms/search algorithms/dijkstraAlgo.js";
import { aStarAlgo } from "./algorithms/search algorithms/aStar.js";
import { bfsAlgo } from "./algorithms/search algorithms/bfsAlgo.js";
import { dfsAlgo } from "./algorithms/search algorithms/dfsAlgo.js";
import { recursiveDivisionMazeGenerator } from "./algorithms/mazes algorithms/recursiveDivisionAlgo.js";
//handle the click event in the header options(algo,speed).
headerSelectors.forEach((selector) => {
  let clickToOpen = selector.querySelector(".selected-option");
  clickToOpen.addEventListener("click", () => {
    let options = selector.querySelector(".all-options");
    let allOpenedOptions = document.querySelectorAll(
      ".selected-option.clicked"
    );
    for (let i = 0; i < allOpenedOptions.length; i++) {
      if (allOpenedOptions[i] === clickToOpen) {
        continue;
      }
      allOpenedOptions[i].classList.remove("clicked");
      allOpenedOptions[i].nextElementSibling.style.display = "none";
    }
    !clickToOpen.classList.contains("clicked")
      ? (options.style.display = "flex")
      : (options.style.display = "none");
    clickToOpen.classList.toggle("clicked");
  });
});
allOptionsContainers.forEach((container) => {
  let options = container.querySelectorAll(".option");
  options.forEach((op) => {
    op.addEventListener("click", () => {
      container.style.display = "none";
      container.previousElementSibling.classList.remove("clicked");
      let oldUse = container.querySelector(".use");
      if (oldUse !== null) {
        oldUse.classList.remove("use");
      }
      op.classList.toggle("use");
      if (container.parentElement.id === "select-search-speed") {
        //set the visSpeed based on the user.
        op.classList[1] === "fast"
          ? (visSpeed = 10)
          : op.classList[1] === "average"
          ? (visSpeed = 25)
          : (visSpeed = 100);
        let showSpeedSpan =
          container.previousElementSibling.querySelector("span");
        showSpeedSpan.innerText = op.textContent;
      } else if (container.parentElement.id === "select-algo") {
        let showAlgoTypeSpan = StartAlgoBtn.querySelector(".type");
        let showAlgoStatusSpan = StartAlgoBtn.querySelector(".status");
        let showText = op.textContent
          .split(" ")
          .splice(0, op.textContent.split(" ").length - 1)
          .join(" ");
        showAlgoTypeSpan.innerText = showText;
        showAlgoStatusSpan.innerText = "Visualize";
        let oldStartAlgoBtnClass = StartAlgoBtn.classList[0];
        StartAlgoBtn.classList.replace(
          oldStartAlgoBtnClass,
          `${op.classList[1]}-btn`
        );
      } else if (container.parentElement.id === "select-maze-algo") {
        if (op.classList.contains("recur-div")) {
          cleanPath();
          cleanWalls();
          stopAllFunctions();
          recursiveDivisionMazeGenerator();
        }
      }
    });
  });
});
//start the function of vis when the btn is clicked.
function startVisFunctions() {
  let startNodePos = document.querySelector(".have-start").id;
  let targetNodePos = document.querySelector(".have-target").id;
  let btnClass = StartAlgoBtn.classList[0];
  if (btnClass === "none") {
    let showAlgoStatusSpan = StartAlgoBtn.querySelector(".status");
    showAlgoStatusSpan.innerText = "Pick an Algorithm";
  } else {
    stopAllFunctions();
    cleanPath();
    if (bombAdded) {
      //true = have bomb , false = not draw
      //vis one complete
      //start vis two of the bomb
      //draw the path one from start to bomb
      //draw the path two from bomb to target
      let bombNodePos = document.querySelector(".have-bomb").id;
      if (btnClass === "dij-algo-btn") {
        let [waitingTimeOne, foundBomb, pathNodesOne] = dijkstraAlgo(
          startNodePos,
          bombNodePos,
          true,
          false
        );
        if (foundBomb) {
          window.setTimeout(() => {
            let [waitingTimeTwo, foundTarget, pathNodesTwo] = dijkstraAlgo(
              bombNodePos,
              targetNodePos,
              true,
              false
            );
            if (foundTarget) {
              window.setTimeout(() => {
                drawShortedPath(
                  pathNodesOne,
                  startNodePos,
                  bombNodePos,
                  true,
                  true
                );
                window.setTimeout(() => {
                  drawShortedPath(
                    pathNodesTwo,
                    bombNodePos,
                    targetNodePos,
                    true,
                    true
                  );
                }, pathNodesOne.length * 50);
              }, waitingTimeTwo * visSpeed);
            }
          }, waitingTimeOne * visSpeed);
        }
      } else if (btnClass === "a-star-algo-btn") {
        let [waitingTimeOne, foundBomb, pathNodesOne] = aStarAlgo(
          startNodePos,
          bombNodePos,
          true,
          false
        );
        if (foundBomb) {
          window.setTimeout(() => {
            let [waitingTimeTwo, foundTarget, pathNodesTwo] = aStarAlgo(
              bombNodePos,
              targetNodePos,
              true,
              false
            );
            if (foundTarget) {
              window.setTimeout(() => {
                drawShortedPath(
                  pathNodesOne,
                  startNodePos,
                  bombNodePos,
                  true,
                  true
                );
                window.setTimeout(() => {
                  drawShortedPath(
                    pathNodesTwo,
                    bombNodePos,
                    targetNodePos,
                    true,
                    true
                  );
                }, pathNodesOne.length * 50);
              }, waitingTimeTwo * visSpeed);
            }
          }, waitingTimeOne * visSpeed);
        }
      } else if (btnClass === "bfs-algo-btn") {
        let [waitingTimeOne, foundBomb, pathNodesOne] = bfsAlgo(
          startNodePos,
          bombNodePos,
          true,
          false
        );
        if (foundBomb) {
          window.setTimeout(() => {
            let [waitingTimeTwo, foundTarget, pathNodesTwo] = bfsAlgo(
              bombNodePos,
              targetNodePos,
              true,
              false
            );
            if (foundTarget) {
              window.setTimeout(() => {
                drawShortedPath(
                  pathNodesOne,
                  startNodePos,
                  bombNodePos,
                  true,
                  true
                );
                window.setTimeout(() => {
                  drawShortedPath(
                    pathNodesTwo,
                    bombNodePos,
                    targetNodePos,
                    true,
                    true
                  );
                }, pathNodesOne.length * 50);
              }, waitingTimeTwo * visSpeed);
            }
          }, waitingTimeOne * visSpeed);
        }
      } else if (btnClass === "dfs-algo-btn") {
        let [waitingTimeOne, foundBomb, pathNodesOne] = dfsAlgo(
          startNodePos,
          bombNodePos,
          true,
          false
        );
        if (foundBomb) {
          window.setTimeout(() => {
            let [waitingTimeTwo, foundTarget, pathNodesTwo] = dfsAlgo(
              bombNodePos,
              targetNodePos,
              true,
              false
            );
            if (foundTarget) {
              window.setTimeout(() => {
                drawShortedPath(
                  pathNodesOne,
                  startNodePos,
                  bombNodePos,
                  true,
                  true
                );
                window.setTimeout(() => {
                  drawShortedPath(
                    pathNodesTwo,
                    bombNodePos,
                    targetNodePos,
                    true,
                    true
                  );
                }, pathNodesOne.length * 50);
              }, waitingTimeTwo * visSpeed);
            }
          }, waitingTimeOne * visSpeed);
        }
      }
    }
    //false = not bomb , true = you have to draw
    else {
      if (btnClass === "dij-algo-btn") {
        dijkstraAlgo(startNodePos, targetNodePos, bombAdded, true);
      } else if (btnClass === "a-star-algo-btn") {
        aStarAlgo(startNodePos, targetNodePos, bombAdded, true);
      } else if (btnClass === "bfs-algo-btn") {
        bfsAlgo(startNodePos, targetNodePos, bombAdded, true);
      } else if (btnClass === "dfs-algo-btn") {
        dfsAlgo(startNodePos, targetNodePos, bombAdded, true);
      }
    }
  }
}
//handle Start Algo Btn.
StartAlgoBtn.addEventListener("click", ()=>{
  let opendedOption = document.querySelector(".selected-option.clicked");
  if(opendedOption !== null){
    opendedOption.classList.remove('clicked');
    opendedOption.nextElementSibling.style.display = "none";
  }
  startVisFunctions();
});
//handle add bomb btn
let bombAdded = false;
addBombBtn.addEventListener("click", () => {
  if (!bombAdded) {
    addBombToGrid();
  } else {
    removeBombFromGrid();
  }
});
function addBombToGrid() {
  let bombElem = document.querySelector(".node .bomb-elem");
  let randomRow = Math.trunc(Math.random() * numOfRows);
  let randomCol = Math.trunc(Math.random() * numOfCols);
  let randomNode = gridArr[randomRow][randomCol];
  bombAdded = true;
  addBombBtn.classList.add("added");
  while (
    randomNode.classList.contains("have-target") ||
    randomNode.classList.contains("have-start")
  ) {
    randomRow = Math.trunc(Math.random() * numOfRows);
    randomCol = Math.trunc(Math.random() * numOfCols);
    randomNode = gridArr[randomRow][randomCol];
  }
  randomNode.classList.add("have-bomb");
  randomNode.removeAttribute("ondragstart");
  for (let i = 0; i <= randomRow; i++) {
    let tmpNode = gridArr[i][randomCol];
    window.setTimeout(() => {
      tmpNode.appendChild(bombElem);
      tmpNode.classList.remove("wall");
      if (i === 0) {
        bombElem.style.display = "block";
      }
    }, 25 * i);
  }
}
function removeBombFromGrid() {
  cleanPath();
  let bombElem = document.querySelector(".node .bomb-elem");
  let nodeHaveBomb = document.querySelector(".have-bomb");
  bombAdded = false;
  addBombBtn.classList.remove("added");
  nodeHaveBomb.classList.remove("have-bomb");
  nodeHaveBomb.setAttribute("ondragstart", "return false;");
  bombElem.style.display = "none";
}
//fill the grid elem with nodes :
function fillGrid() {
  gridArr.forEach((row) => {
    let rowElem = document.createElement("div");
    rowElem.classList.add("grid-row");
    row.forEach((node) => {
      rowElem.appendChild(node);
    });
    mainGridElem.appendChild(rowElem);
  });
  nodesEventListeners();
}
fillGrid();
//handle node events after filling the grid
function nodesEventListeners() {
  let nodes = document.querySelectorAll(".node");
  let startNode = document.querySelector(".node .start");
  let targetNode = document.querySelector(".node .target");
  let bombElem = document.querySelector(".node .bomb-elem");
  let dragged = false;
  nodes.forEach((node) => {
    node.addEventListener("mousedown", () => {
      if (
        !node.classList.contains("have-start") &&
        !node.classList.contains("have-target") &&
        !node.classList.contains("have-bomb") &&
        !node.classList.contains("visited") &&
        !node.classList.contains("bomb-visited") &&
        !node.classList.contains("path") &&
        !node.classList.contains("bomb-path")
      ) {
        node.classList.toggle("wall");
      }
    });
    node.addEventListener("mouseover", () => {
      if (
        !node.classList.contains("have-start") &&
        !node.classList.contains("have-target") &&
        !node.classList.contains("have-bomb") &&
        !node.classList.contains("visited") &&
        !node.classList.contains("bomb-visited") &&
        !node.classList.contains("path") &&
        !node.classList.contains("bomb-path") &&
        dragged
      ) {
        node.classList.toggle("wall");
      }
    });
    window.addEventListener("mousedown", () => {
      dragged = true;
    });
    window.addEventListener("mouseup", () => {
      dragged = false;
    });
    //add the dragged node to cur over node.
    node.addEventListener("dragover", (e) => {
      //see if possible to add the dragged node in this palce.
      let child = document.querySelector(".dragging");
      let possibleToAdd =
        (child.classList.contains("start") &&
          !node.classList.contains("have-target") &&
          !node.classList.contains("have-bomb")) ||
        (child.classList.contains("target") &&
          !node.classList.contains("have-start") &&
          !node.classList.contains("have-bomb")) ||
        (child.classList.contains("bomb-elem") &&
          !node.classList.contains("have-target") &&
          !node.classList.contains("have-start"));

      if (!node.classList.contains("wall") && possibleToAdd) {
        node.appendChild(child);
      }
      e.preventDefault();
    });
    //add drop event and see if possible add the class have and other things else get the prev over node (by get parent of togle node and add to it);
    document.addEventListener("dragend", (e) => {
      //to stop drawin wall when drag the start and target.
      dragged = false;
      let oldDraggedNodeContainer;
      let child = e.target;
      child.classList.contains("start")
        ? (oldDraggedNodeContainer = document.querySelector(".have-start"))
        : child.classList.contains("target")
        ? (oldDraggedNodeContainer = document.querySelector(".have-target"))
        : (oldDraggedNodeContainer = document.querySelector(".have-bomb"));
      let curDraggedNodeContainer = child.parentElement;
      if (child.classList.contains("start")) {
        oldDraggedNodeContainer.classList.remove("have-start");
        curDraggedNodeContainer.classList.add("have-start");
      } else if (child.classList.contains("bomb-elem")) {
        oldDraggedNodeContainer.classList.remove("have-bomb");
        curDraggedNodeContainer.classList.add("have-bomb");
      } else {
        oldDraggedNodeContainer.classList.remove("have-target");
        curDraggedNodeContainer.classList.add("have-target");
      }
      oldDraggedNodeContainer.setAttribute("ondragstart", "return false;");
      curDraggedNodeContainer.removeAttribute("ondragstart");
    });
  });
  startNode.addEventListener("dragstart", () => {
    cleanPath();
    dragged = false;
    startNode.classList.add("dragging");
  });
  targetNode.addEventListener("dragstart", () => {
    cleanPath();
    dragged = false;
    targetNode.classList.add("dragging");
  });
  startNode.addEventListener("dragend", () => {
    startNode.classList.remove("dragging");
  });
  targetNode.addEventListener("dragend", () => {
    targetNode.classList.remove("dragging");
  });
  bombElem.addEventListener("dragstart", () => {
    cleanPath();
    dragged = false;
    bombElem.classList.add("dragging");
  });
  bombElem.addEventListener("dragend", () => {
    bombElem.classList.remove("dragging");
  });
}
//handle the clikc in the clear board and path btns:
function cleanBoard() {
  let walls = document.querySelectorAll(".node.wall");
  let visitedNodes = document.querySelectorAll(".visited");
  let bombVisitedNodes = document.querySelectorAll(".bomb-visited");
  let startNode = document.querySelector(".start");
  let targetNode = document.querySelector(".target");
  if (bombAdded) {
    removeBombFromGrid();
  }
  let startNodeOriginPosInGrid = document.getElementById(
    `node-${startNodePos.xCoor}-${startNodePos.yCoor}`
  );
  let targetNodeOriginPosInGrid = document.getElementById(
    `node-${targetNodePos.xCoor}-${targetNodePos.yCoor}`
  );
  let oldStartNodeContainer = document.querySelector(".have-start");
  let oldTargetNodeContainer = document.querySelector(".have-target");
  let path = document.querySelectorAll(".path");
  let bombPath = document.querySelectorAll(".bomb-path");
  startNodeOriginPosInGrid.appendChild(startNode);
  targetNodeOriginPosInGrid.appendChild(targetNode);
  oldStartNodeContainer.classList.remove("have-start");
  oldTargetNodeContainer.classList.remove("have-target");
  oldStartNodeContainer.setAttribute("ondragstart", "return false;");
  oldTargetNodeContainer.setAttribute("ondragstart", "return false;");
  startNodeOriginPosInGrid.classList.add("have-start");
  targetNodeOriginPosInGrid.classList.add("have-target");
  startNodeOriginPosInGrid.removeAttribute("ondragstart");
  targetNodeOriginPosInGrid.removeAttribute("ondragstart");
  walls.forEach((wall) => {
    wall.classList.remove("wall");
  });
  visitedNodes.forEach((vis) => {
    vis.classList.remove("visited");
  });
  bombVisitedNodes.forEach((bombVis) => {
    bombVis.classList.remove("bomb-visited");
  });
  path.forEach((n) => {
    n.classList.remove("path");
  });
  bombPath.forEach((n) => {
    n.classList.remove("bomb-path");
  });
}
function cleanPath() {
  let visitedNodes = document.querySelectorAll(".visited");
  let path = document.querySelectorAll(".path");
  let bombPath = document.querySelectorAll(".bomb-path");
  let bombVisitedNodes = document.querySelectorAll(".bomb-visited");
  visitedNodes.forEach((vis) => {
    vis.classList.remove("visited");
  });
  bombVisitedNodes.forEach((bombVis) => {
    bombVis.classList.remove("bomb-visited");
  });
  path.forEach((n) => {
    n.classList.remove("path");
  });
  bombPath.forEach((n) => {
    n.classList.remove("bomb-path");
  });
}
function cleanWalls() {
  let walls = document.querySelectorAll(".node.wall");
  walls.forEach((wall) => {
    wall.classList.remove("wall");
  });
}
clearBoardBtn.addEventListener("click", cleanBoard);
clearPathBtn.addEventListener("click", cleanPath);
//stop the app functions when the vis operation is start, by set the pointer event prop to none.
function stopAllFunctions() {
  let headerBtns = document.querySelectorAll("header >*:not(.header-logo)");
  let allNodes = document.querySelectorAll(".node");
  headerBtns.forEach((btn) => {
    btn.style.pointerEvents = "none";
  });
  allNodes.forEach((node) => {
    node.style.pointerEvents = "none";
  });
  document
    .getElementsByTagName("body")[0]
    .setAttribute("ondragstart", "return false;");
}
//start the app functions when the vis operation is end
function startAllFunctions() {
  let headerBtns = document.querySelectorAll("header >*:not(.header-logo)");
  let allNodes = document.querySelectorAll(".node");
  headerBtns.forEach((btn) => {
    btn.style.pointerEvents = "all";
  });
  allNodes.forEach((node) => {
    node.style.pointerEvents = "all";
  });
  document.getElementsByTagName("body")[0].removeAttribute("ondragstart");
}
export { visSpeed, startAllFunctions };
