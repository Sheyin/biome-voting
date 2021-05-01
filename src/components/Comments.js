import React, { useEffect } from "react";


const Comments = (props) => {
	const comments = props.comments;

	// This gets launched whenever component mounted or re-rendered
	useEffect(() => {
		// Clear the textbox every time this component is re-rendered
		document.getElementById('comment-entry').value="";
	});

	const makeComments = () => {
		if (!comments) {
			return;
		}

		let id=0;
		let comment_list = [];
		comments.forEach(x => {
			const comment = (
				<div key={id} className="comment">
					<div className="comment-header">
						<span className = "comment-username">{ x.author }</span>
						<span className = "comment-date">{ showTodayInsteadOfDate(x.date) }</span>
					</div>
					<span className = "comment-text"> {x.text} </span>
					
				</div>
			)
			comment_list.push(comment);
			id += 1;
		})
		return comment_list;
	}

	const parseCommentText = (text => {
		
	});

	// Creates a box where you can write new comments
	const editBox = () => {
		return (
			<div className="comment-entry-box">
				<textarea 
					id="comment-entry"
					name="comment" 
					/><br />
				<button name="submit" onClick={props.add_comment}>Leave Comment</button>
			</div>
		)
	}

	return ( 
			<section className="content split-box">
				<div className="comment-list split-box-half">
					<span className="heading">Comments</span><br />
					{makeComments()}
				</div>
				{editBox()}
			</section>
			);
}
 
export default Comments;




function showTodayInsteadOfDate(date) {
	const now = new Date(Date.now());
	const commentDate = new Date(date);
	if (now.getDate() === commentDate.getDate()) {
		return "Today";
	}
	else {
		const month = commentDate.getMonth();
		const day = commentDate.getDate();
		let year = commentDate.getFullYear().toString();
		year = year.slice(2,4);
		return `${month}/${day}/${year}`;
	}


}


/* 
// Old code I'm recycling
// Try to combine this into one simplified component

const Comment = (props) => {
	//console.log("Comment formed");
	return ( 
		<div className = "comment">
			<div className="comment-header">
				<span className = "username">{ props.username }</span>
				<span className = "date">{ showTodayInsteadOfDate(props.comment.date) }</span>
			</div>
			<span className = "comment-text"> { props.comment.text } </span>
		</div>
	 );
}






class CommentSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start: 0,
			amountDisplayed: 10,
			videoid: this.props.videoid
			//comments: this.props.comments,
			//users: {}
		}
		this.textInput = React.createRef();
	}

	componentDidMount() {
		// This ref refers to a piece of data in firebase, not react's refs
		this.ref = base.syncState('/comments/' + this.props.videoid + '/comments/',
		{
			context: this,
			state: 'comments',
			asArray: true
		});
		// This ref refers to a piece of data in firebase, not react's refs
		this.ref = base.syncState('/users',
		{
		  context: this,
		  state: 'users',
		});
	}

	static propTypes = {
		videoid: PropTypes.number,
	};

	// Truncate the comments to show (ex. if too many to fit, show less comments)
	// returns an array of comment objects
	// TODO - add pagination to show more/previous comments, show all, total available, etc
	calculateCommentsToDisplay = () => {
		const comments = this.state.comments;
		
		// No comments? Don't even render it.  (or render a placeholder)
		if (!comments || comments.length === 0) {
			return [];
		}
		// Show only 10 comments at a time if there are more than that
		if (comments.length >= this.state.amountDisplayed && comments.length > 0) {
			const startPoint = this.state.start;
			const endPoint = this.state.start + this.state.amountDisplayed;
			let commentsToShow = comments.slice(startPoint, endPoint);
			return commentsToShow;
		}
		else {
			return comments;
		}
	}

	// This is an abstraction to pull together mini-methods and return the jsx to render
	listComments = () => {
		let comments = this.calculateCommentsToDisplay();

		if (comments.length === 0) {
			return (<span>There are no comments to display.</span>);
		}
		const users = this.state.users;

		// The user data may take a moment to load
		if (!users) {
			return null;
		}
		let list = [];
		comments.forEach(x => {
			// Comment expects an object w/ comment ID, username, text
			list.push(<Comment key={x.id} comment={x} username={users[x.poster_id].username} />)
		});
		return list;
	}

	addNewComment = (event) => {
		event.preventDefault();
		const currentUser = getCurrentUser();
		const newCommentText = this.textInput.current.value;
		// get latest post id
		const postId = this.state.comments[this.state.comments.length - 1].id;
		const now = new Date(Date.now());

		const newComment = {
			date: now.toString(),
			id: postId + 1,
			poster_id: currentUser.id,
			text: newCommentText
		}

		// Clear input box
		this.textInput.current.value = "";

		// Make copy of state
		let comments = this.state.comments;
		// Edit temp to add thing
		comments.push(newComment);
		// Call setState(obj)
		this.setState({comments});
	}
	
	render() { 
		return ( 
			<div className = "comment-section">
				<span id="comment-header">Comments:</span>
				<div id="comments-list">
					{ this.listComments() }
				</div>
				<div id="add-comments">
				<div className="addingCommentDiv">
					<span>Add a comment:</span> <br />
					<form onSubmit={this.addNewComment}>
						<input type="text" name="newComment" id="addCommentBox" onSubmit={this.addNewComment} ref={this.textInput}/> <br />
						<input type='Submit' onClick={this.addNewComment} />
					</form>
				</div>
				</div>
			</div>
		 );
		}
	}

	// separating this out to try to prevent initialization errors
	function getCurrentUser() {
		const user = localStorage.getItem('currentUser');
		return JSON.parse(user);
	}

	*/