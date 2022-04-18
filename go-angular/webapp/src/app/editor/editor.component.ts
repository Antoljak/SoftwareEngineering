import { Component, OnInit, ViewChild, AfterViewInit, Inject, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth, } from '@angular/fire/auth';
import { NoteInfo } from '../NoteInfo';
import { NoteService } from '../service/note.service';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from "@angular/material";

export interface DialogData {
	title: string;
	tag: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [NoteService]
})
export class EditorComponent implements OnInit, AfterViewInit{
	ckeConfig: any;
	@ViewChild('editor', {static:false}) editor: any;
	
	title: string;
	tag: string;
	public sub;
	public paramTitle;
	public editorData = '<p>Note it!</p>';
	public isSourceActive: boolean;
	public sourceData: string;
	public userEmail = "";
	public oldTitle = "";
	public noteInf = new NoteInfo();
	addSubscription: Subscription;
	noteSubscription: Subscription;
	deleteSubscription: Subscription;
	constructor(public service: NoteService, public dialog: MatDialog, private router: Router, private authService: AuthService, public afAuth: AngularFireAuth, private _Activatedroute:ActivatedRoute) {}
    
	getUserEmail() {
		this.userEmail = this.afAuth.auth.currentUser.email;
		if(this.userEmail != null){
			return this.userEmail;
		}
		else{
			this.userEmail = "Guest"
			return this.userEmail;
		}
	}

	ngOnInit() {
		this.sub=this._Activatedroute.paramMap.subscribe(params => { 
			console.log(params);
			this.paramTitle = params.get('title');
			if(this.paramTitle != null){ //if not null we are editing a previous note 
				this.oldTitle = this.paramTitle;``
				this.noteSubscription = this.service.getNote(this.getUserEmail(), this.paramTitle)
				.subscribe(data => {
				this.editorData = data["Content"]
				this.title = data["Title"]
				this.tag = data["Tag"]
				console.log(data);
			});
			}
		});
		
		this.ckeConfig = {
		extraPlugins: 'uploadimage',
		uploadUrl:
			'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
		filebrowserBrowseUrl:
			'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
		filebrowserImageBrowseUrl:
			'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
		filebrowserUploadUrl:
			'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
		filebrowserImageUploadUrl:
			'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images'
		};
	}
	
	ngAfterViewInit() {
		this.editor.dataChange.subscribe( ( value ) => {
			if ( !this.isSourceActive ) {
				this.sourceData = value;
			}
		});
	}

	RouteToArchive() {
		console.log("Opening  " + this.getUserEmail() + "'s archive!");
		this.router.navigate([`archive`]);
	}
	
	onSaveClick(noteData): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {title: this.title, tag: this.tag},
		  });
		  dialogRef.afterClosed().subscribe(data => {
			this.title = data.title;
			this.tag = data.tag;
			console.log(this.title + this.tag)
			this.SaveNote()
		  });
	}

	SaveNote(){	
		console.log("Saving note with contents... " + this.sourceData + " ...to " + this.getUserEmail() + "'s archive!");
		this.noteInf.content = this.editorData;
		this.noteInf.id = this.userEmail;
		this.noteInf.title = this.title;
		this.noteInf.tag = this.tag;
		//here
		if(this.oldTitle != "" && this.title != this.oldTitle){
			this.deleteSubscription = this.service.deleteNote(this.getUserEmail(), this.oldTitle)
			.subscribe()
			this.oldTitle = ""
		}
		this.addSubscription = this.service.saveNote(this.noteInf)
        .subscribe();
		this.editorData = '<p>Note it!</p>'
	}
	
	Logout() {
		console.log("Logging out the current user... " + this.getUserEmail());
		this.afAuth.auth.signOut();
		this.router.navigate(['login']);
	}
}

@Component({
	selector: 'dialogComponent',
	templateUrl: './dialog.html',
  })
  export class DialogComponent {
	constructor(
	  public dialogRef: MatDialogRef<DialogComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: DialogData,
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
  }
