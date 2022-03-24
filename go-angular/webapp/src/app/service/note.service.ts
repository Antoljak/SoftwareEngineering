import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { NoteInfo } from '../NoteInfo';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
    
	baseUrl: string = '/testing';
	readonly headers = new HttpHeaders()
	  .set('Content-Type', 'application/json');
    
    constructor(private http: HttpClient) {}

    saveNote(note: NoteInfo): Observable<NoteInfo> {
		alert(note.title);
		return this.http.post<NoteInfo>(this.baseUrl, note, {headers: this.headers});
	}

}