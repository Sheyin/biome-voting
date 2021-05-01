
const BiomeDescription = (props) => {
  const {description, image, link, type} = props;

  // Use a placeholder image if the filename was not provided
  if (!image) {
    image = "placeholder.png"
  }

  // Renders a link to the wiki entry if it exists, else returns nothing.
  const wikiLink = () => {
    if (link === "") {
      return;
    }
    else {
      return(
        <div className="link">
          Link: <a href={link} target="_new">Wiki entry</a>
        </div>
      )
    }
  }

  // Spells out whether this is a BOP or BYG biome. (string)
  // Returns nothing if it has not been populated.
  const convertBiomeType = () => {
    let detailText = "Source: "
    switch(type) {
      case "BOP":
        detailText += "Biomes O'Plenty";
        break;
      case "BYG":
        detailText += "Biomes You'll Go";
        break;
      default:
        return;
    }
    return(
      <div className="biome-type">
        {detailText}
      </div>
    )
  }

	return ( 
  <section className="description neumorphism-white">
    <figcaption>
      <span className="heading">Description</span><br />
      {description}
      <div className="details-box">
        {convertBiomeType()}
        {wikiLink()}
      </div>  
    </figcaption>
    <figure><img 
      src={require('../data/' + image).default} 
      alt=""
      className="biome-image"
      /></figure>
  </section> 
);
}
 
export default BiomeDescription;