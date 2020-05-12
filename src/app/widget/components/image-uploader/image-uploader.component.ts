import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ImageSnippet {
  src: string;
  file: File;
}

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit, OnChanges {
  @Input() base64Control: FormControl;
  @Input() fileControl: FormControl;
  @Input() isLoading: boolean;

  private selectedFile: ImageSnippet;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.base64Control && this.base64Control.value) {
      this.selectedFile = {
        src: this.base64Control.value,
        file: null,
      };
    }
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = { src: event.target.result, file };
      if (this.base64Control) {
        this.base64Control.setValue(this.selectedFile.src);
      }
      if (this.fileControl) {
        this.fileControl.setValue(this.selectedFile.file);
      }
    });

    reader.readAsDataURL(file);
  }

  get previewImageSrc(): string {
    return this.selectedFile ? this.selectedFile.src : '';
  }
}
