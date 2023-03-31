import React, { useState } from 'react';

function ImageUploader() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      setFile(reader.result);
    };
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: file,
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default ImageUploader;