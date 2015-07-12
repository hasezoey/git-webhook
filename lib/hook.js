parse = require('./parse')

function Hook(payload, eventType, source){
	parse(payload, eventType);
	return this;
}

Hook.prototype = {
	postComment: postComment,
	postLineComment: postLineComment
}


function postComment(text){
	switch(this.event){
		case 'pull_request':
			makeGithubRequest(this.pr.urls.comment, {body:text});
		case 'push':
			//push events dont have an associated non-review comment, the developer needs to fix this
			console.warn("Push events can't use non-review comments.  Please use `postLineComment` instead");
	}
}

//-----
//Params:
//text - Text to include in the comment
//sha - SHA of the commit to comment on
//path - Path of the file to comment on
//position - Diff position to comment on
//
//Returns:
//null
//-----
function postComment(text, sha, path, position){
	switch(this.event){
		case 'pull_request':
			makeGithubRequest(this.pr.urls.comment, {body:text, commit_id:this.pr.sha, path:path, position: position});
		case 'push':
			makeGithubRequest(this.pr.urls.comment, {body:text, commit_id:sha, path:path, position: position});
	}
}
