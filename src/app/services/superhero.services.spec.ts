import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperheroService } from './superhero.service';
import { SuperHero } from '../interfaces/SuperHero.interface';
import { of } from 'rxjs';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/heroes';

  const mockHeroes: SuperHero[] = [
    { id: 1, name: 'Batman', power: 'Detective skills'},
    { id: 2, name: 'Superman', power: 'Super strength' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroService]
    });

    service = TestBed.inject(SuperheroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all heroes', () => {
    service.getAllHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should add a new hero', () => {
    const newHero: SuperHero = { id: 3, name: 'Wonder Woman', power: 'Amazonian strength', description: 'Warrior' };
    service.heroes = [...mockHeroes];
    service.addHeroEdit(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
      expect(service.heroes.length).toBe(3);
      expect(service.heroes.find(h => h.id === newHero.id)).toEqual(newHero);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });
  

  it('should add a new hero', () => {
    const newHero: SuperHero = { id: 3, name: 'Wonder Woman', power: 'Amazonian strength', description: 'Warrior' };
    service.heroes = [...mockHeroes];
    service.addHeroEdit(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
      expect(service.heroes.length).toBe(3);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });
  
  it('should set and get loading state', () => {
    service.setLoading(true);
    
    let firstEmission = true;
    
    service.loading$.subscribe(loading => {
      if (firstEmission) {
        expect(loading).toBeTrue();
        firstEmission = false;
        service.setLoading(false);
      } else {
        expect(loading).toBeFalse();
      }
    });
  });
});
