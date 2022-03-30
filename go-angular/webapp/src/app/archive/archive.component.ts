import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth, } from '@angular/fire/auth';
import { NoteService } from '../service/note.service';
import { Subscription } from 'rxjs';
import { NoteInfo } from '../NoteInfo';
import { Output, EventEmitter } from '@angular/core';

let notes = new Array(
	{ title: 'Math', preview: '3 + 4 = 7', tag: 'red' , content: 'here is the content'}, 
	{ title: 'Physics', preview: 'E = mc2', tag: 'blue' , content: 'here is the content'},
	{ title: 'Chemistry', preview: 'C + O2 = CO2', tag: 'green' , content: 'here is the content'},
	{ title: 'Biology', preview: 'Mitochondria...', tag: 'yellow' , content: 'here is the content'}
) 

@Component({
  selector: 'app-archive, notes',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  providers: [NoteService]
})
export class ArchiveComponent implements OnInit {

	public message:string;
	public subscription:Subscription;
	public userEmail = "";
  getAllSubscription: Subscription;
  deleteSubscription: Subscription;
	dataSource: NoteInfo[] = [];
	stringJson: any;
	stringObject: any;
	
	notes = notes;

	@Output() newContentEvent = new EventEmitter<string>();

	constructor(public service: NoteService,private router: Router, public afAuth: AngularFireAuth) {}

	sendContentToParent(value : string){
		this.newContentEvent.emit(value);
	}

	updateNote(noteTitle : string, noteTag : string, notePreview : string, noteContent : string /* noteInf.content, noteInf.id, noteInf.title, noteInf.tag */) {
		// console.log("title of note to be edited: "+ noteTitle);
		// console.log("tag of note to be edited: "+ noteTag);
		// console.log("preview of note to be edited: "+ notePreview);
		// console.log("content of note to be edited: "+ noteContent);
		this.router.navigate(['editor/'+noteTitle]);
	}

	// Load in notes and populates note cards
	getNotes() {
		var archiveNotes = new Array();

		this.getAllSubscription = this.service.getAllNotes(this.getUserEmail())
        .subscribe(data => {
			console.log(data);
			this.dataSource = data;
			
            for(var index in this.dataSource)
            { 
				var x_title = this.dataSource[index]["Title"];
				var x_content = this.dataSource[index]["Content"];
				var x_tag = this.dataSource[index]["Tag"];
				var x_preview = this.createPreview(x_content);
				var x_entry = {title: x_title, preview: x_preview, tag: x_tag, content: x_content};
				archiveNotes.push(x_entry);
            }
			notes = archiveNotes;
		});
	}

	ngOnInit() { 
		this.getNotes()
	}

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

  	NewNote() {
		console.log("Loading editor for new note...");
		this.router.navigate([`editor`]);
	}
	
	Logout() {
		console.log("Logging out the current user... " + this.getUserEmail());
		this.afAuth.auth.signOut();
		this.router.navigate(['login']);
	}

	// use sourceData to create small preview of note
	createPreview(str : string) {
		return str.substring(0,15);
		
	}

	deleteNote(docTitle: string) {	
		this.deleteSubscription = this.service.deleteNote(this.getUserEmail(),docTitle)
        .subscribe()
		this.router.navigate([`archive`]);

	}

}
