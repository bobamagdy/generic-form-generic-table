import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { FAQDto } from '../../Dtos/FAQDto';
import { FAQService } from '../../Services/FAQ.service';

@Component({
  selector: 'app-Create-Update-FAQ',
  templateUrl: './Create-Update-FAQ.component.html',
  styleUrls: ['./Create-Update-FAQ.component.css']
})
export class CreateUpdateFAQComponent implements OnInit {
  @ViewChild('closebutton') closebutton: {
    nativeElement: { click: () => void };
  };
  saveDisable = false;
  isModalOpen = false;
  form: FormGroup;
  submitted = false;
  @Output() closeModal = new EventEmitter<any>();
  Item: FAQDto = this.options.initialState as FAQDto;
  constructor(
    private fb: FormBuilder,
    private faqServ: FAQService,
    private options: ModalOptions
  ) {
    this.buildForm(new FAQDto());
    this.form = new FormGroup({
      id: new FormControl(0),
      question: new FormControl(''),
      answer: new FormControl(''),
      displayOrder: new FormControl(0),
    });
  }

  ngOnInit(): void {
    debugger;
    if (
      this.Item == new FAQDto() ||
      this.Item != null ||
      this.Item != undefined
    ) {
      this.buildForm(this.Item);
    }
  }

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.Item !== null) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.faqServ.Create(this.form.value,3).subscribe(
      (response) => {
        this.saveDisable = false;
        this.closebutton.nativeElement.click();
        this.closeModal.emit();
        this.isModalOpen = false;
        this.form.reset();
      },
      (err) => {
        this.saveDisable = false;
        this.closebutton.nativeElement.click();
      }
    );
  }

  update() {
    this.faqServ.Update(this.form.value, 3).subscribe(
      (response) => {
        this.saveDisable = false;
        this.isModalOpen = false;
        this.form.reset();
        this.closebutton.nativeElement.click();
        this.closeModal.emit();
      },
      (err) => {
        this.saveDisable = false;
        this.closebutton.nativeElement.click();
      }
    );
  }

  buildForm(faq: FAQDto) {
    this.submitted = false;

    this.form = this.fb.group({
      id: [faq?.id],
      question: [faq?.question, Validators.required],
      answer: [faq?.answer, Validators.required],
      displayOrder: [faq?.displayOrder, Validators.required],
    });
  }

  close() {
    this.closeModal.emit(false);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
