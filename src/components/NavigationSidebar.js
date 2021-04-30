import './style/NavigationSidebar.css';

const NavigationSidebar = (props) => {
	let links = [];
	let i = 0;
	props.biomes.forEach(biome => {
		links.push(<div key={biome} className="navigation" key={i}>{biome}</div>);
		i++;
		// Re-add this later when router added
		//links.push(<Link to={path + '/'} key={biome}>{biome}</Link>);
	})
	return (<nav>{links}</nav>);
}
 
export default NavigationSidebar;