import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/shared/services/document.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-form-fill',
  templateUrl: './document-form-fill.component.html',
  styleUrls: ['./document-form-fill.component.scss']
})
export class DocumentFormFillComponent implements OnInit {
  // Reactive form
  fillForm = new FormGroup({
    expenses: new FormArray([])
  });

  progressBarMode = '';
  documentId: string;
  
  constructor(    
    private documentService: DocumentService,
    private route: ActivatedRoute,
  ) {
   }

  async ngOnInit() {    
    
    this.documentId = this.route.snapshot.paramMap.get('id');
    let document = await this.documentService.getDocumentById(this.documentId);
    let documentVariables = await this.documentService.getVariablesOfDocument(document.id) as string[];


    const expensesArray = new FormArray([]);
    
    for (const variable of documentVariables) {
      this.createVariablesFields(variable);
    }
  }

  createVariablesFields( variableName: string){
    const FormGroupCreated = new FormGroup({ [variableName] : new FormControl(variableName) });
    (this.fillForm.get('expenses') as FormArray).push(FormGroupCreated);
  }

  getExpenseForm() {
    // console.log("ahora",(this.fillForm.get('expenses') as FormArray).controls[0].value.variableName);
    // console.log((this.fillForm.get('expenses') as FormArray).controls[0].value.variableName);
    return (this.fillForm.get('expenses') as FormArray).controls; 
  }

  async onSubmit() { 
    if (this.fillForm.invalid) { return; }
    this.progressBarMode = 'indeterminate';

    try {      
     await this.documentService.fillAndDownloadDocument( this.documentId, this.fillForm.controls.expenses.value);
    } catch (error) {
        throw error; 
    } finally {
        this.progressBarMode = '';
    }
  }

  getPropertyName(obj){
    return Object.keys(obj)[0];
  }
}
