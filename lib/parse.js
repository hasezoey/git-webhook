/**
 * Prase the PayLoad
 * @param {string} payloadStr
 * @param {string} eventType
 * @returns {any} .
 */
function parsePayload(payloadStr, eventType) {
    const payload = JSON.parse(payloadStr);
    this.event = eventType;
    this.payload = payload;
    this.repo = parseRepositoryObject(this.payload.repository);
    switch (this.event) {
        case 'pull_request':
            parsePullRequest(this);
            break;
        case 'push':
            //parsePush()
            break;
    }
    return this;
}

/**
 * 
 * @param {any} self
 * @returns {void}
 */
function parsePullRequest(self) {
    const payload = self.payload;
    self.head = {
        repo: payload.pull_request.head.repo.full_name, //name of the repo pulling from
        owner: payload.pull_request.head.repo.owner.login, //name of the owner of the repo
        urls: parseUrls(payload.pull_request.head.repo)
    };
}

/**
 * Converting to more usable format
 * @param {object} repo
 * @returns {object} returns Name, Owner and URLS
 */
function parseRepositoryObject(repo) { // where is this even used?
    return {
        name: repo.full_name,
        owner: repo.owner.login,
        urls: parseUrls(repo)
    };
}

/**
 * Parse a URL-Set
 * @param {any[]} urlset
 * @returns {object} idk
 */
function parseUrls(urlset) {
    var returnSet = {};
    for (const key in urlset) {
        if (key.indexOf('_url') >= 0)
            returnSet[key.replace('_url', '')] = urlset[key];
    }
    return returnSet;
}

module.exports.parsePayload = parsePayload;