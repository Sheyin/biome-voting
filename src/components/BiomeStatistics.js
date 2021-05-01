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

	// Calculates the average of the ratings, returns a number (float/double)
	const average = () => {
		//console.log("Average from these values: " + ratings);
		let total = 0;
		ratings.forEach(x => {
			total += x;
		})
		// Rounding result - this will produce a string
		let average = (total/ratings.length).toPrecision(3);
		//console.log(`Calculated average: ${average}`);
		return Number(average);
	}

	// Render the user's vote if known, else put placeholder text telling them to vote.
	const showMyRating = () => {
		if (my_rating > -1) {
			return (
			<React.Fragment>
				<span className="label">Your vote:</span> {my_rating}<br />
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

	return ( 
		<section className="split-box content">
			<div className="split-box-half">
				<span className="heading">Statistics</span><br />
				<span className="label">Current number of votes:</span> {ratings.length} <br />
				{showMyRating()}
				{showAverage()}
			</div>

			<div className="split-box-half">
				<span className="heading">Voting</span><br />
				How badly do you want this biome? <br />
				🚫... Not at all <br />
				❤️... More hearts, more often! <br />
				<Voting 
					do_vote = {do_vote}
					my_rating = {my_rating}
				/>
			</div>
		  </section>
	 );
}

 
export default BiomeStatistics;