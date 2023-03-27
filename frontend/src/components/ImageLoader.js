import './ImageLoader.css';
import Dropzone from './Dropzone';

function ImageLoader() {
  // const [file] = useState();s

  // const handleFileChange = (e) => {
    
  //   // console.log("Handling file changing...")
  //   if (e.target.files) {
  //     try {
  //       const formData = new FormData();
  //       var file = e.target.files[0];
  //       formData.append('file', file);

  //       fetch("http://localhost:5000/predict", {
  //         method: "POST",
  //         body: formData
  //       }).then(response => response.json()).then(data => {
  //         console.log(data);
  //         document.getElementById('prediction').innerText = `prediction: ${data['prediction']}`;
  //       }).catch(error => {
  //         console.error(error)
  //       })
  //     } catch {
  //       console.error("Could not proceed / File not existing")
  //     }
  //   }    
  // };

  return (
    <div className='wrapper'>
      <h1>Prevent Forest Fires</h1>

      <p id='prediction'></p>

      <Dropzone/>
    </div>
  );
}

export default ImageLoader;