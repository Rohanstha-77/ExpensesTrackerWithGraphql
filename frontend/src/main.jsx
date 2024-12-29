import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import React from 'react';
import './index.css'
import App from './App.jsx'
import GridBackground from './components/ui/GridBackground.jsx'
import { BrowserRouter } from 'react-router-dom'
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import { Toaster } from 'react-hot-toast';

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
	credentials: "include" //This tell apollo client to send cookie with every request to the server
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
				<ApolloProvider client = {client}>
					<App />
				</ApolloProvider>
			</GridBackground>
		</BrowserRouter>
		<Toaster/>
	</React.StrictMode>
);