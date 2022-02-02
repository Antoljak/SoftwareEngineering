package main

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/option"
)

func main() {
	fmt.Println("hello world")
}

// Simple init to have a firestore client available
func init() {
	ctx := context.Background()
	var err error
	opt := option.WithCredentialsFile("note-it-db-service-account.json")
	client, err := firestore.NewClient(ctx, "note-it-db", opt)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	defer client.Close()

	users, err := client.Doc("Users/user1/user1Files/file1").Get(ctx)
	//json, err := json.MarshalIndent(users.Data(), "", "  ")
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	fmt.Println("inside init")
	for key, element := range users.Data() {
		fmt.Println("Key:", key, "=>", "Element:", element)
	}

}
