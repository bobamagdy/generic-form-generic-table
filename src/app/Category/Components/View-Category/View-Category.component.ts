import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateUpdateFAQComponent } from 'src/app/FAQ/Components/Create-Update-FAQ/Create-Update-FAQ.component';
import { FAQDto } from 'src/app/FAQ/Dtos/FAQDto';
import { CategoryDto } from '../../Dtos/CategoryDto';
import { CategoryService } from '../../Services/Category.service';
import { CreateUpdateCategoryComponent } from '../Create-Update-Category/Create-Update-Category.component';

@Component({
  selector: 'app-View-Category',
  templateUrl: './View-Category.component.html',
  styleUrls: ['./View-Category.component.css'],
  providers:[CategoryService]
})
export class ViewCategoryComponent implements OnInit {
  visable=false;
  categoriesList: CategoryDto[]=[];
categoryNew=new CategoryDto();
faqNew=new FAQDto();
editorConfig: AngularEditorConfig = {
  editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  //upload: (file: File) => { ... }
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
   toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
};
  constructor(private CategoryServ:CategoryService,  private _modalService: BsModalService,) { }

  ngOnInit() {
    this.GetAllCategories();
  }

  GetAllCategories(){
    this.CategoryServ.ReadAllWithFAQs().subscribe(
      (res)=>{this.categoriesList=res.data.categories},
      (err)=>{console.log(err)}
    )
  }
  OpenPoupeCreateUpdate(row: CategoryDto) {
    let createOrEditRadDialog: BsModalRef;
    createOrEditRadDialog = this._modalService.show(
      CreateUpdateCategoryComponent,
      { animated: true, initialState: row, }
    );

    createOrEditRadDialog.content.closeModal.subscribe(() => {
      this._modalService._hideModal(1);
    });
  }

  OpenPoupeCreateUpdateFaq(row: FAQDto) {
    let createOrEditRadDialog: BsModalRef;
    createOrEditRadDialog = this._modalService.show(
      CreateUpdateFAQComponent,
      { animated: true, initialState: row, }
    );

    createOrEditRadDialog.content.closeModal.subscribe(() => {
      this._modalService._hideModal(1);
    });
  }

  @ViewChild('editor') editor: { nativeElement: { [x: string]: any; }; };
  description: string = "<p><b>Lorem ipsum</b> dolor sit amet, <s>consectetur adipiscing elit</s>, sed do eiusmod tempor <u>incididunt</u> ut labore et dolore <i>magna aliqua</i>.";

  setStyle(style: string) {
    let bool = document.execCommand(style, false, "");
  }

  onChange() {
    console.log(this.editor.nativeElement["innerHTML"]);
  }
}
