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
type FileData struct {
	content string `firestore:"content"`
	label   string `firestore:"label"`
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
	//Create and Update - Note: If file already exists, Create will throw error
	// file5Data := FileData{
	// 	Content: "Loaded from main",
	// 	Label:   "Blue",
	// }
	wr, err := client.Doc("Users/user1/user1Files/file6").Set(ctx, map[string]interface{}{
		"Content": "<p>The rich text editor component is a WYSIWYG (what you see is what you get) editor that provides the best user experience for creating and updating content. Users can format their content using standard toolbar commands.</p><p><b>Key features:</b></p><ul>             <li>               <p>Capable of handling markdown editing.</p>             </li>             <li>               <p>Contains a modular library to load the necessary functionality on demand.</p>             </li>             <li>               <p>Provides a fully customizable toolbar.</p>             </li>             <li>               <p>Supports third-party library integration.</p>             </li>             <li>               <p>Handles images, hyperlinks, uploads, etc.</p>             </li>             <li>               <p>Contains undo/redo manager.</p>             </li>             <li>               <p>Provides Hypertext Markup Language views to edit the source directly for developers.</p>             </li>             <li>               <p>Allows a preview of modified content before saving it.</p>             </li>             <li>               <p>Handles images, video, hyperlinks, uploads, etc.</p>             </li>             <li>               <p>Creates bulleted and numbered lists.</p>             </li>             <li>               <p>Provides support to show the toolbar in inline mode.</p>             </li>             <li>               <p>Allows changing the custom styles on the selected image using the quick toolbar.</p>             </li>           </ul>",
		"Label":   "Red",
		"Tag":     "Math",
	})
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}
	fmt.Println(wr.UpdateTime)

	//Delete document
	_, err = client.Doc("Users/user1/user1Files/file6").Delete(ctx)
	if err != nil {
		log.Fatalf("Firestore: %v", err)
	}

}
