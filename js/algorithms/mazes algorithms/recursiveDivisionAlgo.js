//import the grid arrary :
import { drawTheMaze, gridArr, numOfCols, numOfRows } from "../../visScript.js";
//algorithms functions:
//we calls the function in main file from startAlgoBtn, and take a startNodePos, targetNodePos.
//recursiveDivisionMazeGenerator algorithm:
function recursiveDivisionMazeGenerator() {
  let visOrder = [];
  function backtrack(rowStart, rowEnd, colStart, colEnd, dividePos) {
    if (dividePos === "vertical") {
      if (colEnd - colStart >= 4) {
        let divideCol = Math.floor((colEnd + colStart) / 2);
        // let divideCol = Math.floor(Math.random()*(colEnd-colStart)+colStart);
        if (divideCol % 2 !== 0) {
          divideCol += 1;
        }
        visOrder.push(["col", [rowStart, divideCol, rowEnd]]);
        backtrack(rowStart, rowEnd, colStart, divideCol, "horizontal");
        backtrack(rowStart, rowEnd, divideCol, colEnd, "horizontal");
      }
      return;
    } else {
      if (rowEnd - rowStart >= 4) {
        let divideRow = Math.floor((rowEnd + rowStart) / 2);
        // let divideRow = Math.floor(Math.random()*(rowEnd - rowStart)+rowStart);
        if (divideRow % 2 !== 0) {
          divideRow += 1;
        }
        visOrder.push(["row", [divideRow, colStart, colEnd]]);
        backtrack(rowStart, divideRow, colStart, colEnd, "vertical");
        backtrack(divideRow, rowEnd, colStart, colEnd, "vertical");
      }
      return;
    }
  }
  backtrack(1, numOfRows - 1, 1, numOfCols - 1, "vertical");
  let numOfAllVisitedNodes = 0;
  visOrder.forEach((range) => {
    let [dir, [row, col, stop]] = range;
    dir === "col"
      ? (numOfAllVisitedNodes += stop - row)
      : (numOfAllVisitedNodes += stop - col);
  });
  drawTheMaze(visOrder, numOfAllVisitedNodes);
}
export { recursiveDivisionMazeGenerator };
