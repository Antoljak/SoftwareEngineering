package main

import (
	"fmt"
	"log"
	"context"
	"cloud.google.com/go/firestore"
    "google.golang.org/api/option"
	// "firebase.google.com/go"
	// "google.golang.org/api/option"
)

func init() {
    ctx := context.Background()
    var err error
	opt := option.WithCredentialsFile("/Users/raulsalazar/Desktop/SWEproj/SoftwareEngineering/go-angular/note-it-db-firebase-adminsdk-sxa67-119151a562.json")
    // opt := option.WithCredentialsFile("service-account.json")
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

func main() {
	// // Use a service account
	// ctx := context.Background()
	// sa := option.WithCredentialsFile("/Users/raulsalazar/Desktop/SWEproj/SoftwareEngineering/go-angular/note-it-db-firebase-adminsdk-sxa67-119151a562.json")
	// // client, err := firestore.NewClient(ctx, "demodb-fb17e", opt)
	// app, err := firebase.NewApp(ctx, nil, sa)
	// if err != nil {
	//   log.Fatalln(err)
	// }
	
	// client, err := app.Firestore(ctx)
	// if err != nil {
	//   log.Fatalln(err)
	// }
	// defer client.Close()

	// pass := os.Getenv("DB_PASS")
	// db, err := gorm.Open(
	// 	"postgres",
	// 	"host=students-db user=go password="+pass+" dbname=go sslmode=disable")
	// if err != nil {
	// 	panic(err.Error())
	// }
	// app := App{
	// 	db: db,
	// 	r:  mux.NewRouter(),
	// }
	// app.start()
    fmt.Println("inside MAIN")
	
}


