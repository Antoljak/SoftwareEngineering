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

// func test() {
// 	r := gin.Default()

// 	r.POST("/testing", func(c *gin.Context) {
// 		c.JSON(200, gin.H{
// 			"message": "hello there",
// 		})
// 		fmt.Println("Inside post method")
// 	})
// 	r.Run(":4200") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
// }
func test() {
	http.HandleFunc("/save", saveNote)
	http.HandleFunc("/getAllNotes", getAllNotes)
	http.HandleFunc("/editor", refreshPage)
	http.ListenAndServe(":4200", nil)
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
		// resp := make(map[string]string)
		// resp["message"] = "Status Created"
		// resp["id"] = "userId"
		jsonResp, err := json.Marshal(resultAllDocs)
		if err != nil {
			log.Fatalf("Error happened in JSON marshal. Err: %s", err)
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(jsonResp))

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

func refreshPage(w http.ResponseWriter, r *http.Request) {
	fmt.Print("inside refresh page")
	//http.Redirect(w, r, "http://localhost:4200/editor", 301)

}
func formDocPath(noteContent NoteInfo) string {

	docpath := "Users/" + noteContent.ID + "/Files/" + noteContent.Title
	return docpath

}
