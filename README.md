# Software Engineering - CEN5035 Spring 2022Cancel changes
## Note-It
A simple, quick, and easy to use note taking app hosted right on your web browser.

## Members
**Front-end (Angular):**  Clayton Music, Fran Luka Antoljak

**Back-end (Golang):** Raul Salazar, Praveena Hariharan

## Starter Code from https://github.com/Shpota/go-angular

## Build and run instructions
1. Create a Docker network: (one-time thing) -> only the first time you're setting up the project
    ```shell script
    docker network create students-net
    ```
2. Start the DB:
    ```shell script
    docker run -e POSTGRES_USER=go -e POSTGRES_PASSWORD=your-strong-pass -e POSTGRES_DB=go --name students-db --net=students-net postgres:11.5
    ```
3. Build the application image: (app image = 'executable) -> only needs to be built when code changes
    ```shell script
    docker build -t students-app .
    ```
4. Start the application container:
    ```shell script
    docker run -p 8080:8080 -e DB_PASS='your-strong-pass' --net=students-net students-app
    ```
Access the application via http://localhost:8080

NOTES:

steps 2 and 4 will not work again until the containers are killed in docker desktop app
