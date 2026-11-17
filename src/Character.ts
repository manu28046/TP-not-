import { Weapon } from './Weapon';

export abstract class Character {
  public readonly name: string;
  public readonly maxHealth: number;
  public readonly baseAttack: number;
  public readonly baseDefense: number;

  private _health: number;
  private _weapon: Weapon | null;

  public constructor(name: string, maxHealth: number, baseAttack: number, baseDefense: number) {
    if (maxHealth <= 0) {
      throw new Error(`The max health of ${name} must be strictly positive.`);
    }
    this.name = name;
    this.maxHealth = maxHealth;
    this.baseAttack = baseAttack;
    this.baseDefense = baseDefense;
    this._health = maxHealth;
    this._weapon = null;
  }

    public get health(): number {
      return this._health;
    }

public abstract getAttack(): number;
public abstract canEquip(weapon: Weapon): boolean;

protected getWeaponAttackBonus(): number {
    if (this._weapon === null) {
      return 0;
    }
    return this._weapon.attackBonus;
  }



  public isAlive(): boolean {
    return this._health > 0;
  }


  public describe(): string {
    const weaponName = this._weapon === null ? 'None' : this._weapon.describe();
    return `${this.name} - health ${this.health}/${this.maxHealth} - attack ${this.getAttack()} - defense ${this.baseDefense} - weapon ${weaponName}`;
  }



public equip(weapon: Weapon): void {
    if (!this.canEquip(weapon)) {
      throw new Error(`${this.name} cannot equip ${weapon.describe()}`);
    }

    this._weapon = weapon;
  }



public takeDamage(amount: number): void {
    this._health = Math.max(0, this._health - amount);
  }

public heal(amount: number): void {
    this._health = Math.min(this.maxHealth, this._health + amount);
  }


protected computeDamageTaken(target : Character): number {
    return Math.max(0, target.getAttack() - this.baseDefense);

}

public attack(target: Character): number{
    if (!this.isAlive()) {
        throw new Error(`${this.name} is KO and cannot attack`);
    }
    if (!target.isAlive()) {
        throw new Error(`${target.name} cannot attack themselves`);
    }

    if (!target.isAlive()) {
        throw new Error(`${target.name} is already KO`);
    }
    const damage = this.computeDamageTaken(target);
    target.takeDamage(damage);
    
    console.log(`${this.name} hits ${target.name} for ${damage} damage. ${target.name} has ${target.health}/${target.maxHealth} health left.`);

    if (!target.isAlive()) {
        console.log(`${target.name} is KO!`);
    }
    return damage;
}




}