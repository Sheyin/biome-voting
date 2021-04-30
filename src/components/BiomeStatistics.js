import Voting from './Voting';
import React from 'react';

const BiomeStatistics = (props) => {
	let {ratings, my_rating, do_vote} = props;

	// Because of how Firebase works, it may elect to simply not save fields with null values.
	if (!ratings) {
		ratings = [];
	}

	// Calculates the average of the ratings, returns a number (float/double)
	const average = () => {
		let total = 0;
		ratings.forEach(x => {
			total += x;
		})
		// Rounding result - this will produce a string
		let average = (total/ratings.length).toPrecision(3);
		//console.log(`Calculated average: ${average}`);
		return Number(average);
	}

	const showMyRating = () => {
		if (my_rating > -1) {
			return (
			<React.Fragment>
				[<span className="label">Your vote:</span> {my_rating}]<br />
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

	const showAverage = () => {
		if (ratings.length === 0) {
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
		<section className="statistics-and-voting">
			<div className="statistics split-box">
				<span className="heading">Statistics</span><br />
				<span className="label">Current number of votes:</span> {ratings.length} <br />
				{showMyRating()}
				{showAverage()}
			</div>

			<div className="voting split-box">
				<span className="heading">Voting</span><br />
				How badly do you want this biome? <br />
				🚫... Not at all <br />
				🌲... More trees, more often <br />
				<Voting 
					do_vote = {do_vote}
				/>
			</div>
		  </section>
	 );
}

 
export default BiomeStatistics;