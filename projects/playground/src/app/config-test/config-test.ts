import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FieldType, FloatLabel } from 'devlab-one-dynamic-form';
import { DynamicTable, SearchAt, SearchOn } from 'devlab-one-dynamic-table';
import { AlertService } from 'devlab-one-dynamic-alert';
import { SnackbarService } from 'devlab-one-dynamic-toast';
import { DynamicDataTable, DataTable } from 'devlab-one-dynamic-data-table';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

export enum Justify {
    left = "left",
    right = "right",
    center = "center"
}

@Component({
  selector: 'app-config-test',
  imports: [DynamicDataTable,  NgxJsonViewerModule, JsonEditorComponent, MatButtonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './config-test.html',
  styleUrl: './config-test.scss',
})
export class ConfigTest {

  public jsonDatas: any;

  public updatedJsonValue: any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;

  public data: any =  [
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
  
  public masterJsonData: DataTable = {
    tableDataFields :  {
      formComponent: {
          "controls": [
             {
              type: FieldType.number,
              name: 'id',
              label: 'ID',
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: false,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12,
              readonly: true
            },
            {
              type: FieldType.text,
              name: 'name',
              label: 'Name',
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              placeholder:"Enter employee name",
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.dropdown,
              name: 'department',
              label: 'Department',
              placeholder:"Choose department",
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
              numberOfColumns: 12
            },
            {
              type: FieldType.email,
              name: 'email',
              label: 'Email',
              value: '',
              placeholder:"enter email",
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.date,
              name: 'joiningDate',
              label: 'Joining Date',
              placeholder:"Enter joining date",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.tel,
              name: 'phone',
              label: 'Mobile',
              placeholder:"Enter Mobile number",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.text,
              name: 'location',
              label: 'Location',
              placeholder:"Choose Location",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.number,
              name: 'salary',
              label: 'Salary',
               placeholder:"Provide Salary",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.dropdown,
              name: 'position',
              label: 'Position',
              placeholder:"Choose Position",
              options: [
                { key: 'Marketing Specialist', label: 'Marketing Specialist' },
                { key: 'HR Manager', label: 'HR Manager' },
                { key: 'Financial Analyst', label: 'Financial Analyst' },
                { key: 'Software Engineer', label: 'Software Engineer' },
              ],
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              multipleSelect:false,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.number,
              name: 'performanceRating',
              label: 'Performance Rating',
              placeholder:"Provide rating",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.dropdown,
              name: 'projects',
              label: 'Projects',
              placeholder: 'Choose projects',
              options: [
                { key: 'Campaign A', label: 'Campaign A' },
                { key: 'Social Media Strategy', label: 'Social Media Strategy' },
                { key: 'Q1 Sales Drive', label: 'Q1 Sales Drive' },
                { key: 'Client Acquisition', label: 'Client Acquisition' },
              ],
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              multipleSelect:true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
          ],
          "buttons": {
            "submit": {
              "visible": true,
              "name": "submit"
            },
            "cancel": {
              "visible": true,
              "name": "cancel"
            }
          },
        "outline": false
      }
    },
    tableSearch :{
      formElements:  {
        controls: [
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
            numberOfColumns: 3
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
            numberOfColumns: 3
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
            numberOfColumns: 3
          }
        ],
          outline: false
      },
      value: {},
      searchOn: SearchOn.MatchingColumns,
      searchAt: SearchAt.ClientSide
    },
    tableData :{
      data: this.data,
      totalRecords: this.data.length
    },
    tableConfig :{
      paging: {
        enabled: true,
        pageSizeOptions: [5, 10, 40, 50, 100],
        pageNumber: 0,
        pageSize: 5
      },
      selectRequired: true,
      tableButtons: { add: true, delete: true, edit: true, view: true, export: true },
      columns: [
        {
        columnDef: 'id',
        header: 'Id',
        isComplex: false,
        sortRequired: true,
        innerColumns: null,
        },
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
          cell: (rec: any) => { return rec.projects }
        }
      ],
    },
    serverSidePagination: {
      offset: 0,
      limit: 0
    },
    popupDetails:{
      addForm: {
        title: 'Add Employee ',
        width: 800,
        justify: Justify.center
      },
      editForm: {
        title: 'Edit Employee',
        width: 800,
        justify: Justify.center
      }
    }
  }
  /**
   * Desc : dynamic data table input
   */
  public jsonData:DataTable = {
    tableDataFields :  {
      formComponent: {
          "controls": [
             {
              type: FieldType.number,
              name: 'id',
              label: 'ID',
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: false,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12,
              readonly: true
            },
            {
              type: FieldType.text,
              name: 'name',
              label: 'Name',
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              placeholder:"Enter employee name",
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.dropdown,
              name: 'department',
              label: 'Department',
              placeholder:"Choose department",
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
              numberOfColumns: 12
            },
            {
              type: FieldType.email,
              name: 'email',
              label: 'Email',
              value: '',
              placeholder:"enter email",
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.date,
              name: 'joiningDate',
              label: 'Joining Date',
              placeholder:"Enter joining date",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.tel,
              name: 'phone',
              label: 'Mobile',
              placeholder:"Enter Mobile number",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.text,
              name: 'location',
              label: 'Location',
              placeholder:"Choose Location",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.number,
              name: 'salary',
              label: 'Salary',
               placeholder:"Provide Salary",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.dropdown,
              name: 'position',
              label: 'Position',
              placeholder:"Choose Position",
              options: [
                { key: 'Marketing Specialist', label: 'Marketing Specialist' },
                { key: 'HR Manager', label: 'HR Manager' },
                { key: 'Financial Analyst', label: 'Financial Analyst' },
                { key: 'Software Engineer', label: 'Software Engineer' },
              ],
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              multipleSelect:false,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.number,
              name: 'performanceRating',
              label: 'Performance Rating',
              placeholder:"Provide rating",
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
            {
              type: FieldType.dropdown,
              name: 'projects',
              label: 'Projects',
              placeholder: 'Choose projects',
              options: [
                { key: 'Campaign A', label: 'Campaign A' },
                { key: 'Social Media Strategy', label: 'Social Media Strategy' },
                { key: 'Q1 Sales Drive', label: 'Q1 Sales Drive' },
                { key: 'Client Acquisition', label: 'Client Acquisition' },
              ],
              value: '',
              markerInLabel: false,
              displayLabel: true,
              visible: true,
              outline: true,
              multipleSelect:true,
              floatLabel: FloatLabel.always,
              numberOfColumns: 12
            },
          ],
          "buttons": {
            "submit": {
              "visible": true,
              "name": "submit"
            },
            "cancel": {
              "visible": true,
              "name": "cancel"
            }
          },
        "outline": false
      }
    },
    tableSearch :{
      formElements:  {
        controls: [
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
            numberOfColumns: 3
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
            numberOfColumns: 3
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
            numberOfColumns: 3
          }
        ],
          outline: false
      },
      value: {},
      searchOn: SearchOn.MatchingColumns,
      searchAt: SearchAt.ClientSide
    },
    tableData :{
      data: this.data,
      totalRecords: this.data.length
    },
    tableConfig :{
      paging: {
        enabled: true,
        pageSizeOptions: [5, 10, 40, 50, 100],
        pageNumber: 0,
        pageSize: 5
      },
      selectRequired: true,
      tableButtons: { add: true, delete: true, edit: true, view: true, export: true },
      columns: [
        {
        columnDef: 'id',
        header: 'Id',
        isComplex: false,
        sortRequired: true,
        innerColumns: null,
        },
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
          cell: (rec: any) => { return rec.projects }
        }
      ],
    },
    serverSidePagination: {
      offset: 0,
      limit: 0
    },
    popupDetails:{
      addForm: {
        title: 'Add Employee ',
        width: 800,
        justify: Justify.center
      },
      editForm: {
        title: 'Edit Employee',
        width: 800,
        justify: Justify.center
      }
    }
  }

  constructor(
    private alertService: AlertService,
    private snackBarService: SnackbarService,
    private cdr: ChangeDetectorRef
  ){
      this.editorOptions = new JsonEditorOptions()
      this.editorOptions.mode = 'code';
      this.editorOptions.modes = ['code'];
      this.jsonDatas = this.jsonData;
      this.updatedJsonValue = this.jsonDatas;
      this.jsonDatas = {
        ...this.jsonData,
        tableDataFields: this.jsonData.tableDataFields,
        tableSearch:this.jsonData.tableSearch,
        tableData:this.jsonData.tableData,
        tableConfig:this.jsonData.tableConfig,
        serverSidePagination:this.jsonData.serverSidePagination,
        popupDetails:this.jsonData.popupDetails
      }
    }

  public onTableAction(event: any) {
    switch (event.name) {
      case 'create':
        event.value['id'] = Math.floor(Math.random() * 1000000);
        if (this.jsonData.tableData.data) {
           this.jsonData.tableData.data.push(event.value);
            this.jsonData = {
              ...this.jsonData,
              tableData:{
                ...this.jsonData.tableData,
                data: this.jsonData.tableData.data,
                totalRecords: this.jsonData.tableData.data.length
              }
            }
            this.snackBarService.success('Added Successfully');
        }

        break;
      case 'edit':
          const updatedData = this.jsonData.tableData.data.map(data =>
            data.id === event.value.id
              ? { ...data, ...event.value }
              : data
          );
          this.jsonData = {
              ...this.jsonData,
              tableData:{
                ...this.jsonData.tableData,
                data: updatedData,
                totalRecords: updatedData.length
                
              }
            }
            this.snackBarService.success('Edited Successfully');
        break;
      case 'delete':
          this.alertService.confirmationModel(`Are you sure to delete Employee "${event.value.name}"`, ()=>{
            const remainingData = this.jsonData.tableData.data.filter(
            data => data.id !== event.value.id
          );
           this.jsonData = {
              ...this.jsonData,
              tableData:{
                ...this.jsonData.tableData,
                data: remainingData,
                totalRecords: remainingData.length
                
              }
            }
            this.snackBarService.success('Deleted Successfully');
        },
        ()=>{

        }
      )
       
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

  changeLog(event: any) {
    if (event && !event.type) {
      setTimeout(() => {
        this.updatedJsonValue = event;
        this.cdr.detectChanges();
      }, 500);
    }
  }


  public resetJsonData() {
    this.jsonDatas = {
        ...this.jsonData,
        tableDataFields: structuredClone(this.jsonData.tableDataFields),
        tableSearch:structuredClone(this.jsonData.tableSearch),
        tableData:structuredClone(this.jsonData.tableData),
        tableConfig:structuredClone(this.jsonData.tableConfig),
        serverSidePagination:structuredClone(this.jsonData.serverSidePagination),
        popupDetails:structuredClone(this.jsonData.popupDetails)
    }
    this.jsonDatas = structuredClone(this.masterJsonData);
    this.updatedJsonValue = structuredClone(this.masterJsonData);
  }

  public generateComponent() {
    this.jsonDatas = {
        ...this.jsonData,
        tableDataFields: structuredClone(this.updatedJsonValue.tableDataFields),
        tableSearch:structuredClone(this.updatedJsonValue.tableSearch),
        tableData:structuredClone(this.updatedJsonValue.tableData),
        tableConfig:structuredClone(this.updatedJsonValue.tableConfig),
        serverSidePagination:structuredClone(this.updatedJsonValue.serverSidePagination),
        popupDetails:structuredClone(this.updatedJsonValue.popupDetails)
    }
    this.jsonData = structuredClone(this.updatedJsonValue);
  }

}