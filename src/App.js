import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Search';
import WeatherInfo from './WeatherInfo';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/search" exact>
					<Search />
				</Route>
				<Route path="/search/:zip" exact>
					<WeatherInfo />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
