import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DynamicForm, DynamicFormDetails, FieldType, FloatLabel, Form, Wizards } from 'devlab-one-dynamic-form';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-wizard-test',
  imports: [DynamicForm, NgxJsonViewerModule, JsonEditorComponent,MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './wizard-test.html',
  styleUrl: './wizard-test.scss',
})
export class WizardTest {

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

  public wizardData: Wizards = {
    wizards: [
      {
        form: this.formData,
        wizardName: 'firstForm'
      },
      {
        form: this.formData,
        wizardName: 'secondform'
      },
      {
        form: this.formData,
        wizardName: 'thirdform'
      }
    ],
    outline: true
  }

  public dynamicFormDetails: DynamicFormDetails = {
    wizardComponent : this.wizardData
  }

  constructor(private _cd: ChangeDetectorRef) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code'];
    this.jsonData = this.wizardData;
    this.updatedJsonValue = this.jsonData;
    this.dynamicFormDetails = {
      ...this.dynamicFormDetails,
      wizardComponent: structuredClone(this.wizardData)
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
        this._cd.detectChanges();
      }, 500);
    }
  }

  public resetJsonData() {
    this.dynamicFormDetails = {
      ...this.dynamicFormDetails,
      wizardComponent: structuredClone(this.wizardData)
    };
    this.jsonData = structuredClone(this.wizardData);
    this.updatedJsonValue = structuredClone(this.wizardData);
  }

  public generateComponent() {
    this.dynamicFormDetails = {
        ...this.dynamicFormDetails,
        wizardComponent: structuredClone(this.updatedJsonValue)
    };
    this.jsonData = structuredClone(this.updatedJsonValue);
  }

  public ngOnDestroy(): void {

  }
}
