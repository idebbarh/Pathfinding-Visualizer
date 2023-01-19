//import the grid arrary :
import {
    gridArr,
    numOfCols,
    numOfRows,
    startVisAnimation,
  } from "../../visScript.js";
  //algorithms functions:
  //get node neighbors
  function getNodeNeighbors(colOfCurNode,rowOfCurNode){
          let neighbors = [];
         //#top neibor
         if (rowOfCurNode > 0) {
          let nextNode = gridArr[rowOfCurNode - 1][colOfCurNode];
            neighbors.push(nextNode.id);
        }
        //#bottom neibor
        if (rowOfCurNode < numOfRows - 1) {
          let nextNode = gridArr[rowOfCurNode + 1][colOfCurNode];
            neighbors.push(nextNode.id);
        }
        //left neighbor
        if (colOfCurNode > 0) {
          let nextNode = gridArr[rowOfCurNode][colOfCurNode - 1];
            neighbors.push(nextNode.id);
        }
        //right neighbor
        if (colOfCurNode < numOfCols - 1) {
          let nextNode = gridArr[rowOfCurNode][colOfCurNode + 1];
            neighbors.push(nextNode.id);
        }
        // //top left neighbor
        // if(rowOfCurNode > 0 && colOfCurNode > 0){
        //     let nextNode = gridArr[rowOfCurNode - 1][colOfCurNode - 1];
        //     neighbors.push(nextNode.id);
        // }
        // //top right neighbor
        // if(rowOfCurNode > 0 && colOfCurNode < numOfCols - 1){
        //     let nextNode = gridArr[rowOfCurNode - 1][colOfCurNode + 1];
        //     neighbors.push(nextNode.id);
        // }
        // //bottom left neighbor
        // if(rowOfCurNode < numOfRows-1 && colOfCurNode > 0){
        //     let nextNode = gridArr[rowOfCurNode + 1][colOfCurNode - 1];
        //     neighbors.push(nextNode.id);
        // }
        // //bottom right neighbor
        // if(rowOfCurNode < numOfRows-1 && colOfCurNode < numOfCols-1){
        //     let nextNode = gridArr[rowOfCurNode + 1][colOfCurNode + 1];
        //     neighbors.push(nextNode.id);
        // }
        return neighbors;
  }
  //get distance between two node
  function getDistanceBetween(nodeOne,nodeTwo){
    let nodeOnecol = parseInt(nodeOne.split("-")[1]);
    let nodeOnerow = parseInt(nodeOne.split("-")[2]);
    let nodeTwocol = parseInt(nodeTwo.split("-")[1]);
    let nodeTworow = parseInt(nodeTwo.split("-")[2]);
    let manhattanDis = Math.abs(nodeOnecol-nodeTwocol) + Math.abs(nodeOnerow-nodeTworow);
    return manhattanDis
  }
  //calculate the fCost Of node
  function getFCost(gCost,hCost){
    return gCost+hCost;
  }
  //get node with lowest coast :
  function getNodeWithLowestFCoast(openList){
    let lowestCoast = openList[0];
    let nodeIndex = 0
    openList.forEach((node,index)=>{
        if(node.fCost < lowestCoast.fCost){
            lowestCoast = node;
            nodeIndex = index
        }
    })
    return nodeIndex;
  }
//we calls the function in main file from startAlgoBtn, and take a startNodePos, targetNodePos.
//A* algorithm:
function aStarAlgo(startNodePos, targetNodePos, bombAdded,draw){
    let nodeObj = {};
    let openList = [];
    let closedList = new Set();
    let cameFrom = {};
    let nodesOrder = [];
    let breaker = false;
    gridArr.forEach(row=>{
        row.forEach(node=>{
            nodeObj[node.id] = {
                nodeElem:node,
                gCost:Infinity,
                hCost:Infinity,
                fCost:Infinity,
            }
        })
    })
    nodeObj[startNodePos].gCost = 0;
    nodeObj[startNodePos].hCost = getDistanceBetween(startNodePos,targetNodePos);
    nodeObj[startNodePos].fCost = getFCost(nodeObj[startNodePos].gCost,nodeObj[startNodePos].hCost);
    openList.push(nodeObj[startNodePos]);
    while(openList.length > 0){
        let curNodeIndex = getNodeWithLowestFCoast(openList);
        let curNode = openList[curNodeIndex];
        let colOfCurNode = parseInt(curNode.nodeElem.dataset.x);
        let rowOfCurNode = parseInt(curNode.nodeElem.dataset.y);
        nodesOrder.push(curNode.nodeElem.id);
        if (curNode.nodeElem.id === targetNodePos) {
            breaker = true;
            break;
          }
        closedList.add(curNode);
        let filtredOpenList = openList.filter((node,index)=>{
            return index != curNodeIndex;
        });
        openList = filtredOpenList;
        let neighbors = getNodeNeighbors(colOfCurNode,rowOfCurNode);
        for(let i = 0 ; i < neighbors.length ; i++){
            let neiborNode = nodeObj[neighbors[i]]
            if(closedList.has(neiborNode)){
                continue;
            }
            if(neiborNode.nodeElem.classList.contains("wall")){
                closedList.add(neiborNode);
                continue;
            }
            let tentativeGCoast = curNode.gCost + getDistanceBetween(curNode.nodeElem.id,neiborNode.nodeElem.id);
            if(tentativeGCoast < neiborNode.gCost){
                cameFrom[neiborNode.nodeElem.id] = curNode.nodeElem.id; 
                neiborNode.gCost = tentativeGCoast;
                neiborNode.hCost = getDistanceBetween(neiborNode.nodeElem.id,targetNodePos);
                neiborNode.fCost = getFCost(neiborNode.gCost,neiborNode.hCost);
                if(!openList.includes(neiborNode)){
                    openList.push(neiborNode);
                }
            }
        }
    }
    return [nodesOrder.length,breaker,  startVisAnimation(
      nodesOrder,
      cameFrom,
      startNodePos,
      targetNodePos,
      breaker,
      bombAdded,
      draw
    )];
}
export {aStarAlgo};