import React, { useEffect, useState } from 'react'
import '../styles/DisplayGenreStyles.css'

const DisplayGenre = ({ predictedGenre }) => {
    
    const CLIENT_ID = "041e658da36f4c6383218a56609423fa";
    const CLIENT_SECRET = "5673f05eebdd4169a8d54fba0f6f1e13";
    const [accessToken, setAccessToken] = useState("");

    useEffect( () => {
        //API Access Token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
        }

        fetch('https://accounts.spotify.com/api/token',authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }, [])

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
            <div class="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
            <div class="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
            <div class="card" style={{ width: '18rem', marginBottom: '1rem' }}>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    )
}

export default DisplayGenre