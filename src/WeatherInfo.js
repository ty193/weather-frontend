import React from 'react';
import { Link } from 'react-router-dom';

function WeatherInfo() {
	return (
		<div>
			<h1>Weather Info</h1>
			<h2>
				<Link to="/search">back to search</Link>
			</h2>
		</div>
	);
}

export default WeatherInfo;
