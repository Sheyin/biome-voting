const Voting = (props) => {
	const do_vote = props.do_vote;
	const value_zero = "🚫";
	const value_positive = "🌲";

	return ( <div>
				<span className="clickable" id="vote0" onMouseOver={makeOpaque} onClick={do_vote}>{value_zero}</span>
				<span className="clickable" id="vote1" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote2" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote3" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote4" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote5" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote6" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote7" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote8" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote9" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="clickable" id="vote10" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
			</div>);
}


// Make all the values up to the element which is being hovered over opaque
function makeOpaque(event) {
	const less_opaque = 0.3;
	const more_opaque = 1;
	const target_id = Number(event.target.id.substr(4));

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
			console.log("only the 0");
			document.getElementById("vote" + i).style.opacity = less_opaque;
		}
	}
}
 
export default Voting;