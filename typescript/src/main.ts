import { Card } from "./card";
import { Deck } from "./deck";
import readline from "readline-promise";
const readConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const blackJack = (deck: Deck, player: Array<Card | undefined>) => {
  var total = player.reduce((total, card) => total + (card?.Value || 0), 0);
  while(total > 21){
    //finds ace with value of 11
    const ace = player.find( card => card?.CardValue === 'A' && card?.Value === 11)
    //if no ace, break
    if(!ace){
      break;
    } 
    //sets ace value to 1
    ace.Value = 1
    //calculates updated total with new ace values
    total = player.reduce((total, card) => total + (card?.Value || 0), 0);
  }  

  return total

}

async function main(whenFinished: () => void) {
  const deck = new Deck();
  const hand = new Array<Card | undefined>();
  const dealer  = new Array<Card | undefined>();

  let playing = true;
  //4. Cards put in randomized order
  deck.cards.sort(function () { return 0.5 - Math.random();})
  //Dealer is given a card at beginning of round
  var dealerCard = deck.cards.pop();
  dealer.push(dealerCard);

  console.log(`Dealer's card is ${dealerCard?.Suit} ${dealerCard?.CardValue}`)
  //var count = 0;
  while (playing) {
    var card = deck.cards.pop();

  //TEST for ace edge case (ex. A, A, 10 ==> 12 in stead of 22(1+11+10))
   /*  var card = deck.cards.find( card => card?.CardLetter === 'A')
    if(count > 1){
      card = deck.cards.find( card => card?.rank === 10)
    }
    count = count + 1;
    deck.cards = deck.cards.filter(item => item !== card)
    */

    hand.push(card); 
    var total = blackJack(deck, hand)
    console.log(`Player hit with ${card?.Suit} ${card?.CardValue}. Total is ${total}`);
    //1. If player's total over 21, break 
    if (total>21){
      console.log("Player lost")
      break;
    }
    //5. dealer plays
    await readConsole.questionAsync("Stand, Hit (s/h) \n").then((read) => {
      if (read !== "h") {
        let dealerPlaying = true;
        //Dealer draws a card until they have 17 points or more
        while(dealerPlaying){
          dealerCard = deck.cards.pop();
          dealer.push(dealerCard);
          var dealerTotal = blackJack(deck, dealer)
          console.log(`Dealer hit with ${dealerCard?.Suit} ${dealerCard?.CardValue}. Total is ${dealerTotal}`);
          if (dealerTotal > 16){
            break;
          }
        }
        //6. Game announces which party won
        const difference = dealerTotal-total;
        if(dealerTotal>21 || difference < 0){
          console.log("Player won");
        }
        else if (difference === 0) {
          console.log("It's a tie")
        }
        else{
          console.log("Dealer won");
        }

        playing = false;
      }
    });
  }
  whenFinished();
}

main(() => {
  process.exit();
});
