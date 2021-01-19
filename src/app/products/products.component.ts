import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
