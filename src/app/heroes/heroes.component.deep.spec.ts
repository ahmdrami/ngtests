import {
  TestBed,
  ComponentFixture
} from "../../../node_modules/@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import {
  NO_ERRORS_SCHEMA,
  Component,
  Input,
  Directive
} from "../../../node_modules/@angular/core";
import { HeroService } from "../hero.service";
import { of } from "../../../node_modules/rxjs/observable/of";
import { By } from "../../../node_modules/@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { by } from "../../../node_modules/protractor";

@Directive({
  selector: "[routerLink]",
  host: { '(click)': "onClick()" }
})
class RouterLinkDirectiveStub {
  @Input("routerLink") link: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.link;
  }
}
describe("Heroes component", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);
    HEROES = [
      { id: 2, name: "john", strength: 6 },
      { id: 3, name: "bravo", strength: 11 }
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as hero component", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponents.length).toBe(2);
    heroComponents.forEach((hero, i) =>
      expect(hero.componentInstance.hero.name).toEqual(HEROES[i].name)
    );
  });

  it("should check the delete function to be called when delete event triggers on a child component", () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // Different ways of triggering an event
    heroComponents[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} }); // 1
    //  (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined); // 2
    //  heroComponents[0].triggerEventHandler('delete', null); // 3
    expect(fixture.componentInstance.delete).toHaveBeenCalled();
  });

  it("should check the input box working when adding a new hero", () => {
    //  spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = "Macho";
    mockHeroService.addHero.and.returnValue(of({ id: 4, name, strength: 22 }));
    const inputEl = fixture.debugElement.query(By.css("input")).nativeElement;
    inputEl.value = name;
    fixture.debugElement
      .query(By.css("#addHero"))
      .triggerEventHandler("click", null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;

    expect(heroText).toContain(name);
  });

  it("should have the correct route for the first hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css("a")).triggerEventHandler("click", null);

    expect(routerLink.navigatedTo).toBe("/detail/2");
  });
});
