const input = require("@mimo-org/input");

let winner;

const cards = [{
  rank: '2',
  value: 2
}, {
  rank: '3',
  value: 3
}, {
  rank: '4',
  value: 4
}, {
  rank: '5',
  value: 5
}, {
  rank: '6',
  value: 6
}, {
  rank: '7',
  value: 7
}, {
  rank: '8',
  value: 8
}, {
  rank: '9',
  value: 9
}, {
  rank: '10',
  value: 10
}, {
  rank: 'J',
  value: 10
}, {
  rank: 'Q',
  value: 10
}, {
  rank: 'K',
  value: 10
}, {
  rank: 'A',
  value: 11
}];

function drawCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

function calculateHandValue(hand) {
  let value = 0;
  let aceCount = 0;

  for (let card of hand) {
    value += card.value;
    if (card.rank === 'A') {
      aceCount += 1;
    }
  }

  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }

  return value;
}

function displayHand(hand) {
  let ranks = '';

  for (let i = 0; i < hand.length; i++) {
    ranks += hand[i].rank;
    if (i < hand.length - 1) {
      ranks += ', ';
    }
  }

  console.log(`Your hand: ${ranks}`);
}

function displayDealerHand(hand, firstCardOnly) {
  let ranks = '';

  if (firstCardOnly) {
    ranks = hand[0].rank + ', ?';
  } else {
    for (let i = 0; i < hand.length; i++) {
      ranks += hand[i].rank;
      if (i < hand.length - 1) {
        ranks += ', ';
      }
    }
  }

  console.log(`Dealer's hand: ${ranks}`);
}

let playerHand = [drawCard(), drawCard()];
let dealerHand = [drawCard(), drawCard()];
let playerValue = calculateHandValue(playerHand);
let dealerValue = calculateHandValue(dealerHand);
displayHand(playerHand);
console.log(`Your score: ${playerValue}`);
displayDealerHand(dealerHand, true);

while (playerValue < 21) {
  const action = input('Do you want to (h)it or (s)tand? ');
  if (action === 'h') {
    playerHand.push(drawCard());
    playerValue = calculateHandValue(playerHand);
    displayHand(playerHand);
    console.log(`Your score: ${playerValue}`);
  } else if (action === 's') {
    break;
  } else {
    console.log('Invalid input, please choose "h" to hit or "s" to stand.');
  }
}

console.log(`Your final score: ${playerValue}`);

if (playerValue > 21) {
  console.log('You bust! Dealer wins.');
  winner = "Dealer";
} else {
  while (dealerValue < 17) {
    dealerHand.push(drawCard());
    dealerValue = calculateHandValue(dealerHand);
  }
}
if (dealerValue > 21 || playerValue > dealerValue) {
  winner = "Player";
} else if (playerValue < dealerValue) {
  winner = "Dealer";
} else {
  winner = "Tie";
}

console.log(`Winner: ${winner}`);