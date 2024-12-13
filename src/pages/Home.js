import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HomeImg from '../assests/pothole.jpg';

const Home = () => {
 const [isRecording, setIsRecording] = useState(false);
  const [pothole, setPothole] = useState("No Pothole Ahead");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoQueue = useRef([]); // Queue for video chunks
  const locationQueue = useRef([]); // Queue for location data
  const temp=useRef(false);
  // Track location while recording
  useEffect(() => {
    let locationInterval;
    if (isRecording) {
      locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude,longitude);
            locationQueue.current.push({ latitude, longitude });
          },
          (error) => console.error("Error fetching location:", error),
          { enableHighAccuracy: true }
        );
      }, 1000); // Fetch location every second
    }
    return () => clearInterval(locationInterval);
  }, [isRecording]);

  const handleStartRecording = async () => {
    try {
      // Request camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
  
      // Store the stream for later use
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
  
      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp8",
      });
  
      
  
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          videoQueue.current.push(event.data); // Store video chunks
          processQueue(); // Process chunks
        }
      };
  
      // Start recording and create a chunk every 5 seconds
      mediaRecorder.start();
  
      mediaRecorder.onstop = () => {
        // Stop and restart the recorder after processing the chunk
        console.log('Recording stopped');
        if (mediaRecorder.state === 'inactive' && temp.current===true) {
          // Restart the recorder after a short delay to ensure proper chunking
          mediaRecorder.start();
        }
      };
  
      // Restart recording every 5 seconds
      setInterval(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.requestData(); // Request chunk for the current recording
          mediaRecorder.stop(); // Stop recording for the current chunk
        }
      }, 5000);
  
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      temp.current=true;
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const handleStopRecording = () => {
    temp.current=false;
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    
    
  };

  const processQueue = async () => {
    // Pair each video chunk with location data
    while (videoQueue.current.length > 0 && locationQueue.current.length > 0) {
     
     
      const videoChunk = videoQueue.current.shift(); // Get video chunk
      const locations = locationQueue.current.splice(0); // Get all location data
      
      console.log("Processed video chunk:", videoChunk);

      // if (videoChunk) {
      //   const blob = new Blob([videoChunk], { type: "video/webm" });
      //   const blobUrl = URL.createObjectURL(blob);

      //   console.log("Preview video:", blobUrl);

      //   // Automatically download the chunk for testing
      //   const a = document.createElement("a");
      //   a.href = blobUrl;
      //   a.download = `video_chunk_${Date.now()}.webm`;
      //   a.click();
      // }


      if (locations.length > 0) {
        const medianLat = median(locations.map((loc) => loc.latitude));
        const medianLong = median(locations.map((loc) => loc.longitude));
        // console.log(medianLat,medianLong);
        await sendVideoChunk(videoChunk, medianLat, medianLong); // Send to server
        checkPotholeInStoredLocations(medianLat,medianLong)
      } else {
        console.warn("No location data for this chunk.");
      }
    }
  };

  const checkPotholeInStoredLocations = async (medianLat,medianLong) => {
   
    try {
        const response = await fetch('http://localhost:8080/api/distance/live', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: medianLat,
                longitude: medianLong,
            }),
        });
        
        const data = await response.json();
        setPothole(data.message);  // Update the UI based on response
       
        console.log('Pothole check result:', data);
    } catch (error) {
        console.error('Error checking stored locations:', error);
    }

  };
  const sendVideoChunk = async (chunk, latitude, longitude) => {
    const blob = new Blob([chunk], { type: "video/webm" });
    const formData = new FormData();
    formData.append("video", blob, `chunk_${Date.now()}.webm`);
    formData.append("latitude", latitude || 0);
    formData.append("longitude", longitude || 0);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload_blob", {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      const result = await response.json();
      console.log("Server response:", result);

    } catch (error) {
      console.error("Error sending video chunk:", error);
    }
  };

  const median = (values) => {
    if (values.length === 0) return null;
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 !== 0
      ? values[mid]
      : (values[mid - 1] + values[mid]) / 2.0;
  };




  return (
    <div className="font-serif">
      <div className="  flex flex-col items-center justify-center font-semibold">
        <div className={`text-white bg-red-600 rounded-xl text-lg px-6 py-3 mb-4 ${pothole!=="No Pothole Ahead" ? '' : 'hidden'}`}>
          <div className="mx-auto">⚠ Alert! ⚠</div>
          <div>Pothole Detected in 100m</div>
        </div>
        <div className={`text-white bg-green-400 rounded-xl text-lg px-6 py-3 mb-4 ${pothole!=="No Pothole Ahead" ? 'hidden' : ''}`}>
          <div className="mx-auto">Safe</div>
          <div>No Pothole Detected</div>
        </div>
        <div className="w-full max-w-2xl py-8">
          <div className="relative">
            <video ref={videoRef} autoPlay controls playsInline className="w-full h-auto" />
            <button
              onClick={handleStartRecording}
              className="absolute top-0 left-0 m-4 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Start
            </button>
            <button
              onClick={handleStopRecording}
              className="absolute top-0 right-0 m-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Stop
            </button>
          </div>
        </div>
      </div>
      <div className="hidden flex flex-col gap-y-10">
        <div className="mx-auto flex flex-col items-center text-center gap-y-4 px-4">
          <div className="text-4xl font-semibold">Pothole Patrol</div>
          <div className="text-gray-400">Know before you go.</div>
          <div>
            <button className="text-white bg-black rounded-lg">
              <Link to="/about">
                <div className="font-thin mx-6 my-3">Learn More About Us</div>
              </Link>
            </button>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row justify-between items-center mx-4 md:mx-20 gap-10">
          <div className="max-w-full md:max-w-[500px]">
            <img alt="landing page" src={HomeImg} />
          </div>
          <div className="flex flex-col gap-y-4 text-center md:text-left">
            <div className="text-2xl font-semibold">Real-Time Pothole Reporting</div>
            <div className="text-gray-400 max-w-md">Pothole Patrol is a community-driven application that helps you avoid potholes and improve road conditions. Report potholes, get alerts, and contribute to a smoother ride for everyone.</div>
            <div>
              <button className="text-white bg-black rounded-lg">
                <Link to="/Signup">
                  <div className="font-thin mx-6 my-3">Get Started</div>
                </Link>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;




// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import HomeImg from '../assests/pothole.jpg';

// const Home = () => {
//   const [locations, setLocations] = useState([]);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [pothole, setPothole] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const videoRef = useRef(null);
//   const sendIntervalRef = useRef(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setLocations((prev) => [...prev, { latitude, longitude }]);
//       });
//     } else {
//       console.log('location error');
//     }
//   }, []);

//   const handleStartRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     videoRef.current.srcObject = stream;

//     const recorder = new MediaRecorder(stream, {
//       mimeType: 'video/webm; codecs=vp9',
//     });

//     recorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks((prev) => [...prev, event.data]);
//       }
//     };

//     recorder.start(); // Start recording

//     setMediaRecorder(recorder);

//     sendIntervalRef.current = setInterval(() => {
//       if (recordedChunks.length > 0 && locations.length > 0) {
//         handleSendData();
//       } else {
//         console.log('error in sending data', recordedChunks.length);
//       }
//     }, 1000); // Send data every 1 second
//   };

//   const handleStopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//     }
//     clearInterval(sendIntervalRef.current);
//   };

//   const handleSendData = async () => {
//     const blob = new Blob(recordedChunks, { type: 'video/webm' });
//     const formData = new FormData();
//     formData.append('video', blob);

//     const medianLat = median(locations.map((loc) => loc.latitude));
//     const medianLong = median(locations.map((loc) => loc.longitude));

//     formData.append('latitude', medianLat);
//     formData.append('longitude', medianLong);
//     console.log(formData);

//     setRecordedChunks([]);
//     setLocations([]);
//   };

//   const median = (values) => {
//     if (values.length === 0) return null;
//     values.sort((a, b) => a - b);
//     const half = Math.floor(values.length / 2);
//     if (values.length % 2) {
//       return values[half];
//     }
//     return (values[half - 1] + values[half]) / 2.0;
//   };

//   return (
//     <div className="font-serif">
//       <div className="  flex flex-col items-center justify-center font-semibold">
//         <div className={`text-white bg-red-600 rounded-xl text-lg px-6 py-3 mb-4 ${pothole ? '' : 'hidden'}`}>
//           <div className="mx-auto">⚠ Alert! ⚠</div>
//           <div>Pothole Detected in 100m</div>
//         </div>
//         <div className={`text-white bg-green-400 rounded-xl text-lg px-6 py-3 mb-4 ${pothole ? 'hidden' : ''}`}>
//           <div className="mx-auto">Safe</div>
//           <div>No Pothole Detected</div>
//         </div>
//         <div className="w-full max-w-2xl py-8">
//           <div className="relative">
//             <video ref={videoRef} autoPlay controls className="w-full h-auto" />
//             <button
//               onClick={handleStartRecording}
//               className="absolute top-0 left-0 m-4 bg-green-500 text-white px-4 py-2 rounded-lg"
//             >
//               Start
//             </button>
//             <button
//               onClick={handleStopRecording}
//               className="absolute top-0 right-0 m-4 bg-red-500 text-white px-4 py-2 rounded-lg"
//             >
//               Stop
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="hidden flex flex-col gap-y-10">
//         <div className="mx-auto flex flex-col items-center text-center gap-y-4 px-4">
//           <div className="text-4xl font-semibold">Pothole Patrol</div>
//           <div className="text-gray-400">Know before you go.</div>
//           <div>
//             <button className="text-white bg-black rounded-lg">
//               <Link to="/about">
//                 <div className="font-thin mx-6 my-3">Learn More About Us</div>
//               </Link>
//             </button>
//           </div>
//         </div>
//         <div className=" flex flex-col md:flex-row justify-between items-center mx-4 md:mx-20 gap-10">
//           <div className="max-w-full md:max-w-[500px]">
//             <img alt="landing page" src={HomeImg} />
//           </div>
//           <div className="flex flex-col gap-y-4 text-center md:text-left">
//             <div className="text-2xl font-semibold">Real-Time Pothole Reporting</div>
//             <div className="text-gray-400 max-w-md">Pothole Patrol is a community-driven application that helps you avoid potholes and improve road conditions. Report potholes, get alerts, and contribute to a smoother ride for everyone.</div>
//             <div>
//               <button className="text-white bg-black rounded-lg">
//                 <Link to="/Signup">
//                   <div className="font-thin mx-6 my-3">Get Started</div>
//                 </Link>
//               </button>
//             </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
