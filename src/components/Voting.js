import { useEffect } from 'react';

const Voting = (props) => {
	const do_vote = props.do_vote;
	const value_zero = "🚫";
	const value_positive = "❤️";
	//const value_positive = "🌲";
	/*
	const value_positive = () => {
		return (
			<img src={require('../data/torch.png').default}  
			className="torch" onMouseOver={onHover} onClick={do_vote}
			/>
		)
	} */

	// This gets launched whenever component mounted or re-rendered
	useEffect(() => {
		makeOpaque(props.my_rating);
	});

	return ( <div>
				<span className="clickable" id="vote0" onMouseOver={onHover} onClick={do_vote}>{value_zero}</span>
				<span className="clickable" id="vote1" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote2" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote3" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote4" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote5" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote6" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote7" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote8" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote9" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote10" onMouseOver={onHover} onClick={do_vote}>{value_positive}</span>
			</div>);
}


// Responds to hover event to make certain voting values opaque/transparent
function onHover(event) {
	// This trims away the word "vote" from the id
	const target_number = Number(event.target.id.substr(4));
	makeOpaque(target_number);
}

// Make all the values up to the element which is being hovered over opaque
// This will now take a number instead of just the actual id - so it can reflect user's vote
// So if the user voted "4" it will aim to make all of the values up to 4 opaque
function makeOpaque(target_id) {
	const less_opaque = 0.3;
	const more_opaque = 1;
	//const target_id = Number(event.target.id.substr(4));

	// User is hovering over a positive value - make those opaque, hide the "no"
	if (target_id > 0) {
		document.getElementById("vote0").style.opacity = less_opaque;
		// Cycle through and do all the trees
		for(let i=1; i<11; i++) {
			if (target_id >= i) {
				document.getElementById("vote" + i).style.opacity = more_opaque;
			}
			else {
				document.getElementById("vote" + i).style.opacity = less_opaque;
			}
		}
	}

	else {
		// User is hovering over the "no"/0 - make that opaque, the rest transparent
		document.getElementById("vote0").style.opacity = more_opaque;
		// Cycle through and do all the trees
		for(let i=1; i<11; i++) {
			document.getElementById("vote" + i).style.opacity = less_opaque;
		}
	}
}
 
export default Voting;