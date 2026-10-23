const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes={};const el=id=>nodes[id]??={value:'',innerHTML:'',textContent:'',append(o){if(!this.value)this.value=o.value},before(){},addEventListener(){}};
const buttons=['matches','teams','players'].map(v=>({dataset:{view:v},setAttribute(){},addEventListener(){}}));
const context={document:{getElementById:el,createElement:()=>({}),querySelector:()=>({before(){}}),querySelectorAll:()=>buttons},console};
vm.createContext(context);el('predict-date').value='2026-02-10';el('predict-format').value='BO3';
for(const f of ['data.js','app.js','research.js','research-ui.js','validation.js','validation-ui.js','recent-form.js','recent-form-ui.js'])vm.runInContext(fs.readFileSync('public/'+f,'utf8'),context);
const run=code=>vm.runInContext(code,context),result=run('EXP');
assert.equal(result.source_count,66);assert.equal(result.source_errors,0);assert.equal(result.matches.length,144);
assert.equal(run('DATA.matches.length'),90);assert.equal(run('VALIDATION.logs.length'),48);
for(const date of [...new Set(result.logs.map(l=>l.date))]){
 const state=run('recentReplay('+JSON.stringify(date)+')');context.fixtureState=state;
 for(const l of result.logs.filter(l=>l.date===date)){
  const v=run('recentValues(fixtureState,'+JSON.stringify(l.team_a_id)+','+JSON.stringify(l.team_b_id)+')');
  assert(Math.abs(v.score-l.recent_score_a)<1e-12);
  assert.equal(v.fa.n,l.recent_n_a);assert.equal(v.fb.n,l.recent_n_b);
  assert.equal(v.ha.length,l.history_a);assert.equal(v.hb.length,l.history_b);
  assert(l.history_max_date===null||l.history_max_date<l.date);
 }
}
const common=result.logs.filter(l=>l.eligible&&['elo','baseline','recent'].every(k=>l[k+'_correct']!==null));assert.equal(common.length,result.test.shared_n);
for(const k of ['elo','baseline','recent'])assert.equal(common.filter(l=>l[k+'_correct']).length,result.test.shared[k].correct);
el('recent-a').value=result.teams[0].id;el('recent-b').value=result.teams[1].id;el('recent-date').value='2026-01-01';run('recentPredict()');assert(el('recent-prediction').innerHTML.includes('資料不足'));
el('recent-b').value=el('recent-a').value;run('recentPredict()');assert(el('recent-prediction').innerHTML.includes('不同隊伍'));
el('recent-b').value=result.teams[1].id;el('recent-date').value='2026-08-24';run('recentPredict()');assert(!el('recent-prediction').innerHTML.includes('NaN'));assert(!el('recent-prediction').innerHTML.includes('undefined'));
console.log('PASS: Python/browser score parity for every Stage2 match, independent summary counts, same-day history cutoff, cold start, same-team guard, old views preserved');
