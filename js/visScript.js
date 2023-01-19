import { visSpeed, startAllFunctions } from "./main.js";
let gridArr = [];
let numOfRows = 35;
let numOfCols = 70;
if(window.matchMedia("(max-width: 1200px)").matches){
    numOfRows = 25;
    numOfCols = 60;
}
if (window.matchMedia("(max-width: 900px)").matches) {
  numOfRows = 25;
  numOfCols = 50;
}
if (window.matchMedia("(max-width: 768px)").matches) {
  numOfRows = 25;
  numOfCols = 30;
}
if (window.matchMedia("(max-width: 480px)").matches) {
  numOfRows = 15;
  numOfCols = 20;
}
const startNodePos = {
  xCoor: Math.trunc(numOfCols / 4),
  yCoor: Math.trunc(numOfRows / 2),
};
const targetNodePos = {
  xCoor: numOfCols - Math.trunc(numOfCols / 4),
  yCoor: Math.trunc(numOfRows / 2),
};
//fill the gridArr with nodes.
for (let i = 0; i < numOfRows; i++) {
  let row = [];
  for (let j = 0; j < numOfCols; j++) {
    row.push(makeNode(j, i));
  }
  gridArr.push(row);
}
//to make grid node:
function makeNode(x, y) {
  let nodeElem = document.createElement("div");
  nodeElem.classList.add("node");
  nodeElem.id = `node-${x}-${y}`;
  nodeElem.setAttribute("data-x", x);
  nodeElem.setAttribute("data-y", y);
  if (x === startNodePos.xCoor && y === startNodePos.yCoor) {
    nodeElem.innerHTML =
      '<i class="fa-solid fa-location-crosshairs start"></i>';
    nodeElem.classList.add("have-start");
  } else if (x === targetNodePos.xCoor && y === targetNodePos.yCoor) {
    nodeElem.innerHTML = '<i class="fa-solid fa-location-pin target"></i>';
    nodeElem.classList.add("have-target");
  } else if (x === 0 && y === 0) {
    nodeElem.innerHTML = '<i class="fa-solid fa-bomb bomb-elem"></i>';
  } else {
    nodeElem.setAttribute("ondragstart", "return false;");
  }
  return nodeElem;
}
//start Visualizer animation , this function take nodes order from algorithms functions file.
function startVisAnimation(
  nodesOrder,
  cameFrom,
  startNodePos,
  targetNodePos,
  foundTarget,
  bombAdded,
  draw
) {
  for (let i = 0; i < nodesOrder.length; i++) {
    let node = document.getElementById(nodesOrder[i]);
    window.setTimeout(() => {
      if (
        document.getElementById(startNodePos).classList.contains("have-start")
      ) {
        node.classList.add("visited");
      } else {
        if (node.classList.contains("visited")) {
          node.classList.replace("visited", "bomb-visited");
        } else {
          node.classList.add("bomb-visited");
        }
      }
    }, i * visSpeed);
  }
  if (foundTarget) {
    if (draw) {
      window.setTimeout(() => {
        return drawShortedPath(
          cameFrom,
          startNodePos,
          targetNodePos,
          bombAdded,
          draw
        );
      }, nodesOrder.length * visSpeed);
    } else {
      return drawShortedPath(
        cameFrom,
        startNodePos,
        targetNodePos,
        bombAdded,
        draw
      );
    }
  } else {
    window.setTimeout(() => {
      startAllFunctions();
    }, nodesOrder.length * visSpeed);
  }
}
//draw the shorted path function this function take cameFrom from algorithms functions file.
function drawShortedPath(
  cameFrom,
  startNodePos,
  targetNodePos,
  bombAdded,
  draw
) {
  let curNode = targetNodePos;
  let pathNodes;
  let prevNode;
  let pathHead = document.createElement("i");
  pathHead.className = "fa-solid fa-fish-fins head";
  if (bombAdded === true && draw === true) {
    pathNodes = cameFrom;
  } else {
    pathNodes = [];
    while (curNode != startNodePos) {
      let node = document.getElementById(curNode);
      pathNodes.unshift(node);
      curNode = cameFrom[curNode];
    }
    pathNodes.unshift(document.getElementById(curNode));
  }
  if (draw) {
    for (let i = 0; i < pathNodes.length; i++) {
      window.setTimeout(() => {
        if (!bombAdded) {
          pathNodes[i].classList.replace("visited", "path");
        } else {
          if (pathNodes[i].classList.contains("visited")) {
            pathNodes[i].classList.replace("visited", "path");
          } else {
            pathNodes[i].classList.replace("bomb-visited", "bomb-path");
          }
        }
        if(i!==0 && i != pathNodes.length-1){
          pathNodes[i].appendChild(pathHead);
          if(parseInt(prevNode.dataset.x) < parseInt(pathNodes[i].dataset.x)){
            pathHead.style.transform = 'translate(-50%, -50%) rotate(0deg)';
          }else if(parseInt(prevNode.dataset.x) > parseInt(pathNodes[i].dataset.x)){
            pathHead.style.transform = 'translate(-50%, -50%) rotate(-180deg)';
          }
          else if(parseInt(prevNode.dataset.y) < parseInt(pathNodes[i].dataset.y)){
            pathHead.style.transform = 'translate(-50%, -50%) rotate(90deg)';
          }
          else{
            pathHead.style.transform = 'translate(-50%, -50%) rotate(-90deg)';
          }
        }
        prevNode = pathNodes[i];
      }, 50 * i);
    }
    window.setTimeout(()=>{
      pathHead.remove();
    },50*pathNodes.length)
  } else {
    return pathNodes;
  }
  if (bombAdded === true && draw === true) {
    if (document.getElementById(startNodePos).classList.contains("have-bomb")) {
      window.setTimeout(() => {
        startAllFunctions();
      }, 50 * pathNodes.length);
    }
  } else {
    window.setTimeout(() => {
      startAllFunctions();
    }, 50 * pathNodes.length);
  }
}
function drawTheMaze(visOrder, numOfAllVisitedNodes) {
  //draw the border first
  //top border
  for (let i = 0; i < numOfCols; i++) {
    let node = gridArr[0][i];
    if (
      node.classList.contains("have-start") ||
      node.classList.contains("have-target") ||
      node.classList.contains("have-bomb")
    ) {
      continue;
    }
    window.setTimeout(() => {
      node.classList.add("wall");
    }, 10 * i);
  }
  //right border
  window.setTimeout(() => {
    for (let i = 0; i < numOfRows; i++) {
      let node = gridArr[i][numOfCols - 1];
      if (
        node.classList.contains("have-start") ||
        node.classList.contains("have-target") ||
        node.classList.contains("have-bomb")
      ) {
        continue;
      }
      window.setTimeout(() => {
        node.classList.add("wall");
      }, 10 * i);
    }
  }, numOfCols * 10);
  //bottom border
  window.setTimeout(() => {
    for (let i = numOfCols - 1; i >= 0; i--) {
      let node = gridArr[numOfRows - 1][i];
      if (
        node.classList.contains("have-start") ||
        node.classList.contains("have-target") ||
        node.classList.contains("have-bomb")
      ) {
        continue;
      }
      window.setTimeout(() => {
        node.classList.add("wall");
      }, 10 * Math.abs(i - numOfCols));
    }
  }, (numOfCols + numOfRows) * 10);
  //right border
  window.setTimeout(() => {
    for (let i = numOfRows - 1; i >= 0; i--) {
      let node = gridArr[i][0];
      if (
        node.classList.contains("have-start") ||
        node.classList.contains("have-target") ||
        node.classList.contains("have-bomb")
      ) {
        continue;
      }
      window.setTimeout(() => {
        node.classList.add("wall");
      }, 10 * Math.abs(i - numOfRows));
    }
  }, (numOfCols + numOfRows + numOfCols) * 10);
  //start drawing the maze
  window.setTimeout(() => {
    let timeToFinish = 0;
    for (let i = 0; i < visOrder.length; i++) {
      let [dir, [row, col, stop]] = visOrder[i];
      let numOfNodesToVisite;
      dir === "col"
        ? (numOfNodesToVisite = stop - row)
        : (numOfNodesToVisite = stop - col);
      timeToFinish += numOfNodesToVisite;
      window.setTimeout(() => {
        let [dir, [row, col, stop]] = visOrder[i];
        if (dir === "col") {
          let randomNodeToSkip = Math.floor(Math.random() * (stop - row) + row);
          while (randomNodeToSkip % 2 === 0) {
            randomNodeToSkip = Math.floor(Math.random() * (stop - row) + row);
          }
          for (let i = row; i < stop; i++) {
            let node = gridArr[i][col];
            if (
              node.classList.contains("have-start") ||
              node.classList.contains("have-target") ||
              node.classList.contains("have-bomb") ||
              i === randomNodeToSkip
            ) {
              continue;
            }
            window.setTimeout(() => {
              node.classList.add("wall");
            }, 10 * i);
          }
        } else {
          let randomNodeToSkip = Math.floor(Math.random() * (stop - col) + col);
          while (randomNodeToSkip % 2 === 0) {
            randomNodeToSkip = Math.floor(Math.random() * (stop - col) + col);
          }
          for (let i = col; i < stop; i++) {
            let node = gridArr[row][i];
            if (
              node.classList.contains("have-start") ||
              node.classList.contains("have-target") ||
              node.classList.contains("have-bomb") ||
              i === randomNodeToSkip
            ) {
              continue;
            }
            window.setTimeout(() => {
              node.classList.add("wall");
            }, 10 * i);
          }
        }
      }, timeToFinish * 10);
    }
    window.setTimeout(() => {
      startAllFunctions();
    }, numOfAllVisitedNodes * 10);
  }, (numOfCols + numOfRows - 5) * 2 * 10);
}
export {
  gridArr,
  startNodePos,
  targetNodePos,
  numOfRows,
  numOfCols,
  startVisAnimation,
  drawShortedPath,
  drawTheMaze,
};
