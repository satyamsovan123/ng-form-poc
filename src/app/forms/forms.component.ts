import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../services/form-validation.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  error: boolean = false;
  errorMessages: string = "";
  form1!: FormGroup;
  // form2!: FormGroup;

  form2List: [FormGroup] | any = [];

  form3List: [FormGroup] | any = [];

  f2s = [
    {
      name: 'name1',
      state:'state1',
      dlNumber: 'DL71231',
      zipCode: '092811',
      relationship: 'son1',
      primaryDriver: true,
      customId: '1'
    },
    {
      name: 'name2',
      state:'state2',
      dlNumber: 'DL71232',
      zipCode: '092812',
      relationship: 'son2',
      primaryDriver: false,
      customId: '2'

    },
    {
      name: 'name3',
      state:'state23',
      dlNumber: 'DL12323',
      zipCode: '0928123',
      relationship: 'son3',
      primaryDriver: true,
      customId: '3'

    }
  ];

  f2sBackup: [] = [];
  f3sBackup: [] = [];


  f3s = [
    {
      del: true,
      name: 'name4',
      state:'state24',
      dlNumber: 'DL12324',
      zipCode: '0928124',
      relationship: 'son4',
      primaryDriver: false,
      customId: '4'

    }
  ];

  f1: {} = {
    name: 'name',
    state:'state',
    dlNumber: 'DL77123',
    zipCode: '09281',
    customId: '0'

  }
  constructor(private formValidationService: FormValidationService) { }

  ngOnInit(): void {
    this.createForm1();
    this.setForm1()

    //  this.createForm2();
    // this.setForm2(this.fs[1])

    this.generateForm2();

    this.generateForm3();

   
    
    this.backupData()

    // this.checkChangesInZipCode(this.form1);
    // this.form2List.forEach((element: any)=> {
    //   this.checkChangesInZipCode(element);
    // })

    // this.form3List.forEach((element: any)=> {
    //   this.checkChangesInZipCode(element);
    // })
  }

  generateForm2() {
    this.f2s.forEach((element) => {
      this.form2List.push(this.generateBaseForm2());
    })

    this.form2List.forEach((element: any, index: any) => {
      element.patchValue(this.f2s[index]);
    })
  }

  generateForm3() {
    this.f3s.forEach((element) => {
      this.form3List.push(this.generateBaseForm2());
    })

    this.form3List.forEach((element: any, index: any) => {
      element.patchValue(this.f3s[index]);
    })
  }

  backupData() {
    this.f2sBackup = JSON.parse(JSON.stringify(this.f2s));
    this.f3sBackup = JSON.parse(JSON.stringify(this.f3s));
    Array.prototype.push.apply(this.f2sBackup, this.f3sBackup ); 
  }

  checkChangesInZipCode(form: any) {
    form.get('zipCode')?.valueChanges.subscribe((value: any) => {
      if(Number(value) %2 === 0) {
        form.controls['message'].setValidators([Validators.required]);
        form.controls['message'].updateValueAndValidity();
      } else {
        form.controls['message'].removeValidators([Validators.required])
        form.controls['message'].updateValueAndValidity();
      }
    })
    form.controls['message'].updateValueAndValidity();
  }

  createForm1() {
    this.form1 = new FormGroup({
      name: new FormControl('', [Validators.required, this.formValidationService.alphaNumericString()]),
      state: new FormControl('',[Validators.required]),
      customId: new FormControl(''),
      message: new FormControl(''),
      dlNumber: new FormControl('',[Validators.required, this.formValidationService.alphaNumericString(), this.formValidationService.length7()]),
      zipCode: new FormControl('',[Validators.required, this.formValidationService.alphaNumericString(), this.formValidationService.alphaNumericString()]),
    });
  }

  setForm1() {
    this.form1.patchValue(this.f1)
  }

  generateBaseForm2() {
    return new FormGroup({
      isChecked: new FormControl(false),
      customId: new FormControl(''),
      name: new FormControl('', [Validators.required, this.formValidationService.alphaNumericString()]),
      state: new FormControl('',[Validators.required]),
      dlNumber: new FormControl('',[Validators.required, this.formValidationService.alphaNumericString(), this.formValidationService.length7()]),
      zipCode: new FormControl('',[Validators.required, this.formValidationService.alphaNumericString()]),
      relationship: new FormControl('',[Validators.required]),
      primaryDriver: new FormControl(false,[]),
      message: new FormControl(''),
    });
  }

  checkErrorsInForms(form: any) {
    let error = false;
    Object.keys(form.controls).forEach((key: any) => {
      if(form.get(key)?.errors)
        error = error || true;
        console.log(key, form.get(key)?.errors);
        this.errorMessages = `Please check ${key}`;
        return
    })
    return error;
  }

  onSubmit() {
    // this.error = this.error && 
    console.log("Checking errors in form 1");
    this.error = this.error || this.checkErrorsInForms(this.form1);
    if(this.error) return;

    console.log("Checking errors in form 2");
    this.form2List.forEach((element: any) => {
      this.error = this.error || this.checkErrorsInForms(element);
    })
    if(this.error) return;

    console.log("Checking errors in form 3");
    this.form3List.forEach((element: any) => {
      this.error = this.error || this.checkErrorsInForms(element);
    })
    if(this.error) return;

    console.log("error? ", this.error);
    
    console.table(this.form1.value);
    this.form2List.forEach((element: any) => {
      console.table(element.value);
    });

    this.form3List.forEach((element: any) => {
      console.table(element.value);
    });

    // console.log(this.form3List);
    // console.log(this.f2sBackup);
    // console.log(this.form3List);
  }

  onAdd() {
    this.form2List.push(this.generateBaseForm2());
  }

  onDelete() {
    const uncheckedElement = this.form2List.filter((element: any) => {
      return !element.value['isChecked']
  })

  const checkedElement = this.form2List.filter((element: any) => {
    return element.value['isChecked']
})

  this.form2List = uncheckedElement;
  // checkedElement.forEach((element: any) => {
  //   this.form3List.push(element);
  // })


  checkedElement.forEach((chEl: any) => {
    this.f2sBackup.forEach((bkEl: any) => { 
      if(chEl.value.customId === bkEl.customId) {
        chEl.patchValue(bkEl);
        this.form3List.push(chEl);
      }
    })
  })


  this.uncheckAll(this.form3List);


  }

  onActivate() {
    const uncheckedElement = this.form3List.filter((element: any) => {
      return !element.value['isChecked']
  })

  const checkedElement = this.form3List.filter((element: any) => {
    return element.value['isChecked']
})

  this.form3List = uncheckedElement;
  checkedElement.forEach((element: any) => {
    this.form2List.push(element);
  })

  this.uncheckAll(this.form2List);


  }

  uncheckAll(formList: any) {
    // this.form1.get('primaryDriver')?.patchValue(false);
    formList.forEach((element: any) => {
      // element.isChecked.patchValue(false)
      element.get('isChecked')?.patchValue(false);

  })
  }

  onReset() {
    this.ngOnInit();
  }

  checkUniqueDlNumber() {
  }

  // createForm2() {
  //   this.form2 = new FormGroup({
  //     isChecked: new FormControl(false),
  //     name: new FormControl('', [Validators.required, this.formValidationService.alphaNumericString()]),
  //     state: new FormControl('',[Validators.required]),
  //     dlNumber: new FormControl('',[Validators.required, this.formValidationService.alphaNumericString(), this.formValidationService.length7()]),
  //     zipCode: new FormControl('',[Validators.required, this.formValidationService.alphaNumericString()]),
  //     relationship: new FormControl('',[Validators.required]),
  //     primaryDriver: new FormControl(false,[]),
  //   });
  // }

  // setForm2(form: any) {
  //   this.form2.patchValue(form)
  // }

}
