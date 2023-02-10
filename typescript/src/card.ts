import { Suit } from "./suit";
export class Card {
  //if rank is 1, value will be 11. If not, normal rank
  private value: number = this.rank === 1 ? 11 : this.rank;
  constructor(public readonly rank: number, private readonly suit: Suit) {}

  public get Suit() {
    return this.suit;
  }


  // 2. Returns cards with rank (11)Jack, (12)Queen, (13) King and (1)Ace as J, Q, K, A
  public get CardLetter() {
    if(this.rank === 13) {
      return "K" 
    }
    if(this.rank === 12) {
      return "Q" 
    }
    if(this.rank === 11) {
      return "J" 
    }
    if(this.rank === 1) {
      return "A" 
    }
    return this.rank
  }

  public get Value() {
    return this.value;
  }

  public set Value(newValue: number) {
    this.value = newValue;
  }
}
