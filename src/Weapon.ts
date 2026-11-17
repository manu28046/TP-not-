export type WeaponKind = 'sword' | 'axe' | 'bow' | 'dagger';
export class Weapon {
  public readonly name: string;
  public readonly kind: WeaponKind;
  public readonly attackBonus : number;

  public constructor(name: string, kind: WeaponKind, attackBonus: number) {
    if (attackBonus < 0) {
      throw new Error(`The attack bonus of ${name} cannot be negative`);
    }
    this.name = name;
    this.kind = kind;
    this.attackBonus = attackBonus;
  }

  public describe(): string {
    return `${this.name}(${this.kind}, +${this.attackBonus})`;
  }
}