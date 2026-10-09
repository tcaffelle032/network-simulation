// Core checks for the classroom challenge rules. No third-party packages needed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, 'Building_a_Network.html'), 'utf8');
const source = html.match(/<script id="network-core">([\s\S]*?)<\/script>/)[1];
const context = {module: {exports: {}}};
vm.runInNewContext(source, context);
const C = context.module.exports;
const plain = value => JSON.parse(JSON.stringify(value));
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('PASS ' + name); }

test('Every direct pair is required for challenge 1', () => {
  for (let n = 3; n <= 16; n++) {
    const mesh = C.example(n, 'mesh');
    assert.equal(mesh.length, n * (n - 1) / 2);
    assert.equal(C.assess(1, n, mesh, 8, 3).pass, true);
    mesh.pop();
    assert.equal(C.assess(1, n, mesh, 8, 3).pass, false);
  }
});
test('Minimum connected designs pass challenge 2; redundant designs do not', () => {
  for (let n = 3; n <= 16; n++) {
    for (const type of ['chain', 'star']) {
      const edges = C.example(n, type);
      assert.equal(C.assess(2, n, edges, 8, 3).pass, true);
      assert.equal(C.metrics(n, edges).bridges.length, n - 1);
      edges[0].cut = true;
      assert.equal(C.metrics(n, edges).connected, false);
      assert.equal(C.assess(2, n, edges, 8, 3).pass, false);
    }
    assert.equal(C.assess(2, n, C.example(n, 'ring'), 8, 3).pass, false);
  }
});
test('Minimum resilient ring survives every individual cut', () => {
  for (let n = 3; n <= 16; n++) {
    const ring = C.example(n, 'ring');
    assert.equal(C.assess(3, n, ring, 8, 3).pass, true);
    assert.equal(C.metrics(n, ring).maxHops, Math.floor(n / 2));
    for (let index = 0; index < ring.length; index++) {
      const cut = plain(ring); cut[index].cut = true;
      assert.equal(C.metrics(n, cut).connected, true);
      assert.equal(C.metrics(n, cut).installed, n);
      assert.equal(C.metrics(n, cut).live, n - 1);
      assert.equal(C.metrics(n, cut).resilient, false);
    }
  }
});
test('Challenge 3 distinguishes reliability from minimum cost', () => {
  assert.equal(C.metrics(6, C.example(6, 'mesh')).resilient, true);
  assert.equal(C.assess(3, 6, C.example(6, 'mesh'), 8, 3).pass, false);
  assert.equal(C.assess(3, 6, C.example(6, 'star'), 8, 3).pass, false);
});
test('Disconnected groups count reachable pairs correctly', () => {
  const pairs = [{a:0,b:1,cut:false}, {a:2,b:3,cut:false}, {a:4,b:5,cut:false}];
  const m = C.metrics(6, pairs);
  assert.equal(m.groups, 3);
  assert.equal(m.reachable, 3);
  assert.equal(m.total, 15);
  assert.equal(m.maxHops, null);
  assert.equal(C.path(6, pairs, 0, 5), null);
  assert.deepEqual(plain(C.path(6, pairs, 0, 1)), [0,1]);
});
test('Message route reroutes around failed links', () => {
  const ring = C.example(6, 'ring');
  assert.deepEqual(plain(C.path(6, ring, 0, 2)), [0,1,2]);
  ring[0].cut = true;
  assert.deepEqual(plain(C.path(6, ring, 0, 2)), [0,5,4,3,2]);
  assert.deepEqual(plain(C.path(6, ring, 2, 2)), [2]);
});
test('Challenge 4 enforces cost, reliability, intact strings, and hops', () => {
  const ring = C.example(6, 'ring');
  assert.equal(C.assess(4, 6, ring, 8, 3).pass, true);
  assert.equal(C.assess(4, 6, ring, 5, 3).pass, false);
  assert.equal(C.assess(4, 6, ring, 8, 2).pass, false);
  assert.equal(C.assess(4, 6, C.example(6, 'star'), 8, 3).pass, false);
  ring[0].cut = true;
  assert.equal(C.assess(4, 6, ring, 8, 3).pass, false);
  const shortcuts = C.example(6, 'shortcuts');
  assert.equal(shortcuts.length,8);
  assert.equal(C.metrics(6,shortcuts).maxHops,2);
  assert.equal(C.assess(4,6,shortcuts,8,2).pass,true);
});
test('Single-cut check matches reachability after each individual failure', () => {
  let seed=1234;
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for (let trial=0; trial<80; trial++) {
    const n=3+Math.floor(random()*10),edges=C.example(n,'mesh').filter(()=>random()<.35);
    const m=C.metrics(n,edges);
    if(!m.connected)continue;
    const vulnerable=[];
    for(let i=0;i<edges.length;i++) {
      const cut=plain(edges);cut[i].cut=true;
      if(C.metrics(n,cut).reachable<m.total)vulnerable.push(C.pairKey(edges[i].a,edges[i].b));
    }
    assert.deepEqual(plain(m.bridges).sort(),vulnerable.sort());
  }
});
test('Design files preserve valid data and reject malformed graph inputs', () => {
  const data={version:1,n:6,round:4,edges:plain(C.example(6,'ring')),budget:8,hopLimit:3,notes:['one','two','three','four']};
  assert.deepEqual(plain(C.validate(data)),data);
  for(const change of [
    {n:2},{n:17},{round:5},{version:2},{budget:121},{hopLimit:0},{notes:['short']},
    {edges:[{a:0,b:0,cut:false}]},{edges:[{a:0,b:6,cut:false}]},{edges:[{a:0,b:1,cut:'yes'}]},
    {edges:[{a:0,b:1,cut:false},{a:1,b:0,cut:false}]},
    {notes:['x'.repeat(5001),'','','']}
  ]) assert.throws(()=>C.validate({...data,...change}));
});
test('The distributed simulation has no remote dependencies', () => {
  assert.equal(/(?:src|href)=["']https?:\/\//.test(html), false);
  assert.equal(/\bfetch\s*\(|XMLHttpRequest|WebSocket/.test(html), false);
  const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
  for(const script of scripts)new vm.Script(script[1]);
});
console.log(`${checks} test groups passed.`);
