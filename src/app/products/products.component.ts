import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
  { position: 6, name: 'Barbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Bitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Bxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Bluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Beon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  filteredDataSource: PeriodicElement[] = ELEMENT_DATA;
  pageProducts: Object[] = [];
  pageSizeOptions: number[] = [];
  formControl!: FormControl;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formControl = new FormControl();
    this.formControl.setValue('');
    this.formControl.valueChanges.subscribe(v => this.onChange());
    this.pageSizeOptions = this.getPageSizeOptions();
  }

  onChange(): void {
    this.pageSizeOptions = this.getPageSizeOptions();
    this.paginator.firstPage();
  }

  getCalculatedPageSizeOptions(length: number): number[] {
    let pageSize: number = 0;
    this.pageSizeOptions = [];
    for (let i = 0; i < length; ++i) {
      pageSize = i + 1;
      if ((length % pageSize) == 0) {
        this.pageSizeOptions.push(pageSize);
      }
    }
    return this.pageSizeOptions;
  }

  getPageSizeOptions(): number[] {
    let length = this.dataSource.data.length;
    this.pageSizeOptions = this.getCalculatedPageSizeOptions(length);
    if (length > 2 && this.pageSizeOptions.length == 2) {
      this.pageSizeOptions = [];
      this.pageSizeOptions = this.getCalculatedPageSizeOptions(length + 1);
    }
    this.pageSizeOptions.pop();
    this.pageSizeOptions = this.pageSizeOptions.slice(1);
    return this.pageSizeOptions;
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    this.dataSource.filter = 'Вo';
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      // console.log(data);
      return true;
    };
  }
}
