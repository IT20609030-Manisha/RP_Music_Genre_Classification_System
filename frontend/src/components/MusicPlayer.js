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
  const [predictedGenre, setPredictedGenre] = useState('');
  let file_path = '';

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'audio/mp3' });

  const handlePredictGenre = async () => {
    file_path = file.path;
    setShowGenre(false);
    setPredictedGenre('');

    const formData = new FormData();
    formData.append('audioFilePath', file_path);

    try {
      const response = await fetch('http://localhost:5000/predict-genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ audioFilePath: file_path })
      });

      if (response.ok) {
        const data = await response.json();
        setPredictedGenre(data.predicted_genre);
        setShowGenre(true);
      } else {
        console.error('Failed to predict genre');
        toast.error('Failed to predict genre', { position: "top-center" });
      }
    } catch (error) {
      console.error('Error predicting genre:', error);
      toast.error('Error predicting genre', { position: "top-center" });
    }
  };

  return (
    <div className="container mt-5">
        
      <div {...getRootProps()} className="dropzone text-center">
        <input {...getInputProps()} />
        <button type="button" className="btn btn-outline-primary btn-lg">
            Upload the Song <i className="fa-solid fa-upload"></i>
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
              <DisplayGenre predictedGenre={predictedGenre} />
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
