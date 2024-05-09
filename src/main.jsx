import React from "react";
import ReactDOM from "react-dom/client";
import App from "./VideoDropbox.jsx";
import VideoPlayer from "./VideoPlayer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h2>Upload Videos Demo:</h2>

    <App />
    <hr /> <br />
    <h2>Video Player Embedding Demo:</h2>
  
    <VideoPlayer />
  </React.StrictMode>
);
