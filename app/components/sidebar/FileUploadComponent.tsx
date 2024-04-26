'use client'
import axios from 'axios';
import React, { useState } from 'react';

const FileUploadComponent: React.FC = () => {
  const [file, setFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      var reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setFile(reader.result as string); // Set the base64 string to state
      };
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        throw new Error('No file selected');
      }

      axios.post('/api/image', { image: file }); // Send the file as an object with the 'image' property

      console.log('File uploaded successfully:');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input accept="image/*" type="file" onChange={handleFileChange} /> {/* Corrected accept attribute */}
      <button 
  onClick={handleUpload} 
  disabled={!file} 
  className="
    bg-blue-500 
    hover:bg-blue-600 
    text-white 
    font-semibold 
    py-2 
    px-4 
    rounded 
    cursor-pointer 
    transition-colors 
    duration-300 
    ease-in-out 
    disabled:bg-gray-300 
    disabled:text-gray-600 
    disabled:pointer-events-none 
    disabled:cursor-not-allowed
  "
>
  Upload
</button>

    </div>
  );
};

export default FileUploadComponent;
