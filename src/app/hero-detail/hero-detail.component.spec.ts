import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  flush,
  async
} from "../../../node_modules/@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import { Location } from "../../../node_modules/@angular/common";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { of } from "../../../node_modules/rxjs/observable/of";
import { By } from "../../../node_modules/@angular/platform-browser";
import { FormsModule } from "../../../node_modules/@angular/forms";

describe("Hero detail component", () => {
  let fixture: ComponentFixture<HeroDetailComponent>,
    mockActivatedRoute,
    mockHeroService,
    mockLocation;
  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: id => {
            return "3";
          }
        }
      }
    };
    mockHeroService = jasmine.createSpyObj(["updateHero", "getHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 3, name: "Macho", strength: 55 })
    );
    fixture.detectChanges();
  });

  it("should create h2 with hero name", () => {
    // mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'Macho', strength: 55 }));
    // fixture.detectChanges();
    const h2Text = fixture.debugElement.query(By.css("h2")).nativeElement
      .textContent;
    expect(h2Text).toEqual("MACHO Details");
  });

  it(
    "should test update function to have been called",
    fakeAsync(() => {
      mockHeroService.updateHero.and.returnValue(of({}));
      fixture.detectChanges();

      fixture.componentInstance.save();
      flush();
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    })
  );

  it(
    "should test update function to have been called",
    async(() => {
      mockHeroService.updateHero.and.returnValue(of({}));
      fixture.detectChanges();

      fixture.componentInstance.save();
      fixture.whenStable().then(() => {

         expect(mockHeroService.updateHero).toHaveBeenCalled();
      })
    })
  );
});
