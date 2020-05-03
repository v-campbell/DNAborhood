const STRANDLENGTH = 6;
const NUMHIDDEN = 4;
const nucleotides = "ATCG";
class Board{
  constructor(){
    this.strands = [];
    this.hiddenStrands = [];
    this.poss = [];
    this.setupStrands();
    this.hideStrands();
  }
  setupStrands() {
    let topStrand = [];
    let bottomStrand = [];
    for (let i = 0; i < STRANDLENGTH; i++) {
      topStrand[i] = nucleotides[Math.floor(Math.random() * nucleotides.length)]
    }
    for (let j = 0; j < STRANDLENGTH; j++) {
      if (topStrand[j] === "A") bottomStrand[j] = "T";
      if (topStrand[j] === "T") bottomStrand[j] = "A";
      if (topStrand[j] === "C") bottomStrand[j] = "G";
      if (topStrand[j] === "G") bottomStrand[j] = "C";
    }
    this.strands = [topStrand, bottomStrand];
  }
  hideStrands() {
    const helper = (strand) => {
      let randomNums = [];
      let newStrand = strand.slice();
      while (randomNums.length < NUMHIDDEN) {
        let randomNum = Math.floor(Math.random() * STRANDLENGTH)
        if (randomNums.indexOf(randomNum) === -1) {
          randomNums.push(randomNum)
          this.poss.push(newStrand[randomNum]);
          newStrand[randomNum] = "-"
        }
      }
      return newStrand;
    }
    this.hiddenStrands = [helper(this.strands[0]), helper(this.strands[1])];
    this.shufflePoss();
  }
  shufflePoss() {
    for (let i = this.poss.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.poss[i], this.poss[j]] = [this.poss[j], this.poss[i]];
    }
  }
  receiveGuess(guess) {
    let win = true;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < STRANDLENGTH; j++) {
        if(this.hiddenStrands[i][j] === '-'){
          if (this.strands[i][j] === guess[i][j]) {
            // this.poss[this.poss.indexOf(guess[i][j])] = "-";
            this.poss.splice(this.poss.indexOf(guess[i][j]), 1);
          } else {
            guess[i][j] = "-";
            win = false;
          }
        }
      }
    }
    this.hiddenStrands = guess;
    return win;
  }
}
module.exports = Board;