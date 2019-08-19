import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map, switchMap, timeout} from 'rxjs/operators';


export class Data {
  id = 0;
  name = 'some';
  task = '';
}


@Injectable({
  providedIn: 'root'
})
export class ListService {

  listStore$: BehaviorSubject<Data[]> = new BehaviorSubject([]);
  data: Observable<Data[]> = this.listStore$.asObservable();
  public searchTerms = new BehaviorSubject<string>('');
  public searchFilters = new BehaviorSubject<string>('');
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient) {
  }

  public updateSearch(term) {
    this.searchTerms.next(term);
  }

  public updateSearchFilter(searchFilter) {
    this.searchFilters.next(searchFilter);
  }

  getCatgories() {
    return this.getHeroes('filter1').pipe(
      map(
        data => data.map(item => item.task).reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
      ),
    );
  }

  public updatedDataSelection(filterStr): void {

    combineLatest(this.searchFilters, this.searchTerms).pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(0),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap(() => {
        console.log('muh ' + this.searchFilters.value);
        return this.searchHeroes(filterStr, this.searchTerms.value, this.searchFilters.value);
      }),
    ).subscribe(data => {
      console.log('data');
      console.log(data);
      this.listStore$.next(data);
    });

  }

  public getHeroes(filterStr: string): Observable<Data[]> {
    console.log('mmmm');
    if (filterStr === 'filter1') {
      console.log('yo!');
      return this.http.get<Data[]>(this.heroesUrl);
    }
    if (filterStr === 'filter2') {
      console.log('more here');
      console.log('timeout');
      return this.http.get<Data[]>(this.heroesUrl).pipe(
        // delay(3000),
        map(data => data.filter(item => {
          return item.name.includes('s');
        })));
    }
  }


  /* GET heroes whose name contains search term */
  searchHeroes(filterStr: string, term: string, searchFilter: string): Observable<Data[]> {
    console.log('start');
    console.log('filter: ' + filterStr);
    console.log('filterSearch: ' + searchFilter);
    console.log('term: ' + term);
    if (!term.trim() && !searchFilter) {
      // if not search term, return empty hero array.
      return this.getHeroes(filterStr).pipe(
      map(data => data.filter(item => {
        return item.task.includes(searchFilter);
      })));
    }
    return this.getHeroes(filterStr).pipe(
      map(data => data.filter(item => {
        return item.name.includes(term) && item.task.includes(searchFilter);
      }))
    );
    /*
    return this.getHeroes(filter).pipe(
      map(data => data.filter(item => {
        item.name.includes(term);
      })));*/
  }
}
