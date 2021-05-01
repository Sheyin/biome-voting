import React, { useEffect } from "react"


const NavigationSidebar = (props) => {




	if (props.show_navbar) {
		let links = [];
		let i = 0;
	
		props.biomes.forEach(biome => {
			if (i === props.current_biome) {
				links.push(<div className="navigation clickable neumorphism-inset" key={i} id={i} onClick={props.do_navigation}>{biome}</div>);
			}
			else {
				links.push(<div className="navigation clickable" key={i} id={i} onClick={props.do_navigation}>{biome}</div>);
			}
			i++;
		})
		return (
			<nav className="visible-nav-bar neumorphism-white">
				<div className="navigation-links">
					<span className="heading nav-title" onClick={props.showBiomeList}>Biome List</span><br />
					{links}
				</div>
				<div className="hidden-nav-bar neumorphism-white" onClick={props.showBiomeList}></div>
			</nav>
			);
	}
	else {
		// This is the minimized version of the biome list (hidden)
		return (
			<nav className="hidden-nav-bar neumorphism-white" onClick={props.showBiomeList}></nav>
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