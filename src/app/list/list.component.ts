import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Data, ListService} from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  filter = '';
  data: Data[];
  categories: string[];

  constructor(
    private route: ActivatedRoute,
    private listService: ListService) {
  }

  ngOnInit() {
    console.log('on init...');
    this.route.params.subscribe(params => {
        this.filter = params.filter;
        this.listService.data.subscribe(data =>
          this.data = data
        );
        this.listService.updatedDataSelection(this.filter);
        this.getCatgories();
      }
    );
  }

  getCatgories() {
    const cate = this.listService.getCatgories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  ngOnDestroy() {
    console.log('I was killed!');
  }

}
