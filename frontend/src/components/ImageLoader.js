import React from "react";

class ImageLoader extends React.Component {

    saveImage() {
        /**
         * Saves the image to a directory in backend/temp_data
         */
        var inputTag = document.getElementById('inputImg');
        if (inputTag.files.length > 0) {
            console.log("File selected: " + inputTag.files[0])
            // TODO : Save file to directory

        } else {
            console.log("No files selected")
        }
    }

    render() {
        return (
            <div>
                <label>Select image</label>
                <input id="inputImg" type='file' accept="image/png, image/jpeg"></input>
                <button onClick={this.saveImage}>Predict</button>
            </div>
        )
    }
}

export default ImageLoader;