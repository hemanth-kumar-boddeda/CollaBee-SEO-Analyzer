import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import './Demo.css';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [videoDescription, setVideoDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showResult, setShowResult] = useState(false); // State to toggle result box

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/analyze-video', {
        description: videoDescription,
      });

      // Set the analysis results
      setAnalysisResults(response.data);
      setShowResult(true); // Show result box
    } catch (error) {
      console.error('Error analyzing the content', error);
      setErrorMessage('Error analyzing the content. Please try again.');
    }
    setLoading(false);
  };

  const handleCloseResult = () => {
    setShowResult(false); // Hide result box
    setAnalysisResults(null); // Clear analysis results
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard! 📋✨'); // Show success notification using Toastify
  };

  return (
    <section className='mt-4 flex w-full max-w-2xl flex-col relative'>
      {loading && <div className='loading-icon'></div>}
      {showResult && (
        <div className='result-box' style={{ zIndex: 9999 }}>
          <span className='close-icon' onClick={handleCloseResult}>
            &#x2715; {/* Close icon */}
          </span>
          <div>
            {/* Display analysis results here */}
            {/* Example: */}
            <h2>Analysis Results:</h2>
            <div className='wrapper'>
              <div className='text-icon'>
                <p>Captions: {analysisResults?.captions} </p>

                <button
                  className='text-icon'
                  onClick={() => handleCopyToClipboard(analysisResults?.captions)}
                >
                  <FileCopyIcon /> {/* Copy icon */}
                </button>
              </div>
              <div className='text-icon'>
                <p>Title: {analysisResults?.title} </p>
                <button
                  className='text-icon'
                  onClick={() => handleCopyToClipboard(analysisResults?.title)}
                >
                  <FileCopyIcon /> {/* Copy icon */}
                </button>
              </div>
              <div className='text-icon'>
                <p>Keywords: {analysisResults?.keywords} </p>
                <button
                  className='text-icon'
                  onClick={() => handleCopyToClipboard(analysisResults?.keywords)}
                >
                  <FileCopyIcon /> {/* Copy icon */}
                </button>
              </div>
              <div className='text-icon'>
                <p>Hashtags: {analysisResults?.hashtags} </p>
                <button
                  className='text-icon'
                  onClick={() => handleCopyToClipboard(analysisResults?.hashtags)}
                >
                  <FileCopyIcon /> {/* Copy icon */}
                </button>
              </div>
              <div className='text-icon'>
                <p>Optimised Description : {analysisResults?.optimised_description} </p>
                <button
                  className='text-icon'
                  onClick={() => handleCopyToClipboard(analysisResults?.optimised_description)}
                >
                  <FileCopyIcon />
                </button>
              </div>
              <div className='text-icon'>
                <p>SEO Before : {analysisResults?.['before SEO rank (%)']} </p>
                <button
                  className='text-icon'
                  onClick={() => handleCopyToClipboard(analysisResults?.['before SEO rank (%)'])}
                ></button>
              </div>
              <div className='text-icon'>
                <p>SEO After : {analysisResults?.['after SEO rank (%)']} </p>
                <button
                  className='text-icon'
                  onClick={() => handleCopyToClipboard(analysisResults?.['after SEO rank (%)'])}
                ></button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showResult && <div className='overlay' onClick={handleCloseResult}></div>}
      <div className='app'>
        <textarea
          className='url_input'
          placeholder='Enter video description'
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
        />
        <button className='black_btn' onClick={handleSubmit} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      {/* Centered ToastContainer on the right side */}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Arrow to scroll to top */}
      <ArrowUpwardIcon />
    </section>
  );
};

export default Demo;
