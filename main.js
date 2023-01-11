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


function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const baseIndex = Math.floor(Math.random() * 15);
      const base = this.dna[baseIndex];
      let mutation = returnRandBase();
      while (base === mutation)
        mutation = returnRandBase();
      this.dna[baseIndex] = mutation;
    },
    compareDNA(otherAequor) {
      let matches = 0;
      this.dna.forEach((element, index) => {
        if (element === otherAequor.dna[index])
          matches ++;
      });
      let percentMatch = Math.round((matches/15) * 100);
      console.log(`specimen #${this.specimenNum} and specimen #${otherAequor.specimenNum} have ${percentMatch}% DNA in common`);
    }, 
    willLikelySurvive() {
      let CsAndGs = 0;
      CsAndGs = this.dna.reduce((accumulator, base) => {
        if (base === 'C' || base === 'G')
          return accumulator + 1;
        else 
          return accumulator;
      }, 0);
      return (CsAndGs/15) >= 0.6 ? true : false;
    }
  };
}

let myBug = pAequorFactory('a49sj', mockUpStrand());
let otherBug = pAequorFactory('495h2', mockUpStrand());

// Mutation test
// console.log(myBug.dna);
// myBug.mutate();
// console.log(myBug.dna);

//compareDNA() test
// myBug.compareDNA(otherBug);

//willLikelySurvive test
// let healthyBug =     pAequorFactory('3832k', ['G','G','G','G','G','G','G','G','G','A','A','A','A','A','A']); // 60% good DNA
// let lessHealthyBug = pAequorFactory('5937x', ['G','G','G','G','G','G','G','G','A','A','A','A','A','A','A']); // 53% good DNA
// console.log('dna : ' + healthyBug.dna);
// console.log('Will it likely survive? : ' + healthyBug.willLikelySurvive());
// console.log('dna : ' + lessHealthyBug.dna);
// console.log('Will it likely survive? : ' + lessHealthyBug.willLikelySurvive());

// Step 7. With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. Store these instances in an array for your team to study later.
let healthyBois = [];
let bugNumber = 1;
while (healthyBois.length < 30) {
  let bug = pAequorFactory(bugNumber, mockUpStrand());
  if (bug.willLikelySurvive())
    healthyBois.push(bug);
  bugNumber ++;
}
console.log(`We got ${healthyBois.length} Healthy Bois. . .`);

for (boi of healthyBois) {
  console.log(`specimenNum : ${boi.specimenNum}, dna: ${boi.dna}`);
}