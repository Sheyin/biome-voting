import React from "react"


const NavigationSidebar = (props) => {


	if (props.show_navbar) {
		let links = [];
		let i = 0;
	
		props.biomes.forEach(biome => {
			links.push(<div className="navigation clickable" key={i} id={i} onClick={props.do_navigation}>{biome}</div>);
			i++;
		})
		return (
			<nav className="visible-nav-bar">
				<div className="navigation-links">
					<span className="heading test" onClick={props.showBiomeList}>Biome List</span><br />
					{links}
				</div>
				<div className="hidden-nav-bar" onClick={props.showBiomeList}></div>
			</nav>
			);
	}
	else {
		// This is the minimized version of the biome list (hidden)
		return (
			<div className="hidden-nav-bar" onClick={props.showBiomeList}></div>
		)
	}
}
 
export default NavigationSidebar;

/*
<span className="heading" onClick={props.showBiomeList}>Biome List</span><br />
{setTimeout(showText(links), 1000)}
			<div className="biome-list-button" onClick={props.showBiomeList}>
				<span className="heading">Biome List</span><br />
			</div>
*/