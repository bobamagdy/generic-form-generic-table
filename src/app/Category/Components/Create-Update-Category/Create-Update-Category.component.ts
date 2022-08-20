import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { CategoryDto } from '../../Dtos/CategoryDto';
import { CategoryService } from '../../Services/Category.service';
import { ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-Create-Update-Category',
  templateUrl: './Create-Update-Category.component.html',
  styleUrls: ['./Create-Update-Category.component.css'],
})
export class CreateUpdateCategoryComponent implements OnInit {
  @ViewChild('closebutton') closebutton: {
    nativeElement: { click: () => void };
  };
  saveDisable = false;
  isModalOpen = false;
  form: FormGroup;
  submitted = false;
  @Output() closeModal = new EventEmitter<any>();
  Item: CategoryDto = this.options.initialState as CategoryDto;
  constructor(
    private fb: FormBuilder,
    private categoryServ: CategoryService,
    private options: ModalOptions
  ) {
    this.buildForm(new CategoryDto());
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      displayOrder: new FormControl(0),
      faqList: new FormControl([]),
    });
  }

  ngOnInit(): void {
    debugger;
    if (
      this.Item == new CategoryDto() ||
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
    this.categoryServ.Create(this.form.value).subscribe(
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
    this.categoryServ.Update(this.form.value, 3).subscribe(
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

  buildForm(category: CategoryDto) {
    this.submitted = false;

    this.form = this.fb.group({
      id: [category?.id],
      name: [category?.name, Validators.required],
      displayOrder: [category?.displayOrder, Validators.required],
    });
  }

  close() {
    this.closeModal.emit(false);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
