import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HomeImg from '../assests/_c2eaa92b-3b99-4b27-b486-bde9c7c0616f.jpeg';

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [pothole, setPothole] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const sendIntervalRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocations((prev) => [...prev, { latitude, longitude }]);
      });
    } else {
      console.log('location error');
    }
  }, []);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    videoRef.current.srcObject = stream;

    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp9',
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.start(); // Start recording

    setMediaRecorder(recorder);

    sendIntervalRef.current = setInterval(() => {
      if (recordedChunks.length > 0 && locations.length > 0) {
        handleSendData();
      } else {
        console.log('error in sending data', recordedChunks.length);
      }
    }, 1000); // Send data every 1 second
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    clearInterval(sendIntervalRef.current);
  };

  const handleSendData = async () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob);

    const medianLat = median(locations.map((loc) => loc.latitude));
    const medianLong = median(locations.map((loc) => loc.longitude));

    formData.append('latitude', medianLat);
    formData.append('longitude', medianLong);
    console.log(formData);

    setRecordedChunks([]);
    setLocations([]);
  };

  const median = (values) => {
    if (values.length === 0) return null;
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
      return values[half];
    }
    return (values[half - 1] + values[half]) / 2.0;
  };

  return (
    <div className="font-serif">
      <div className="hidden  flex flex-col items-center justify-center font-semibold">
        <div className={`text-white bg-red-600 rounded-xl text-lg px-6 py-3 mb-4 ${pothole ? '' : 'hidden'}`}>
          <div className="mx-auto">⚠ Alert! ⚠</div>
          <div>Pothole Detected in 100m</div>
        </div>
        <div className={`text-white bg-green-400 rounded-xl text-lg px-6 py-3 mb-4 ${pothole ? 'hidden' : ''}`}>
          <div className="mx-auto">Safe</div>
          <div>No Pothole Detected</div>
        </div>
        <div className="w-full max-w-2xl py-8">
          <div className="relative">
            <video ref={videoRef} autoPlay controls className="w-full h-auto" />
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
      <div className=" flex flex-col gap-y-10">
        <div className="mx-auto flex flex-col items-center text-center gap-y-4 px-4">
          <div className="text-4xl font-semibold">Pothole Detection System</div>
          <div className="text-gray-400">Efficiently Identify Road Hazards. Enhancing Road Safety with AI</div>
          <div>
            <button className="text-white bg-black rounded-lg">
              <Link to="/Signup">
                <div className="font-thin mx-6 my-3">Learn More About Us</div>
              </Link>
            </button>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row justify-between items-center mx-4 md:mx-20 gap-10">
          <div className="flex flex-col gap-y-4 text-center md:text-left">
            <div className="text-2xl font-semibold">Real-Time Pothole Reporting</div>
            <div className="text-gray-400 max-w-md">Instant Notifications for Road Maintenance. Seamless Integration with Municipal Systems</div>
            <div>
              <button className="text-white bg-black rounded-lg">
                <Link to="/Signup">
                  <div className="font-thin mx-6 my-3">Get Started</div>
                </Link>
              </button>
            </div>
          </div>
          <div className="max-w-xs md:max-w-md">
            <img className="object-cover aspect-square rounded-3xl" alt="landing page" src={HomeImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
