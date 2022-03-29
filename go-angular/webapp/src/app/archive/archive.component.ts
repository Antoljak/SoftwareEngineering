import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth, } from '@angular/fire/auth';
import { NoteService } from '../service/note.service';
import { Subscription } from 'rxjs';
import { NoteInfo } from '../NoteInfo';

let notes = [ 
	{ title: 'Math', preview: '3 + 4 = 7', tag: 'red' },
	{ title: 'Physics', preview: 'E = mc2', tag: 'blue' },
	{ title: 'Chemistry', preview: 'C + O2 = CO2', tag: 'green' },
	{ title: 'Biology', preview: 'Mitochondria...', tag: 'yellow' },
]

@Component({
  selector: 'app-archive, notes',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  providers: [NoteService]
})
export class ArchiveComponent implements OnInit {
	public userEmail = "";
	
	notes = notes

	constructor(public service: NoteService,private router: Router, public afAuth: AngularFireAuth) {}

	// Load in notes and populates note cards
	getNotes() {
		alert("Inside getAllUserNotes");
		this.getAllSubscription = this.service.getAllNotes(this.getUserEmail())
        .subscribe(data => {
			console.log(data);
			// this.stringJson = JSON.stringify(data);
			// this.dataSource = JSON.parse(this.stringJson);
			// for (var obj of this.dataSource )
			// 	{
			// 		alert(obj.content);
			// 	} 
			
		});
	}

	ngOnInit() { this.getNotes()}

	getAllSubscription: Subscription;
	dataSource: NoteInfo[] = [];
	stringJson: any;
	stringObject: any;

 
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
