// The function playerHandScore that takes in a string of face cards (Jack, Queen, and King only) and returns the total score of the players hand.

// The cards are represented by the first letter in the name of the card:

// A "K" is 4 points
// A "Q" is 3 points
// A "J" is 2 points
// Example Usage:

// console.log( playerHandScore("K") ); // 4
// console.log( playerHandScore("KJ") ); // 6
// console.log( playerHandScore("KQQ") ); // 10 



function playerHandScore(hand) {
    let score = 0;

    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];

        if (card === "K") {
            score += 4;
        } else if (card === "Q") {
            score += 3;
        } else if (card === "J") {
            score += 2;
        }
    }

    return score;
}

export default playerHandScore;


// This solution uses a loop to iterate over each card in the hand and adds the corresponding points to the total score. 
// If a card is not recognized, it is ignored and doesn't affect the score.



