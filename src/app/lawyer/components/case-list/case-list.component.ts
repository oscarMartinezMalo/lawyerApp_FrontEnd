import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Case } from 'src/app/shared/models/case.model';
import { CasesService } from 'src/app/shared/services/cases.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  title = 'Players withOut team';
  displayedColumns: string[] = ['caseNumber', 'type', 'createdDate', 'clientName', 'delete'];
  public dataSource: Case[];
  
  constructor(
    private casesService: CasesService
  ) { }

  async ngOnInit() {
    this.dataSource  = await this.casesService.getCaseListOfLawyer();
    console.log(this.dataSource);
  }

  onDelete(element){
    // Delete Case
  }
}
