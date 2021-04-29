import Voting from './Voting';

const BiomeStatistics = (props) => {
	const {ratings, favorite_count, my_rating, is_my_favorite, do_vote} = props;

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
	return ( 
		<section className="statistics-and-voting">
			<div className="statistics split-box">
				<span className="heading">Statistics</span><br />
				<span className="label">Current number of votes:</span> {ratings.length} <br />
				[<span className="label">Your vote:</span> {my_rating}]<br />
				<span className="label">Current average ranking:</span> {average()} <br />
				<span className="label">Number of favorites:</span> {favorite_count} <br />
			</div>

			<div className="voting split-box">
				<span className="heading">Voting</span><br />
				How badly do you want this biome? <br />
				0🚫... Not at all <br />
				10🌲... Hell yes <br />
				<Voting 
					do_vote = {do_vote}
				/>

				Favorite this biome? (checkbox) {is_my_favorite}<br />
			</div>
		  </section>
	 );
}

function voting() {

}

 
export default BiomeStatistics;