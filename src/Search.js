import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { Link } from 'react-router-dom';
import { Form, Button, Container, ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import { array } from 'prop-types';

function Search() {
	const [ data, setData ] = useState([]);
	const [ zip, setZip ] = useState([]);
	const [ zipToDelete, setZipToDelete ] = useState(null);
	const [ weather, setWeather ] = useState([]);

	useEffect(() => {
		getDataFromDb();
		makeList(data);
		getWeather();
	}, []);

	console.log(data);
	console.log(weather);

	// logZips(data);
	// console.log(zip);

	// const getDataFromDb = async () => {
	// 	await setZip(fetch('http://localhost:3001/locations'))
	// 		.then((res) => res.json())
	// 		.then((res) => setZip({ zip: res.zip }));
	// };

	// const getDataFromDb = async () => {
	// 	let res = await axios.get('http://localhost:3001/locations');
	// 	setData(res.data);
	// };
	const getDataFromDb = async () => {
		let res = await axios.get('http://localhost:3001/locations');
		let info = res.data;
		let zips = [];
		for (let i = 0; i < info.length; i++) {
			zips.push(info[i].zip);
		}
		return setData(zips);
	};
	// .data[0].zip

	const putDataToDB = async (zip) => {
		await axios.post('http://localhost:3001/location', zip);
		// getDataFromDb();
	};

	// const list = data.map((d) => <li key={d.zip}>{d.zip}</li>);

	// const list = (data) => {
	// 	for (let i = 0; i < data.length; i++) {
	// 		data.map((data) => <li key={data.data[i].zip}>{data.data[i].zip}</li>);
	// 	}
	// };

	const deleteFromDB = async (zipTodelete) => {
		let objZipToDelete = null;
		data.forEach((dat) => {
			if (dat.zip === zipTodelete) {
				objZipToDelete = dat._zip;
			}
		});

		await axios.delete('http://localhost:3001/location:id', {
			data: {
				zip: objZipToDelete
			}
		});
	};

	// const displayZips = (zips) => {
	// 	if (!zips.length) return null;

	// 	return zips.map((zip, idx) => {
	// 		<div key={idx}>
	// 			<p>{zip.zip}</p>
	// 		</div>;
	// 	});
	// };

	// const displayZips = (zips) => {
	// 	let list = document.createElement('ul');

	// 	for (let i = 0; i < zips.length; i++) {
	// 		let item = document.createElement('li');

	// 		item.appendChild(document.createTextNode(zips[i]));

	// 		list.appendChild(item);
	// 	}

	// 	// return list;
	// };

	const makeList = () => {
		let list = document.getElementById('myList');
		data.forEach((item) => {
			let p = document.createElement('p');
			p.innerText = item;
			list.appendChild(p);
		});
	};

	// const makeList = () => {
	// 	let list = document.getElementById('myList');
	// 	data.forEach((item) => {
	// 		let p = document.createElement('p');
	// 		p.innerText = item;
	// 		list.appendChild(p);
	// 	});
	// };

	const getWeather = async () => {
		const info = await fetch(
			'api.openweathermap.org/data/2.5/weather?zip=84062&units=imperial&appid=f6006e1c9b4c59b99d7cf6909d8a0ff1'
		)
			.then((res) => res.json())
			.then((result) => {
				setData(result);
				console.log(result);
			});

		return setWeather(info);
	};

	return (
		<div className="page">
			<Container>
				<Form>
					<Form.Group className="mb-5" controlId="formBasicEmail">
						<h2>Search for a city using a zip code</h2>
					</Form.Group>
					<div className="search">
						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								placeholder="Enter Zip Code"
								onChange={(e) => setZip({ zip: e.target.value })}
							/>
						</Form.Group>
					</div>
					<Form.Group className="mb-3">
						<Button onClick={() => putDataToDB(zip)} variant="primary" type="submit">
							Add City
						</Button>
					</Form.Group>
				</Form>
			</Container>
			{/* <div style={{ padding: '10px' }}>
				<input
					type="text"
					onChange={(e) => setZip({ zip: e.target.value })}
					placeholder="enter zip code"
					style={{ width: '200px' }}
				/>
				<button onClick={() => putDataToDB(zip)}>ADD</button>
			</div> */}
			<p id="myList" />
			{/* <ul>
				{data ? (
					<div>{list}</div>
				) : (
					data.map((dat) => (
						<li style={{ padding: '10px' }} key={data}>
							<span style={{ color: 'gray' }}> zip: </span> {dat} <br />
							<span style={{ color: 'gray' }}> zip: </span>
							{dat}
						</li>
					))
					'NO DB ENTRIES YET'
				)}
			</ul> */}

			<h2>
				<Link to="/search/:zip">see results </Link>
				<button onClick={() => deleteFromDB(zipToDelete)}>DELETE</button>
			</h2>
			<Container>
				<Form>
					<Form.Group className="mb-5" controlId="formBasicEmail">
						<h2>Find the Weather!</h2>
					</Form.Group>
					<div className="search">
						<Form.Group className="mb-3">
							<Form.Control
								type="text"
								placeholder="Enter Zip Code"
								onChange={(e) => setZip({ zip: e.target.value })}
							/>
						</Form.Group>
					</div>
					<Form.Group className="mb-3">
						<Button onClick={() => getWeather(zip)} variant="primary" type="submit">
							Get Weather
						</Button>
					</Form.Group>
				</Form>
			</Container>
			<div>
				<p>City: {weather.name}</p>
				<p>Temperature: {weather.main.temp}</p>
				<p>High: {weather.main.temp_min}</p>
				<p>Low: {weather.main.temp_max}</p>
				<p>Wind Speed: {weather.wind.speed}</p>
			</div>

			{/* <p>{weather.main.temp}</p> */}
		</div>
	);
}

export default Search;
