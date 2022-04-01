import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { NoteInfo } from '../NoteInfo';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
	constructor(private http: HttpClient) {}

	baseUrl: string = '/save';
	noteUrl: string = '/getNote';
  deleteUrl: string = '/delete';
	readonly headers = new HttpHeaders()
	  .set('Content-Type', 'application/json');
    
  saveNote(note: NoteInfo): Observable<NoteInfo> {
		return this.http.post<NoteInfo>(this.baseUrl, note, {headers: this.headers});
	}
	getAllNotes(userId: string):Observable<NoteInfo[]>{
		let userInfo = new HttpParams().set("userId",userId); //Create new HttpParams
		return this.http.get<NoteInfo[]>("/getAllNotes",{params: userInfo});
	}

	getNote(userId : string, title : string):Observable<NoteInfo>{
		return this.http.post<NoteInfo>(this.noteUrl,{"ID":userId,"Title":title} ,{headers: this.headers});
	}
  
  deleteNote(userId: string,docTitle: string):Observable<NoteInfo> {
		return this.http.post<NoteInfo>(this.deleteUrl,{"ID":userId,"Title":docTitle} ,{headers: this.headers});
	}

	

}
