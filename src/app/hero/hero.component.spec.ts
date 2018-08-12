import { TestBed, ComponentFixture } from "../../../node_modules/@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "../../../node_modules/@angular/core";
import { By } from "../../../node_modules/@angular/platform-browser";

describe('Hero Component', () => {

   let fixture: ComponentFixture<HeroComponent>;
   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [HeroComponent],
         schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(HeroComponent);
   });

   it('should have the correct hero', () => {
      fixture.componentInstance.hero = { id: 1, name: 'super dude', strength: 40 };
      expect(fixture.componentInstance.hero.name).toEqual('super dude');
   });

   it('should render the hero name in anchor tag', () => {
      fixture.componentInstance.hero = { id: 1, name: 'super dude', strength: 40 };
      fixture.detectChanges();
     
      expect(fixture.nativeElement.querySelector('a').textContent).toContain('super dude');
   });
})