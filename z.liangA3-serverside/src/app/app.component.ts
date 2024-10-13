import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fundraisers: any[] = []; // Fundraisers list
  fundraiser: any = {}; // used for add or edit
  categories: any[] = []; // Categories list
  isEdit = false; // Edit?
  isShow = false; // Open or closed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFundraisers(); // Load the fundraiser list
    this.loadCategories(); // Load the categorie list
  }

  // Open the form modal
  openFormModal(): void {
    this.isShow = true; // Open the modal
    this.isEdit = false;
  }

  // Load all fundraisers
  loadFundraisers(): void {
    this.http
      .get<any[]>('http://localhost:3000/api/admin/fundraisers')
      .subscribe(
        (data) => {
          this.fundraisers = data;
        },
        (error) => {
          console.error('Load fundraisers error', error);
        }
      );
  }

  // Load categorie list
  loadCategories() {
    this.http.get<any[]>('http://localhost:3000/api/categories').subscribe({
      next: (categories: any[]) => (this.categories = categories), // Set the categories array
      error: (error: any) => console.error(error),
    });
  }

  // Save fundraiser
  saveFundraiser(): void {
    // Form validation
    if (!this.fundraiser.ORGANIZER || this.fundraiser.ORGANIZER.length > 50) {
      alert('Organizer name is required and cannot exceed 50 characters');
      return;
    }

    if (!this.fundraiser.CAPTION || this.fundraiser.CAPTION.length > 50) {
      alert('Caption is required and cannot exceed 50 characters');
      return;
    }

    if (
      !this.fundraiser.TARGET_FUNDING ||
      this.fundraiser.TARGET_FUNDING <= 0 ||
      this.fundraiser.TARGET_FUNDING > 10000000
    ) {
      alert(
        'Target Funding is required and between 1 and 10,000,000'
      );
      return;
    }

    if (
      !this.fundraiser.CURRENT_FUNDING ||
      this.fundraiser.CURRENT_FUNDING < 0 ||
      this.fundraiser.CURRENT_FUNDING > 100000
    ) {
      alert(
        'Current Funding is required and between 0 and 10,000,000'
      );
      return;
    }

    if (!this.fundraiser.CITY) {
      alert('City is required');
      return;
    }

    if (!this.fundraiser.CATEGORY_ID) {
      alert('Please select a category');
      return;
    }

    if (this.fundraiser.ACTIVE === undefined) {
      alert('Please select whether the fundraiser is active or inactive');
      return;
    }
    this.fundraiser.ACTIVE = Number(this.fundraiser.ACTIVE);
    this.fundraiser.CATEGORY_ID = Number(this.fundraiser.CATEGORY_ID);
    if (this.isEdit) {
      // Edit fundraiser
      this.http
        .put(
          `http://localhost:3000/api/admin/fundraiser/${this.fundraiser.FUNDRAISER_ID}`,
          this.fundraiser
        )
        .subscribe(
          () => {
            alert('Fundraiser updated successfully');
            this.resetForm(); // Reset the form after successful update
            this.loadFundraisers(); // Reload fundraiser list
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      // Create new fundraiser
      this.http
        .post('http://localhost:3000/api/admin/fundraiser', this.fundraiser)
        .subscribe(
          () => {
            alert('Fundraiser added successfully');
            this.resetForm(); // Reset the form after successful addition
            this.loadFundraisers(); // Reload fundraiser list
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  // Edit fundraiser
  editFundraiser(fundraiser: any): void {
    this.fundraiser = { ...fundraiser }; // Clone the current fundraiser
    this.isEdit = true; // Set the form to edit mode
    this.fundraiser.ACTIVE = Number(this.fundraiser.ACTIVE);
    this.isShow = true; // Open the modal
  }

  // Delete fundraiser
  deleteFundraiser(fundraiserId: number): void {
    if (confirm('Are you sure you want to delete this fundraiser?')) {
      this.http
        .delete(`http://localhost:3000/api/admin/fundraiser/${fundraiserId}`)
        .subscribe(
          () => {
            alert('Fundraiser deleted successfully');
            this.loadFundraisers(); // Reload fundraiser list
          },
          (error) => {
            alert(error.error);
          }
        );
    }
  }

  // Reset the form
  resetForm(): void {
    this.fundraiser = {}; // Clear the fundraiser object
    this.isEdit = false;
    this.isShow = false;
  }

  // Close the modal
  closeModal(): void {
    this.resetForm(); // Reset the form
  }
}
