import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DynamicForm, DynamicFormDetails, Form, Wizards } from 'devlab-one-dynamic-form';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FieldType, FloatLabel } from 'devlab-one-dynamic-form';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatButtonModule } from '@angular/material/button';
import { PopupBaseComponent } from 'devlab-one-dynamic-modal';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-form-test',
  standalone: true,
  imports: [DynamicForm, NgxJsonViewerModule, JsonEditorComponent, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './form-test.html',
  styleUrl: './form-test.scss',
})
export class FormTest extends PopupBaseComponent {

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
        "name": "fullName",
        "type": FieldType.text,
        "outline": true,
        "label": "Full Name",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Enter your full name",
        "readonly": false,
        "tooltip": "Enter first and last name",
        "hint": "e.g. John Doe",
        "prefixIcon": "person",
        "numberOfColumns": 6,
        "visible": true,
        "validators": {
          "required": true,
          "minLength": 2,
          "maxLength": 50
        }
      },
      {
        "name": "password",
        "type": FieldType.password,
        "outline": true,
        "label": "Password",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Enter secure password",
        "readonly": false,
        "prefixIcon": "lock",
        "numberOfColumns": 6,
        "visible": true,
        "validators": {
          "required": true,
          "minLength": 6
        }
      },
      {
        "name": "email",
        "type": FieldType.email,
        "outline": true,
        "label": "Email Address",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "john.doe@example.com",
        "readonly": false,
        "prefixIcon": "email",
        "numberOfColumns": 6,
        "visible": true,
        "validators": {
          "required": true,
          "email": true
        }
      },
      {
        "name": "phone",
        "type": FieldType.tel,
        "outline": true,
        "label": "Mobile Phone",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Enter phone number",
        "prefixIcon": "phone",
        "countryCodes": [
          { "code": "+91", "country": "India", "label": "+91 (India)" },
          { "code": "+1", "country": "United States", "label": "+1 (US)" },
          { "code": "+44", "country": "United Kingdom", "label": "+44 (UK)" },
          { "code": "+61", "country": "Australia", "label": "+61 (AU)" },
          { "code": "+971", "country": "UAE", "label": "+971 (UAE)" }
        ],
        "numberOfColumns": 6,
        "visible": true,
        "validators": {
          "required": true,
          "minLength": 10,
          "maxLength": 10
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
        "value": 25,
        "placeholder": "Enter age",
        "numberOfColumns": 4,
        "visible": true,
        "validators": {
          "required": true,
          "min": 18,
          "max": 100
        }
      },
      {
        "name": "website",
        "type": FieldType.url,
        "outline": true,
        "label": "Website URL",
        "markerInLabel": false,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "https://example.com",
        "prefixIcon": "language",
        "numberOfColumns": 4,
        "visible": true
      },
      {
        "name": "themeColor",
        "type": FieldType.color,
        "outline": true,
        "label": "Preferred Color",
        "markerInLabel": false,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "#3f51b5",
        "numberOfColumns": 4,
        "visible": true
      },
      {
        "name": "birthDate",
        "type": FieldType.date,
        "outline": true,
        "label": "Date of Birth",
        "markerInLabel": true,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Select birth date",
        "numberOfColumns": 6,
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "name": "preferredTime",
        "type": FieldType.time,
        "outline": true,
        "label": "Preferred Time",
        "markerInLabel": false,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "10:30 AM IST",
        "timeZones": [
          { "code": "IST", "label": "IST (UTC+05:30)", "offset": "+05:30" },
          { "code": "ET", "label": "ET / EST (UTC-05:00)", "offset": "-05:00" },
          { "code": "CT", "label": "CT / CST (UTC-06:00)", "offset": "-06:00" },
          { "code": "PT", "label": "PT / PST (UTC-08:00)", "offset": "-08:00" },
          { "code": "UTC", "label": "UTC (UTC+00:00)", "offset": "+00:00" }
        ],
        "numberOfColumns": 6,
        "visible": true
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
        "numberOfColumns": 6,
        "multipleSelect": false,
        "autoComplete": true,
        "options": [
          { "key": "IND", "label": "India" },
          { "key": "USA", "label": "United States" },
          { "key": "UK", "label": "United Kingdom" },
          { "key": "AUS", "label": "Australia" }
        ],
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "name": "preferredLocations",
        "type": FieldType.dropdown,
        "outline": true,
        "label": "Preferred Job Locations (Multi-Select)",
        "markerInLabel": false,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": [],
        "placeholder": "Select multiple locations",
        "numberOfColumns": 6,
        "multipleSelect": true,
        "autoComplete": true,
        "options": [
          { "key": "NY", "label": "New York" },
          { "key": "SF", "label": "San Francisco" },
          { "key": "LON", "label": "London" },
          { "key": "BLR", "label": "Bangalore" }
        ],
        "visible": true
      },
      {
        "name": "gender",
        "type": FieldType.radio,
        "outline": true,
        "label": "Gender",
        "markerInLabel": true,
        "displayLabel": true,
        "numberOfColumns": 6,
        "options": [
          { "key": "Male", "label": "Male" },
          { "key": "Female", "label": "Female" },
          { "key": "Other", "label": "Other" }
        ],
        "visible": true,
        "validators": {
          "required": true
        }
      },
      {
        "name": "maritalStatus",
        "type": FieldType.radio,
        "outline": true,
        "label": "Marital Status",
        "markerInLabel": false,
        "displayLabel": true,
        "numberOfColumns": 6,
        "options": [
          { "key": "Single", "label": "Single" },
          { "key": "Married", "label": "Married" }
        ],
        "visible": true
      },
      {
        "name": "experienceLevel",
        "type": FieldType.range,
        "outline": true,
        "label": "Experience Level (Years)",
        "displayLabel": true,
        "rangeMinimum": 0,
        "rangeMaximum": 20,
        "rangeStepper": 1,
        "value": 5,
        "numberOfColumns": 6,
        "visible": true
      },
      {
        "name": "enableNotifications",
        "type": FieldType.slideToggle,
        "outline": true,
        "label": "Enable Email Notifications",
        "displayLabel": true,
        "value": true,
        "numberOfColumns": 6,
        "visible": true
      },
      {
        "name": "resume",
        "type": FieldType.file,
        "outline": true,
        "label": "Upload Resume",
        "displayLabel": true,
        "numberOfColumns": 6,
        "visible": true
      },
      {
        "name": "acceptTerms",
        "type": FieldType.checkbox,
        "outline": true,
        "label": "I accept terms & conditions",
        "displayLabel": true,
        "value": false,
        "numberOfColumns": 6,
        "visible": true,
        "validators": {
          "requiredTrue": true
        }
      },
      {
        "name": "bio",
        "type": FieldType.textArea,
        "outline": true,
        "label": "Professional Bio",
        "markerInLabel": false,
        "displayLabel": true,
        "floatLabel": FloatLabel.always,
        "value": "",
        "placeholder": "Write a short summary about yourself...",
        "numberOfColumns": 12,
        "visible": true,
        "validators": {
          "maxLength": 500
        }
      },
      {
        "name": "emergencyContact",
        "type": FieldType.group,
        "outline": true,
        "label": "Emergency Contact (Form Group)",
        "displayLabel": true,
        "numberOfColumns": 12,
        "visible": true,
        "children": [
          {
            "name": "contactName",
            "type": FieldType.text,
            "outline": true,
            "label": "Contact Person Name",
            "displayLabel": true,
            "floatLabel": FloatLabel.always,
            "value": "",
            "placeholder": "Enter contact name",
            "numberOfColumns": 6,
            "visible": true
          },
          {
            "name": "contactPhone",
            "type": FieldType.tel,
            "outline": true,
            "label": "Contact Person Phone",
            "displayLabel": true,
            "floatLabel": FloatLabel.always,
            "value": "",
            "placeholder": "Enter contact phone",
            "numberOfColumns": 6,
            "visible": true
          }
        ]
      },
      {
        "name": "workHistory",
        "type": FieldType.array,
        "outline": true,
        "label": "Work History (Form Array)",
        "displayLabel": true,
        "numberOfColumns": 12,
        "visible": true,
        "children": [
          {
            "name": "company",
            "type": FieldType.text,
            "outline": true,
            "label": "Company Name",
            "displayLabel": true,
            "value": "",
            "floatLabel": FloatLabel.always,
            "placeholder": "Enter company name",
            "numberOfColumns": 6,
            "visible": true
          },
          {
            "name": "role",
            "type": FieldType.text,
            "outline": true,
            "label": "Job Title / Role",
            "displayLabel": true,
            "value": "",
            "floatLabel": FloatLabel.always,
            "placeholder": "Enter job title",
            "numberOfColumns": 6,
            "visible": true
          }
        ]
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
    "outline": true
  };

  public masterData: any = {
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
    OnChange: () => this.fieldOnChange.bind(this),
    options: [],
    multipleSelect: false,
    autoComplete: false,
    onUpload: () => this.onUpload.bind(this),
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

  public fieldOnChange(event: any) {
    console.log(event);
  }

  public onUpload(event: any) {
    console.log(event);
  }
}
