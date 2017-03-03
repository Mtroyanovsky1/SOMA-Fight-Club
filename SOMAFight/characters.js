
//Characters
//image: route
function Character(name, image, ultimate, specAttk, specDef) {
  this.charName = name;
  this.charImg = image;
  this.utimateAbility = ability;
  this.specAttk = specAttk;
  this.specDef = specDef;
}

//Ultimate Abilities - 6 stars
//Use switch cases to match ability names to functions

var ultimates = {
  mooseAbility: "Acid Rain", //Deal additional 10 amount of damage for 10 sesconds on top of base attack
  abhiAbility: "Fitness Time", //Attacks deal additional 4  points for every tap
}

//Special Attacks & Defense - 2 Stars

var specials = [
  {name: 'Moose', specAttk: 0.10, specDef: 0.15 },
  //Attack: 10% Chance of hitting 35 pt for a tap | Defense: 15% Chance opponent's attack doesn't go through
  {name: 'Abhi', specAttk: 5, specDef: 0.5}
  //Attack: Every 5th tap gets a 2x bonus | Defense: [Iron Skin] Opponent attacks deal half damage
  // {name: 'Ricky', specAttk: , specDef: },
  // {name: 'Darwish', specAttk: , specDef: },
  // {name: 'Lando', specAttk: , specDef: },
  // {name: 'Prath', specAttk: , specDef: },
  // {name: 'Sebastian', specAttk: , specDef: }
]

var Moose = new Character('Moose',someURL, )


module.exports = {}
