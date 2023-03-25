import { useCallback, useState } from "react";
import Dropzone from "./Dropzone";
import ImagePreview from "./ImagePreview";
import Info from "./Info";
import cuid from "cuid";
import './App.css';

function App() {
    const [images, setImages, prediction] = useState([]);
    const onDropImg = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();

            reader.onload = function(e) {
                setImages((prevState) => [
                    ...prevState,
                    {id: cuid(), src: e.target.result},
                ]);
            };

            reader.readAsDataURL(file);
            
            // Make it an asynchronous method
            var prediction = getPrediction(file);
            console.log(`prediction: ${prediction}`)

            return file;
        })
    }, []);

    const getPrediction = (image_file) => {
        console.log('getting a prediction')
        try {
            const formData = new FormData();
            formData.append('file', image_file);

            fetch("http://localhost:5000/predict", {
                method: "POST",
                body: formData
            }).then(response => response.json()).then(data => {
                // console.log(data);
                // document.getElementById('prediction').innerText = `prediction: ${data['prediction']}`;
                var prediction = data['prediction'];
                console.log(`prediction: ${prediction}`)
                // return prediction;
                return 1;
            }).catch(error => {
                console.error(error)
                return -1;
            });
        } catch {
            console.error("Could not proceed / File not existing")
        }
    }

    return (
        
        <main className="App">
            <h1 className="text-center">Prevent wildfires</h1>
            <Dropzone onDrop={onDropImg} accept={"image/*"}/>
            <ImagePreview images={images}/>
            <Info prediction={1}/>
        </main>
    )
}

export default App;