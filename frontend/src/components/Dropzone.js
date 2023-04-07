import React from "react";
import { useDropzone } from "react-dropzone";
import './Dropzone.css';

function Dropzone({ onDrop, accept, open }) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        accept, onDrop
    });
    
    return (
        <div {...getRootProps({ className: "dropzone" })}>
            <input className="input-zone" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <p className="dropzone-content">
                        Release to drop the file here
                    </p>
                ) : (
                    <p className="dropzone-content">
                        Drag’n’drop a file here, or click to select a file
                    </p>
                )}
            </div>
        </div>
    );
}

export default Dropzone;