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

	// Creates a box where you can write new comments
	const editBox = () => {
		return (
			<div className="comment-entry-box">
				<textarea 
					id="comment-entry"
					name="comment" 
					placeholder="Say something..."
					/><br />
				<button name="submit" onClick={props.add_comment} id="comment-submit" className="neumorphism-blue">Leave Comment</button>
			</div>
		)
	}

	return ( 
			<section className="content split-box neumorphism-white">
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