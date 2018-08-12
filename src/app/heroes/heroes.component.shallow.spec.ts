import { TestBed, ComponentFixture } from "../../../node_modules/@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "../../../node_modules/@angular/core";
import { HeroService } from "../hero.service";
import { of } from "../../../node_modules/rxjs/observable/of";
import { Hero } from "../hero";
import { By } from "../../../node_modules/@angular/platform-browser";

describe('Heroes component', () => {

   let fixture: ComponentFixture<HeroesComponent>
   let mockHeroService;
   let HEROES;
   
   @Component({
      selector: 'app-hero',
      template: '<div></div>'
    })
   class FakeHeroComponent {
      @Input() hero: Hero;
 
    }
   beforeEach(() => {
      mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
      HEROES = [
         { id: 2, name: "john", strength: 6 },
         { id: 3, name: "bravo", strength: 11 }
       ];
      TestBed.configureTestingModule({
         declarations: [HeroesComponent, FakeHeroComponent],
         providers: [
            { provide: HeroService, useValue: mockHeroService }
         ],
      })

      fixture = TestBed.createComponent(HeroesComponent);
   })

   it('should set heroes correctly from the service', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      expect(fixture.componentInstance.heroes.length).toBe(2); 
      expect(mockHeroService.getHeroes).toHaveBeenCalled();
   });

   it('Should check the li elements number', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2);
   })
});