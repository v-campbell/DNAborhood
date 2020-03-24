// import Tile from "./tile";

class Board{
  constructor(){
    this.topStrand = [];
    this.bottomStrand = [];
    this.strands = [];
    // this.length = length;
    this.length = 6;
    this.possibles = [];
  }

  setupBoard() {
      const nucleotides = "ATCG";
    
      //generate random topStrand
      for (let i = 0; i < this.length; i++) {
        this.topStrand[i] = nucleotides[Math.floor(Math.random() * nucleotides.length)]
      }

      //generate bottomStrand based on topStrand
      for (let j = 0; j < this.length; j++) {
          if (this.topStrand[j] === "A") this.bottomStrand[j] = "T";
          if (this.topStrand[j] === "T") this.bottomStrand[j] = "A";
          if (this.topStrand[j] === "C") this.bottomStrand[j] = "G";
          if (this.topStrand[j] === "G") this.bottomStrand[j] = "C";
      }

      this.strands = [this.topStrand, this.bottomStrand];

      // shuffle the strands's characters to put into possibles array
      this.possibles = this.topStrand.concat(this.bottomStrand);

      for (let i = this.possibles.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        // let temp = this.possibles[i];
        // this.possibles[i] = this.possibles[j];
        // this.possibles[j] = temp;
        this.possibles[i], this.possibles[j] = this.possibles[j], this.possibles[i];
      }
      
  }


}



module.exports = Board;