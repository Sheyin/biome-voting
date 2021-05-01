import BiomeDescription from './BiomeDescription';
import BiomeStatistics from './BiomeStatistics';
import Comments from './Comments';
import './style/BiomePage.css';

const BiomePage = (props) => {
	let {biome, user_rating, do_vote, do_back, do_forward, add_comment} = props;

	if (!user_rating) {
		user_rating = {
			biome_entry_name: "biomesoplenty:alps",
			my_rating: -1,
		}
	}

	// No comments exist for the biome yet
	if (!Object.keys(biome).includes("comments")) {
		biome.comments = [];
	}

	return ( 
		<main>
			<section className="title">{biome.biome_short_name}</section>
			<BiomeDescription 
				description={biome.description}
				image={biome.image_name}
			/>
			<BiomeStatistics 
				ratings={biome.ratings} 
				my_rating={user_rating.my_rating}
				do_vote={do_vote}
			/>

			<footer><span onClick={do_back} className="clickable">Back</span> or <span onClick={do_forward} className="clickable">Next</span></footer>

			<Comments 
				comments={biome.comments}
				add_comment={add_comment}
			/>

		</main>
	 );
	}
 
export default BiomePage;

/*



*/