/**
 * @description Interface that represents a fully processed candidate
 */

export interface Candidate {
    name: string;
    surname: string;
    seniority: 'junior' | 'senior';
    years: number;
    availability: boolean;
  }