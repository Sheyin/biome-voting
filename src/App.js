import React from 'react';
import './App.css';
import BiomePage from './components/BiomePage';
import NavigationSidebar from './components/NavigationSidebar';
import base from "./base";
import "firebase/auth";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      current_biome: -1,
      biomes: [],
      is_logged_in: false,
      show_navbar: false,
      user: {
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
    this.checkIfReturningUser();
    //setTimeout(this.checkIfReturningUser, 2000);
  }

  /*
  componentWillUnmount() {
    base.removeBinding(this.ref);
  } */


  // Has the user been here before?
  // Checks localstorage
  // Not the most secure system here
  checkIfReturningUser = () => {
    let username = localStorage.getItem('username');
    console.log("Returning Username:" + username);
    // user has been here before
    if (username) {
      this.setState({username, is_logged_in: true});
      // get user data based on username
      this.syncUserData(username);
      return true;
    }
    else {
      console.log("Registration needed");
      return false;
    }
  }

  // Gets the user data - expects a string(username)
  // Do make sure the username follows legal patterns....
  syncUserData(username) {
    // may want to add additional call to is_legal_username
    // This ref refers to a piece of data in firebase, not react's refs
    this.ref = base.syncState(`users/${username}`,
    {
      context: this,
      state: 'user',
      asArray: false
    });
  }

  // Ensuring that the username follows naming conventions
  // From experimentation - firebase legal characters
  // include: @?,-_!~ and spaces, and don't seem to mind if it starts with a symbol.
  // it CAN lead with a space.  May want to restrict that.
  // Expects a username (string), returns an error describing problem or an empty string if ok.
  is_legal_username(username) {
    // eliminate leading and trailing spaces
    let re_space_before = new RegExp('^ ');
    let re_space_after = new RegExp(' $');
    let re_illegal_characters = new RegExp('[^a-zA-Z0-9 @_?!~-]');
    if (re_space_before.test(username)) {
      return "Please remove the leading spaces from your name."
    }
    if (re_space_after.test(username)) {
      return "Please remove the trailing spaces from your name.";
    }
    // it also allows stuff like ()%*^$\ but let's *not* break regular expressions...
    if (re_illegal_characters.test(username)) {
      return "Please only use these symbols, if any: @_?!~-_ (or spaces)";
    }
    else {
      return "";
    }
  }

  // A vote has been recorded (clicked on a value in voting component)
  doVote = (event => {
    const my_rating = Number(event.target.id.substr(4));
    // Write value
    const biome = this.state.biomes[this.state.current_biome];
    const biome_name = biome.biome_entry_name;
    const rating = {
      biome_entry_name: biome_name,
      my_rating: my_rating,
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
    let has_voted = false;
    for (let i=0; i<user_ratings.length; i++) {
      let entry = user_ratings[i];
      if (entry.biome_entry_name === biome_name) {
        // existing entry found, edit entry
        // get user's old rating
        const my_old_rating = entry.my_rating;
        entry.my_rating = my_rating;

        // Debug text that will probably be removed soon.
        //console.log(`Found biome ${biome_name} = ${entry.biome_entry_name}`)
        //console.log(`user's old rating: ${my_old_rating} new rating: ${entry.my_rating}`)

        // edit rating for biomes list rating
        // probably not good to have this in twice but I'm kind of in a hurry
        const index = biome_ratings.indexOf(Number(my_old_rating));
        if (index === -1) {
          console.log("Mismatch found in doVote. Didn't find a vote that was to be changed.");
        }
        else {
          biome_ratings[index] = my_rating;
          has_voted = true;
        }
      }
    } // end for-loop

    if(!has_voted) {
      // Value was not found in user's vote history - new entry needed
      user_ratings.push(rating);
      biome_ratings.push(my_rating);
    }

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

  getStarted = () => {
    // Someone clicked the "get started" button on launch page
      const current_biome = 0;
      this.setState({current_biome});
      let is_logged_in = true;
      this.setState({is_logged_in});
  }

  // Shows current poll results.  If user hasn't registered, prompt them here too
  launchPage = () => {
    return(
      <div className="App">   
        <header></header>

        <div className="empty-space"></div>
        
        <main>
          <section className="neumorphism-white">
            <span className="heading">Rank your biomes</span><br />
              <p>
              Each page will be for a specific biome.  There's a yes / no / maybe option for each biome - vote however you wish, and you can 
              change your vote whenever you'd like, or skip voting for it entirely.  Click on the back / next buttons to navigate, or you can
              pull out the biome list from the left hand side.
              </p>
              <p>
              This site probably isn't very good for mobile yet.  Sorry!
              </p>
          </section>

          {this.registrationSection()}
        </main>
      </div>
    );
  }
  
  // Small section to display prompt for username.
  registrationSection = () => {
    // This person is definitely a returning user or has registered
    if (this.state.is_logged_in) {
      return (
        <section className="neumorphism-blue">
          <div onClick={this.getStarted} id="get-started" className="heading clickable">Click here to get started</div>
        </section>
      )
    }
    else {
      // This person could be a returning user - check for username
      return (
        <section id="registration" className="not-hidden neumorphism-white">
          <span className="heading">Registration</span><br />
          It looks like you haven't been here before.  Please enter a username so you can begin voting!<br />
          <input type="text" id="username-box"></input>
          <button value="register" onClick={this.createUsername}>Register</button>
          <span id="error-messages" className="hidden"></span>
        </section>
      );
    }
  }

  // Checks for validity and adds username
  // Also populates/hides error-messages box in registration
  createUsername = (event) => {
    const username = document.getElementById('username-box').value;
    let response = this.is_legal_username(username);
    const errorBox = document.getElementById('error-messages');
    if (response !== "") {
      errorBox.className="warning";
      errorBox.textContent=response;
    }
    else {
      // Check for duplicate name
      base.fetch('users', {
        context: this,
        asArray: false,
        then(data){
          const names = Object.keys(data);
          if (names.includes(username)) {
            errorBox.className="warning";
            errorBox.textContent="This name is already taken.  Please choose another.";
          }
          else {
            console.log("Registration Success");
            errorBox.className="hidden";
            errorBox.textContent="";
          
            localStorage.setItem('username', username);
            const user = {
              name: username,
              ratings: [
                {
                  biome_entry_name: "biomesoplenty:alps",
                  my_rating: -1
                }
              ]
            }
            //this.setState({user});

            base.post(`users/${username}`, {
              data: {
                name: username, 
                ratings: [
                  {
                    biome_entry_name: "biomesoplenty:alps",
                    my_rating: -1
                  }
                ]
              }
            }).then(() => {
              this.syncUserData(username);
              this.setState({user, username, is_logged_in: true});
              //this.setState({username: username});
            }).catch(err => {
              // handle error
            });
            

            
            
            //const registration_box = document.getElementById('registration');
            //registration_box.style.display="hidden";
            
          }
        }
      });
    }
  }

  // The voting/biome pages - only if user is logged in
  votingPage = () => {
    let biome = this.state.biomes[this.state.current_biome];

    return (
      <div className="App">   
        <header></header>

        <NavigationSidebar 
          biomes={getBiomeNameList(this.state.biomes)}
          do_navigation = {this.doNavigation}
          show_navbar = {this.state.show_navbar}
          showBiomeList = {this.showBiomeList}
          current_biome = {this.state.current_biome}
          user_votes = {this.state.user.ratings}
        />

        <BiomePage
          biome={biome}
          user_rating = {get_user_rating_for_biome(biome.biome_entry_name, this.state.user.ratings)}
          do_vote = {this.doVote}
          do_back = {this.doBack}
          do_forward = {this.doForward}
          add_comment = {this.addComment}
          />

        
      </div>
    );
  }

  addComment = (event) => {
    const commentBox = document.getElementById('comment-entry');
    const comment_text = commentBox.value.trim();
    const now = new Date(Date.now());

    // If it is an empty comment, ie, an accidental click, do not add it
    if (comment_text === "") {
      return;
    }

    // Create a new comment object
    const comment = {
      author: this.state.username,
      date: now.toString(),
      text: comment_text,
    }

    // append to biome page's comments
    let biomes = this.state.biomes;
    let biome_comments = biomes[this.state.current_biome].comments;
    if (!biome_comments) {
      biome_comments = [];
    }
    biome_comments.push(comment);
    this.setState({biomes});
    //comment added?
    //console.log(comment.author + " " + comment.date + " " + comment.text);
  }

  // Just a slightly nicer looking getter function
  isLoggedIn = () => {
    return this.state.is_logged_in;
  }

  // Makes biome list drop down (NavigationSidebar)
  // This is a toggle function
  showBiomeList = () => {
    let show_navbar = !this.state.show_navbar;
    this.setState({show_navbar});
  }

  // note to self- current biome highlight, do from app.css

  // temp removed everything
  /*
	render() { 
		return ( <div>{this.state.biomes.length}</div>  );
	}
  */
  render() { 
    if (!this.isLoggedIn || this.state.current_biome === -1) {
      // Show results landing page w/ a get started button
      return(<React.Fragment>{this.launchPage()}</React.Fragment>);
    }

    else {
      // The original failsafe - just leaving in to be safe
      if (this.state.biomes.length === 0) {
        return (
          <div>Loading data....</div>
        )
      }
      else {
        return (<React.Fragment>{this.votingPage()}</React.Fragment>);
      }
    }
  }
}


// This takes just the user's ratings from the user object to be used with BiomePage component.
// Input: biome = string (biome_entry_name), user_ratings (array of user ratings from user object)
function get_user_rating_for_biome(biome, user_ratings) {
  if (!user_ratings) {
    return;
  }
  for(let i=0; i<user_ratings.length; i++) {
    let entry = user_ratings[i];
    const values = Object.values(entry);
    if (values[0] === biome) {
      //console.log(entry);
      return entry;
    }
  }
  // There were no user ratings
  return -1;
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




/*
Not currently used - it might look kinda ugly
function decorate_navigation_bar (){
  const checkmark = "✔️";
} */

export default App;