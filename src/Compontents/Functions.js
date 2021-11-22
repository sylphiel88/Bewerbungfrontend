import React from 'react';

function Functions(props) {
	return (
		<div>
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
				<input onChange={props.color1Handler} className="colorPicker1" type="color" />
                <input onChange={props.color2Handler} className="colorPicker2" type="color" />
                <div className="colorExpl">
                    Wählen Sie zwei Farben!
                </div>
			</div>
			<br/>
            <br/>Schreiben Sie den ersten Absatz (Motivation), nutze * für einfärben.<br/><br/>
            <textarea class="absatz1" id="absatz1" value={props.absatz} onChange={props.absatzHandler}></textarea>
            <br/>
            <div class="sendButton" onClick={props.sendHandler}>Absenden</div>
			{props.download&&<div class="send2Button"><a href={props.downloadLoc} download>PDF Herunterladen</a></div>}
		</div>
	);
}

export default Functions;
