import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualFieldAPIsService } from 'src/app/virtual-field-apis.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent {

  remembranceForm!: FormGroup;
  selectedFile: File | null = null;
  showToast = false;

  constructor(private fb: FormBuilder, private remembranceService: VirtualFieldAPIsService, private router: Router) {
    this.remembranceForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      theirName: [''],
      tributeMessage: ['', [Validators.required, Validators.maxLength(100)]],
      regimentService: ['', Validators.required],
      remembranceSymbol: ['', Validators.required],
      file: [null]
    });
  }

  // Handle file selection
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.remembranceForm.patchValue({ file: this.selectedFile });
    }
  }

  // Prepare form data for API submission
  prepareFormData(): FormData {
    const formData = new FormData();
    const formValues = this.remembranceForm.value;

    formData.append('first_name', formValues.firstName);
    formData.append('last_name', formValues.surname);
    formData.append('email', formValues.email);
    formData.append('tribute_memory', formValues.theirName || '');
    formData.append('tribute_message', formValues.tributeMessage);
    formData.append('regiment', formValues.regimentService);
    formData.append('symbol', formValues.remembranceSymbol);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    return formData;
  }

  // Submit form data to API
  onSubmit() {
    if (this.remembranceForm.valid) {
      const formData = this.prepareFormData();

      this.remembranceService.addNewRemembrances(formData).subscribe(
        response => {
          if (response.success) {
            this.showToast = true;
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 3000);
            this.remembranceForm.reset();
          }
        },
        error => {
          console.error('Error:', error);
          alert('Submission failed.');
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // Handle radio button selection
  onRadioChange(event: any) {
    console.log('Selected Symbol:', event.target.value);
  }

  // Handle symbol selection via images
  selectSymbol(symbol: string) {
    this.remembranceForm.patchValue({ remembranceSymbol: symbol });
  }

}
