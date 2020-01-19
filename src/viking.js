// Soldier
function Soldier(health, strength) {
    this.health = health;
    this.strength = strength;
    this.attack = function() {
        return this.strength;
    };
    this.receiveDamage = function(damage) {
        this.health -= damage;
    }
}
// Viking
function Viking(name, health, strength) {
    Soldier.call(this, health, strength);
    this.name = name;
    this.receiveDamage = function(damage) {
        this.health -= damage;
        if (this.health > 0) {
            return (`${this.name} has received ${damage} points of damage`);
        } else {
            return (`${this.name} has died in act of combat`);
        }
    }
    this.battleCry = function() {
        return (`Odin Owns You All!`);
    }
}
Viking.prototype = Object.create(Soldier.prototype); 
Viking.prototype.constructor = Viking;

// Saxon
function Saxon(health, strength) {
    Soldier.call(this, health, strength);

    this.receiveDamage = function(damage) {
        this.health -= damage;
        if (this.health > 0) {
            return (`A Saxon has received ${damage} points of damage`);
        } else {
            return (`A Saxon has died in combat`);
        }
    }
}
Saxon.prototype = Object.create(Soldier.prototype); 
Saxon.prototype.constructor = Saxon;


// War
function War() {
    this.vikingArmy = [];
    this.saxonArmy = [];
}   

    War.prototype.addViking = function(viking) {
        this.vikingArmy.push(viking);
}

    War.prototype.addSaxon = function(saxon) {
        this.saxonArmy.push(saxon);
}

    War.prototype.vikingAttack = function () {
        let saxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
        let viking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    
        let attackResult = saxon.receiveDamage(viking.strength);
    
        //remove all the dead saxons 
        for (let i = 0; i < this.saxonArmy.length; i++) {
        if (this.saxonArmy[i].health <= 0) {
            this.saxonArmy.splice(i, 1);
            }
        }
    
        return attackResult;
    }
    
    War.prototype.saxonAttack = function () {
        let saxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
        let viking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    
        let attackResult = viking.receiveDamage(saxon.strength);
    
        //remove all the dead vikings
        for (let i = 0; i < this.vikingArmy.length; i++) {
        if (this.vikingArmy[i].health <= 0) {
            this.vikingArmy.splice(i, 1);
            }
        }
    
        return attackResult;
    }
    
    War.prototype.showStatus = function () {
        if (this.saxonArmy.length === 0) {
        return "Vikings have won the war of the century!";
        } else if (this.vikingArmy.length === 0) {
        return "Saxons have fought for their lives and survive another day...";
        }
        return "Vikings and Saxons are still in the thick of battle.";
    }