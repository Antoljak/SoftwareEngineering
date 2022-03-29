import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { NoteInfo } from '../NoteInfo';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
    
	baseUrl: string = '/save';
	readonly headers = new HttpHeaders()
	  .set('Content-Type', 'application/json');
    
    constructor(private http: HttpClient) {}

    saveNote(note: NoteInfo): Observable<NoteInfo> {
		alert(note.title);
		return this.http.post<NoteInfo>(this.baseUrl, note, {headers: this.headers});
	}
	getAllNotes(userId: string):Observable<NoteInfo[]>{
		let userInfo = new HttpParams().set("userId",userId); //Create new HttpParams
		return this.http.get<NoteInfo[]>("/getAllNotes",{params: userInfo});

	}

}
