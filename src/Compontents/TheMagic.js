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
	const [ color1, setColor1 ] = useState('#000000');
	const [ red1, setRed1 ] = useState(0);
	const [ green1, setGreen1 ] = useState(0);
	const [ blue1, setBlue1 ] = useState(0);
	const [ color2, setColor2 ] = useState('#808080');
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
	const [ style1, setStyle1 ] = useState({ border: '1px outset ' + color2, backgroundColor: color1, color: 'white' });
	const [ style2, setStyle2 ] = useState({ border: '1px outset ' + color1, backgroundColor: color2, color: 'white' });
	const [ style3, setStyle3 ] = useState({ border: '1px outset ' + color1, color: 'white' });
	const [ style4, setStyle4 ] = useState({ textDecoration: 'none', color: 'white' });

	useEffect(
		async () => {
			const values = compAddr.split('\n');
			if (values.length > 0) {
				setCompName(values[0]);
			} else {
				setCompName('');
			}
			if (values.length > 1) {
				setReference(values[1]);
			} else {
				setReference('');
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
				var colorBool = deterMine(color1);
				if (colorBool) {
					setStyle1({ border: '1px outset ' + color2, backgroundColor: color1 });
					setStyle2({ border: '1px outset ' + color1, backgroundColor: color2 });
					setStyle3({ border: '1px outset ' + color1 });
					setStyle4({ textDecoration: 'none' });
				} else {
					setStyle1({ border: '1px outset ' + color2, backgroundColor: color1, color: 'white' });
					setStyle2({ border: '1px outset ' + color1, backgroundColor: color2, color: 'white' });
					setStyle3({ border: '1px outset ' + color1, color: 'white' });
					setStyle4({ textDecoration: 'none', color: 'white' });
				}
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
				if (color1 != undefined) {
					var colorBool = deterMine(color1);
				} else {
					colorBool = true;
				}
				if (colorBool) {
					setStyle1({ border: '2px outset ' + color2, backgroundColor: color1 });
					setStyle2({ border: '2px outset ' + color1, backgroundColor: color2 });
					setStyle3({ border: '2px outset ' + color1 });
					setStyle4({ textDecoration: 'none' });
				} else {
					setStyle1({ border: '2px outset ' + color2, backgroundColor: color1, color: 'white' });
					setStyle2({ border: '2px outset ' + color1, backgroundColor: color2, color: 'white' });
					setStyle3({ border: '2px outset ' + color1, color: 'white' });
					setStyle4({ textDecoration: 'none', color: 'white' });
				}
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

	function setDownloadHandler(fileUrl) {
		setDownload(true);
		setDownloadLoc(fileUrl);
	}

	function deterMine(color) {
		color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

		var r = color >> 16;
		var g = (color >> 8) & 255;
		var b = color & 255;
		var hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
		if (hsp > 127.5) {
			return true;
		} else {
			return false;
		}
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
						const file = new Blob([ response.data ], { type: 'application/pdf' });
						const fileURL = URL.createObjectURL(file);
						setDownloadHandler(fileURL);
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

	async function send2Handler(){
		await axios
			.post(
				'http://localhost:5000/api/v1/bewerbungen/',
				{
					compN: compName,
					addr: compStreet+"|"+compTown,
					bw: false,
					status: "offen",
					anm:"",
					color1: color1,
					color2: color2
				},
				{
					header: {
						ContentType: 'application/json'
					}
				}
			)
	}

	return (
		<div className="container">
			<div className="functions" style={style1}>
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
					send2Handler={send2Handler}
					download={download}
					downloadLoc={downloadLoc}
					style1={style1}
					style2={style2}
					style3={style4}
					color1={color1}
					color2={color2}
				/>
			</div>
			<div className="preview">
				<Preview html={html}/>
			</div>
		</div>
	);
}

export default TheMagic;
