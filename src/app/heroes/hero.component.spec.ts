import { HeroesComponent } from "./heroes.component";
import { of } from "../../../node_modules/rxjs/observable/of";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 2, name: "john", strength: 6 },
      { id: 3, name: "bravo", strength: 11 }
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);
    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("Deletes a hero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[1]);

      expect(component.heroes.length).toBe(1);
    });

    it("Should call deleteHero function", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[1]);
      
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });
  });
});
