import React from 'react';
import './App.css';
import BiomePage from './components/BiomePage';
import NavigationSidebar from './components/NavigationSidebar';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "Me",
      currentBiome: "biomesoplenty:alps",
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

  doVote = (event => {
    const my_rating = event.target.id;
    console.log(`my rating: ${my_rating}`)
    // Write value
    const biome_name = this.state.currentBiome;
    const is_my_favorite = false;
    const rating = {
      biome_entry_name: biome_name,
      my_rating: my_rating,
      is_my_favorite: is_my_favorite
    }
    // todo - this needs to match input
    let user_ratings = this.state.user.ratings;
    let biome_ratings = this.state.biome.ratings;

    // Check if the user has voted before
    for (let i=0; i<user_ratings.length; i++) {
      let entry = user_ratings[i];
      if (entry.biome_entry_name === biome_name) {
        console.log(`Found biome ${biome_name} = ${entry.biome_entry_name}`)
        // existing entry found, edit entry
        // get user's old rating
        const my_old_rating = entry.my_rating;
        console.log(`user's old rating: ${my_old_rating}`)
        entry.my_rating = my_rating;
        console.log(`User's new rating for ${biome_name}: ${entry.my_rating}`)

        // edit rating for biomes list rating
        // probably not good to have this in twice but I'm kind of in a hurry
        const index = biome_ratings.indexOf(Number(my_old_rating));
        if (index === -1) {
          console.log("Mismatch found in doVote. Didn't find a vote that was to be changed.");
        }
        else {
          biome_ratings[index] = my_rating;
        }
        return;
      }
    } // end for-loop

    // entry not found (hasn't voted on this before)
    // Value was not found in user's vote history - new entry needed
    user_ratings.push(rating);
    biome_ratings.push(my_rating);
    // add to stated
    this.setState({user: {
                    ratings: user_ratings}});

    this.setState({biome: {
                    ratings: biome_ratings
                  }});
  })


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
          do_vote= {this.doVote}
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
