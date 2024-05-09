import { useEffect, useState } from "react";

export default function VideoPlayer() {
  let [otpData, setOtpData] = useState("");
  let videoId = "a97741ca650242699ff9f72d01a37efa"; // replace it with a video id from your VdoCipher account
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/admin/videos/" + videoId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOtpData(data)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <iframe
        src={"https://player.vdocipher.com/v2/?otp="+otpData.otp+"&playbackInfo="+otpData.playbackInfo+"&videoId="+videoId}
        style={{border:"0",width:"720px",height:"405px", margin:"0 auto", display:"block"}}
        allow="encrypted-media"
        allowfullscreen
      ></iframe>
    </>
  );
}
