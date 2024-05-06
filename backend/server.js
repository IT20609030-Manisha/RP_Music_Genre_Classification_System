const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 5001;

app.use(express.json());

app.post('/predict-genre', (req, res) => {
    const audioFilePath = req.body.audioFilePath;
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
        res.status(500).send({ error: 'An error occurred while processing the audio file.' });
      } else {
        res.send({ genre });
      }
    });
});

app.post('/receive-data', (req, res) => {

    const genre = req.body.genre;

        // Here you can process the received file path as per your requirements
        console.log('Received Predicted Genre:', genre);

        // Send response back to the client    
        res.json({ success: true, message: 'File received successfully' });

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});