package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type NoteInfo struct {
	ID        string
	Title     string
	Content   string
	Tag       string
	Timestamp string
}

func startHttpServer() {
	http.HandleFunc("/save", saveNote)
	http.HandleFunc("/getAllNotes", getAllNotes)
	http.HandleFunc("/editor", refreshPage)
	http.HandleFunc("/getNote", getNote)
	http.HandleFunc("/delete", deleteNote)
	http.ListenAndServe(":4200", nil)
}

func getNote(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
    case "POST":
        tempReqBody, err := ioutil.ReadAll(r.Body)
        if err != nil {
            log.Fatal(err)
        }
        fmt.Printf("%s\n", tempReqBody)
        var reqBody NoteInfo
        marshallErr := json.Unmarshal(tempReqBody, &reqBody)
        if marshallErr != nil {
            fmt.Println("Cant unmarshal the byte array")
			return
        }
		fmt.Println(reqBody.Title)
		fmt.Println(reqBody.ID)
        responseBody := retrieveNote(formDocPath(reqBody))
		w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusOK)
        encoder := json.NewEncoder(w)
        err = encoder.Encode(&responseBody)
        if err != nil {
            panic(err)
        }
    }
}

func getAllNotes(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		params, ok := r.URL.Query()["userId"]
		if !ok || len(params[0]) < 1 {
			log.Println("Url Param 'userId' is missing")
			return
		}
		userId := params[0]
		resultAllDocs := readFire("Users/" + userId + "/Files")
		jsonResp, err := json.Marshal(resultAllDocs)
		if err != nil {
			log.Fatalf("Error happened in JSON marshal. Err: %s", err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		encoder := json.NewEncoder(w)
		err := encoder.Encode(&resultAllDocs)
		if err != nil {
			panic(err)
		}

	}
}
func saveNote(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		for k, v := range r.URL.Query() {
			fmt.Printf("%s: %s\n", k, v)
		}
		w.Write([]byte("Received a GET request\n"))
	case "POST":
		tempReqBody, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%s\n", tempReqBody)
		var reqBody NoteInfo
		marshallErr := json.Unmarshal(tempReqBody, &reqBody)
		if marshallErr != nil {
			fmt.Println("Cant unmarshal the byte array")
			return
		}

		var doc = make(map[string]interface{})
		doc["id"] = reqBody.ID
		doc["tag"] = reqBody.Tag
		doc["content"] = reqBody.Content
		doc["title"] = reqBody.Title

		setFire(formDocPath(reqBody), doc)

		fmt.Println("body content:", reqBody.Content)
		fmt.Println("user id:", reqBody.ID)

		w.Write([]byte("Received a POST request\n"))
	default:
		w.WriteHeader(http.StatusNotImplemented)
		w.Write([]byte(http.StatusText(http.StatusNotImplemented)))
	}

}

func deleteNote(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		tempReqBody, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%s\n", tempReqBody)
		var reqBody NoteInfo
		marshallErr := json.Unmarshal(tempReqBody, &reqBody)
		if marshallErr != nil {
			fmt.Println("Cant unmarshal the byte array")
			return
		}
		deleteFire(formDocPath(reqBody))
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Received a DELETE request\n"))

	}
}

func refreshPage(w http.ResponseWriter, r *http.Request) {
	fmt.Print("inside refresh page")
	//http.Redirect(w, r, "http://localhost:4200/editor", 301)
}

func formDocPath(noteContent NoteInfo) string {

	docpath := "Users/" + noteContent.ID + "/Files/" + noteContent.Title
	return docpath

}
