# VdoCipher Integration with Dropzone.js 📽️
#### ( Client-side Code )
A client-side react.js code that presents a basic demo for integration of VdoCipher Video Management with Fullstack Web Application. For the upload process, Dropzone.js package was used. As for the backend code, it's implemented in Spring Boot. You can find it at the following repo: [Click here](https://github.com/MariamAtef226/vdocipher-webapp-integration-spring-boot-code)


## :ledger: Index

- [About](#beginner-about)
- [Pre-Requisites](#notebook-pre-requisites)
- [Dropzone Implementation](#arrow_down-dropzone-implementation)
- [Dropzone Customization](#hammer_and_wrench-dropzone-customization)
- [Installation](#electric_plug-installation)
- [File Structure](#file_folder-file-structure)
- [Contribution](#fire-contribution)
- [Resources](#page_facing_up-resources)
- [Author](#star2-author)
- [License](#lock-license)


##  :beginner: About
The repository includes a simple demo implementation for the functions of video upload and preview client-side App using Dropzone.js. The app presents an acceeptable UI for the dropzone element to begin with, in addition to coverage of most of the possible events and cases (such as: upload cancellation, exceeding maximum limit of uploads, success of upload and errors). The app communicates mainly with the server-side app endpoints, except for the physical process of video upload where it uploads it directly to the provided VdoCipher account that has been dedcued from response of some endpoints from the server-side app.

_PS: This app is only for demo purpose to understand VdoCipher integration with web apps, which operates best when run with the mentioned server-side app_


## :notebook: Pre-Requisites
- VdoCipher Account
- Node.js and npm
- The Spring Boot Server-side app of this project (can be found at this [link](https://github.com/MariamAtef226/vdocipher-webapp-integration-spring-boot-code))
- JDK 17
- MySQL Server (needed by the Spring Boot app)


## :arrow_down: Dropzone Implementation:
1st: Implemented configurations:
``` 
      url: "#", // mandatory
      maxFilesize: 5120, // MB - mandatory for Vdo trial accounts
      acceptedFiles: "video/*", // to prevent any other types of files
      maxFiles: 1, // you may adjust to suit the number of videos you'll allow to upload per entity
      addRemoveLinks: true, // to hide "Remove video" after upload finishes (change it based on your preference and your business logic)
```
2nd: Handled Events:
- addedfile:
  - handle dropzone style adjustment based on existence or absence of uploading videos
  - prevent further adding of any other videos to the dropzone area in case max allowed number is reached (in my case, it's 1)
    - _PS: the naiive handling of this case by Dropzone.js is adding them to the dropzone area but with a cross sign over it, so eliminate the logic if you want the other option_

- success:
  - displays success message for user on upload success
  - removes the mentioned earlier "Remove file" generated link (you may change it based on your preference and business model)
  - send request to server-side to store the uploaded video id in our database

- canceled:
  - used in case of file upload is canceled
  - preferred not to change my implementation as it handles concurrent cancellation at VdoCipher as well.
  - adjust dropzone style

- maxfileexceeded
  - handle this case by returning to user special message
    - _PS: message is tailored to the current set value of max files_
      
- error
  - handle errors by returning to user special message


## :hammer_and_wrench: Dropzone Customization:
- For more configurations, check [Dropzone.js documentation](https://docs.dropzone.dev/configuration/basics/configuration-options)
- For further events handlers, check [Dropzone.js Events Code](https://github.com/dropzone/dropzone/blob/main/src/options.js#L574)


##  :electric_plug: Installation
```
$ git clone <repository-url>
$ cd react-app-directory
$ npm run install
$ npm run dev
```

##  :file_folder: File Structure

```
.
├── src
│   ├── assets
│   ├── App.css
|   ├── main.jsx
|   ├── VideoDropbox.jsx
|   ├── VideoPlayer.jsx
├── index.html
├── eslintrc.cjs
├── vite.config.js
├── LICENSE
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
##  :fire: Contribution
Feel free to contribute to this project in separate branches if you came up with further advancements, new features or discovered a bug for this demo.


##  :page_facing_up: Resources
- [Dropzone.js docs](https://www.dropzone.dev/)
- [VdoCipher server docs](https://www.vdocipher.com/docs/server/)
- [VdoCipher player embedding docs](https://www.vdocipher.com/docs/player/v2/)


## :star2: Author
[Mariam Atef](https://www.github.com/MariamAtef226)


##  :lock: License
[![License](http://img.shields.io/:license-MIT-blue.svg)](https://opensource.org/license/mit)
