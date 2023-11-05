# Spring Simple Forum
Simple forum application build using SpringBoot and React.

![Screenshot - MainPage](screenshots/MainPage.png)

## Build and Run Locally
Prerequisites:
* Docker
* npm
* jdk 17
* maven

Build UI
```bash
cd spring-simple-forum-ui
npm run build
```

Run mysql using Docker
```bash
bash mysql/start-mysql.sh
```

Then run mysql/initialize.sql to initialize database. Skip this step if initialize script had already run.

Run SpringBoot application locally
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

Navigate to http://localhost:8080

