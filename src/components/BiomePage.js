import BiomeDescription from './BiomeDescription';
import BiomeStatistics from './BiomeStatistics';
import Comments from './Comments';
import './style/BiomePage.css';

const BiomePage = (props) => {
	let {biome, user_rating, do_vote} = props;

	if (!user_rating) {
		user_rating = {
			biome_entry_name: "biomesoplenty:alps",
			my_rating: -1,
		}
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

		</main>
	 );
	}
 
export default BiomePage;

/*

			<Comments 
				comments={biome.biome_comments}
			/>

*/