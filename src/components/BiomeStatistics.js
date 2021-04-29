const BiomeStatistics = (props) => {
	const {ratings, favorite_count, my_rating, is_my_favorite} = props;

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
				<span class="heading">Statistics</span><br />
				<span class="label">Current number of votes:</span> {ratings.length} <br />
				[<span class="label">Your vote:</span> {my_rating}]<br />
				<span class="label">Current average ranking:</span> {average()} <br />
				<span class="label">Number of favorites:</span> {favorite_count} <br />
			</div>

			<div className="voting split-box">
				<span class="heading">Voting</span><br />
				How badly do you want this biome? <br />
				0... Not at all <br />
				10... Hell yes <br />

				Favorite this biome? (checkbox) {is_my_favorite}<br />
			</div>
		  </section>
	 );
}
 
export default BiomeStatistics;