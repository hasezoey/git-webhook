const hook = require('./hook');
console.log(hook);
var payload = require('./payload2'); // where is this file?

payload = JSON.stringify(payload);
var testHook = {};
hook.parsePayload.call(testHook, payload, 'pull_request');
console.log(testHook);
