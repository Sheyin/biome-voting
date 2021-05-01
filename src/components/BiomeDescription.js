
const BiomeDescription = (props) => {
  const {description, image} = props;

	return ( 
  <section className="description">
    <figcaption>
      <span className="heading">Description</span><br />
      {description}</figcaption>
    <figure><img 
      src={require('../data/' + image).default} 
      alt=""
      className="biome-image"
      /></figure>
  </section> 
);
}
 
export default BiomeDescription;