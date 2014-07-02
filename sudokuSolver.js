/*
Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

For Sudoku rules, see the Wikipedia article.

tests:
var puzzle = [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]];

var puzzle1 = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,0,7,9]];

console.log(solver(puzzle));
*/

function isValid(puzzle) {
    // helper function checkSet checks an array for no duplicates
    // this way we can just send it multiple rows/columns/boxes
    // if it ever returns false we boned if not we continue
    
    // check horizontals
    for( y=0; y < puzzle.length; y++ ) {
        if( !checkSet(puzzle[y]) ) { return false; } //'false hori'; }
    }
    
    // check verticals
    var set = [];
    for( y=0; y < puzzle.length; y++ ) {
        for( x=0; x < puzzle[y].length; x++ ) {
            set.push(puzzle[x][y]);
        }
        if( !checkSet(set) ) { return false; } //'false vert'; }
        set = [];
    }
    
    // flatten array
    var set = [];
    for( y=0; y < puzzle.length; y++ ) {
        for( x=0; x < puzzle[y].length; x++ ) {
            set.push(puzzle[y][x]);
        }
    }
    
    // check boxes
    var box = [];
    var boxCount = 0;
    for( x=0; x < set.length-18; x++ ) {
        box.push(set[x]);
        box.push(set[x+9]);
        box.push(set[x+18]);
        
        if( x % 3 == 2 && x != 0 ) {
            if( !checkSet(box) ) { return false; } //'false box'; }

            boxCount++;
            if( boxCount % 3 == 0 && boxCount != 0 ) {
                x += 18;
            }

            box = [];
        }
    }
    
    return true;
}

function checkSet(set) {
    for(i=0; i < set.length; i++) {
        if( set[i] > 0 ) {
            if( set.lastIndexOf(set[i]) > i ) {
                return false;
            }
        }
    }
    return true;
}

var xsize = 9;
var ysize = 9;
function sudoku(puzzle) {
    // show puzzle
    var str = '';
    for(var y = 0; y < ysize; y++) {
        str += puzzle[y].join('');
    }
    console.log(str);
    
    // base case
    var zeros = false;
    for(var y = 0; y < ysize; y++) {
        for(var x = 0; x < xsize; x++) {
            if(puzzle[y][x] == 0) { var zeros = true; }
        }
        if(zeros) { break; }
    }
    if(!zeros) { return puzzle; }
    
    // recursion!
    for(var y = 0; y < ysize; y++) {
        for(var x = 0; x < xsize; x++) {
            if( puzzle[y][x] == 0 ) {
                for(var k=1; k < 10; k++) {
                    puzzle[y][x] = k;
                    if(isValid(puzzle)) { 
                        var solved = Array.isArray(sudoku(puzzle));
                        if(solved) { return puzzle; }
                    }
                    puzzle[y][x] = 0;
                }
                return false;
            }
        }
    }
    return true;
}