import {Component, Input, OnInit} from '@angular/core';
import {ListService} from '../list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  filter: string;
  categories: string[];

  constructor(private listService: ListService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.listService.updateSearch(term);
  }

  searchFilter(searchFilter: string): void {
    this.listService.updateSearchFilter(searchFilter);
  }

  ngOnInit(): void {
    // this.heroes$ =
    this.getCatgories();
  }

  getCatgories() {
    const cate = this.listService.getCatgories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

}
