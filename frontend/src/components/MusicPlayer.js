import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayGenre from './DisplayGenre';
import '../styles/MusicPlayerStyles.css';
import musicPlayerImage from '../images/player2.png';

const MusicPlayer = () => {
  const [file, setFile] = useState(null);
  const [showGenre, setShowGenre] = useState(false);
  //const [predictedGenre, setPredictedGenre] = useState(null);
  let predictedGenre = '';
  let file_path  ='';
  let file_x = '../audios/classical_Music.mp3'

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    //setPredictedGenre(null);
    //toast.success('Uploaded Successfully!', { position: "top-center" });
    //getGenre();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'audio/mp3' });

  // const handlePredictGenre = () => {
  //   setShowGenre(true);
  // };
  const handlePredictGenre = async () => {
    
    file_path  ='';
    setShowGenre(false);
    predictedGenre = '';


    file_path = file.path;
    

    const formData = new FormData();
    formData.append('audioFilePath', file_path);

    console.log(file_path)
    console.log("printing formdata")
    console.log(file)
    console.log(formData)
  
    try {
      const response = await fetch('http://localhost:5000/predict-genre', {
        method: 'POST',
        // body: formData
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ audioFilePath: file_path}) 
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Api working")
        
        // Update the state with the predicted genre
        predictedGenre = data.predicted_genre;
        setShowGenre(true);
        console.log('Predicted Genre:', predictedGenre);
      } else {
        console.error('Failed to predict genre');
        // Handle the error, e.g., display a toast message
        toast.error('Failed to predict genre', { position: "top-center" });
      }
    } catch (error) {
      console.error('Error predicting genre:', error);
      // Handle the error, e.g., display a toast message
      toast.error('Error predicting genre', { position: "top-center" });
    }
  };

  let genreIndex = null;

  return (
    <div className="container mt-5">
        
      <div {...getRootProps()} className="dropzone text-center">
        <input {...getInputProps()} />
        <button type="button" className="btn btn-outline-primary btn-lg">
            Uplaod the Song <i className="fa-solid fa-upload"></i>
        </button>
        <p className="mb-0">Drag 'n' drop an MP3 file here, or click to select one</p>
      </div>
      {file && (
        <div className="mt-3">
            
          <h2>{file.name}</h2>
          <div className="mt-4">
            <button type="button" className="btn btn-outline-primary" onClick={handlePredictGenre}>
                Predict Genre <i className="fa-solid fa-music"></i>
            </button>
          </div>
          <div>
            {showGenre && (
              <div>
                <div>
                  <h2 className="label">Genre : {predictedGenre}</h2>
                </div>
                <div className="mt-3">
                  <button type="button" className="btn btn-outline-primary">
                    View More Info <i className="fa-solid fa-circle-info"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <ReactPlayer 
                url={URL.createObjectURL(file)} 
                controls 
                config={{
                    file: {
                        attributes: {
                            poster: musicPlayerImage
                        }
                    }
                }}
                style={{ maxWidth: '50%', maxHeight: '50%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
