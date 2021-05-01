
const BiomeDescription = (props) => {
  const {description, image} = props;

  // Use a placeholder image if the filename was not provided
  if (!image) {
    image = "placeholder.png"
  }

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