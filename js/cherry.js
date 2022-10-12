'use strict'

const CHERRY = '🍒'
var gCherryIntervalID


function placeCherry() {

    var placeOpts = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === EMPTY) placeOpts.push({ i: i, j: j })
        }
    }

    if (placeOpts.length){ //we found a spot for a cherry
        var rndIdx = getRandomIntInclusive(0, placeOpts.length - 1)
        var selectedCell = placeOpts[rndIdx]
        
        //model
        gBoard[selectedCell.i][selectedCell.j] = CHERRY
        
        //dom
        renderCell(selectedCell,CHERRY)
    } 
}
