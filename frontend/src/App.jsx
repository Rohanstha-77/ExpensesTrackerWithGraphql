import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import TransactionPage from './pages/TransactionPage.jsx';
import NotFound from './pages/NotFoundPage.jsx';
import Header from './components/ui/Header.jsx';
import { useQuery } from '@apollo/client';
import { GET_AUTH_USER } from './graphql/queries/user.query.js';

function App() {
	const {loading,data, error }= useQuery(GET_AUTH_USER)
	// console.log(data)
	if(loading) return <p>Loading..</p>
	return (
		<>
			{data?.authUser && <Header />}
			<Routes>
				<Route path='/' element={data.authUser ? <HomePage /> : <Navigate to = "/login" />} />
				<Route path='/login' element={!data.authUser ? <LoginPage /> : <Navigate to ="/"/>} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/transaction/:id' element={!data.authUser ? <TransactionPage /> : <Navigate to ="/login"/>} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
}
export default App;
