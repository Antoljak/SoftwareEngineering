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
	http.HandleFunc("/editor", refreshPage)
	http.ListenAndServe(":4200", nil)
}

func saveNote(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		for k, v := range r.URL.Query() {
			fmt.Printf("%s: %s\n", k, v)
		}
		w.Write([]byte("Received a GET request\n"))
	case "POST":
		reqBody, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%s\n", reqBody)
		var testBody NoteInfo
		marshallErr := json.Unmarshal(reqBody, &testBody)
		if marshallErr != nil {
			fmt.Println("Cant unmarshal the byte array")
			return
		}

		var doc = make(map[string]interface{})
		doc["objectExample"] = map[string]interface{}{
			"tag":     testBody.Tag,
			"content": testBody.Content,
			"title":   testBody.Title,
		}
		setFire(formDocPath(testBody), doc)

		fmt.Println("body content:", testBody.Content)
		fmt.Println("user id:", testBody.ID)

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
