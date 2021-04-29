import './style/NavigationSidebar.css';

const NavigationSidebar = (props) => {
	let links = [];
	props.biomes.forEach(biome => {
		links.push(<div key={biome} className="navigation">{biome}</div>);
		// Re-add this later when router added
		//links.push(<Link to={path + '/'} key={biome}>{biome}</Link>);
	})
	return (<nav>{links}</nav>);
}
 
export default NavigationSidebar;