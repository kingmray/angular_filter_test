import {Injectable} from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  public createDb() {
    const heroes = [
      {id: 11, name: 'Dr Nice', task: 'Installation'},
      {id: 12, name: 'Narco', task: 'WIM'},
      {id: 13, name: 'Bombasto', task: 'Installation'},
      {id: 14, name: 'Celeritas', task: 'Installation'},
      {id: 15, name: 'Magneta', task: 'Installation'},
      {id: 16, name: 'RubberMan', task: 'Installation'},
      {id: 17, name: 'Dynama', task: 'Installation'},
      {id: 18, name: 'Dr IQ', task: 'Installation'},
      {id: 19, name: 'Magma', task: 'Installation'},
      {id: 20, name: 'Tornado', task: 'Installation'}
    ];
    return {heroes};
  }
}
