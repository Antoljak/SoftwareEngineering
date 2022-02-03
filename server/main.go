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

var client *firestore.Client
var err error
var ctx context.Context
var fileContent = FileData{
	content: "Loaded from main",
	label:   "green",
}
var doc = make(map[string]interface{})
var docRef string
var docRefDel string
var docRefRead string

func main() {
	fmt.Println("hello world")
	readFire(docRefRead)
	setFire(docRef, doc)
	deleteFire(docRefDel)
	defer client.Close()
}

// Simple init to have a firestore client available
func init() {
	ctx = context.Background()
	opt := option.WithCredentialsFile("note-it-db-service-account")
	client, err = firestore.NewClient(ctx, "note-it-db", opt)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	doc["objectExample"] = map[string]interface{}{
		"content": "sample",
		"label":   "green",
	}
	docRefRead = "Users/user1/user1Files/file1"
	docRef = "Users/user1/user1Files/file7"
	docRefDel = "Users/user1/user1Files/file2"

}

//Function to read a file from database
func readFire(docRef string) {
	fmt.Println("inside readFire()")
	users, err := client.Doc(docRef).Get(ctx)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	for key, element := range users.Data() {
		fmt.Println("Key:", key, "=>", "Element:", element)
	}
}

//Function to create a new file or update if the file already exists
func setFire(docRef string, doc map[string]interface{}) {
	fmt.Println("inside setFire()")
	_, err := client.Doc(docRef).Set(ctx, doc)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
}

//Function to delete a file from database
func deleteFire(docRef string) {
	fmt.Println("inside deleteFire")
	_, err = client.Doc(docRef).Delete(ctx)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
}
