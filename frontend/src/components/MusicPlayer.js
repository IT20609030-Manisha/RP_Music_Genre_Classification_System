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
  let predictedGenre = 'country';

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    //setPredictedGenre(null);
    toast.success('Uploaded Successfully!', { position: "top-center" });
    //getGenre();
  };

//   const getGenre = () => {
//     const predictedGenreFromAPI = 'pop'; 
//     setPredictedGenre(predictedGenreFromAPI);
//     console.log(predictedGenre)
//   };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'audio/mp3' });

  const handlePredictGenre = () => {
    setShowGenre(true);
  };

  let genreIndex = null;
  switch (predictedGenre) {
    case 'metal':
        genreIndex = 0;
        break;
    case 'disco':
        genreIndex = 1;
        break;
    case 'classical':
        genreIndex = 2;
        break;
    case 'hiphop':
        genreIndex = 3;
        break;
    case 'jazz':
        genreIndex = 4;
        break;
    case 'country':
        genreIndex = 5;
        break;
    case 'pop':
        genreIndex = 6;
        break;
    case 'blues':
        genreIndex = 2;
        break;
    case 'reggae':
        genreIndex = 7;
        break;
    case 'rock':
        genreIndex = 8;
        break;
    default:
        break;
  }

  return (
    <div className="container mt-5">
        <ToastContainer />
      <div {...getRootProps()} className="dropzone text-center">
        <input {...getInputProps()} />
        <button type="button" class="btn btn-outline-primary btn-lg">
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
            {showGenre && predictedGenre !== null && (
                <DisplayGenre predictions={genreIndex} />
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
