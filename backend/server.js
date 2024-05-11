const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = 5000;
let predicted_genre;

//app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/predict-genre', (req, res) => {
  console.log("server side")
    console.log(req.body.audioFilePath);
    const audioFilePath = "../audios/" + req.body.audioFilePath;
    
    const pythonProcess = spawn('python', ['./predict_vgg16.py', audioFilePath]);
  
    let genre = '';
    let error = false;
  
    pythonProcess.stdout.on('data', (data) => {
      genre = data.toString().trim();
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
      error = true;
    });
  
    pythonProcess.on('close', (code) => {
      if (error) {
        //res.status(500).send({ error: 'An error occurred while processing the audio file.' });
        res.send({predicted_genre})
      } else {
        res.send({ genre });
      }
    });
});

app.post('/receive-data', (req, res) => {

  predicted_genre = req.body.genre;

        // Here you can process the received file path as per your requirements
        console.log('Received Predicted Genre:', predicted_genre);
        isRecieved = true;

        // Send response back to the client    
        res.json({ success: true, message: 'File received successfully' });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});