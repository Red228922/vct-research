const assert = require('node:assert/strict');
const { once } = require('node:events');
const { createServer } = require('./index.js');
(async () => {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    let r = await fetch(base + '/'); assert.equal(r.status, 200); assert.match(await r.text(), /VCT/);
    for (const name of ['app.js','data.js','research.js','research-ui.js','validation.js','validation-ui.js','recent-form.js','recent-form-ui.js','regions.js','region-ui.js','style.css']) {
      r = await fetch(base + '/' + name); assert.equal(r.status, 200, name); assert((await r.text()).length > 0);
    }
    for (const route of ['/index.js','/package.json','/.env','/%2e%2e%5cindex.js','/missing']) assert.equal((await fetch(base + route)).status, 404, route);
    assert.equal((await fetch(base + '/', {method:'POST'})).status, 405);
    r = await fetch(base + '/', {method:'HEAD'}); assert.equal(r.status, 200); assert.equal(await r.text(), '');
    assert.deepEqual(await (await fetch(base + '/health')).json(), {status:'ok'});
    console.log('PASS: homepage, all assets, HEAD, health, missing files, config isolation, unsupported method');
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
})().catch(e => { console.error(e); process.exitCode = 1; });
