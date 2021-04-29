
const BiomeDescription = (props) => {
  const {description, image} = props;

	return ( 
  <section className="description">
    <figcaption>
      <span class="heading">Description</span><br />
      {description}</figcaption>
    <figure><img 
      src={require('../data/' + image).default} 
      alt=""/></figure>
  </section> 
);
}
 
export default BiomeDescription;