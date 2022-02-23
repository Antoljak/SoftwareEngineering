import {Component, OnDestroy, OnInit, ViewChild, AfterViewInit,	ElementRef} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StudentDialog} from "./student-dialog/student-dialog.component";
import {StudentsService} from "./students.service";
import {Student} from "./student";
import {Subscription} from "rxjs";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild( 'editor',{static:false} ) editor;

  public editorData = '<p>Note it!</p>'
	public isSourceActive: boolean;
	public sourceData: string;
  // displayedColumns = ['name', 'age'];
  // dataSource: Student[] = [];
  // getAllSubscription: Subscription;
  // dialogSubscription: Subscription;

  constructor(public dialog: MatDialog) {}

  // openEditDialog(st: Student) {
  //   this.openDialog(new Student(st.id, st.name, st.age));
  // }

  // openNewDialog(): void {
  //   this.openDialog(new Student());
  // }

  // private openDialog(st: Student): void {
  //   this.dialogSubscription = this.dialog
  //     .open(StudentDialog, {data: st, minWidth: '30%'})
  //     .afterClosed().subscribe(() => this.loadStudentsList());
  // }

  // private loadStudentsList(): void {
  //   this.getAllSubscription = this.service.getAll()
  //     .subscribe(students => this.dataSource = students);
  // }

  // ngOnInit(): void {
  //   this.loadStudentsList();
  // }

  // ngOnDestroy(): void {
  //   this.getAllSubscription.unsubscribe();
  //   if (this.dialogSubscription) {
  //     this.dialogSubscription.unsubscribe();
  //   }
  // }

  ngAfterViewInit() {
		this.editor.dataChange.subscribe( ( value ) => {
			if ( !this.isSourceActive ) {
				this.sourceData = value;
			}
		} );
	}
}

// export class EditorBindingComponent implements AfterViewInit {
// 	@ViewChild( 'editor',{static:false} ) editor;

// 	public editorData = '<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>'

// 	public isSourceActive: boolean;

// 	public sourceData: string;

// 	ngAfterViewInit() {
// 		this.editor.dataChange.subscribe( ( value ) => {
// 			if ( !this.isSourceActive ) {
// 				this.sourceData = value;
// 			}
// 		} );
// 	}
// }
