import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

import { CandidateService } from '@app/services/candidate.service';
import { addCandidate } from '@app/state/candidates.signal';
import { CandidatesStore } from '@app/state/candidates.store';
import { CandidatesTableComponent } from '../candidates-table/candidates-table.component';
import { mockCandidates } from '@app/mocks/mock-candidates';

@Component({
    selector: 'app-upload-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        CandidatesTableComponent
    ],
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private candidateService = inject(CandidateService);
    private candidatesStore = inject(CandidatesStore);
    private dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    candidateForm!: FormGroup;

    get isFormValid(): boolean {
        const file = this.candidateForm.get('excel')?.value;
        return this.candidateForm.valid && file instanceof File;
    }

    ngOnInit(): void {
        this.candidateForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            excel: [null, Validators.required],
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        const isValid = validTypes.includes(file.type);

        if (!isValid) {
            this.snackBar.open('Only Excel files (.xls, .xlsx) are allowed.', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-error']
            });
            input.value = ''; // reset input value
            this.candidateForm.patchValue({ excel: null });
            return;
        }

        this.candidateForm.patchValue({ excel: file });
        this.candidateForm.get('excel')?.markAsDirty();
        this.candidateForm.get('excel')?.markAsTouched();
        this.candidateForm.get('excel')?.updateValueAndValidity();
    }

    onClearCandidates(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: 'Are you sure you want to clear all loaded candidates?',
          autoFocus: true,
          restoreFocus: true
        });
      
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.candidatesStore.clear();
            }
        });
    }

    onSubmit(): void {
        if (this.candidateForm.invalid) {
          console.warn('Form is invalid. Not submitting.');
          return;
        }
      
        console.log('Submitting candidate with values:', this.candidateForm.value);
      
        const formData = new FormData();
        formData.append('name', this.candidateForm.value.name);
        formData.append('surname', this.candidateForm.value.surname);
        formData.append('excel', this.candidateForm.value.excel);
      
        this.candidateService.uploadCandidate(formData).subscribe({
          next: (candidate) => {
            console.log('Candidate successfully added:', candidate);
            this.candidatesStore.add(candidate);
            this.candidateForm.reset();

            // Snackbar success message
            this.snackBar.open('Candidate uploaded successfully ✅', 'Close', {
                duration: 3000,
                panelClass: ['snackbar-success']
            });

        },
          error: (err) => {
            console.error('Upload failed:', err);
            this.snackBar.open('Upload failed ❌', 'Close', {
                duration: 4000,
                panelClass: ['snackbar-error']
            });
          },
        });
    }

    loadMockCandidates(): void {
        mockCandidates.forEach(c => this.candidatesStore.add(c));
    }

}