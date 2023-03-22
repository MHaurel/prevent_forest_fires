import { useState } from 'react';

function ImageLoader() {
  const [file] = useState();

  const handleFileChange = (e) => {
    
    // console.log("Handling file changing...")
    if (e.target.files) {
      try {
        const formData = new FormData();
        var file = e.target.files[0];
        formData.append('file', file);

        fetch("http://localhost:5000/predict", {
          method: "POST",
          body: formData
        }).then(response => response.json()).then(data => {
          console.log(data);
        }).catch(error => {
          console.error(error)
        })
      } catch {
        console.error("Could not proceed / File not existing")
      }
    }    
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input id='image-input' type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default ImageLoader;