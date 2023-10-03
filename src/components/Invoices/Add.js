import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from '../../computerVision';
import { DataToSaveSection } from './Add.styled';
import { SavedSuccess } from '../SavedStatuses';

const Add = () => {
  const [invoice, setInvoice] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [uploadedImage, setUpladedImage] = useState(null);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [dataToSave, setDataToSave] = useState({
    invoice_number: '',
    invoice_date: '',
    price: '',
    product: '',
    image: '',
    mileage: '',
  });
  const [analized, setAnalized] = useState(false);
  const [uploaded, setUploaded] = useState(null);

  useEffect(() => {
    setDataToSave({
      ...dataToSave,
      image: generatedUrl
    })
  }, [generatedUrl])

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

  const DisplayResults = () => {
    return (
      <>
        {analysis?.text?.readResults[0].lines.map((text, index) => {
          return (
            <>
              <option key={index} value={text?.text}>
                {text?.text}
              </option>
            </>
          );
        })}
      </>
    );
  };

  const Analyze = () => {
    return (
      <div>
        {!processing && (
          <div>
            {generatedUrl !== "" && (
              <button onClick={onFileUrlEntered}>Analizuj zdjęcie</button>
            )}
          </div>
        )}
        {processing && <div>Processing</div>}
        {analysis && DisplayResults() && setAnalized(true)}
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

    await axios
      .post(`${process.env.REACT_APP_CLOUDINARY_BASE_URL}/upload`, formData, {
        options: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      })
      .then((res) => {
        setGeneratedUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Render = () => {
    const ready = ComputerVisionIsConfigured();
    if (ready) {
      return <Analyze />;
    }
  };

  const sendDataHandler = async () => {
    const { invoice_number, invoice_date, price, product, mileage, image } = dataToSave;
    try {
      const res = await axios.post('http://localhost:3002/api/invoice/add', {
        params: {
          invoice_number,
          invoice_date,
          price,
          product,
          image,
          mileage
        },
      });
      setUploaded(true);
      setDataToSave({});
    } catch (error) {
      setUploaded(false);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={imageUpload} />
      <button onClick={postImage}>zatwierdź zdjęcie</button>
      <div>
        {analized && (
          <DataToSaveSection>
            <h5>Dane do zapisania:</h5>
            <span>
              <p>numer faktury: </p>
              <select
                onChange={(e) =>
                  setDataToSave({
                    ...dataToSave,
                    invoice_number: e.target.value,
                  })
                }
              >
                {DisplayResults()}
              </select>
            </span>
            <span>
              <p>data wystawienia faktury: </p>
              <select
                onChange={(e) =>
                  setDataToSave({ ...dataToSave, invoice_date: e.target.value })
                }
              >
                {DisplayResults()}
              </select>
            </span>
            <span>
              <p>kwota faktury: </p>
              <select
                onChange={(e) =>
                  setDataToSave({ ...dataToSave, price: e.target.value })
                }
              >
                {DisplayResults()}
              </select>
            </span>
            <span>
              <p>produkt: </p>
              <select
                onChange={(e) =>
                  setDataToSave({ ...dataToSave, product: e.target.value })
                }
              >
                {DisplayResults()}
              </select>
            </span>
            <span>
              <input
                type="number"
                name="carMileage"
                placeholder="aktualny przebieg"
                onChange={(e) => {
                  setDataToSave({
                    ...dataToSave,
                    mileage: e.target.value,
                  });
                }}
              />
            </span>
            <button onClick={sendDataHandler} >Zatwierdź</button>
          </DataToSaveSection>
        )}
      </div>
      {!analized && (
        <div>{Render()}</div>
      )}
      {analized && (
        <>
        <div>
          <h1>Computer Vision Analysis</h1>
          <img
            src={analysis.URL}
            height="400"
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
        </>
      )}
      {/* {uploaded !== null && (
        <SavedSuccess success={uploaded ? true : false} />
      )} */}
    </>
  );
};

export default Add;
