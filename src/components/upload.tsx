"use client"

import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { storage } from '@/lib/firebase';

const VideoUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    

  // Handle file selection
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    
    // Basic validation
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError('File must be smaller than 100MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  // Handle upload
  const handleUpload = () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      // Progress function
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percent);
      },
      // Error function
      (err) => {
        setError(err.message);
      },
      // Complete function
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadUrl);
        setFile(null);
        setProgress(0);
      }
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      {/* File Input */}
      <div className="space-y-4 text-center">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        
        {file && (
          <p className="text-sm text-gray-600">
            Selected: {file.name}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-center text-gray-600">
            {Math.round(progress)}% uploaded
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center">
          {error}
        </p>
      )}

      {/* Success Message */}
      {url && (
        <div className="text-center space-y-2">
          <p className="text-green-500">Upload complete!</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Video
          </a>
        </div>
      )}

      {/* Upload Button */}
      {file && progress === 0 && (
        <Button 
          onClick={handleUpload}
          className="w-full"
        >
          Upload Video
        </Button>
      )}
    </div>
  );
};

export default VideoUploader;