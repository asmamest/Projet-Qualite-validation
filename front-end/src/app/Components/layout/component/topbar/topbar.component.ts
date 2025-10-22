import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../layout.service';
import { Router } from '@angular/router';
import { addUserService } from '../../../../services/addUser.service';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: 'topbar.component.html',
  styleUrl: 'topbar.component.css',
})
export class TopbarComponent {
  items!: MenuItem[];
  profilePictureUrl: string | null = null;
  defaultImageUrl = 'assets/images/user.png';
  showCalendar = false;

  constructor(public layoutService: LayoutService,private userService:addUserService,private router:Router) {}

  ngOnInit() {
    this.userService.getProfilePicture().subscribe({
      next: (imageBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onload = () => {
          this.profilePictureUrl = reader.result as string;
        };
      },
      error: () => {
        this.profilePictureUrl = this.defaultImageUrl;
      }
    });


  }
  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  onDateSelected(date: Date) {
    console.log('Date picked:', date);
    this.showCalendar = false; // Close popup after selection
  }



  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }




}
