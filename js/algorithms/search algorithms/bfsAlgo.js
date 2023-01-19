//import the grid arrary :
import {
    gridArr,
    numOfCols,
    numOfRows,
    startVisAnimation,
  } from "../../visScript.js";
  //algorithms functions:
  function getNodeNeighbors(colOfCurNode,rowOfCurNode){
          let neighbors = [];
         //#top neibor
         if (rowOfCurNode > 0) {
          let nextNode = gridArr[rowOfCurNode - 1][colOfCurNode];
            neighbors.push(nextNode);
        }
        //#bottom neibor
        if (rowOfCurNode < numOfRows - 1) {
          let nextNode = gridArr[rowOfCurNode + 1][colOfCurNode];
            neighbors.push(nextNode);
        }
        //left neighbor
        if (colOfCurNode > 0) {
          let nextNode = gridArr[rowOfCurNode][colOfCurNode - 1];
            neighbors.push(nextNode);
        }
        //right neighbor
        if (colOfCurNode < numOfCols - 1) {
          let nextNode = gridArr[rowOfCurNode][colOfCurNode + 1];
            neighbors.push(nextNode);
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
  //we calls the function in main file from startAlgoBtn, and take a startNodePos, targetNodePos.
  //bfsAlgo algorithm:
  function bfsAlgo(startNodePos, targetNodePos, bombAdded,draw) {
    //our queue data structer
    let queue = [];
    //to check if we visite the node or not
    let closedList = new Set();
    //the visiting order of the nodes.
    let nodesOrder = [];
    //get the start node pos.
    let col = parseInt(startNodePos.split("-")[1]);
    let row = parseInt(startNodePos.split("-")[2]);
    //to break the loop when we find the target:
    let breaker = false;
    //to keep track the prev node
    let cameFrom = {};
    //add the start node to our queue and set.
    queue.push(gridArr[row][col]);
    closedList.add(gridArr[row][col]);
    //start algorithm.
    while (queue.length > 0 && !breaker) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let node = queue.shift();
        let colOfCurNode = parseInt(node.dataset.x);
        let rowOfCurNode = parseInt(node.dataset.y);
        nodesOrder.push(node.id);
        if (node.id === targetNodePos) {
          breaker = true;
          break;
        }
        //#get neighbors from getNodeNeighbors function
        let neighbors = getNodeNeighbors(colOfCurNode,rowOfCurNode);
        neighbors.forEach(neighbor=>{
          if (!closedList.has(neighbor) && !neighbor.classList.contains("wall")) {
            queue.push(neighbor);
            cameFrom[neighbor.id] = node.id;
            closedList.add(neighbor);
          }
        })
      }
    }
    //call the start vis function and pass it in the nodesOrder and cameFrom.
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
  export { bfsAlgo };
  