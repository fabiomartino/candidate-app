import { Injectable, computed, effect, signal, runInInjectionContext, inject, Injector } from '@angular/core';
import { Candidate } from '../models/candidate.model';

const STORAGE_KEY = 'candidates';

@Injectable({ providedIn: 'root' })
export class CandidatesStore {
  private readonly candidates = signal<Candidate[]>(this.load());

  readonly candidatesSignal = computed(() => this.candidates());

  constructor() {
    const injector = inject(Injector);

    runInInjectionContext(injector, () => {
      effect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.candidates()));
      });
    });
  }

  private load(): Candidate[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  add(candidate: Candidate): void {
    this.candidates.update((list) => [...list, candidate]);
  }

  clear(): void {
    this.candidates.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): Candidate[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}