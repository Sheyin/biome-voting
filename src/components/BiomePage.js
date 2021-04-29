import BiomeDescription from './BiomeDescription';
import BiomeStatistics from './BiomeStatistics';
import Comments from './Comments';
import './style/BiomePage.css';

const BiomePage = (props) => {
	const {biome, user_rating} = props;
	//console.log(`biome: ${biome}`);
	//console.log(`user_rating: ${user_rating}`);


	return ( 
		<main>
			<BiomeDescription 
				description={biome.description}
				image={biome.image_name}
			/>
			<BiomeStatistics 
				ratings={biome.ratings} 
				favorites = {biome.favorites}
				my_rating={user_rating.my_rating} 
				is_my_favorite={user_rating.is_my_favorite}
			/>
			<Comments 
				comments={biome.biome_comments}
			/>
		</main>
	 );
	}
 
export default BiomePage;