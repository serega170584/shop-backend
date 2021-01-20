import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, NgForm } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = ELEMENT_DATA;
  length = 0;
  pageSize = 0;
  pageProducts: Object[] = [];
  pageSizeOptions: number[] = [];
  pageIndex: number = 0;
  formControl!: FormControl;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formControl=new FormControl();
    this.formControl.setValue('');
    this.length = this.dataSource.length;
    let length = this.length;
    this.pageSizeOptions = this.calculatePageSizeOptions(length);
    if (length > 2 && this.pageSizeOptions.length == 2) {
      this.pageSizeOptions = this.calculatePageSizeOptions(length + 1);
    } else {
      this.pageSizeOptions.pop();
      this.pageSizeOptions = this.pageSizeOptions.slice(1);
    }
    this.pageSize = this.pageSizeOptions[0];
    this.pageProducts = this.getFilteredDataSource().slice(this.pageIndex, this.pageSize);
  }

  calculatePageSizeOptions(length: number): number[] {
    let pageSize: number = 0;
    for (let i = 0; i < length; ++i) {
      pageSize = i + 1;
      if ((length % pageSize) == 0) {
        this.pageSizeOptions.push(pageSize);
      }
    }
    return this.pageSizeOptions;
  }

  onPage($event: PageEvent): void {
    let fromIndex: number = $event.pageIndex * $event.pageSize;
    let toIndex: number = ($event.pageIndex + 1) * $event.pageSize;
    this.pageProducts = this.getFilteredDataSource().slice(fromIndex, toIndex);
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    this.formControl.setValue('888888');
  }

  getFilteredDataSource(): PeriodicElement[] {
    return this.dataSource.filter(item => this.isProductSearched(item));
  }

  isProductSearched(item: PeriodicElement): boolean {
    return item.name.startsWith(this.formControl.value);
  }
}
