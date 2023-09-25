import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from '../../computerVision';
import styled from 'styled-components';
import { text } from '@cloudinary/url-gen/qualifiers/source';

const Loader = styled.div`
  width: 100px;
  height: ${(props) => props.precent}%;
  border: 1px solid;
  border-radius: 50%;
`;

const Add = () => {
  const [invoice, setInvoice] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [uploadedImage, setUpladedImage] = useState(null);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [dataToSave, setDataToSave] = useState({});
  const [loading, setLoading] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);

  const onFileUrlEntered = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(generatedUrl || null).then((item) => {
      setAnalysis(item);
      setInvoice('');
      setProcessing(false);
    });
  };

  const buttonHandler = (e) => {
    const valueName = e.target.name.split(' ')[0];
    setDataToSave({
      ...dataToSave,
      [valueName]: e.target.name,
    });
  };

  const DisplayResults = () => {
    return (
      <div>
        <h2>Computer Vision Analysis</h2>
        <div>
          <img
            src={analysis.URL}
            height="200"
            border="1"
            alt={
              analysis.description &&
              analysis.description.captions &&
              analysis.description.captions[0].text
                ? analysis.description.captions[0].text
                : "can't find caption"
            }
          />
        </div>
        {analysis.text.readResults[0].lines.map((text, index) => {
          return (
            <button onClick={buttonHandler} name={text.text} key={index}>
              {text.text}
            </button>
          );
        })}
      </div>
    );
  };

  const Analyze = () => {
    return (
      <div>
        {!processing && (
          <div>
            <button onClick={onFileUrlEntered}>Analizuj zdjęcie</button>
          </div>
        )}
        {processing && <div>Processing</div>}
        <hr />
        {analysis && DisplayResults()}
      </div>
    );
  };

  const imageUpload = (e) => {
    setUpladedImage(e.target.files[0]);
  };

  const postImage = async () => {
    const formData = new FormData();
    formData.append('file', uploadedImage);
    formData.append('upload_preset', 'xitk1bu2');
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_CLOUDINARY_BASE_URL}/upload`, formData, {
        options: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        onUploadProgress: (ProgressEvent) => {
          const percentCompleted = Math.round(
            (ProgressEvent.loaded * 100) / ProgressEvent.total
          );
          setPercentCompleted(percentCompleted);
          setLoading(false);
        },
      })
      .then((res) => {
        setGeneratedUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const Render = () => {
    const ready = ComputerVisionIsConfigured();
    if (ready) {
      return <Analyze />;
    }
  };

  const sendDataHandler = async (data) => {
    try {
      const res = await axios.post('http://localhost:3002/api/invoice/add', {
        params: {
          dataToSave
        }
      })
      console.log(res.data);
    } catch(error) {
      console.log(error)
    }
  }

  // wyświetl tylko dane:
  // numer faktury,
  // data wystawienia,
  // miejsce wystawienia,
  // data sprzedaży,
  // nr rejestracyjny,
  // dodaj pole do wpisania aktualnych kilometrów

  return (
    <>
      <input type="file" accept="image/*" onChange={imageUpload} />
      <button onClick={postImage}>zatwierdź zdjęcie</button>
      {/* <Loader precent={percentCompleted} >{percentCompleted}</Loader> */}
      <div>
        Dane do zapisania:
        {dataToSave &&
          Object.keys(dataToSave).map((item, index) => {
            return (
              <>
                <div key={index}>{dataToSave[item]}</div>
              </>
            );
          })}
          <input type="number" name="carMileage" placeholder='aktualny przebieg' onChange={(e) => {
            setDataToSave({
              ...dataToSave,
              [e.target.name]: e.target.value,
            });
          }} />
          <button onClick={() => sendDataHandler(dataToSave)} >zapisz</button>
      </div>
      <div>{Render()}</div>
    </>
  );
};

export default Add;
