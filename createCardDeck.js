/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

const getDeck = () => {
    const NUMBER_OF_CARD_PER_SUIT = 13;
    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    const displayVals = ['', '2', '3', '4', '5', '6', '7', 
                        '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']

    const deck = []

    for(let i=0; i<suits.length; i++) {
        
        for (let j=1; j<=NUMBER_OF_CARD_PER_SUIT; j++)
        {
            const card = {
                val: j,
                displayVal: displayVals[j],
                suit: suits[i]
            }

            if (displayVals[j] === 'Ace') {
                card.val = 11
            }

            deck.push(card);
        }
    }

    return deck;
}

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal = randomCard && randomCard.value && typeof randomCard.value === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal = randomCard && randomCard.faceValue && typeof randomCard.faceValue === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)

console.log(deck)