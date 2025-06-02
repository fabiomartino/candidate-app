import { Component, computed, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CandidatesStore } from '@app/state/candidates.store';

@Component({
    selector: 'app-candidates-table',
    standalone: true,
    imports: [MatTableModule],
    templateUrl: './candidates-table.component.html',
    styleUrls: ['./candidates-table.component.scss'],
})
export class CandidatesTableComponent {

    public candidatesStore: CandidatesStore = inject(CandidatesStore);

    columns = ['name', 'surname', 'seniority', 'years', 'availability'];
    
    rows = computed(() => this.candidatesStore.candidatesSignal());
}