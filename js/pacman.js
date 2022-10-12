'use strict'

const PACMAN = '🙂';
const DEAD = '😵';
var gPacman;

var superStateIntervalID

function createPacman(board) {
    gPacman = {
        location: {
            i: Math.floor((gBoard.length - 1) / 2),
            j: Math.floor((gBoard[0].length - 1) / 2)
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            //kill the ghost
            killGhost(nextLocation.i, nextLocation.j)
        } else {
            gBoard[gPacman.location.i][gPacman.location.j] = DEAD
            renderCell(gPacman.location, DEAD)
            gameOver(false)
            return
        }
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        superState()
        superStateIntervalID = setInterval(superState, 5000)
    }

    if (nextCell === FOOD) updateScore(1)

    if (nextCell === CHERRY) updateScore(10)

    //remove pacman from current location
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    //move pacman to new location
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)

    if (isVictory()) gameOver(true)

}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function isVictory() {
    // debugger
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) return false
        }
    }
    return true
}

function superState() {
    gPacman.isSuper = !gPacman.isSuper

    if (!gPacman.isSuper) { //reset things back to normal
        clearInterval(superStateIntervalID)
        for (let i = 0; i < gGhosts.length; i++) {
            const currGhost = gGhosts[i]
            currGhost.color = getRandomColor()
            renderCell(currGhost.location, getGhostHTML(currGhost))
        }

    }
    else { //make things in super mode
        for (let i = 0; i < gGhosts.length; i++) {
            const currGhost = gGhosts[i]
            currGhost.color = 'purple'
            renderCell(currGhost.location, getGhostHTML(currGhost))

        }
    }
}