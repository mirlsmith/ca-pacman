'use strict'

const GHOST = '&#9781;'

var gGhosts = []
var gIntervalGhosts

function createGhost(board) {
    const ghost = {
        location: {
            i: Math.floor((gBoard.length - 1) / 3),
            j: Math.floor((gBoard[0].length - 1) / 3)
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === CHERRY) return
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            //kill the ghost
            killGhost(ghost.location.i, ghost.location.j)//SOMETHING HERE IS NOT WORKING PROPERLY
        } else {
            gBoard[gPacman.location.i][gPacman.location.j] = DEAD
            renderCell(gPacman.location, DEAD)
            gameOver(false)
            return
        }
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}

function killGhost(i, j) {
    var deadGhost
    for (var idx = 0; idx < gGhosts.length; idx++) {
        const currGhost = gGhosts[idx]
        if (currGhost.location.i === i && currGhost.location.j === j) {
            const ghostIdx = gGhosts.indexOf(currGhost)
            deadGhost = gGhosts.splice(ghostIdx, 1)
            idx = gGhosts.length
        }
    }
    // model
    gBoard[deadGhost[0].location.i][deadGhost[0].location.j] = deadGhost[0].currCellContent

    // DOM
    renderCell(deadGhost[0].location, deadGhost[0].currCellContent)

    if (!gGhosts.length) gameOver(true)
}