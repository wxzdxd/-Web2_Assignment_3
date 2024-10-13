import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.less']
})
export class FundraiserComponent implements OnInit {

  fundraiser: any; // fundraiser details
  donations: any[] = []; // donation list
  fundraiserId = undefined;
  isshow: boolean = false; 

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.loadFundraiserDetails(); //Init load fundraiser details
  }

  loadFundraiserDetails() {
    const fundraiserId = this.route.snapshot.paramMap.get('id'); // Get the ID from the route
    this.fundraiserId = fundraiserId as any;
    this
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
  goDonation(){
    this.router.navigate(['/donation', { id: this.fundraiserId }]); // Navigate to donation route with ID
  }

}
