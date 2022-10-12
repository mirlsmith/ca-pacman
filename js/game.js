'use strict'

const WALL = '|'
const FOOD = '⚬'
const SUPER_FOOD = '🔘'
const EMPTY = ''

var gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gCherryIntervalID = setInterval(placeCherry, 15000)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD  

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

            if ((i === 1 && j === 1) || 
                (i === 1 && j === SIZE -2) ||
                (i === SIZE -2 && j === 1) ||
                (i === SIZE -2 && j === SIZE -2)
            ) board[i][j] = SUPER_FOOD
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(isVictory) {
    const gameOverMsg = (isVictory) ? 'You Did It!!' : 'Sorry, Try Agian Next Time!'
    const elGameOver = document.querySelector('.game-over')
    elGameOver.querySelector('span').innerText = gameOverMsg
    elGameOver.hidden = false
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalID)
}

function onPlayAgain() {
    updateScore(-gGame.score)
    document.querySelector('.game-over').hidden = true
    init()
}