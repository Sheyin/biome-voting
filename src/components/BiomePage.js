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
			<section className="title neumorphism-white">{biome.biome_short_name}</section>
			<BiomeDescription 
				description={biome.description}
				image={biome.image_name}
				link={biome.link_to_wiki}
				type={biome.type}
			/>
			<BiomeStatistics 
				ratings={biome.ratings} 
				my_rating={user_rating.my_rating}
				do_vote={do_vote}
			/>

			<footer>
				<div onClick={do_back} className="clickable navigation-bottom-button neumorphism-blue">Back</div>
				<div onClick={do_forward} className="clickable navigation-bottom-button neumorphism-blue">Next</div>
			</footer>

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