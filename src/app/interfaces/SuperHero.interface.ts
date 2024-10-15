export interface SuperHero {
    id: number;
    name: string;
    power: string;
    description: string;
    image : string;
}

export interface AddEditSuperHero {
  infoHero ?: SuperHero;
  isEdit : boolean;
  title: string;

}