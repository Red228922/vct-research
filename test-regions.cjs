const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes={};function el(id){if(!nodes[id]){const n={value:'',textContent:'',options:[],hidden:false,append(o){this.options.push(o);if(!this.value)this.value=o.value},before(){},addEventListener(){}};Object.defineProperty(n,'innerHTML',{get(){return this.html??''},set(v){this.html=v;if(['team','regional-a','regional-b'].includes(id)){this.value='';this.options=[]}}});Object.defineProperty(n,'selectedIndex',{set(i){this.value=this.options[i]?.value??''}});nodes[id]=n}return nodes[id]}
const buttons=['matches','teams','players'].map(v=>({dataset:{view:v},setAttribute(){},addEventListener(){}}));
const c={document:{getElementById:el,createElement:()=>({}),querySelector:()=>({before(){}}),querySelectorAll:()=>buttons},console};vm.createContext(c);const run=s=>vm.runInContext(s,c);
el('predict-date').value='2026-02-10';el('predict-format').value='BO3';el('region-select').value='cn';
for(const f of ['data.js','app.js','research.js','research-ui.js','validation.js','validation-ui.js','recent-form.js','recent-form-ui.js','regions.js','region-ui.js'])run(fs.readFileSync('public/'+f,'utf8'));
assert.equal(run('DATA.matches.length'),90);assert.equal(run('DATA.players.length'),900);
for(const rid of ['cn','pacific','emea','cn']){
 el('region-select').value=rid;run('refreshRegion()');const d=run('REGION_RESEARCH[activeRegion]');assert.equal(run('M.length'),30);assert.equal(run('P.length'),300);assert(run('M.every(m=>m.region_id===activeRegion)'));assert.equal(el('stat-players').textContent,300);assert.equal(el('stage1-validation').hidden,rid!=='cn');assert.equal(el('recent-form').hidden,rid!=='cn');assert(!el('regional-summary').innerHTML.includes('NaN'));
 for(const date of [...new Set(d.logs.map(x=>x.date))]){
  c.testState=run('regionalReplay('+JSON.stringify(date)+')');
  for(const l of d.logs.filter(l=>l.date===date)){
   const v=run('recentValues(testState,'+JSON.stringify(l.team_a_id)+','+JSON.stringify(l.team_b_id)+')');assert(Math.abs(v.score-l.recent_score_a)<1e-12);assert.equal(v.ha.length,l.history_a);assert.equal(v.hb.length,l.history_b);
  }
 }
 el('team').value=d.teams[0].name;run('render()');assert(el('content').innerHTML.includes(d.teams[0].name));
 for(const view of ['teams','players','matches']){run('view='+JSON.stringify(view)+';render()');assert(!el('content').innerHTML.includes('undefined'))}
 el('regional-date').value='2026-01-01';run('regionalPredict()');assert(el('regional-prediction').innerHTML.includes('至少2場'));
}
console.log('PASS: 90 matches/900 players; every region isolated; filter reset; prediction/Python parity for all 90 matches; region visibility; cold start; old views');
