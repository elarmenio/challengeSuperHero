import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { SuperHero } from 'src/app/interfaces/SuperHero.interface';
import { SuperheroService } from 'src/app/services/superhero.service';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  heroesList: SuperHero[] = [];
  public filteredHeroes: SuperHero[] = [];
  public searchTerm: string = '';
  public searchType: string = 'all';
  public loading: boolean = false;
  public paginatedHeroes: SuperHero[] = [];
  public currentPage: number = 0;
  public pageSize: number = 5; 

  constructor(
      private services: SuperheroService
   ,  private dialog : MatDialog
   ,  private toastServices : ToastrService
  ) {}

  ngOnInit() {
    this.getAllHeroes();
  }

  getAllHeroes(){
    this.services.getAllHeroes().subscribe((heroes) => {
      this.heroesList = heroes;
      this.filteredHeroes = heroes; 
      this.updatePaginatedHeroes(0, this.pageSize); 
    });
  }

  gethero() {
    this.loading = true;
    setTimeout(() => {
      this.filteredHeroes = this.heroesList.filter(hero => {
        if (this.searchType === 'id') {
          return hero.id.toString() === this.searchTerm;
        } else if (this.searchType === 'name') {
          return hero.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        } else {
          return (
            hero.id.toString() === this.searchTerm ||
            hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
      });
      this.updatePaginatedHeroes(0, this.pageSize);
      this.loading = false;
    }, 1000);
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedHeroes(this.currentPage, this.pageSize);
  }

  private updatePaginatedHeroes(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    this.paginatedHeroes = this.filteredHeroes.slice(startIndex, startIndex + pageSize);
  }

  public showCancelConfirm(heroId: number) {
    const confirmDialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      data: {
        title: 'CONFIRMATION',
        message: 'Are you sure you want to delete the hero?',
        acceptLabel: 'Accept'
      }
    });
  
    confirmDialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.filteredHeroes = this.filteredHeroes.filter(hero => hero.id !== heroId);
        this.updatePaginatedHeroes(this.currentPage, this.pageSize);
      }
    });
  }

  editAddHero(hero?: SuperHero | any, isEdit?: boolean){
    let title = 'New character';
    if(isEdit){
      title = 'Editing the character ' + hero?.name
    }
    let dialogRef = this.dialog.open<HeroFormComponent>(HeroFormComponent, {
      data: {
        title : title,
        infoHero: hero || null,
        isEdit: isEdit
      }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      this.loading = true;
      if(result){
        setTimeout(() => {
          this.services.addHeroEdit(result.value);
          this.getAllHeroes();
          this.loading = false;
        }, 2000);
      }else {
        this.loading = false;
      }
    })
  }
}
