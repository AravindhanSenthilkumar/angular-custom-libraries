import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { DynamicForm, Form, Field, WizardForm, FieldType, FloatLabel, Wizards } from 'dynamic-form';
import { DynamicTable, OrderBy, SearchAt, SearchOn, TableDetails, defaultPageSize, SearchRequest, SearchModel } from 'dynamic-table';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-root',
  imports: [DynamicForm, DynamicTable, NgxJsonViewerModule,JsonEditorComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public showForm: boolean = true;

  public showTable: boolean = false;

  public testDropdown = [
    { key: 'test', label: 'test' },
    { key: 'test1', label: 'test1' },
    { key: 'test2', label: 'test2' },
    { key: 'test3', label: 'test3' },
    { key: 'test4', label: 'test4' },
    { key: 'test5', label: 'test5' },
  ];

  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;
  /**
   * Desc : form controls initialization
   */
  public formElements: Form = {
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
        "numberOfColumns": 12,
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
        "numberOfColumns": 12,
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

  /**
   * desc : search form  
   */ 
  public searhForm: Form = {
    controls:[
      {
        type: FieldType.text,
        name: 'name',
        label: 'Name',
        value: '',
        markerInLabel: false,
        displayLabel: true,
        visible: true,
        outline: true,
        floatLabel: FloatLabel.always,
        numberOfColumns: 1
      },
      {
        type: FieldType.dropdown,
        name: 'department',
        label: 'Department',
        options: [
          { key: 'Engineering', label: 'Engineering' },
          { key: 'Marketing', label: 'Marketing' },
          { key: 'Sales', label: 'Sales' },
          { key: 'Human Resources', label: 'Human Resources' },
        ],
        value: 'Engineering',
        markerInLabel: false,
        displayLabel: true,
        visible: true,
        outline: true,
        floatLabel: FloatLabel.always,
        numberOfColumns: 1
      },
      {
        type: FieldType.email,
        name: 'email',
        label: 'Email',
        value: '',
        markerInLabel: false,
        displayLabel: true,
        visible: true,
        outline: true,
        floatLabel: FloatLabel.always,
        numberOfColumns: 1
      }
    ],
    outline:false
  }
  /**
   * form control for wizard
   */
  public wizardWindow: Wizards = {
    wizards : [
      {
        form: this.formElements,
        wizardName: 'firstForm'
      },
      {
        form: this.formElements,
        wizardName: 'secondform'
      },
      {
        form: this.formElements,
        wizardName: 'thirdform'
      }
    ],
    outline:true
  }

  /**
   * desc: sample table data
   */
  public sampleData:any =[
    {
        "id": 41,
        "name": "Angela Parker",
        "department": "Marketing",
        "email": "angela.parker@example.com",
        "joiningDate": "2022-04-01",
        "phone": "+1-202-555-0141",
        "location": "New York, NY",
        "salary": 75000,
        "position": "Marketing Specialist",
        "performanceRating": 4.5,
        "projects": ["Campaign A", "Social Media Strategy"]
    },
    {
        "id": 42,
        "name": "Bradley James",
        "department": "Sales",
        "email": "bradley.james@example.com",
        "joiningDate": "2021-11-15",
        "phone": "+1-202-555-0198",
        "location": "Los Angeles, CA",
        "salary": 85000,
        "position": "Sales Executive",
        "performanceRating": 4.2,
        "projects": ["Q1 Sales Drive", "Client Acquisition"]
    },
    {
        "id": 43,
        "name": "Cynthia Adams",
        "department": "Human Resources",
        "email": "cynthia.adams@example.com",
        "joiningDate": "2023-06-30",
        "phone": "+1-202-555-0174",
        "location": "Chicago, IL",
        "salary": 70000,
        "position": "HR Manager",
        "performanceRating": 4.8,
        "projects": ["Employee Engagement", "Training Program"]
    },
    {
        "id": 44,
        "name": "David Thompson",
        "department": "Finance",
        "email": "david.thompson@example.com",
        "joiningDate": "2020-09-12",
        "phone": "+1-202-555-0230",
        "location": "Houston, TX",
        "salary": 90000,
        "position": "Financial Analyst",
        "performanceRating": 4.6,
        "projects": ["Budget Planning", "Quarterly Reports"]
    },
    {
        "id": 45,
        "name": "Ella Robinson",
        "department": "IT",
        "email": "ella.robinson@example.com",
        "joiningDate": "2022-07-19",
        "phone": "+1-202-555-0115",
        "location": "San Francisco, CA",
        "salary": 95000,
        "position": "Software Engineer",
        "performanceRating": 4.3,
        "projects": ["App Development", "System Upgrade"]
    },
    {
        "id": 46,
        "name": "Freddie Harris",
        "department": "Engineering",
        "email": "freddie.harris@example.com",
        "joiningDate": "2021-05-22",
        "phone": "+1-202-555-0137",
        "location": "Phoenix, AZ",
        "salary": 88000,
        "position": "Civil Engineer",
        "performanceRating": 4.5,
        "projects": ["Bridge Construction", "Road Improvement"]
    },
    {
        "id": 47,
        "name": "Gabriella Martinez",
        "department": "Customer Support",
        "email": "gabriella.martinez@example.com",
        "joiningDate": "2023-02-05",
        "phone": "+1-202-555-0186",
        "location": "San Diego, CA",
        "salary": 65000,
        "position": "Customer Service Rep",
        "performanceRating": 4.7,
        "projects": ["Client Feedback Initiative", "Support Training"]
    },
    {
        "id": 48,
        "name": "Henry Clark",
        "department": "Legal",
        "email": "henry.clark@example.com",
        "joiningDate": "2020-12-09",
        "phone": "+1-202-555-0152",
        "location": "Dallas, TX",
        "salary": 100000,
        "position": "Legal Advisor",
        "performanceRating": 4.4,
        "projects": ["Contract Review", "Compliance Audits"]
    },
    {
        "id": 49,
        "name": "Isla Lee",
        "department": "Sales",
        "email": "isla.lee@example.com",
        "joiningDate": "2022-10-18",
        "phone": "+1-202-555-0149",
        "location": "Atlanta, GA",
        "salary": 78000,
        "position": "Account Manager",
        "performanceRating": 4.3,
        "projects": ["Client Retention", "Sales Strategy"]
    },
    {
        "id": 50,
        "name": "James Wright",
        "department": "Marketing",
        "email": "james.wright@example.com",
        "joiningDate": "2021-03-11",
        "phone": "+1-202-555-0160",
        "location": "Seattle, WA",
        "salary": 72000,
        "position": "Content Strategist",
        "performanceRating": 4.6,
        "projects": ["SEO Optimization", "Blog Management"]
    },
    {
        "id": 51,
        "name": "Katherine Green",
        "department": "Engineering",
        "email": "katherine.green@example.com",
        "joiningDate": "2022-01-24",
        "phone": "+1-202-555-0123",
        "location": "Miami, FL",
        "salary": 85000,
        "position": "Mechanical Engineer",
        "performanceRating": 4.5,
        "projects": ["Product Design", "Quality Assurance"]
    },
    {
        "id": 52,
        "name": "Liam Walker",
        "department": "Finance",
        "email": "liam.walker@example.com",
        "joiningDate": "2021-08-17",
        "phone": "+1-202-555-0147",
        "location": "Boston, MA",
        "salary": 92000,
        "position": "Budget Analyst",
        "performanceRating": 4.2,
        "projects": ["Forecasting", "Expense Tracking"]
    },
    {
        "id": 53,
        "name": "Mia Hall",
        "department": "Customer Support",
        "email": "mia.hall@example.com",
        "joiningDate": "2023-07-02",
        "phone": "+1-202-555-0201",
        "location": "Denver, CO",
        "salary": 67000,
        "position": "Support Specialist",
        "performanceRating": 4.6,
        "projects": ["Helpdesk Improvements", "User Training"]
    },
    {
        "id": 54,
        "name": "Noah Young",
        "department": "IT",
        "email": "noah.young@example.com",
        "joiningDate": "2020-04-16",
        "phone": "+1-202-555-0222",
        "location": "Orlando, FL",
        "salary": 90000,
        "position": "Network Engineer",
        "performanceRating": 4.4,
        "projects": ["Network Setup", "Security Audits"]
    },
    {
        "id": 55,
        "name": "Olivia Nelson",
        "department": "Marketing",
        "email": "olivia.nelson@example.com",
        "joiningDate": "2022-05-28",
        "phone": "+1-202-555-0191",
        "location": "Portland, OR",
        "salary": 74000,
        "position": "Digital Marketing Manager",
        "performanceRating": 4.3,
        "projects": ["Email Campaigns", "Market Research"]
    },
    {
        "id": 56,
        "name": "Peter King",
        "department": "Sales",
        "email": "peter.king@example.com",
        "joiningDate": "2021-09-05",
        "phone": "+1-202-555-0130",
        "location": "Las Vegas, NV",
        "salary": 80000,
        "position": "Sales Associate",
        "performanceRating": 4.2,
        "projects": ["Product Demos", "Lead Generation"]
    },
    {
        "id": 57,
        "name": "Quinn Wright",
        "department": "Human Resources",
        "email": "quinn.wright@example.com",
        "joiningDate": "2023-03-14",
        "phone": "+1-202-555-0119",
        "location": "Philadelphia, PA",
        "salary": 69000,
        "position": "Recruiter",
        "performanceRating": 4.5,
        "projects": ["Talent Acquisition", "Employee Onboarding"]
    },
    {
        "id": 58,
        "name": "Riley Turner",
        "department": "Finance",
        "email": "riley.turner@example.com",
        "joiningDate": "2021-02-20",
        "phone": "+1-202-555-0159",
        "location": "San Antonio, TX",
        "salary": 95000,
        "position": "Tax Consultant",
        "performanceRating": 4.6,
        "projects": ["Tax Preparation", "Financial Advising"]
    },
    {
        "id": 59,
        "name": "Sophia Mitchell",
        "department": "IT",
        "email": "sophia.mitchell@example.com",
        "joiningDate": "2022-12-30",
        "phone": "+1-202-555-0208",
        "location": "Charlotte, NC",
        "salary": 88000,
        "position": "DevOps Engineer",
        "performanceRating": 4.7,
        "projects": ["CI/CD Implementation", "Cloud Migration"]
    },
    {
        "id": 60,
        "name": "Thomas Hall",
        "department": "Engineering",
        "email": "thomas.hall@example.com",
        "joiningDate": "2021-04-14",
        "phone": "+1-202-555-0211",
        "location": "Columbus, OH",
        "salary": 83000,
        "position": "Electrical Engineer",
        "performanceRating": 4.5,
        "projects": ["Power Distribution", "Renewable Energy"]
    }
]

  public data = {
      data : this.sampleData,
      totalRecords: this.sampleData.length
  }

  public search: SearchModel = {
      formElements : this.searhForm,
      value: {},
      searchOn: SearchOn.MatchingColumns,
      searchAt: SearchAt.ClientSide
    }
  public pagination: SearchRequest = {
      offset:0,
      limit: defaultPageSize,
      searchQuery: this.search.value,
      sort: OrderBy.asc
    }
   
  public tableDetail: TableDetails = {
      paging : {
        enabled: true,
        pageSizeOptions: [defaultPageSize, 10, 40, 50, 100],
        pageNumber: this.pagination.offset,
        pageSize: this.pagination.limit
      },
      selectRequired: true,
      tableButtons:{add:true,delete:true,edit:true,view:true,export:true},
      columns: this.columnDetails(),
  }

  constructor(private _cd: ChangeDetectorRef) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
  }

  public columnDetails(){
    return [
      {
        columnDef: 'name',
        header: 'Name',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'department',
        header: 'Department',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'email',
        header: 'Email',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'joiningDate',
        header: 'JoiningDate',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'phone',
        header: 'Phone',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'location',
        header: 'Location',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'salary',
        header: 'Salary',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'position',
        header: 'Position',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'performanceRating',
        header: 'Performance Rating',
        isComplex: false,
        sortRequired: true,
        innerColumns: null
      },
      {
        columnDef: 'projects',
        header: 'Projects',
        isComplex: false,
        sortRequired: true,
        innerColumns: null,
        cell: (rec:any)=>{return rec.projects}
      }
    ]
  }
  /**
   * desc : cancel form
   */
  public cancelForm(): void {
    console.log('cancel');
  }
  /**
   * desc : cancel form
   */
  public cancelWizardForm(): void {
    console.log('cancel wizard');
  }
  /**
   * Desc : submitting the form
   */
  public submitForm(value: any): void {
    if (value) {
      console.log(value);
    }
  }
 /**
   * Desc : submitting the form
   */
 public submitWizard(value: any): void {
    if (value) {
      console.log(value);
    }
  }

  onChange(updatedJson: any) {
    console.log(updatedJson);
  }

  changeLog(event: any) {
    if(event && !event.type){
      this.showForm = false;
      this.showTable = false;
      setTimeout(() => {
          // form
          this.showForm = true;
          this.formElements = event;

          // table
          // this.showTable = true;
          // this.tableDetail = event;
          this._cd.detectChanges();
      },500);
    }
  }

    public onTableAction(event:any){
    switch(event.name){
      case 'create':
        console.log('create');
        console.log(event);
        break;
      case 'edit':
        console.log('edit');
        console.log(event);
        break;
      case 'delete':
        console.log('delete');
        console.log(event);
        break;
      case 'view':
        console.log('view');
        console.log(event);
        break;
      case 'serach':
        console.log('search');
        console.log(event);
        break;
      case 'pageChange':
        console.log('pageChange');
        console.log(event);
        break;
      case 'sortChange':
        console.log('sortChange');
        console.log(event);
        break;
      default:
        break;
    }
  }
  
  public ngOnDestroy(): void {
    
  }
}

