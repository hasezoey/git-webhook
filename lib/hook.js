const parse = require('./parse');

/**
 * 
 * @param {any} payload
 * @param {any} eventType
 * @param {any} source
 * @returns {any} this
 */
function Hook(payload, eventType /*, source*/ ) {
    parse(payload, eventType);
    return this;
}

/**
 * 
 * @param {string} text
 * @returns {void}
 */
function postComment(text) {
    switch (this.event) {
        case 'pull_request':
            makeGithubRequest(this.pr.urls.comment, { body: text }); // idk where this should be defined
            break;
        case 'push':
            //push events dont have an associated non-review comment, the developer needs to fix this
            console.warn('Push events can\'t use non-review comments.  Please use `postLineComment` instead');
            break;
    }
}

// @mrmakeit: why where there 2x postCommet and not 1x postComment & 1x postLineComment?

/**
 * 
 * @param {string} text Text to include in the comment
 * @param {string} sha SHA of the commit to comment on
 * @param {string} path Path of the file to comment on
 * @param {any} position Diff position to comment on
 * @returns {void}
 */
function postLineComment(text, sha, path, position) { // postComment(2)
    switch (this.event) {
        case 'pull_request':
            makeGithubRequest(this.pr.urls.comment, { body: text, commit_id: this.pr.sha, path: path, position: position }); // idk where this should be defined
            break;
        case 'push':
            makeGithubRequest(this.pr.urls.comment, { body: text, commit_id: sha, path: path, position: position }); // idk where this should be defined
            break;
    }
}

Hook.prototype = {
    postComment: postComment,
    postLineComment: postLineComment
};