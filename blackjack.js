// const blackjackDeck = getDeck();

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
 class CardPlayer {
    constructor(name) {
        this.name = name;
        this.deck = [];
        this.hand = [];
    }

    drawCard() {
        const LOWEST_CARD = 0
        const HIGHEST_CARD = 51

        const deck = getDeck();
        const cardIndex = Math.floor(Math.random() * (HIGHEST_CARD - LOWEST_CARD + 1) + LOWEST_CARD)
        console.log(`cardIndex: ${cardIndex}`);
        const card = deck[cardIndex];
        console.log(`card:  {${card.val}, ${card.displayVal}, ${card.suit}}`)

        this.hand.push(card)

        return card;
    }
 }

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Dealer");
const player = new CardPlayer("Player");

dealer.drawCard();

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
function calcPoints(hand) {
    let total = 0;
    let hasAce = false;
    let aceCount = 0;
  
    // Calculate the total points of the hand and check for Aces
    for (card of hand) {
      total += card.val;
      if (card.displayVal === 'Ace') {
        hasAce = true;
        aceCount++;
      }
    }
  
    // Account to the number of aces in the hand and their value
    while(aceCount > 0) {
        if(hasAce && total > 21) {
            total -= 10;
            aceCount--;
        }
        else {
            break;
        }
    }

    // Determine if the hand is "soft"
    const isSoft = hasAce && aceCount > 0;
  
    return { total, isSoft };
  }

// Example usage:
const hand1 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' },
    //{ val: 11, displayVal: 'Ace', suit: 'Spades' },
];

const result = calcPoints(hand1);
console.log(result); // { total: 21, isSoft: true }

const hand2 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 11, displayVal: 'Ace', suit: 'Hearts' }
  ];
  
  const result2 = calcPoints(hand2);
  console.log(result2); // { total: 12, isSoft: true }

const hand3 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 11, displayVal: 'Ace', suit: 'Hearts' },
    { val: 10, displayVal: '10', suit: 'Diamonds' }
];

const result3 = calcPoints(hand3);
console.log(result3); // { total: 12, isSoft: false }

const hand4 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 11, displayVal: 'Ace', suit: 'Hearts' },
    { val: 9, displayVal: '10', suit: 'Diamonds' }
];

const result4 = calcPoints(hand4);
console.log(result4); // { total: 12, isSoft: false }

const hand5 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 11, displayVal: 'Ace', suit: 'Diamonds' },
    { val: 11, displayVal: 'Ace', suit: 'Hearts' },
    { val: 8, displayVal: '10', suit: 'Diamonds' }
];

const result5 = calcPoints(hand5);
console.log(result5); // { total: 12, isSoft: false }

const hand6 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 11, displayVal: 'Ace', suit: 'Diamonds' },
    { val: 11, displayVal: 'Ace', suit: 'Hearts' },
    { val: 9, displayVal: '10', suit: 'Diamonds' },
    { val: 10, displayVal: '10', suit: 'Diamonds' }
];

const result6 = calcPoints(hand6);
console.log(result6); // { total: 12, isSoft: false }

// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
    // - If the dealer's hand is 16 points or less, the dealer must draw another card
    // - If the dealer's hand is exactly 17 points, and the dealer has an Ace valued at 11, the dealer must draw another card
    // - Otherwise if the dealer's hand is 17 points or more, the dealer will end her turn
    
    // if total < 16
    //     return true
    // else if total is 17 && dealer has an ace valued at 11
    //     return true
    // else if total >= 17
    //     return false
    const result = calcPoints(dealerHand)
    console.log(`dealerResult: ${result.total}, ${result.isSoft}`)
    if (result.total < 16) {
        return true;
    } else if (result.total === 17 && result.isSoft) {
        return true;
    } else if (result.total >= 17) {
        return false;
    }
}

// Check total < 16
const dealerhand1 = [
    { val: 2, displayVal: '2', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' },
];

const dealershouldDrawResult1 = dealerShouldDraw(dealerhand1);
console.log(`dealershouldDrawResult1: ${dealershouldDrawResult1}`);

const dealerhand2 = [
    { val: 6, displayVal: '6', suit: 'Spades' },
    { val: 11, displayVal: 'Ace', suit: 'Hearts' }
];

const dealershouldDrawResult2 = dealerShouldDraw(dealerhand2);
console.log(`dealershouldDrawResult2: ${dealershouldDrawResult2}`);

const dealerhand3 = [
    { val: 7, displayVal: '6', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' }
];

const dealershouldDrawResult3 = dealerShouldDraw(dealerhand3);
console.log(`dealershouldDrawResult3 ${dealershouldDrawResult3}`);

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerHand, dealerHand) => {
    const dealerScore = calcPoints(dealerHand).total;
    const playerScore = calcPoints(playerHand).total;

    if (dealerScore === 21 && playerScore === 21)
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Tie!}`
    else if (dealerHand.length === 2 && dealerScore === 21)
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Dealer Wins!}`;
    else if (playerHand.length === 2 && playerScore === 21)
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Player Wins!}`;
    else if (playerScore > 21 && dealerScore > 21) {
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Tie!}`
    } else if (playerScore > 21) {
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Dealer Wins!}`
    } else if (dealerScore > 21) {
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Player Wins!}`
    } else if (playerScore > dealerScore) {
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Player Wins!}`
    } else if (dealerScore > playerScore) {
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Dealer Wins!}`
    } else {
        return `{Player: ${playerScore}, Dealer: ${dealerScore}, Tie!}`
    }
}

