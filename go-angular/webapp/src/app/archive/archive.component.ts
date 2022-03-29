import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth, } from '@angular/fire/auth';

let notes = [ 
	{ title: 'Math', preview: '3 + 4 = 7', tag: 'red' },
	{ title: 'Physics', preview: 'E = mc2', tag: 'blue' },
	{ title: 'Chemistry', preview: 'C + O2 = CO2', tag: 'green' },
	{ title: 'Biology', preview: 'Mitochondria...', tag: 'yellow' },
]

@Component({
  selector: 'app-archive, notes',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
	public userEmail = "";
	
	notes = notes

	constructor(private router: Router, public afAuth: AngularFireAuth) {}

	// Load in notes and populates note cards
	getNotes( /* getUserEmail() */ ) {
		/*
		Read in notes and set title, preview, tag for frontend
		for each note in getUserEmail()
			new note;
			note.title = ...
			note.preview = ...
			note.tag = ...

			notes.push_back(note)
		*/
	}

	ngOnInit() { /* getNotes() */ }

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

	createPreview() {
		// use sourceData to create small preview of note
	}

	updateNote(/* noteInf.content, noteInf.id, noteInf.title, noteInf.tag */) {
		// Redirect to '/editor' and load note
	}

	deleteNote() {
		// deletes selected note	
	}
}
