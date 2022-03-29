package main

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/firestore"
	"github.com/mitchellh/mapstructure"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

//comment for initial dev-sprint-2 commit

var client *firestore.Client
var err error
var ctx context.Context

var doc = make(map[string]interface{})
var docRef string
var docRefDel string
var docRefRead string

func main() {
	fmt.Println("hello world")
	test()
	//readFire(docRefRead)
	// setFire(docRef, doc)
	// deleteFire(docRefDel)
	defer client.Close()
}

// Simple init to have a firestore client available
func init() {
	ctx = context.Background()
	opt := option.WithCredentialsFile("note-it-db-service-account.json")
	client, err = firestore.NewClient(ctx, "note-it-db", opt)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	// doc["objectExample"] = map[string]interface{}{
	// 	"content": "sample",
	// 	"label":   "green",
	// }
	docRefRead = "Users/hpraveena91@gmail.com/Files"
	docRef = "Users/user1/user1Files/file7"
	docRefDel = "Users/user1/user1Files/file2"

}

//Function to read a file from database
func readFire(docRef string) []NoteInfo {
	fmt.Println("inside readFire()")
	allDocs := []NoteInfo{}
	eachFile := NoteInfo{}
	iter := client.Collection(docRef).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Firestore: %v", err)
		}
		fmt.Println(doc.Data())
		err = mapstructure.Decode(doc.Data(), &eachFile)
		if err != nil {
			fmt.Println(err)
			panic(err)
		}

		allDocs = append(allDocs, eachFile)

	}
	// users, err := client.Doc(docRef).Get(ctx)
	// if err != nil {
	// 	log.Fatalf("Firestore: %v", err)
	// }
	// for key, element := range users.Data() {
	// 	fmt.Println("Key:", key, "=>", "Element:", element)
	// }
	//fmt.Println(allDocs)
	return allDocs
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
