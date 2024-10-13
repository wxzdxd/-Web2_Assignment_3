import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.less']
})
export class DonationComponent implements OnInit {

  fundraiserId:number = 0;
  fundraiser: any;
  donation = {
    giver: '',
    amount: 0
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Get fundraiser iD
    this.fundraiserId = Number(this.route.snapshot.paramMap.get('id'));;
    this.loadFundraiserDetails();
  }

  // Fetch fundraiser details using the ID
  loadFundraiserDetails() {
    this.http.get(`http://localhost:3000/api/fundraiser/${this.fundraiserId}`).subscribe((data: any) => {
      this.fundraiser = data.fundraiser;
    });
  }

  submitDonation() {
    // Check if donation amount is less than 5 
    if (this.donation.amount < 5) {
      alert('The minimum donation amount is 5 AUD');
      return; 
    }
    if(!this.donation.giver || this.donation.giver == ""){
      alert('giver not empty');
      return; 
    }
    if(this.donation.giver && this.donation.giver.length > 50){
      alert('giver must not exceed 50 characters');
      return; 
    }

     // If the donation is valid, submit the donation
    this.http.post(`http://localhost:3000/api/donation`, {
      date: this.formatDate(new Date()),
      amount: this.donation.amount,
      giver: this.donation.giver,
      fundraiserId: this.fundraiserId
    }).subscribe(response => {
      // After successful donation show thank you message and redirect
      alert(`Thank you for your donation to ${this.fundraiser.CAPTION}`);
      this.router.navigate(['/fundraiser', { id: this.fundraiserId }]); // Navigate to fundraiser route with ID
    }, error => {
      // error messaage
      alert('Please try again');
    });
  }

  // Conversion time 
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

}
