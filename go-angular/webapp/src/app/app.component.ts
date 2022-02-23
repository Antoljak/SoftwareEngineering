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

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
		this.editor.dataChange.subscribe( ( value ) => {
			if ( !this.isSourceActive ) {
				this.sourceData = value;
			}
		} );
	}
}

