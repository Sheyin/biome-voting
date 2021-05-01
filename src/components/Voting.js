import { useEffect } from 'react';

const Voting = (props) => {
	const do_vote = props.do_vote;
	//const value_zero = "🚫";
	//const value_positive = "❤️";

	const value_no = "👎";
	const value_maybe = "😐";
	const value_yes = "👍";


	// This gets launched whenever component mounted or re-rendered
	useEffect(() => {
		makeOpaque(props.my_rating);
	});

	return ( <div className="voting-grid">
				<span className="clickable vote-option" id="vote0" onMouseOver={onHover} onClick={do_vote}>{value_no}</span>
				<span className="clickable vote-option" id="vote1" onMouseOver={onHover} onClick={do_vote}>{value_maybe}</span>
				<span className="clickable vote-option" id="vote2" onMouseOver={onHover} onClick={do_vote}>{value_yes}</span>
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
// So if the user voted "1" it will aim to only make 1 opaque and dim to rest
function makeOpaque(target_id) {
	const less_opaque = 0.3;
	const more_opaque = 1;

	// Make only the one being hovered upon the opaque one; dim the rest
	for(let i=0; i<3; i++) {
		if (target_id === i) {
			document.getElementById("vote" + i).style.opacity = more_opaque;
		}
		else {
			document.getElementById("vote" + i).style.opacity = less_opaque;
		}
	}
}
 
export default Voting;