import React from 'react';
import './App.css';
import BiomePage from './components/BiomePage';
import NavigationSidebar from './components/NavigationSidebar';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "Me",
      currentBiome: "",
      biomes: ["Alps", "Bayou", "Bog", "Boreal Forest", "Brushland", "Chaparral", "Cherry Blossom Grove", "Cold Desert", "Coniferous Forest", "Dead Forest", "Dead Swamp", "Floodplain", "Fungal Jungle", "Grassland", "Grove"],
      // temporary
      biome: {
        biome_entry_name: "biomesoplenty:alps",
        biome_short_name: "Alps",
        image_name: "alps.jpg",
        description: "High mountains coated with snow blocks. This was made to resemble the mountain range located in Central Europe.",
        link_to_wiki: "https://biomesoplenty.fandom.com/wiki/Alps",
        ratings: [3, 6, 10, 8],
        favorites: 0,
        biome_comments: [
          {
            author: "Me",
            date: "4/28/21",
            text: "hi!",
          },
          {
            author: "Me2",
            date: "4/29",
            text: "hi back!",
          },
          {
            author: "Me3",
            date: "4/30",
            text: "Hmm",
          }
        ]
      },
      user: {
        name: "Me",
        ratings: [
          {
            biome_entry_name: "biomesoplenty:alps",
            my_rating: 6,
            is_my_favorite: false
          },
          {
            biome_entry_name: "biomesoplenty:bayou",
            my_rating: 4,
            is_my_favorite: false
          },
          {
            biome_entry_name: "biomesoplenty:bog",
            my_rating: 2,
            is_my_favorite: false
          }
        ]
      }
    }
  }



  // This expression will probably change over to decomposing objects from database
  //biome = sampleData;
  //user_rating = get_user_rating_for_biome(biome.entry_name, user.ratings);

  // note to self- current biome highlight, do from app.css

  render() { 
    return ( 
      <div className="App">   
        <header>Voting for Biomes!</header>
        <NavigationSidebar 
          biomes={this.state.biomes}
        />

        <BiomePage
          biome={this.state.biome}
          user_rating = {get_user_rating_for_biome(this.state.biome.biome_entry_name, this.state.user.ratings)}
          />

        <footer>Back or Next</footer>
      </div>
    );
  }
}


// This takes just the user's ratings from the user object to be used with BiomePage component.
// Input: biome = string (biome_entry_name), user_ratings (array of user ratings from user object)
function get_user_rating_for_biome(biome, user_ratings) {
  for(let i=0; i<user_ratings.length; i++) {
    let entry = user_ratings[i];
    const values = Object.values(entry);
    if (values[0] === biome) {
      //console.log(entry);
      return entry;
    }
  }
  // Something's gone wrong - not found
  console.log(`Error in get_user_rating_for_biome(${biome}) - not found in user ratings`);
}

export default App;
