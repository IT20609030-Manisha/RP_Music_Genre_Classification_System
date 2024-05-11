import importlib
import librosa
import numpy as np
import sys
from keras.models import load_model
import requests

genres = {0: "Metal", 1: "Disco", 2: "Classical", 3: "Hiphop", 4: "Jazz", 
            5: "Country", 6: "Pop", 7: "Blues", 8: "Reggae", 9: "Rock"}
song_samples = 660000


def load_song(filepath):
    y, sr = librosa.load(filepath)
    y = y[:song_samples]
    return y, sr

def splitsongs(X, window = 0.1, overlap = 0.5):
    temp_X = []

    xshape = X.shape[0]
    chunk = int(xshape*window)
    offset = int(chunk*(1.-overlap))

    spsong = [X[i:i+chunk] for i in range(0, xshape - chunk + offset, offset)]
    for s in spsong:
        temp_X.append(s)

    return np.array(temp_X)

# def to_melspec(signals):
#     melspec = lambda x : librosa.feature.melspectrogram(x, n_fft=1024, hop_length=512)[:, :, np.newaxis]
#     spec_array = map(melspec, signals)
#     return np.array(list(spec_array))

def to_melspec(signals):
    spec_array = []
    for signal in signals:
        melspec = librosa.feature.melspectrogram(y=signal, n_fft=1024, hop_length=512)[:, :, np.newaxis]
        spec_array.append(melspec)
    return np.array(spec_array)
       
def get_genre(path, debug=False):
    
    model = load_model('F:\\Research Project\\RP_Music_Genre_Classification_System\\weights\\genres_full_vgg16.h5')
    
    y = load_song(path)[0]
    predictions = []
    spectro = []
    signals = splitsongs(y)
    spec_array = to_melspec(signals)
    spectro.extend(spec_array)
    spectro = np.array(spectro)
    spectro = np.squeeze(np.stack((spectro,)*3,-1))

    pr = np.array(model.predict(spectro))
    predictions = np.argmax(pr, axis=1)
    if debug:
        print('Generes : ', genres)
        print('Load audio:', path)
        # print("\nFull Predictions:")
        # for p in pr: print(list(p))
        print("\nPredictions:\n{}".format(predictions))
        print("Confidences:\n{}".format([round(x, 2) for x in np.amax(pr, axis=1)]))
        print("\nOutput Predictions:\n{}\nPredicted class:".format(np.mean(pr, axis=0)))
    
    return genres[np.bincount(predictions).argmax()] # list(np.mean(pr, axis=0)

if __name__ == '__main__':
    # print(get_genre('././audios/Take Me Home.mp3', True))
    if len(sys.argv) != 2:
        print("Usage: python predict_vgg16.py <audio_file_path>")
        sys.exit(1)
    audio_path = sys.argv[1]
    print("Audio Path:", audio_path)  # Add this line to print the audio_path
    genre = get_genre(audio_path, True)
    print("Predicted Genre:", genre)

    # Send the generated lo-fi MIDI file to the server
    url = 'http://localhost:5000/receive-data'
    data = {'genre': genre}
    
    try:
        response = requests.post(url, json=data)  # Send data as JSON in a POST request
        response_data = response.json()

        if response.status_code == 200 and response_data.get('success'):
            print('Lo-fi MIDI file sent to the server successfully!')
        else:
            print('Failed to send the lo-fi MIDI file to the server.')
    except requests.RequestException as e:
        print('Error:', e)
