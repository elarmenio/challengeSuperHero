import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SuperheroService } from '../services/superhero.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private superheroService: SuperheroService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.superheroService.setLoading(true);
    return next.handle(req).pipe(
      finalize(() => {
        this.superheroService.setLoading(false);
      })
    );
  }
}
