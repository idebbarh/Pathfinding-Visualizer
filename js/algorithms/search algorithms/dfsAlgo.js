//import the grid arrary :
import {
    gridArr,
    numOfCols,
    numOfRows,
    startVisAnimation,
  } from "../../visScript.js";
  //algorithms functions:
  //bfsAlgo algorithm:
  function dfsAlgo(startNodePos, targetNodePos, bombAdded,draw) {
    //our queue data structer
    //to check if we visite the node or not
    let visited = new Set();
    //the visiting order of the nodes.
    let nodesOrder = [];
    //get the start node pos.
    let col = parseInt(startNodePos.split("-")[1]);
    let row = parseInt(startNodePos.split("-")[2]);
    //to keep track the prev node
    let cameFrom = {};
    //to see if the target is foundet or not.
    let breaker = false;
    //add the start node to our queue and set.
    //start algorithm.
    function dfs(curNode){
        if(curNode.id === targetNodePos){
            visited.add(curNode);
            nodesOrder.push(curNode.id)
            breaker = true;
        }
        if(breaker === true){
            return
        }
        visited.add(curNode);
        nodesOrder.push(curNode.id)
        let colOfCurNode = parseInt(curNode.dataset.x);
        let rowOfCurNode = parseInt(curNode.dataset.y);
        //#top neibor
        if (rowOfCurNode > 0) {
        let nextNode = gridArr[rowOfCurNode - 1][colOfCurNode];
            if(!visited.has(nextNode) && !nextNode.classList.contains("wall")){
                cameFrom[nextNode.id] = curNode.id;
                dfs(nextNode);
            }
        }
        //right neighbor
        if (colOfCurNode < numOfCols - 1) {
            let nextNode = gridArr[rowOfCurNode][colOfCurNode + 1];
            if(!visited.has(nextNode) && !nextNode.classList.contains("wall")){
                cameFrom[nextNode.id] = curNode.id;
                dfs(nextNode);
            }
            }
        //#bottom neibor
        if (rowOfCurNode < numOfRows - 1) {
            let nextNode = gridArr[rowOfCurNode + 1][colOfCurNode];
            if(!visited.has(nextNode) && !nextNode.classList.contains("wall")){
                cameFrom[nextNode.id] = curNode.id;
                dfs(nextNode);
            }
            }
        //left neighbor
        if (colOfCurNode > 0) {
            let nextNode = gridArr[rowOfCurNode][colOfCurNode - 1];
            if(!visited.has(nextNode) && !nextNode.classList.contains("wall")){
                cameFrom[nextNode.id] = curNode.id;
                dfs(nextNode);
            }
            }
        return
    }
    dfs(gridArr[row][col]);
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
  export { dfsAlgo };
  