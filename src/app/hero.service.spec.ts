import { TestBed } from "../../node_modules/@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe("Hero service", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service;
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add", "clear"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe('getHero', () => {
     it('should return a hero', () => {

        service.getHero(2).subscribe();
        const req = httpTestingController.expectOne('api/heroes/2');
        req.flush({id: 2, name: 'John', strength: 21});

         httpTestingController.verify();
     })
  });
});
