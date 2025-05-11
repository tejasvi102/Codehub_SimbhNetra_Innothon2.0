const renderWebcamCapture = () => (
    <div className="my-4 text-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        className="rounded shadow-md mx-auto"
      />
      <button
        type="button"
        onClick={captureFaceFrames}
        disabled={isCapturing || isCaptured}
        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        {isCapturing ? `Capturing... ${countdown}s` : 'Capture Face Frames'}
      </button>

      {isCapturing && (
        <div className="mt-4 text-lg text-red-500">
          Please wait while we capture {100 - frameIndex} more frames...
        </div>
      )}
    </div>
  );

    {/* {renderWebcamCapture()} */}

              {/* <div>
            <label className="block text-sm font-medium"> Create Password:</label>
            <input type="password" name="password" required className="w-full px-4 py-2 border rounded" />
          </div> */}

           {/* <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" name="password" required className="w-full px-4 py-2 border rounded" />
              </div> */}

                {/* <div>
                <label className="block text-sm font-medium">Authority ID</label>
                <input name="authorityId" required className="w-full
                
                
                px-4 py-2 border rounded" />
              </div> */}

               // for (let i = 0; i < frames.length; i++) {
    //   const response = await fetch(frames[i]);
    //   const blob = await response.blob();
    //   form.append('faces', blob, `frame${i + 1}.jpg`);
    // }

     // disabled={!isCaptured} // Enable button only after frames are captured
          
       const captureFaceFrames = () => {
    setIsCapturing(true);
    setFrames([]);
    if (isCapturing) return;
    setIsCapturing(true);
    setCountdown(10);
    setFrameIndex(0);
    setIsCaptured(false);

    const captureInterval = setInterval(() => {
      if (frameCountRef.current < 100) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          setFrames((prev) => [...prev, imageSrc]);
        }
        frameCountRef.current += 1;
        setFrameIndex(frameCountRef.current);
      } else {
        clearInterval(captureInterval);
        setIsCaptured(true);
        setIsCapturing(false);
        alert('Captured 100 face frames!');
      }
    }, 100);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownRef.current);
        }
        return prev - 1;
      });
    }, 1000);
  };
