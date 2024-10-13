import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  fundraisers: any[] = []; // Array  fundraisers
  categories: any[] = []; // Array  categories
  errorMessage: string = '';

  organizer: string = ''; // Organizer name
  city: string = ''; // City name
  selectedCategory: string = ''; // Category
  status = undefined // active

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }
  // Function to load categories from the API
  loadCategories() {
    this.http.get<any[]>('http://localhost:3000/api/categories')
      .subscribe({
        next: (categories: any[]) => this.categories = categories,
        error: (error: any) => console.error(error)
      });
  }

  search() {
    if (!this.organizer && !this.city && !this.selectedCategory && !this.status) {
      alert('Please select at least one search criterion');
      return;
    }

    if (this.organizer.length > 50) {
      alert('Organizer must not exceed 50 characters');
      return;
    }

    if (this.city.length > 50) {
      alert('City must not exceed 50 characters');
      return; 
    }

    let query = '?';
    if (this.status) query += `active=${this.status}&`;
    if (this.organizer) query += `organizer=${this.organizer}&`;
    if (this.city) query += `city=${this.city}&`;
    if (this.selectedCategory) query += `category=${this.selectedCategory}`;

    this.http.get<any[]>(`http://localhost:3000/api/search${query}`)
      .subscribe({
        next: (data: any[]) => {
          if (data.length > 0) {
            this.fundraisers = data;
            this.errorMessage = ''; // Clear error message
          } else {
            this.showErrorMessage('No fundraisers found!');
            this.fundraisers = []; // Clear previous results
          }
        },
        error: (error: any) => {
          console.error(error);
          this.showErrorMessage('No fundraisers found!');
        }
      });
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
  }
 
  // resetform
  clearForm() {
    this.organizer = ''; 
    this.city = ''; 
    this.selectedCategory = '';
    this.status = undefined;
    this.errorMessage = '';
    this.fundraisers = [];
  }

  goFundraiser(fundraiserId: number) {
    this.router.navigate(['/fundraiser', { id: fundraiserId }]); // Navigate to fundraiser route with ID
  }

}
