import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { addUserService } from '../../services/addUser.service';


@Component({
  selector: 'app-profile-picture-upload',
  standalone:false,
  templateUrl: './profile-picture-upload.component.html',
  styleUrls: ['./profile-picture-upload.component.scss']
})
export class ProfilePictureUploadComponent {
  @Input() initialImageUrl?: string;
  @Input() userId!: number;
  profileImage: string | null = null;
  selectedFile!: File;
  previewUrl: SafeUrl | null = null;

  @Output() pictureUploaded = new EventEmitter<string>();

  defaultImageUrl: string = 'assets/images/user.png';

  constructor(
    private userService: addUserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.userService.getProfilePicture().subscribe({
      next: (imageBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob); // convert blob to base64 URL
        reader.onload = () => {
          this.previewUrl = reader.result as string;
        };
      },
      error: (err) => {
        console.error('Failed to load profile picture', err);
        this.previewUrl = this.defaultImageUrl; // fallback
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview
      const objectUrl = URL.createObjectURL(file);
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);

      // Upload
      this.userService.uploadFile(file).subscribe({
        next: () => {
          alert('Image uploaded successfully!');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload image.');
        }
      });
    }
  }

  onImageError() {
    this.initialImageUrl = this.defaultImageUrl;
  }

}
