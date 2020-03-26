// import Tile from "./tile";

class Board{
  constructor(){
    this.topStrand = [];
    this.bottomStrand = [];
    this.strands = [];
    this.hiddenTopStrand = [];
    this.hiddenBottomStrand = [];
    this.hiddenStrands = [];
    this.strandLength = 6;
    this.hidden = 4;
    this.hiddenLetters = [];
    this.possibles = [];
    // this.nucleotides = ["A", "T", "C", "G"]
  }

  setupStrands() {
      const nucleotides = "ATCG";
    
      //generate random topStrand
      for (let i = 0; i < this.strandLength; i++) {
        this.topStrand[i] = nucleotides[Math.floor(Math.random() * nucleotides.length)]
      }

      //generate bottomStrand based on topStrand
      for (let j = 0; j < this.strandLength; j++) {
          if (this.topStrand[j] === "A") this.bottomStrand[j] = "T";
          if (this.topStrand[j] === "T") this.bottomStrand[j] = "A";
          if (this.topStrand[j] === "C") this.bottomStrand[j] = "G";
          if (this.topStrand[j] === "G") this.bottomStrand[j] = "C";
      }

      this.strands = [this.topStrand, this.bottomStrand];
  }

  hideRandomStrands(strand) {
    let randomNums = [];
    let newStrand = strand.slice();
    while (randomNums.length < this.hidden) {
      let randomNum = Math.floor(Math.random() * this.strandLength)
      if (randomNums.indexOf(randomNum) === -1) {
        randomNums.push(randomNum)
        this.hiddenLetters.push(newStrand[randomNum]);
        newStrand[randomNum] = "-"
      }
    }

    return newStrand;
  }

  findPreopulated() {
    return prepopulated = this.hiddenLetters.filter(letter => letter !== "-");
  }
  hideStrands() {
    this.hiddenTopStrand = this.hideRandomStrands(this.topStrand);
    this.hiddenBottomStrand = this.hideRandomStrands(this.bottomStrand);

    this.hiddenStrands = [this.hiddenTopStrand, this.hiddenBottomStrand];
  }

  createPossibles() {
    // shuffle the strands's characters to put into possibles array
    // this.possibles = this.hiddenTopStrand.concat(this.hiddenBottomStrand);
    // this.possibles.filter(possible => possible !== "-")

    for (let i = this.hiddenLetters.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.hiddenLetters[i], this.hiddenLetters[j]] = [this.hiddenLetters[j], this.hiddenLetters[i]];
    }
    return this.hiddenLetters;
  }

}



module.exports = Board;