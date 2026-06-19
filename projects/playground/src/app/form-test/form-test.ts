import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DynamicForm, DynamicFormDetails, Form, Wizards } from 'dynamic-form';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FieldType, FloatLabel } from 'dynamic-form';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatButtonModule } from '@angular/material/button';
import { PopupBaseComponent } from 'dynamic-modal';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-form-test',
  standalone:true,
  imports: [DynamicForm,  NgxJsonViewerModule, JsonEditorComponent, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './form-test.html',
  styleUrl: './form-test.scss',
})
export class FormTest extends PopupBaseComponent{

  public jsonData: any;

  public updatedJsonValue: any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;
  /**
   * Desc : form controls initialization
   */
  public formData: Form = {
    "controls": [
      {
        "name": "Name",
        "type": FieldType.text,
        "outline": true,
        "label": "Name",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Enter your name",
        "readonly": false,
        "tooltip": "",
        "hint": "",
        "prefixIcon": "",
        "prefixText": "",
        "suffixIcon": "",
        "suffixText": "",
        "numberOfColumns": 2,
        "visible": true,
        "validators": {
          "required": true,
          "minLength": 2,
          "maxLength": 6,
          "pattern": ""
        }
      },
      {
        "name": "age",
        "type": FieldType.number,
        "outline": true,
        "label": "Age",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Enter your age",
        "readonly": false,
        "tooltip": "",
        "hint": "",
        "prefixIcon": "",
        "prefixText": "",
        "suffixIcon": "",
        "suffixText": "",
        "numberOfColumns": 10,
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "name": "mobileNumber",
        "type": FieldType.number,
        "outline": true,
        "label": "Mobile number",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Enter your mobile number",
        "readonly": false,
        "tooltip": "",
        "hint": "",
        "prefixIcon": "",
        "prefixText": "",
        "suffixIcon": "",
        "suffixText": "",
        "numberOfColumns": 12,
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "name": "country",
        "type": FieldType.dropdown,
        "outline": true,
        "label": "Country",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Choose country",
        "readonly": false,
        "tooltip": "",
        "hint": "",
        "prefixIcon": "",
        "prefixText": "",
        "suffixIcon": "",
        "suffixText": "",
        "numberOfColumns": 12,
        "multipleSelect": false,
        "OnChange": undefined,
        "options": [
          {
            "key": "IND",
            "label": "India"
          },
          {
            "key": "AUS",
            "label": "Australia"
          },
          {
            "key": "Eng",
            "label": "England"
          }
        ],
        "autoComplete": true,
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "type": FieldType.radio,
        "name": "MaritalStatus",
        "label": "Marital Status",
        "options": [
          {
            "key": "Married",
            "label": "Married"
          },
          {
            "key": "Single",
            "label": "Single"
          }
        ],
        "readonly": false,
        "displayLabel": true,
        "outline": true,
        "markerInLabel": true,
        "numberOfColumns": 12,
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "type": FieldType.radio,
        "name": "Gender",
        "label": "Gender",
        "options": [
          {
            "key": "Male",
            "label": "Male"
          },
          {
            "key": "Female",
            "label": "Female"
          },
          {
            "key": "Others",
            "label": "Others"
          }
        ],
        "readonly": false,
        "displayLabel": true,
        "outline": true,
        "markerInLabel": true,
        "numberOfColumns": 12,
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "name": "Preferedlocation",
        "type": FieldType.dropdown,
        "outline": true,
        "label": "Prefered Location",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Choose Location",
        "readonly": false,
        "tooltip": "",
        "hint": "",
        "prefixIcon": "",
        "prefixText": "",
        "suffixIcon": "",
        "suffixText": "",
        "numberOfColumns": 12,
        "multipleSelect": true,
        "options": [
          {
            "key": "IND",
            "label": "India"
          },
          {
            "key": "AUS",
            "label": "Australia"
          },
          {
            "key": "Eng",
            "label": "England"
          }
        ],
        "autoComplete": true,
        "visible": true,
        "validators": {
          "required": true
        }
      }
    ],
    "buttons": {
      "submit": {
        "visible": true,
        "name": "submit"
      },
      "cancel": {
        "visible": true,
        "name": "cancel"
      },
      "reset": {
        "visible": true,
        "name": "reset"
      }
    },
    "outline": false
  };

  public masterData: any =      {
      name: 'name',
      type: FieldType.text,
      outline: false,
      label: "name",
      displayLabel: true,
      markerInLabel: true,
      floatLabel: FloatLabel.always,
      value: "",
      placeholder: "Enter name",
      readonly: false,
      tooltip: "",
      hint: "",
      prefixIcon: "",
      prefixText: "",
      suffixText: "",
      suffixIcon: "",
      numberOfColumns: 3,
      visible: true,
      OnChange: ()=> this.fieldOnChange.bind(this),
      options: [],
      multipleSelect: false,
      autoComplete: false,
      onUpload: ()=> this.onUpload.bind(this),
      rangeMinimum: 0,
      rangeMaximum: 0,
      rangeStepper: 0,
      linkOnly: false,
      validators: {
          min: 0,
          max: 0,
          required: false,
          requiredTrue: false,
          email: false,
          minLength: 0,
          maxLength: 0,
          pattern: '',
          nullValidator: false,
          jsonValidator: false,
          duplicateValidator: false,
      },
      children: []
  }

  public dynamicFormDetails: DynamicFormDetails = {
    formComponent: this.formData
  }

  constructor(private _cd: ChangeDetectorRef) {
    super()
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code'];
    this.jsonData = this.formData;
    this.updatedJsonValue = this.jsonData;
    this.dynamicFormDetails = {
      ...this.dynamicFormDetails,
      formComponent: structuredClone(this.formData)
    };
  }
  /**
   * desc : cancel form
   */
  public cancelForm(): void {
    console.log('cancel');
  }
  /**
   * Desc : submitting the form
   */
  public submitForm(value: any): void {
    if (value) {
      console.log(value);
    }
  }

  changeLog(event: any) {
    if (event && !event.type) {
      setTimeout(() => {
        this.updatedJsonValue = event;
        console.log(this.updatedJsonValue);
        this._cd.detectChanges();
      }, 500);
    }
  }

  public resetJsonData() {
    this.dynamicFormDetails = {
      ...this.dynamicFormDetails,
      formComponent: structuredClone(this.formData)
    };
    this.jsonData = structuredClone(this.formData);
    this.updatedJsonValue = structuredClone(this.formData);
  }

  public generateComponent() {
    this.dynamicFormDetails = {
      ...this.dynamicFormDetails,
      formComponent: structuredClone(this.updatedJsonValue)
    };
    this.jsonData = structuredClone(this.updatedJsonValue);
  }

  public fieldOnChange(event:any){
    console.log(event);
  }

  public onUpload(event:any){
    console.log(event);
  }
}
