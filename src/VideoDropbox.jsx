import React, { useState, useEffect } from "react";
import Dropzone from "dropzone";
import "./App.css";

const VideoDropbox = () => {
  // to limit number of uploaded videos per entity
  const [addedFilesCount, setAddedFilesCount] = useState(0);

  // Function to fetch VdoCipher credentials from your Spring Boot backend
  const getCredentials = (data, callback) => {
    fetch("http://localhost:8080/api/v1/admin/videos", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((uploadCreds) => {
        callback(uploadCreds);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // Initialize dropzone configurations & procdeurs on file drag to dropbox (to upload to VdoCipher)
    let myDropzone = new Dropzone("#my-form", {
      url: "#",
      maxFilesize: 5120, // MB
      acceptedFiles: "video/*",
      maxFiles: 1,
      addRemoveLinks: true,

      accept: function (file, done) {
        getCredentials({}, (uploadCreds) => {
          this.awsOptions = uploadCreds;
          this.options.url = this.awsOptions.clientPayload.uploadLink;
          done();
        });
      },
      init: function () {
        this.url = "#/sdfjsldf";
        this.on("sending", function (file, xhr, formData) {
          formData.append(
            "x-amz-credential",
            this.awsOptions.clientPayload["x-amz-credential"]
          );
          formData.append(
            "x-amz-algorithm",
            this.awsOptions.clientPayload["x-amz-algorithm"]
          );
          formData.append(
            "x-amz-date ",
            this.awsOptions.clientPayload["x-amz-date"]
          );
          formData.append(
            "x-amz-signature",
            this.awsOptions.clientPayload["x-amz-signature"]
          );
          formData.append("key", this.awsOptions.clientPayload["key"]);
          formData.append("policy", this.awsOptions.clientPayload["policy"]);
          formData.append("success_action_status", 201);
          formData.append("success_action_redirect", "");
          console.log("LOADING");
        });
      },
    });

    // Adding file handler
    myDropzone.on("addedfile", (file) => {
      setAddedFilesCount((prevCount) => {
        if (prevCount === 1) {
          myDropzone.removeFile(file); // Remove the file from Dropzone
          console.log(`File failed to be added: ${file.name}`);
          return prevCount; // Return the previous count
        } else {
          let dropzone = document.querySelector(".dropzone");
          dropzone.style.border = "ridge";
          console.log(`File added: ${file.name}`);
          return 1; // Set addedFilesCount to 1
        }
      });
    });

    // File upload success handler
    myDropzone.on("success", (file) => {
      let div = document.querySelector(".messagesHolder");
      div.innerHTML =
        "Your file has been successfully uploaded to our server and pending processing!";
      div.style.color = "green";
      let removeLink = document.querySelector(".dz-remove");
      removeLink.style.display = "none";

      // send request to backend to store in database
      fetch(
        "http://localhost:8080/api/v1/admin/videos/" +
          myDropzone.awsOptions.videoId,
        {
          method: "POST"
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.error(error));
    });

    // Upload canceling handler
    myDropzone.on("canceled", (file) => {
      // 1) cancel at vdo cipher
      fetch(
        "http://localhost:8080/api/v1/admin/videos/" +
          myDropzone.awsOptions.videoId,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error(error));
      let div = document.querySelector(".messagesHolder");
      div.innerHTML = "";
      setAddedFilesCount((prevCount) => {
        console.log(`File canceled: ${file.name}`);
        let dropzone = document.querySelector(".dropzone");
        dropzone.style.border = "dashed 2px #cac7c7";
        return 0;
      });
    });

    // Max number of file exceedence handler
    myDropzone.on("maxfilesexceeded", (file) => {
      let div = document.querySelector(".messagesHolder");
      div.innerHTML =
        "You can only upload one video for this course! Cancel uploading the current one and try again!";
      div.style.color = "red";
    });

    // Error handler
    myDropzone.on("error", (file, message) => {
      let div = document.querySelector(".messagesHolder");
      div.innerHTML = "File upload has failed: " + message;
      div.style.color = "red";
    });

    // Cleanup function to remove event listeners and destroy Dropzone instance
    return () => {
      myDropzone.off("addedfile");
      myDropzone.off("success");
      myDropzone.off("canceled");
      myDropzone.off("error");
      myDropzone.off("maxfilesexceeded");
      myDropzone.destroy();
    };
  }, []);

  return (
    <>
      <form id="my-form" className="dropzone">
        {/*customize prompt message for upload*/}
        <div className="dz-default dz-message">
          <img
            src={"https://cdn-icons-png.freepik.com/512/68/68857.png"}
            alt="upload-icon"
            width="50px"
            style={{ display: "block", opacity: "0.6", margin: "0 auto" }}
          />
          <button className="dz-button" type="button">
            Drop your video here
          </button>
        </div>
      </form>

      {/* success/error messages for user*/}
      {/* customize styling based on your project */}

      <div className="messagesHolder"></div>
    </>
  );
};

export default VideoDropbox;
