import { Character } from "./Character";
import { Weapon } from "./Weapon";

export class Wizard extends Character {
    public static readonly SPELL_COST: number = 10;

    public readonly maxMana: number;
    private _mana: number;

    public constructor(name: string, health: number, baseAttack: number, baseDefense: number, maxMana: number) {

        super(name, health, baseAttack, baseDefense);

        if (maxMana <= 0) {
            throw new Error(`The mana of ${name} cannot be negative`);
        }

        this.maxMana = maxMana;
        this._mana = maxMana;
    }

    public get mana(): number {
        return this._mana;
    }

    public set mana(value: number) {
        if (value < 0 || value > this.maxMana) {
            throw new Error(`The mana of ${this.name} must be between 0 and ${this.maxMana}`);
        }
        this._mana = value;
    }

    public canCastSpell(): boolean {
        return this._mana >= Wizard.SPELL_COST;
    }

    public override canEquip(weapon: Weapon): boolean {
        return weapon.kind === 'staff' || weapon.kind === 'dagger';
        
    }

    public describe(): string {
        return `[Wizard] ${super.describe()} - mana ${this.mana}/${this.maxMana}`;
    }

}