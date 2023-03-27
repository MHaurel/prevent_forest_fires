import { useCallback, useState } from "react";
import Dropzone from "./Dropzone";
import ImagePreview from "./ImagePreview";
import Info from "./Info";
import cuid from "cuid";
import './App.css';

function App() {
    const [images, setImages] = useState([]);
    const onDropImg = useCallback((acceptedFiles) => {
        console.log(acceptedFiles)
        acceptedFiles.map((file) => {
            const reader = new FileReader();

            reader.onload = function(e) {
                setImages((prevState) => [
                    ...prevState,
                    {id: cuid(), src: e.target.result},
                ]);
            };

            reader.readAsDataURL(file);
            
            var prediction = getPrediction(file);
            document.getElementById("predictionText").innerText = setPredictionInfo(prediction);

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
                console.log(`prediction: ${prediction}`)
                return prediction;
            }).catch(error => {
                console.error(error)
                return -1;
            });
        } catch {
            console.error("Could not proceed / File not existing")
        }
    }

    const setPredictionInfo = (prediction) => {
        console.log("prediction: " + prediction);
        var predictionText = "Drop an image to get a prediction."
        predictionText = prediction === 1 
            ? "The model has predicted that a wildfire is highly probable in this area."
            : "The model has not predicted wildfire in this area."
        return predictionText;    
    }

    return (
        
        <main className="App">
            <h1 className="text-center">Prevent wildfires</h1>
            <Dropzone onDrop={onDropImg} accept={"image/*"}/>
            <ImagePreview images={images.slice(-1)}/>
            {/* <Info setInfoText={setPredictionInfo}/> */}
            <div className="info">
                <h3>Info:</h3>
                <p id="predictionText">Drop an image to get a prediction.</p>
            </div>
        </main>
    )
}

export default App;