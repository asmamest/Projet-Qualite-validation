import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { ProfileService } from '../../Services/profile.service';
import { data } from 'autoprefixer';



@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileImageUrl: string ;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) =>
      {
        this.user = data;
        if (data.profileImageUrl) {
          this.profileImageUrl = data.profileImageUrl;
        }
      },
      error: (err) => console.error('Error loading profile:', err)
    });

  }

  onProfileImageUploaded(imageUrl: string) {
    this.user.profileImageUrl = imageUrl;
  }

}
