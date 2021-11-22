import React, { useEffect, useState } from 'react';
import Functions from './Functions';
import Preview from './Preview';
import axios from 'axios';

function TheMagic(props) {
	const [ myName, setMyName ] = useState('Jan Ihmels');
	const [ myStreet, setMyStreet ] = useState('Hellerweg 51');
	const [ myTown, setMyTown ] = useState('73728 Esslingen');
	const [ compAddr, setCompAddr ] = useState('');
	const [ reference, setReference ] = useState('');
	const [ compName, setCompName ] = useState('');
	const [ compStreet, setCompStreet ] = useState('');
	const [ compTown, setCompTown ] = useState('');
	const [ compCorrect, setCompCorrect ] = useState(false);
	const [ color1, setColor1 ] = useState();
	const [ red1, setRed1 ] = useState(0);
	const [ green1, setGreen1 ] = useState(0);
	const [ blue1, setBlue1 ] = useState(0);
	const [ color2, setColor2 ] = useState();
	const [ red2, setRed2 ] = useState(0);
	const [ green2, setGreen2 ] = useState(0);
	const [ blue2, setBlue2 ] = useState(0);
	const [ absatz, setAbsatz ] = useState('');
	const [ gender, setGender ] = useState('');
	const [ refFN, setRefFN ] = useState('');
	const [ refLN, setRefLN ] = useState('');
	const [ html, setHtml ] = useState('');
	const [ download, setDownload ] = useState(false);
	const [ downloadLoc, setDownloadLoc ] = useState('');

	useEffect(
		async () => {
			const values = compAddr.split('\n');
			if (values.length > 0) {
				setReference(values[0]);
			} else {
				setReference('');
			}
			if (values.length > 1) {
				setCompName(values[1]);
			} else {
				setCompName('');
			}
			if (values.length > 2) {
				setCompStreet(values[2]);
			} else {
				setCompStreet('');
			}
			if (values.length > 3) {
				setCompTown(values[3]);
			} else {
				setCompTown('');
			}
		},
		[ compAddr ]
	);

	useEffect(
		async () => {
			if (reference != '' && compName != '' && compStreet != '' && compTown != '') {
				setCompCorrect(true);
			} else {
				setCompCorrect(false);
			}
		},
		[ reference, compName, compStreet, compTown ]
	);

	useEffect(
		async () => {
			if (color1 != undefined) {
				var text = color1.replace('#', '');
				setRed1(parseInt(text.substr(0, 2), 16));
				setGreen1(parseInt(text.substr(2, 2), 16));
				setBlue1(parseInt(text.substr(4, 2), 16));
			}
		},
		[ color1 ]
	);

	useEffect(
		async () => {
			if (color2 != undefined) {
				var text = color2.replace('#', '');
				setRed2(parseInt(text.substr(0, 2), 16));
				setGreen2(parseInt(text.substr(2, 2), 16));
				setBlue2(parseInt(text.substr(4, 2), 16));
			}
		},
		[ color2 ]
	);

	useEffect(
		async () => {
			var text = reference.split(' ');
			if (text[0] == 'Herr' || text[0] == 'Frau') {
				setGender(text[0]);
				if (text.length > 1) {
					setRefFN(text[1]);
				} else {
					setRefFN('');
				}
				if (text.length > 2) {
					setRefLN(text[2]);
				} else {
					setRefLN('');
				}
			} else {
				if (text.length > 0) {
					setRefFN(text[0]);
				} else {
					setRefFN('');
				}
				if (text.length > 1) {
					setRefLN(text[1]);
				} else {
					setRefLN('');
				}
			}
		},
		[ reference ]
	);

	useEffect(
		async () => {
			await axios
				.post(
					'http://localhost:5000/api/v1/pdf/html',
					{
						red1: red1,
						green1: green1,
						blue1: blue1,
						red2: red2,
						green2: green2,
						blue2: blue2,
						myName: myName,
						myStreet: myStreet,
						myTown: myTown,
						referenceGen: gender,
						referenceFN: refFN,
						referenceLN: refLN,
						company: compName,
						compStreet: compStreet,
						compTown: compTown,
						absatz1: absatz
					},
					{
						header: {
							ContentType: 'application/json'
						}
					}
				)
				.then((res) => setHtml(res.data));
		},
		[
			red1,
			green1,
			blue1,
			red2,
			green2,
			blue2,
			myName,
			myStreet,
			myTown,
			gender,
			refFN,
			refLN,
			compName,
			compStreet,
			compTown,
			absatz
		]
	);

	async function compHandler(e) {
		setCompAddr(e.target.value);
	}

	async function color1Handler(e) {
		setColor1(e.target.value);
	}

	async function color2Handler(e) {
		setColor2(e.target.value);
	}

	async function absatzHandler(e) {
		setAbsatz(e.target.value);
	}

	function setDownloadHandler(fileUrl){
		setDownload(true);
		setDownloadLoc(fileUrl)
	}

	async function sendHandler() {
		await axios
			.post(
				'http://localhost:5000/api/v1/pdf/pdf',
				{
					red1: red1,
					green1: green1,
					blue1: blue1,
					red2: red2,
					green2: green2,
					blue2: blue2,
					myName: myName,
					myStreet: myStreet,
					myTown: myTown,
					referenceGen: gender,
					referenceFN: refFN,
					referenceLN: refLN,
					company: compName,
					compStreet: compStreet,
					compTown: compTown,
					absatz1: absatz
				},
				{
					header: {
						ContentType: 'application/json'
					}
				}
			)
			.then((res) => setHtml(res.data));
		setTimeout(async () => {
			try {
				await axios
					.get('http://localhost:5000/api/v1/pdf/getPdf', {
						responseType: 'blob',
						params: {
							comp: compName
						}
					})
					.then((response) => {
						//Create a Blob from the PDF Stream
						const file = new Blob([ response.data ], { type: 'application/pdf' });
						//Build a URL from the file
						const fileURL = URL.createObjectURL(file);
						setDownloadHandler(fileURL);
						//Open the URL on new Window
						var w = window.open('');
						w.location.href = fileURL;
					})
					.catch((error) => {
						console.log(error);
					});
			} catch (error) {
				console.log(error);
			}
		}, 3000);
	}

	return (
		<div className="container">
			<div className="functions">
				<Functions
					compCorrect={compCorrect}
					myName={myName}
					myStreet={myStreet}
					myTown={myTown}
					compHandler={compHandler}
					compAddr={compAddr}
					color1Handler={color1Handler}
					color2Handler={color2Handler}
					abstatz={absatz}
					absatzHandler={absatzHandler}
					sendHandler={sendHandler}
					download={download}
					downloadLoc={downloadLoc} 
				/>
			</div>
			<div className="preview">
				<Preview html={html}/>
			</div>
		</div>
	);
}

export default TheMagic;
