/**
 * @description Signal-based reactive store for managing loaded candidates with localStorage persistence.
 */

import { signal, computed, effect } from '@angular/core';
import { Candidate } from '../models/candidate.model';

const STORAGE_KEY = 'candidates';

/**
 * Loads initial candidate data from localStorage if available.
 */
function loadFromStorage(): Candidate[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

const candidates = signal<Candidate[]>(loadFromStorage());

/**
 * Automatically persist candidates to localStorage on any change.
 */
effect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates()));
});

/**
 * Appends a new candidate to the state.
 * @param candidate Candidate object returned by backend.
 */
export function addCandidate(candidate: Candidate): void {
  candidates.update((list) => [...list, candidate]);
}

/**
 * Clears all candidates from state and storage.
 */
export function clearCandidates(): void {
  candidates.set([]);
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Computed signal that exposes the list of loaded candidates.
 */
export const candidatesSignal = computed(() => candidates());