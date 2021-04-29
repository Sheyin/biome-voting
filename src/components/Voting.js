const Voting = (props) => {
	const do_vote = props.do_vote;
	const value_zero = "🚫";
	const value_positive = "🌲";

	return ( <div>
				<span className="vote" id="0" onMouseOver={makeOpaque} onClick={do_vote}>{value_zero}</span>
				<span className="vote" id="1" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="2" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="3" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="4" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="5" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="6" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="7" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="8" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="9" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
				<span className="vote" id="10" onMouseOver={makeOpaque} onClick={do_vote}>{value_positive}</span>
			</div>);
}


// Make all the values up to the element which is being hovered over opaque
function makeOpaque(event) {
	const target_id = Number(event.target.id);

	if (target_id > 0) {
		for(let i=1; i<11; i++) {
			if (target_id >= i) {
				document.getElementById(String(i)).style.opacity = 1;
			}
			else {
				document.getElementById(String(i)).style.opacity = 0.4;
			}
		}
	}
}
 
export default Voting;