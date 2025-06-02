/**
 * @description Service responsible for communicating with the backend API to upload candidates.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/candidates/upload';

  /**
   * Sends candidate form data and Excel file to backend for processing.
   * @param formData FormData object including name, surname, and excel file.
   * @returns Observable emitting the parsed candidate from backend.
   */
  uploadCandidate(formData: FormData): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, formData);
  }
}