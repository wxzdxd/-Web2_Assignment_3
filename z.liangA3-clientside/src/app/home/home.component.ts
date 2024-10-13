import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  fundraisers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('http://localhost:3000/api/fundraisers') // Node server API URL
      .subscribe({
        next: (data) => this.fundraisers = data,
        error: (error) => console.error('Error loading data:', error)
      });
  }

}