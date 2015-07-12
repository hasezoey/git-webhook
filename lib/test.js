hook = require('./hook');
payload = require('./payload2');
payload = JSON.stringify(payload);
var testHook = {};
hook.parsePayload.call(testHook,payload,'pull_request');
console.log(testHook);
