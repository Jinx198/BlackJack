const cards = [
  { rank: '2', value: 2 }, { rank: '3', value: 3 }, { rank: '4', value: 4 },
  { rank: '5', value: 5 }, { rank: '6', value: 6 }, { rank: '7', value: 7 },
  { rank: '8', value: 8 }, { rank: '9', value: 9 }, { rank: '10', value: 10 },
  { rank: 'J', value: 10 }, { rank: 'Q', value: 10 }, { rank: 'K', value: 10 },
  { rank: 'A', value: 11 }
];

let playerHand = [];
let dealerHand = [];

function drawCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

function calculateHandValue(hand) {
  let value = 0, aceCount = 0;
  for (let card of hand) {
    value += card.value;
    if (card.rank === 'A') aceCount++;
  }
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount--;
  }
  return value;
}

function displayHands(showDealerSecondCard = false) {
  const output = document.getElementById('output');
  const playerCards = playerHand.map(c => c.rank).join(', ');
  const dealerCards = showDealerSecondCard
    ? dealerHand.map(c => c.rank).join(', ')
    : `${dealerHand[0].rank}, ?`;

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = showDealerSecondCard ? calculateHandValue(dealerHand) : '?';

  output.innerHTML = `
    <p><strong>Player Hand:</strong> ${playerCards} (Value: ${playerValue})</p>
    <p><strong>Dealer Hand:</strong> ${dealerCards} (Value: ${dealerValue})</p>
    ${showDealerSecondCard ? '' : `
      <button onclick="hit()">Hit</button>
      <button onclick="stand()">Stand</button>
    `}
  `;
}

function startGame() {
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  displayHands(false);
}

function hit() {
  playerHand.push(drawCard());
  const playerValue = calculateHandValue(playerHand);
  if (playerValue > 21) {
    endGame();
  } else {
    displayHands(false);
  }
}

function stand() {
  while (calculateHandValue(dealerHand) < 17) {
    dealerHand.push(drawCard());
  }
  endGame();
}

function endGame() {
  const output = document.getElementById('output');
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  let result = '';
  if (playerValue > 21) {
    result = 'You bust! Dealer wins.';
  } else if (dealerValue > 21 || playerValue > dealerValue) {
    result = 'You win!';
  } else if (playerValue < dealerValue) {
    result = 'Dealer wins!';
  } else {
    result = "It's a tie!";
  }

  displayHands(true);
  output.innerHTML += `
    <p><strong>${result}</strong></p>
    <button onclick="startGame()">Play Again</button>
  `;
}
