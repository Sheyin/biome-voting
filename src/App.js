import React from 'react';
import './App.css';
import BiomePage from './components/BiomePage';
import NavigationSidebar from './components/NavigationSidebar';
import base from "./base";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "Me",
      current_biome: 0,
      biomes: [],
      user: {
        name: "Me",
        ratings: []
      }
    }
  }

  componentDidMount() {
    // This ref refers to a piece of data in firebase, not react's refs
    this.ref = base.syncState('/biomes',
    {
      context: this,
      state: 'biomes',
      asArray: true
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  doVote = (event => {
    const my_rating = event.target.id;
    console.log(`my rating: ${my_rating}`)
    // Write value
    console.log(this.state.biomes);
    console.log(this.state.current_biome);
    const biome = this.state.biomes[this.state.current_biome];
    console.log(biome + " " + this.state.current_biome);
    const biome_name = biome.biome_entry_name;
    const is_my_favorite = false;
    const rating = {
      biome_entry_name: biome_name,
      my_rating: my_rating,
      is_my_favorite: is_my_favorite
    }
    // todo - this needs to match input
    let user_ratings = this.state.user.ratings;
    if (!user_ratings) {
      user_ratings = [];
    }
    let biome_ratings = biome.ratings;
    // Need to handle case if there are no ratings, ie., firebase erased the empty array.
    if (!biome_ratings) {
      biome_ratings = [];
    }

    // Check if the user has voted before
    for (let i=0; i<user_ratings.length; i++) {
      let entry = user_ratings[i];
      if (entry.biome_entry_name === biome_name) {
        // existing entry found, edit entry
        // get user's old rating
        const my_old_rating = entry.my_rating;
        entry.my_rating = my_rating;

        // Debug text that will probably be removed soon.
        console.log(`Found biome ${biome_name} = ${entry.biome_entry_name}`)
        console.log(`user's old rating: ${my_old_rating}`)
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

    // Re-integrate changes back into the (copies of) objects they came from
    let biomes = this.state.biomes;
    biome.ratings = biome_ratings
    // Replace biome entry in copy of biomes array
    biomes[this.state.current_biome] = biome;
    // Save to state
  
    this.setState({user: {
                    ratings: user_ratings}});

    this.setState({ biomes });
  })

  // Someone clicked "Back" on the bottom navigation
  doBack = () => {
    console.log("doBack was clicked");
    let current_biome = this.state.current_biome;
    if (current_biome === 0) {
      current_biome = (this.state.biomes.length - 1);
    }
    else {
      current_biome -= 1;
    }
    this.setState({current_biome});
  }

   // Someone clicked "Forward" on the bottom navigation
  doForward = () => {
     console.log("doForward was clicked");
    let current_biome = this.state.current_biome;
    if (current_biome === (this.state.biomes.length - 1)) {
      current_biome = 0;
    }
    else {
      current_biome += 1;
    }
    this.setState({current_biome});
  }

  // Someone clicked on the navigation sidebar
  doNavigation = (event) => {
    this.setState({current_biome: event.target.id});
  }

  // note to self- current biome highlight, do from app.css

  // temp removed everything
  /*
	render() { 
		return ( <div>{this.state.biomes.length}</div>  );
	}
  */
  render() { 
    if (this.state.biomes.length === 0) {
      return (
        <div>Loading data....</div>
      )
    }
    else {
      let biome = this.state.biomes[this.state.current_biome];

      return (
        <div className="App">   
          <header>Voting for Biomes!</header>
  
          <NavigationSidebar 
            biomes={getBiomeNameList(this.state.biomes)}
            do_navigation = {this.doNavigation}
          />
  
          <BiomePage
            biome={biome}
            user_rating = {get_user_rating_for_biome(biome.biome_entry_name, this.state.user.ratings)}
            do_vote = {this.doVote}
            />
  
          <footer><span onClick={this.doBack} className="clickable">Back</span> or <span onClick={this.doForward} className="clickable">Next</span></footer>
        </div>
      );
    }
  }
}


  /*

  // This expression will probably change over to decomposing objects from database
  //biome = sampleData;
  //user_rating = get_user_rating_for_biome(biome.entry_name, user.ratings);

*/

// This takes just the user's ratings from the user object to be used with BiomePage component.
// Input: biome = string (biome_entry_name), user_ratings (array of user ratings from user object)
function get_user_rating_for_biome(biome, user_ratings) {
  for(let i=0; i<user_ratings.length; i++) {
    console.log("get_user_ratings_..() - user_ratings: " + user_ratings)
    let entry = user_ratings[i];
    const values = Object.values(entry);
    if (values[0] === biome) {
      //console.log(entry);
      return entry;
    }
  }
  // There were no user ratings
  return -1;
  //console.log(`get_user_rating_for_biome(${biome}) - No ratings found`);
}


// Populates the list of biome names used by the NavigationSidebar.
// Expects an array of objects which describe each biome.
// Returns an array of strings
function getBiomeNameList(biomes) {
  let list = [];
  biomes.forEach(entry => {
    list.push(entry.biome_short_name)
  })
  return list;
}



export default App;


/*
// Old sample data
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
*/