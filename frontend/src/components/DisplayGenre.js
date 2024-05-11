import React from 'react'
import '../styles/DisplayGenreStyles.css'

const DisplayGenre = ({ predictedGenre }) => {
    // const genres = {
    //     0: "Metal", 1: "Disco", 2: "Classical", 3: "Hiphop", 4: "Jazz",
    //     5: "Country", 6: "Pop", 7: "Blues", 8: "Reggae", 9: "Rock"
    // };
    // console.log(predictions)
    console.log("Display1 : ",predictedGenre)
    // const genre = predicted_Genre;
    // console.log("Display2 : ",genre)
    return (
        <div className="genre-bars mt-3">
            <div className="genre-bar">
                {/* <div className="bar" style={{ width: '100%' }}></div> */}
                <h2 className="label">Genre : {predictedGenre}</h2>
            </div>
            <div className="mt-3">
                <button type="button" className="btn btn-outline-primary">
                    View More Info <i className="fa-solid fa-circle-info"></i>
                </button>
            </div>
        </div>
    )
}

export default DisplayGenre