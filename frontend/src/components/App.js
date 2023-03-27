import { useCallback, useState } from "react";
import Dropzone from "./Dropzone";
import ImagePreview from "./ImagePreview";
import Info from "./Info";
import cuid from "cuid";
import './App.css';

function App() {
    const [images, setImages] = useState([]);
    const [predictionText, setPredictionText] = useState(
        "Drop an image to get a prediction"
    );
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
            
            let prediction = getPrediction(file);
            
            return file;
        })
    }, []);

    const getPrediction = async (image_file) => {
        try {
            const formData = new FormData();
            formData.append('file', image_file);

            await fetch("http://localhost:5000/predict", {
                method: "POST",
                body: formData
            }).then(response => response.json()).then(data => {
                var prediction = data['prediction'];
                prediction === "1" 
                    ? setPredictionText("The model has predicted that a wildfire is highly probable in this area.")
                    : setPredictionText("The model has not predicted wildfire in this area.")
                return prediction;
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
            <ImagePreview images={images.slice(-1)}/>
            <Info infoText={predictionText}/>
        </main>
    )
}

export default App;