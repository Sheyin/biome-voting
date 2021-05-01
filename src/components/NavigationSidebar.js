

const NavigationSidebar = (props) => {

	if (props.show_navbar) {
		let links = [];
		let i = 0;
	
		props.biomes.forEach(biome => {
			links.push(<div className="navigation clickable" key={i} id={i} onClick={props.do_navigation}>{biome}</div>);
			i++;
			// Re-add this later when router added
			//links.push(<Link to={path + '/'} key={biome}>{biome}</Link>);
		})
		return (
			<nav className="visible-nav-bar">
				<span className="heading" onClick={props.showBiomeList}>Biome List</span><br />
				{links}
			</nav>
			);
	}
	else {
		return (
			<div className="biome-list-button" onClick={props.showBiomeList}>
				<span className="heading">Biome List</span><br />
			</div>
		)
	}
}
 
export default NavigationSidebar;