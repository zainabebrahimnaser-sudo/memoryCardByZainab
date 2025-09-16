document.addEventListener("DOMContentLoaded", () => {
  // Game state variables
  let cards = []
  let flippedCards = []
  let matchedPairs = 0
  let moves = 0
  let gameStarted = false
  let timer = 0
  let timerInterval

  // DOM elements
  const gameBoard = document.getElementById("gameBoard")
  const movesCount = document.getElementById("movesCount")
  const timeDisplay = document.getElementById("time")
  const resetBtn = document.getElementById("resetBtn")
  const winMessage = document.getElementById("winMessage")
  const finalMoves = document.getElementById("finalMoves")
  const finalTime = document.getElementById("finalTime")
  const playAgainBtn = document.getElementById("playAgain")

  // Card symbols (8 pairs)
  const cardSymbols = ["🐼", "🐨", "🐻‍❄️", "🐰", "🐭", "🐢", "🕊️", "🍇"]

  // Initialize the game
  initGame()

  // Initialize game function
  function initGame() {
    // Reset game state
    cards = []
    flippedCards = []
    matchedPairs = 0
    moves = 0
    timer = 0
    gameStarted = false
    clearInterval(timerInterval)

    // Update UI
    movesCount.textContent = moves
    timeDisplay.textContent = timer
    winMessage.style.display = "none"

    // Create card pairs
    const gameCards = []
    cardSymbols.forEach((symbol) => {
      gameCards.push(symbol)
      gameCards.push(symbol)
    })

    // Shuffle cards
    shuffleArray(gameCards)

    // Clear game board
    gameBoard.innerHTML = ""

    // Create card elements
    gameCards.forEach((symbol, index) => {
      const card = document.createElement("div")
      card.className = "card"
      card.dataset.index = index
      card.dataset.value = symbol

      card.innerHTML = `
                        <div class="card-back"></div>
                        <div class="card-front">${symbol}</div>
                    `

      card.addEventListener("click", () => flipCard(card))
      gameBoard.appendChild(card)
      cards.push(card)
    })
  }

  // Flip card function
  function flipCard(card) {
    // If card is already matched or flipped, do nothing
    if (
      card.classList.contains("matched") ||
      flippedCards.length >= 2 ||
      flippedCards.includes(card)
    ) {
      return
    }

    // Start timer on first card flip
    if (!gameStarted) {
      startTimer()
      gameStarted = true
    }

    // Flip the card
    card.classList.add("flipped")
    flippedCards.push(card)

    // Check for match if two cards are flipped
    if (flippedCards.length === 2) {
      moves++
      movesCount.textContent = moves

      setTimeout(checkForMatch, 500)
    }
  }

  // Check for a match
  function checkForMatch() {
    const [card1, card2] = flippedCards
    const isMatch = card1.dataset.value === card2.dataset.value

    if (isMatch) {
      card1.classList.add("matched")
      card2.classList.add("matched")
      matchedPairs++

      // Check for win
      if (matchedPairs === cardSymbols.length) {
        endGame()
      }
    } else {
      card1.classList.remove("flipped")
      card2.classList.remove("flipped")
    }

    flippedCards = []
  }

  // Start timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++
      timeDisplay.textContent = timer
    }, 1000)
  }

  // End game
  function endGame() {
    clearInterval(timerInterval)
    finalMoves.textContent = moves
    finalTime.textContent = timer
    setTimeout(() => {
      winMessage.style.display = "flex"
    }, 1000)
  }

  // Reset game
  resetBtn.addEventListener("click", initGame)
  playAgainBtn.addEventListener("click", initGame)

  // Utility function to shuffle array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
})
