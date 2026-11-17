import { Character } from "./Character";
import { Weapon } from "./Weapon";

export class Warrior extends Character {
  public static readonly RAGE_MULTIPLIER: number = 1.5;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number) {
        super(name, health, baseAttack, baseDefense);
    }
    public getAttack(): number {
        const attack = this.baseAttack + this.getWeaponAttackBonus();

        if (this.isEnraged()) {
            return Math.floor(attack * Warrior.RAGE_MULTIPLIER);
        }
        return Math.floor(attack);
    }

    public canEquip(weapon: Weapon): boolean {
        return weapon.kind !== 'staff';
    }

    public describe(): string {
        let description = `[Warrior] ${this.name} - health ${this.health}/${this.maxHealth} - attack ${this.getAttack()} - defense ${this.getDefense()} - weapon: ${this.getWeaponDescription()}`;
        if (this.isEnraged()) {
            description += ' -Enraged ';
        }
        return description;
    }



}
