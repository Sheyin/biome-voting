import firebase from 'firebase';
import Rebase from 're-base';


// Apparently it is safe to include API keys for Firebase.
// Permissions are set on the database rules instead.
const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyBzf3fcf7Cww-JXsji6_IMoH4lxhdsLj48",
	authDomain: "bop-voting.firebaseapp.com",
	databaseURL: "https://bop-voting-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;