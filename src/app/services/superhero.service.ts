import { Injectable } from "@angular/core";
import { SuperHero } from "../interfaces/SuperHero.interface";
import { Observable, of } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private heroes: SuperHero[] = [
    {
      id: 1001,
      name: 'Capitán América',
      power: 'Fuerza y agilidad sobrehumanas',
      description: 'Un símbolo de patriotismo y heroísmo, Capitán América lucha por la justicia y la libertad, liderando a los Vengadores con su indestructible escudo.',
      image: 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2019/04/hipertextual-que-estaria-fabricado-escudo-capitan-america-si-fuese-real-2019887960.jpg?resize=1200%2C799&quality=70&strip=all&ssl=1'
    },
    {
      id: 1002,
      name: 'Iron Man',
      power: 'Armadura tecnológica avanzada',
      description: 'Genio inventor y multimillonario, Iron Man utiliza su inteligencia y recursos para combatir el crimen y proteger al mundo con su armadura futurista.',
      image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/09/marvels-iron-man-ea-motive-2824279.jpg?tf=1200x'
    },
    {
      id: 1003,
      name: 'Thor',
      power: 'Control del trueno y gran fuerza',
      description: 'El dios del trueno, Thor empuña su poderoso martillo Mjolnir, defendiendo a los reinos con su fuerza sobrehumana y su conexión con los elementos.',
      image: 'https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/1621312752468-LNQ5D4XJNMZ0UOCDGEH1/Thor.png?format=2500w'
    },
    {
      id: 1004,
      name: 'Hulk',
      power: 'Fuerza ilimitada y resistencia',
      description: 'La manifestación de la ira de Bruce Banner, Hulk es una fuerza imparable con una fuerza física inigualable, luchando por la paz a pesar de su naturaleza destructiva.',
      image: 'https://hips.hearstapps.com/hmg-prod/images/hulk-thor-ragnarok-infinity-war-1536683805.jpg?crop=1.00xw:0.892xh;0,0.0338xh'
    },
    {
      id: 1005,
      name: 'Wolverine',
      power: 'Regeneración y garras retráctiles',
      description: 'Un mutante con habilidades de curación acelerada y sentidos mejorados, Wolverine es un guerrero solitario que busca redención mientras enfrenta su oscuro pasado.',
      image: 'https://static.independentespanol.com/2024/07/29/15/newFile-17.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp'
    },
    {
      id: 1006,
      name: 'Doctor Strange',
      power: 'Magia y manipulación de la realidad',
      description: 'Una vez un cirujano arrogante, Doctor Strange se convierte en el Hechicero Supremo, utilizando sus habilidades mágicas para proteger la Tierra de amenazas sobrenaturales.',
      image: 'https://s1.elespanol.com/2016/10/23/series/cine/comic-marvel-peliculas_165246511_19771275_1706x1280.jpg'
    },
    {
      id: 1007,
      name: 'Spider-Man',
      power: 'Fuerza arácnida y sentido arácnido',
      description: 'Un adolescente con poderes arácnidos, Spider-Man lucha contra el crimen mientras enfrenta los desafíos de la vida cotidiana, recordando siempre que "un gran poder conlleva una gran responsabilidad".',
      image: 'https://img.asmedia.epimg.net/resizer/v2/DMBZR3D73VEBVOZT2DKZLMM7H4.jpg?auth=d49b6168916d14cdd73b7d5b11fdbc017d4736e4bc581c9ebc34602c7c3b04b2&width=644&height=362&smart=true'
    },
    {
      id: 1008,
      name: 'Deadpool',
      power: 'Regeneración avanzada y habilidades de combate',
      description: 'Un anti-héroe conocido por su humor negro y su capacidad para sanar de heridas mortales, Deadpool utiliza sus habilidades de combate para luchar mientras desafía las normas del héroe convencional.',
      image: 'https://s3.us-west-1.amazonaws.com/esdelatino.com/wp-content/uploads/2023/09/21101031/La-actualizacion-de-Deadpool-3-alimenta-los-principales-rumores-y-750x375.jpg'
    },
    {
      id: 1009,
      name: 'Pantera Negra',
      power: 'Fuerza y agilidad mejoradas',
      description: 'Rey de Wakanda, Pantera Negra combina habilidades sobrehumanas con tecnología avanzada, luchando por proteger su nación y el mundo de las amenazas.',
      image: 'https://www.akiracomics.com/imagenes/porreferencia?identidad=50f891c9-b7db-4e05-b9a6-996895a372df&referencia=&ancho=&alto='
    },
    {
      id: 1010,
      name: 'Blade',
      power: 'Habilidades vampíricas y experto en combate',
      description: 'Un cazador de vampiros mitad humano, mitad vampiro, Blade utiliza sus habilidades sobrenaturales y su destreza en combate para proteger a la humanidad de las criaturas de la noche.',
      image: 'https://www.hollywoodreporter.com/wp-content/uploads/2015/09/blade_still.jpg?w=2000&h=1126&crop=1'
    }
  ];
  
  
  

  addHeroEdit(hero: SuperHero) {
    const existingHeroIndex = this.heroes.findIndex(h => h.id === hero.id);
    if (existingHeroIndex !== -1) {
      this.heroes[existingHeroIndex] = { ...this.heroes[existingHeroIndex], ...hero };
    } else {
      this.heroes.push(hero);
    }
  }
  getAllHeroes(): Observable<SuperHero[]> {
    return of(this.heroes);
  }
}