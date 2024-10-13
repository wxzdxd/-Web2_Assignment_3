import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.less']
})
export class FundraiserComponent implements OnInit {

  fundraiser: any; // fundraiser details
  donations: any[] = []; // donation list
  isshow: boolean = false; 

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFundraiserDetails(); //Init load fundraiser details
  }

  loadFundraiserDetails() {
    const fundraiserId = this.route.snapshot.paramMap.get('id'); // Get the ID from the route
    if (!fundraiserId) {
      return;
    }

    // Fetch fundraiser details using the ID
    this.http.get(`http://localhost:3000/api/fundraiser/${fundraiserId}`)
      .subscribe({
        next: (data: any) => {
          this.fundraiser = data.fundraiser; // fundraiser details 
          this.donations = data.donations; // donation list
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }
  showModal() {
    this.isshow = true; //  show the modal
    console.log(this.isshow)
  }

  // Function to close the donation modal
  closeModal() {
    this.isshow = false; // hide the modal
  }

}
