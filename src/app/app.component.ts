import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-backend';
  token!: string;
  formControl!: FormControl;
  passwordFormControl!: FormControl;
  imageFormCotrol!: FormControl;

  constructor(private client: HttpClient) { }

  onSubmit($event: Event): void {
    $event.preventDefault();
  }

  ngOnInit(): void {
    this.formControl = new FormControl();
    this.passwordFormControl = new FormControl();
    this.imageFormCotrol = new FormControl();
  }

  upload($event: any) {
    $event.preventDefault();
    let reader = new FileReader();
    reader.onload = () => {
      let filePreview = reader.result;
      this.client.get<any>('http://192.168.194.254:8000/test?page=1111').subscribe(data => {
        console.log('123');
      });
      console.log(filePreview);
    };
    reader.readAsBinaryString($event.target.files[0]);
  }
}
