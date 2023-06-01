// index.tsx
import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import Main from './components/Main';

// get and create the root element of the page
const container = document.getElementById('root');
const root = createRoot(container!)

// render the master template
root.render(
    <div className="wrapper">
        <div className="App">
            <header className="app-header">
                <h1>
                    <a href="/">CPD Log - {process.env.REACT_APP_NAME}</a>
                </h1>
                {process.env.REACT_APP_BANNER1_IMAGE ? <div className="spacer"></div> : ""}
                <div className="banners">
                    {process.env.REACT_APP_BANNER1_IMAGE ? <a href={process.env.REACT_APP_BANNER1_URL} target="_blank" rel="noreferrer"><img alt={process.env.REACT_APP_BANNER1_ALT} src={process.env.REACT_APP_BANNER1_IMAGE} /></a> : ""}
                    {process.env.REACT_APP_BANNER2_IMAGE ? <a href={process.env.REACT_APP_BANNER2_URL} target="_blank" rel="noreferrer"><img alt={process.env.REACT_APP_BANNER2_ALT} src={process.env.REACT_APP_BANNER2_IMAGE} /></a> : ""}
                    {process.env.REACT_APP_BANNER3_IMAGE ? <a href={process.env.REACT_APP_BANNER3_URL} target="_blank" rel="noreferrer"><img alt={process.env.REACT_APP_BANNER3_ALT} src={process.env.REACT_APP_BANNER3_IMAGE} /></a> : ""}
                </div>
            </header>
            <Main />
            <footer className="footer">
                {process.env.REACT_APP_FOOTER_TEXT}
                <div className="icons">
                    <a href={process.env.REACT_APP_FOOTER_GITHUB} target="_blank" rel="noreferrer">
                        <img alt="github" src="github.png" />
                    </a>
                    <a href={process.env.REACT_APP_FOOTER_LINKEDIN} target="_blank" rel="noreferrer">
                        <img alt="linkedin" src="linkedin.png" />
                    </a>
                </div>
            </footer>
        </div>
    </div>
);
