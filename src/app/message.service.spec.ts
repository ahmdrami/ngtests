import { MessageService } from "./message.service";
import { MessagesComponent } from "./messages/messages.component";

describe('Message Service', () => {
   let service: MessageService;
   beforeEach(() => {
      service = new MessageService();
   });

   it('Should have no messages to start', () => {
      expect(service.messages.length).toBe(0);
   });

   it('Should add a message to the array', () => {
      service.add('hello there');
      expect(service.messages[0]).toEqual('hello there');
   });
});