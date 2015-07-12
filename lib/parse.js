function parsePayload(payloadStr, eventType){
	payload = JSON.parse(payloadStr);
	this.event = eventType;
	this.payload = payload;
	this.repo = parseRepositoryObject(this.payload.repository);
	switch(this.event){
		case 'pull_request':
			parsePullRequest(this)
			break;
		case 'push':
			//parsePush()
			break;
	}
	return this
}

function parsePullRequest(self){
	payload = self.payload
	self.head = {}
	self.head.repo = payload.pull_request.head.repo.full_name; //name of the repo pulling from
	self.head.owner = payload.pull_request.head.repo.owner.login; //name of the owner of the repo
	self.head.urls = parseUrls(payload.pull_request.head.repo);
}

function parseRepositoryObject(repo){
	returnSet = {}
	returnSet.name = repo.full_name;
	returnSet.owner = repo.owner.login;
	returnSet.urls = parseUrls(repo);
	return returnSet;
}

function parseUrls(urlset){
	var returnSet = {};
	for (key in urlset){
		if(key.indexOf('_url')>=0){
			returnSet[key.replace('_url','')]=urlset[key];
		}
	}
	return returnSet;
}

module.exports.parsePayload = parsePayload
