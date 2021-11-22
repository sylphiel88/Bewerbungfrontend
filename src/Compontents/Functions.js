import React from 'react';

function Functions(props) {
	return (
		<div style={props.style3}>
			{props.myName}
			<br />
			{props.myStreet}
			<br />
			{props.myTown}
			<br />
			<div className="compWrapper">
				<div className="textAreaComp">
					<textarea
						rows="4"
						className={'compAddr ' + (props.compCorrect ? 'gruen' : 'rot')}
						type="textarea"
						value={props.compAddr}
						onChange={props.compHandler}
						id="compaddr"
						style={props.style1}
					/>
				</div>
				{/* <div className={'textAreaCompExpl ' + (props.compCorrect ? 'gruen' : 'rot')}>
					Ansprechpartner<br />
					Name des Unternehmens<br />
					Straße + Hausnummer<br />
					PLZ + Stadt<br />
				</div> */}
			</div>
			<br/>
			<br/>
			<div>
				<input onChange={props.color1Handler} className="colorPicker1" type="color" style={props.style1} value={props.color1}/>
                <input onChange={props.color2Handler} className="colorPicker2" type="color" style={props.style2} value={props.color2}/>
                <div className="colorExpl" style={props.style3}>
                    Wählen Sie zwei Farben!
                </div>
			</div>
			<br/>
            <br/>Schreiben Sie den ersten Absatz (Motivation), nutze * für einfärben.<br/><br/>
            <textarea class="absatz1" id="absatz1" value={props.absatz} onChange={props.absatzHandler} style={props.style1}></textarea>
            <br/>
            <div class="sendButton" onClick={props.sendHandler} style={props.style1}>Absenden</div>
			{props.download&&<div class="send2Button" style={props.style1}><a style={props.style3} href={props.downloadLoc} download>PDF Herunterladen</a></div>}
		</div>
	);
}

export default Functions;
