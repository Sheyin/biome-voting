import Voting from './Voting';
import React, { useEffect } from 'react';

const BiomeStatistics = (props) => {
	let {ratings, my_rating, do_vote} = props;

	// Because of how Firebase works, it may elect to simply not save fields with null values.
	if (!ratings) {
		ratings = [];
	}

	if (isNaN(my_rating)) {
		my_rating = -1;
	}

	// Update the statistics after user has voted
	useEffect(() => {
		showMyRating();
		showAverage();
	})

	//  Modified - takes the array of ratings (integers) and returns a string
	// indicating roughly where the average votes are
	const average = () => {
		//console.log("Average from these values: " + ratings);
		let total = 0;
		ratings.forEach(x => {
			total += x;
		})
		// Rounding result - this will produce a string
		let average = Number(total/ratings.length);

		// TIL.  Switch only works with discrete values.
		if (average === 0) {
			return "Hated";
		}
		if (average < 0.5) {
			return "Unwanted";
		}
		if (average < 1) {
			return "Disliked";
		}
		if (average === 1) {
			return "Neutral";
		}
		if (average < 1.5) {
			return "Liked";
		}
		if (average < 2) {
			return "Loved";
		}
		if (average === 2) {
			return "Hell yes";
		}
		// This should never be reached unless I was messing with the database.
		return "Error in average().  This shouldn't be possible.";
	} 

	// Converts the numeric values into yes/no/maybe
	// Expects an integer, returns a string
	const convertIntoYesOrNo = (rating) => {
		switch(rating) {
			case 0:
				return "No";
			case 1:
				return "Maybe";
			case 2:
				return "Yes";
			default:
				return; //should never hit this
		}
	}

	// Render the user's vote if known, else put placeholder text telling them to vote.
	const showMyRating = () => {
		if (my_rating > -1) {
			return (
			<React.Fragment>
				<span className="label">Your vote:</span> {convertIntoYesOrNo(my_rating)}<br />
			</React.Fragment>
			)
		}
		else {
			return (
			<React.Fragment>
				<span className="label">You haven't voted for this biome yet.</span>< br/>
			</React.Fragment>
			)
		}
	}

	// Render the average rating if known, else hide section entirely.
	const showAverage = () => {
		//console.log("showAverage() called");
		// had isNaN(ratings) here before but arrays are NaN....
		if (ratings.length === 0) {
			//console.log("No ratings to show: " + ratings)
			return;
		}
		else {
			return (
				<React.Fragment>
					<span className="label">Current average ranking:</span> {average()} <br />
				</React.Fragment>
			)
		}
	}

	// Show the breakdown of actual votes
	const showResults = () => {
		const currentResultsBox = document.getElementById('current-results-content');
		// if it was hidden, flip it
		currentResultsBox.classList.toggle("hidden");
	}


	// This tallies the different votes for this biome.
	const tallyVotes = () => {
		let yes_counter = 0;
		let no_counter = 0;
		let maybe_counter = 0;
		for (let i=0; i<ratings.length; i++) {
			switch(ratings[i]) {
				case 0:
					no_counter++;
					break;
				case 1:
					maybe_counter++;
					break;
				case 2:
					yes_counter++;
					break;
				default:
					return; //should never hit this
			}
		}
		return(
			<div className="current-results">
				<div className="hidden" id="current-results-content">
					<span className="heading">Current Results:</span><br />
					Yes: {yes_counter}<br />
					No: {no_counter}<br />
					Maybe: {maybe_counter}<br />
				</div>
				<div className="toggle" onClick={showResults}>Toggle breakdown of votes</div>
			</div>
		)
	}

	return ( 
		<section className="split-box content neumorphism-white">
			<div className="split-box-half statistics-box">
				<div className="statistics-text-box">
					<span className="heading">Statistics</span><br />
					<span className="label">Current number of votes:</span> {ratings.length} <br />
					{showMyRating()}
					{showAverage()}
				</div>
				{tallyVotes()}
			</div>

			<div className="split-box-half voting no-highlight">
				<span className="heading">Voting</span><br />
				Do you want to see this biome? <br />

				<Voting 
					do_vote = {do_vote}
					my_rating = {my_rating}
				/>
			</div>
		  </section>
	 );
}

 
export default BiomeStatistics;