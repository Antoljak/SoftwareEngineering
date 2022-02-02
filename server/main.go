package main

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/option"
)


type FileData struct {
	content string `firestore:"content"`
	label   string `firestore:"label"`
}

func constructFileData(){

}

func readFire(docRef string){ 
	fmt.Println("inside readFire()")
	docRef = "Users/user1/user1Files/file1" //temporary
	users, err := client.Doc(docRef).Get(ctx)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	for key, element := range users.Data() {
		fmt.Println("Key:", key, "=>", "Element:", element)
	}
}

func setFire(docRef string, fileContent FileData){
	//Create and Update - Note: If file already exists, Create will throw error
	// file5Data := FileData{
	// 	Content: "Loaded from main",
	// 	Label:   "Blue",
	// }
	docRef = "Users/user1/user1Files/file5"
	wr, err := client.Doc(docRef).Set(ctx, fileContent)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
}

func deleteFire(docRef string){
	//Delete document
	docRef = "Users/user1/user1Files/file6"
	_, err = client.Doc(docRef).Delete(ctx)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
}

// Simple init to have a firestore client available
func init() {
	fmt.Println("testing the new thing \n")
	ctx := context.Background()
	var err error
	opt := option.WithCredentialsFile("note-it-db-service-account.json")
	client, err := firestore.NewClient(ctx, "note-it-db", opt)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	defer client.Close()
}

func main() {
	fmt.Println("hello world")

	readFire("test")
	
	
	// fmt.Println(wr.UpdateTime)

	
}
