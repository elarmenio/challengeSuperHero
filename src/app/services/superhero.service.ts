import { Injectable } from "@angular/core";
import { SuperHero } from "../interfaces/SuperHero.interface";
import { BehaviorSubject, delay, map, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private apiUrl = 'http://localhost:3000/heroes';
  private loadingSubject = new BehaviorSubject <boolean> (false);
  public loading$ = this.loadingSubject.asObservable();
  heroes : SuperHero[] = []
  constructor(private http: HttpClient) {}

  
  
  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }
  
  addHeroEdit(hero: SuperHero): Observable<SuperHero> {
    const existingHeroIndex = this.heroes.findIndex(h => h.id === hero.id);
    if (existingHeroIndex !== -1) {
      return this.http.put<SuperHero>(`${this.apiUrl}/${hero.id}`, hero).pipe(
        delay(1000),
        tap(() => {
          this.heroes[existingHeroIndex] = { ...this.heroes[existingHeroIndex], ...hero };
        })
      );
    } else {
      return this.http.post<SuperHero>(this.apiUrl, hero).pipe(
        delay(1000),
        tap((newHero: SuperHero) => {
          this.heroes.push(newHero);
        })
      );
    }
  }
  

  getAllHeroes(): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(this.apiUrl).pipe(
      tap((heroes: SuperHero[]) => {
        this.heroes = heroes;
      })
    );
  }

}