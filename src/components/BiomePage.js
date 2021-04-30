import BiomeDescription from './BiomeDescription';
import BiomeStatistics from './BiomeStatistics';
import Comments from './Comments';
import './style/BiomePage.css';

const BiomePage = (props) => {
	const {biome, user_rating, do_vote} = props;

	return ( 
		<main>
			<section className="title">{biome.biome_short_name}</section>
			<BiomeDescription 
				description={biome.description}
				image={biome.image_name}
			/>
			<BiomeStatistics 
				ratings={biome.ratings} 
				favorites={biome.favorites}
				my_rating={user_rating.my_rating} 
				is_my_favorite={user_rating.is_my_favorite}
				do_vote={do_vote}
			/>
			<Comments 
				comments={biome.biome_comments}
			/>
		</main>
	 );
	}
 
export default BiomePage;

/*




*/