// Test case 1 (i.e. dealerScore === 21 && playerScore === 21)
const playerHand4 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand4 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 1: ${determineWinner(playerHand4, dealerHand4)}`)

// Test Case 2 (i.e. dealerHand.length === 2 && dealerScore === 21)
const playerHand5 = [
    { val: 7, displayVal: '6', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' }
];
const dealerHand5 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 2: ${determineWinner(playerHand5, dealerHand5)}`)

// Test Case 3 (i.e. playerHand.length === 2 && playerScore === 21)
const playerHand6 = [
    { val: 11, displayVal: 'Ace', suit: 'Spades' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand6 = [
    { val: 8, displayVal: '8', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 3: ${determineWinner(playerHand6, dealerHand6)}`)

// Test Case 4 (i/e/ playerScore > 21 && dealerScore > 21)
const playerHand7 = [
    { val: 2, displayVal: '2', suit: 'Spades' },
    { val: 10, displayVal: 'King', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand7 = [
    { val: 2, displayVal: '2', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 4: ${determineWinner(playerHand7, dealerHand7)}`)

// Test case 5 (i.e. playerScore > 21)
const playerHand8 = [
    { val: 2, displayVal: '2', suit: 'Spades' },
    { val: 10, displayVal: 'King', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand8 = [
    { val: 10, displayVal: '10', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 5: ${determineWinner(playerHand8, dealerHand8)}`)

// Test case 6 (i.e. dealerScore > 21)
const playerHand9 = [
    { val: 10, displayVal: 'King', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand9 = [
    { val: 2, displayVal: '2', suit: 'Spades' },
    { val: 10, displayVal: '10', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 6 ${determineWinner(playerHand9, dealerHand9)}`)

// Test case 7 (i.e. playerScore > dealerScore)
const playerHand10 = [
    { val: 9, displayVal: 'King', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand10 = [
    { val: 7, displayVal: '7', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 7 ${determineWinner(playerHand10, dealerHand10)}`)

// Test case 8 (i.e. dealerScore > playerScore)
const playerHand11 = [
    { val: 7, displayVal: '7', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand11 = [
    { val: 9, displayVal: '9', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 8: ${determineWinner(playerHand11, dealerHand11)}`)

// Test case 9 (i.e. dealerScore == playerScore)
const playerHand12 = [
    { val: 7, displayVal: '7', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
const dealerHand12 = [
    { val: 7, displayVal: '7', suit: 'Hearts' },
    { val: 10, displayVal: 'King', suit: 'Hearts' }
];
console.log(`determineWinner, Winner 9: ${determineWinner(playerHand12, dealerHand12)}`)

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
const getMessage = (count, dealerCard) => {
    return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
const showHand = (player) => {
    const displayHand = player.hand.map((card) => card.displayVal);
    const score = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`
    console.log(score);
    document.getElementById("scores").innerHTML = score;
}

// /**
//  * Runs Blackjack Game
//  */
const startGame = function() {
    let card = player.drawCard();
    Object.keys(card).forEach(key => {
        console.log(`${key}: ${card[key]}`)
    });
    card = dealer.drawCard();
    Object.keys(card).forEach(key => {
        console.log(`${key}: ${card[key]}`)
    });
    card = player.drawCard();
    Object.keys(card).forEach(key => {
        console.log(`${key}: ${card[key]}`)
    });
    card = dealer.drawCard();
    Object.keys(card).forEach(key => {
        console.log(`${key}: ${card[key]}`)
    });

    let playerScore = calcPoints(player.hand).total;
    showHand(player);
    while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
        player.drawCard();
        playerScore = calcPoints(player.hand).total;
        showHand(player);
    }
    if (playerScore > 21) {
        return 'You went over 21 - you lose!';
    }
    console.log(`Player stands at ${playerScore}`);

    let dealerScore = calcPoints(dealer.hand).total;
    while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
        dealer.drawCard();
        dealerScore = calcPoints(dealer.hand).total;
        showHand(dealer);
    }
    if (dealerScore > 21) {
        return 'Dealer went over 21 - you win!';
    }
    console.log(`Dealer stands at ${dealerScore}`);

    return determineWinner(player.hand, dealer.hand);
}

console.log(startGame());