package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetNote(t *testing.T) {
	nt := NoteInfo{ID: "hpraveena91@gmail.com", Title: "Sample Note 1"}
	reqBdy, _ := json.Marshal(nt)
	req, _ := http.NewRequest("POST", "/getNote", bytes.NewBuffer(reqBdy))
	r := httptest.NewRecorder()
	handler := http.HandlerFunc(getNote)

	handler.ServeHTTP(r, req)

	checkStatusCode(r.Code, http.StatusOK, t)
	checkContentType(r, t)
	checkGetNoteResponse(r, nt, t)
}

func TestGetAllNotes(t *testing.T) {
	nt := NoteInfo{ID: "hpraveena91@gmail.com"}
	req, _ := http.NewRequest("GET", "/getAllNotes?userId=hpraveena91@gmail.com", nil)
	r := httptest.NewRecorder()
	handler := http.HandlerFunc(getAllNotes)

	handler.ServeHTTP(r, req)

	checkStatusCode(r.Code, http.StatusOK, t)
	checkContentType(r, t)
	checkGetAllNotesResponse(r, nt, t)
}

func TestSaveNote(t *testing.T) {
	nt := NoteInfo{ID: "hpraveena91@gmail.com", Title: "Unit Testing Note", Tag: "Blue", Content: "This is a sample note"}
	reqBdy, _ := json.Marshal(nt)
	req, _ := http.NewRequest("POST", "/save", bytes.NewBuffer(reqBdy))
	r := httptest.NewRecorder()
	handler := http.HandlerFunc(saveNote)

	handler.ServeHTTP(r, req)

	checkStatusCode(r.Code, http.StatusOK, t)
	ct := r.Header().Get("Content-Type")
	if ct != "text/plain; charset=utf-8" {
		t.Errorf("Wrong Content Type: got %v want text/plain; charset=utf-8", ct)
	}

	responseBody := r.Body.String()
	if responseBody != "Note saved successfully\n" {
		t.Errorf("Error in save note")
	}

}

func TestDeleteNote(t *testing.T) {
	nt := NoteInfo{ID: "hpraveena91@gmail.com", Title: "Unit Testing Note", Tag: "Blue", Content: "This is a sample note"}
	reqBdy, _ := json.Marshal(nt)
	req, _ := http.NewRequest("POST", "/delete", bytes.NewBuffer(reqBdy))
	r := httptest.NewRecorder()
	handler := http.HandlerFunc(deleteNote)

	handler.ServeHTTP(r, req)

	checkStatusCode(r.Code, http.StatusOK, t)

	responseBody := r.Body.String()
	if responseBody != "Note deleted successfully \n" {
		t.Errorf("Error in delete note")
	}
}

func toReader(content string) io.Reader {
	return bytes.NewBuffer([]byte(content))
}

func checkStatusCode(code int, want int, t *testing.T) {
	if code != want {
		t.Errorf("Wrong status code: got %v want %v", code, want)
	}
}

func checkContentType(r *httptest.ResponseRecorder, t *testing.T) {
	ct := r.Header().Get("Content-Type")
	if ct != "application/json" {
		t.Errorf("Wrong Content Type: got %v want application/json", ct)
	}
}

func checkGetNoteResponse(r *httptest.ResponseRecorder, nt NoteInfo, t *testing.T) {
	var responseBody NoteInfo
	res := r.Body.Bytes()
	marshallErr := json.Unmarshal(res, &responseBody)
	if marshallErr != nil {
		fmt.Println("Cant unmarshal the byte array")
		return
	}
	if responseBody.ID != nt.ID {
		t.Errorf("User ID should match: got %v want %v", responseBody.ID, nt.ID)
	}
	if responseBody.Title != nt.Title {
		t.Errorf("Title should match: got %v want %v", responseBody.Title, nt.Title)
	}
}
func checkGetAllNotesResponse(r *httptest.ResponseRecorder, nt NoteInfo, t *testing.T) {
	var responseBody []NoteInfo
	res := r.Body.Bytes()
	marshallErr := json.Unmarshal(res, &responseBody)
	if marshallErr != nil {
		fmt.Println("Cant unmarshal the byte array")
		return
	}
	if len(responseBody) != 0 {
		for _, eachNote := range responseBody {
			if eachNote.ID != nt.ID {
				t.Errorf("User ID should match: got %v want %v", eachNote.ID, nt.ID)
			}
		}
	}

}
