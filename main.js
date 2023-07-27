// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};



const pAequorFactory = (number, dna) => {

  return {
    specimenNum: number,
    dna: dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * 4);

      let newBase = returnRandBase();

      while (newBase === this.dna[randomIndex]) {
        newBase = returnRandBase();
      }
      const newDna = this.dna;
      newDna[randomIndex] = newBase;
      return newDna;
    },
    compareDNA(pAequor) {

      const totalBases = this.dna.length;
      const commonBases = this.dna.reduce((count, base, index) => { return count + (base === pAequor.dna[index]) ? 1 : 0}, 0);

      const percentage = (commonBases / totalBases) * 100;

      console.log(`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common`);
    },

    willLikelySurvive() {
      const counter = this.dna.reduce((count, base) => {
        return count + (base === 'C' || base === 'G' ? 1 : 0);
      }, 0);
      const percentage = (counter / this.dna.length) * 100;
      return percentage >= 60;
    }
  }
};

const create30Instances = () => {

  const instances = [];

  for (let i = 1; instances.length < 30; i++) {
    const newOrganism = pAequorFactory(i, mockUpStrand());
    if (newOrganism.willLikelySurvive()) {
      instances.push(newOrganism)
    }
  }
  return instances;
}

const survivableOrganisms = create30Instances();
console.log(survivableOrganisms);