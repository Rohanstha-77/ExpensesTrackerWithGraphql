import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import React from 'react';
import './index.css'
import App from './App.jsx'
import GridBackground from './components/ui/GridBackground.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
				<App />
			</GridBackground>
		</BrowserRouter>
	</React.StrictMode>
);