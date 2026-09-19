/* Agent+Harness 教程站 · 共享脚本 */
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));

const META=[
 {id:'chapter-0',num:'00',title:'开篇',short:'开篇',tags:['概念','路线图']},
 {id:'chapter-1',num:'01',title:'阶段 01 · 最简 Agent Loop',short:'最简 Agent Loop',tags:['循环','思考·行动·观察']},
 {id:'chapter-2',num:'02',title:'阶段 02 · 工具调用',short:'工具调用',tags:['注册表','tool_call']},
 {id:'chapter-3',num:'03',title:'阶段 03 · 基础 Harness',short:'基础 Harness',tags:['执行层','解耦']},
 {id:'chapter-4',num:'04',title:'阶段 04 · Harness 插件',short:'Harness 插件',tags:['插件','能力清单']},
 {id:'chapter-5',num:'05',title:'阶段 05 · 记忆模块',short:'记忆模块',tags:['上下文','摘要']},
 {id:'chapter-6',num:'06',title:'阶段 06 · 状态管理',short:'状态管理',tags:['Step','断点续跑']},
 {id:'chapter-7',num:'07',title:'阶段 07 · 多 Agent',short:'多 Agent',tags:['编排器','专才']},
 {id:'chapter-8',num:'08',title:'阶段 08 · 观测与部署',short:'观测与部署',tags:['可观测','工程化']}
];
const TOTAL=META.length;
let visited=JSON.parse(localStorage.getItem('ah_progress')||'[]');
const renderedMermaid=new Set();
const currentChapter=document.body.dataset.chapter; // 'index' | '0'..'8'

/* ============ 主题 ============ */
function initTheme(){
  const saved=localStorage.getItem('ah_theme');
  const theme=saved||'light';
  document.body.setAttribute('data-theme',theme);
}
function toggleTheme(){
  const cur=document.body.getAttribute('data-theme')||'light';
  const next=cur==='dark'?'light':'dark';
  localStorage.setItem('ah_theme',next);
  document.body.setAttribute('data-theme',next);
  location.reload();
}

/* ============ 侧边栏导航 ============ */
function buildNav(){
  const nav=$('#nav'); if(!nav) return;
  META.forEach((m,i)=>{
    const g=document.createElement('div'); g.className='nav-group';
    const b=document.createElement('a');
    b.className='nav-stage'; b.href=m.id+'.html';
    b.innerHTML='<span class="num"></span><span class="t"></span><span class="dot"></span>';
    b.querySelector('.num').textContent=m.num;
    b.querySelector('.t').textContent=m.short;
    const isCurrent=(currentChapter===String(i));
    if(isCurrent) b.classList.add('active');
    g.appendChild(b);
    // 子目录（仅当前章节页）
    if(isCurrent){
      const sub=document.createElement('div'); sub.className='nav-sub open';
      const sec=$('.stage');
      (sec?sec.querySelectorAll('.block>h2'):[]).forEach((h2,k)=>{
        h2.id='sec-'+k;
        const a=document.createElement('a');
        a.href='#'+h2.id;
        a.textContent=h2.textContent.replace(/^\d+/,'').trim();
        sub.appendChild(a);
      });
      g.appendChild(sub);
      b.addEventListener('click',e=>{ e.preventDefault(); sub.classList.toggle('open'); });
    }
    nav.appendChild(g);
  });
  // 子目录点击平滑滚动
  nav.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#sec-"]');
    if(a){ e.preventDefault();
      const el=document.getElementById(a.getAttribute('href').slice(1));
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
}

/* ============ 进度 ============ */
function markVisited(ch){
  if(!visited.includes(ch)){ visited.push(ch); localStorage.setItem('ah_progress',JSON.stringify(visited)); }
}
function updateProgress(){
  const done=visited.filter(c=>META.some((m,i)=>String(i)===c)).length;
  $$('.nav-stage').forEach((b,i)=>b.classList.toggle('done',visited.includes(String(i))));
  const pt=$('#progTxt'), pf=$('#progFill');
  if(pt) pt.textContent=done+' / '+TOTAL+' 章';
  if(pf) pf.style.width=(done/TOTAL*100)+'%';
}

/* ============ 滚动联动 ============ */
function scrollSpy(){
  const sec=document.querySelector('.stage'); if(!sec) return;
  const hs=sec.querySelectorAll('.block>h2'); let cur=null; const off=110;
  hs.forEach(h=>{ if(h.getBoundingClientRect().top<=off) cur=h; });
  $$('#nav a[href^="#sec-"]').forEach(a=>a.classList.remove('active'));
  if(cur){ const a=$('#nav a[href="#'+cur.id+'"]'); if(a) a.classList.add('active'); }
}
window.addEventListener('scroll',scrollSpy,{passive:true});

/* ============ Mermaid ============ */
function mermaidReady(){
  return new Promise(res=>{
    if(window.mermaid) return res(true);
    let t=0; const iv=setInterval(()=>{ t+=200;
      if(window.mermaid){ clearInterval(iv); res(true); }
      else if(t>5000){ clearInterval(iv); res(false); }
    },200);
  });
}
async function renderMermaid(){
  const pres=Array.from(document.querySelectorAll('.stage pre.mermaid, .hero-mermaid pre.mermaid'));
  if(!pres.length) return;
  if(!(await mermaidReady())) return;
  const theme=(document.body.getAttribute('data-theme')==='dark')?'dark':'default';
  mermaid.initialize({startOnLoad:false,theme:theme,themeVariables:{fontFamily:'"JetBrains Mono","Noto Sans SC",monospace'},flowchart:{curve:'basis',htmlLabels:true,useMaxWidth:true},securityLevel:'loose'});
  try{
    for(let i=0;i<pres.length;i++){
      const text=pres[i].textContent;
      const uid='mmd-'+i+'-'+Math.floor(Math.random()*1e6);
      const {svg}=await mermaid.render(uid,text);
      const wrap=document.createElement('div');
      wrap.className='mermaid';
      wrap.innerHTML=svg;
      pres[i].replaceWith(wrap);
    }
  }catch(e){}
}

/* ============ 代码复制 ============ */
function bindCopy(){
  $$('.copy-btn').forEach(b=>b.addEventListener('click',()=>{
    const code=b.closest('.code-wrap').querySelector('pre code');
    const text=code.innerText;
    const done=()=>{ b.textContent='已复制'; b.classList.add('copied');
      setTimeout(()=>{ b.textContent='复制'; b.classList.remove('copied'); },1500); };
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(done).catch(()=>{});
    } else { done(); }
  }));
}

/* ============ 代码高亮 ============ */
function hlCode(){
  $$('code.lang-py').forEach(c=>{
    const txt=c.textContent;
    const esc=txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const re=/(#.*?$)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|\b(def|class|return|if|elif|else|for|while|in|import|from|try|except|finally|lambda|self|None|True|False|and|or|not|pass|break|continue|with|as|raise|yield|global|is)\b|\b(\d+(?:\.\d+)?)\b|(@\w+)|(\b[A-Za-z_]\w*)(?=\()/gm;
    c.innerHTML=esc.replace(re,(m,cm,st,kw,nm,dec,fn)=>{
      if(cm) return '<span class="tok-cmt">'+m+'</span>';
      if(st) return '<span class="tok-str">'+m+'</span>';
      if(kw) return '<span class="tok-kw">'+m+'</span>';
      if(nm) return '<span class="tok-num">'+m+'</span>';
      if(dec) return '<span class="tok-kw">'+m+'</span>';
      if(fn) return '<span class="tok-fn">'+m+'</span>';
      return m;
    });
  });
}

/* ============ 侧边栏折叠 ============ */
function bindToggle(){
  const t=$('#navToggle'); if(!t) return;
  t.addEventListener('click',()=>{
    if(window.innerWidth<=1024){ document.body.classList.toggle('menu-open'); }
    else { document.body.classList.toggle('nav-collapsed'); }
  });
  const scrim=$('#scrim'); if(scrim) scrim.addEventListener('click',()=>document.body.classList.remove('menu-open'));
}

/* ============ 演示轨迹（仅第8章） ============ */
const TRACE=[
 ['arr','[编排器] 拆解任务 → 委派给：coder, researcher'],
 ['arr','[编排器] 委派 researcher：调研冒泡排序的时间复杂度'],
 ['sub','[researcher] 思考 → 计划：先检索资料再归纳'],
 ['tool','[researcher] 调用工具 search("冒泡排序 复杂度") → 命中 3 条'],
 ['sub','[researcher] 思考 → 归纳出 最好 / 最坏 / 空间 复杂度'],
 ['ans','[researcher] 回答：最坏 O(n²)，最好 O(n)，空间 O(1)'],
 ['arr','[编排器] 委派 coder：实现冒泡排序'],
 ['sub','[coder] 思考 → 决定直接实现并自测'],
 ['tool','[coder] 调用工具 run_tests([...]) → 全部通过'],
 ['ans','[coder] 回答：返回实现代码'],
 ['arr','[编排器] 汇聚 → 生成最终答案'],
 ['done','✓ 完成：11 步 · 3 次工具调用 · 2 个专才 · 4 次思考']
];
const TLCOLOR={arr:'var(--accent)',sub:'var(--text-2)',tool:'var(--amber)',ans:'var(--green)',done:'var(--green)'};
function bindDemo(){
  const box=$('#trace'); if(!box) return;
  const stat=$('#demoStat'); let timer=null;
  $('#runDemo').addEventListener('click',()=>{
    clearTimeout(timer); box.innerHTML='';
    const runBtn=$('#runDemo'); runBtn.disabled=true; runBtn.style.opacity=.5;
    stat.textContent='运行中…';
    TRACE.forEach(([t,text],i)=>{
      timer=setTimeout(()=>{
        const d=document.createElement('div');
        d.style.color=TLCOLOR[t]||'var(--text)';
        d.style.opacity=0; d.style.transform='translateX(-4px)';
        d.style.transition='opacity .25s ease,transform .25s ease';
        d.textContent=text; box.appendChild(d);
        requestAnimationFrame(()=>{ d.style.opacity=1; d.style.transform='none'; });
        if(i===TRACE.length-1){
          stat.textContent='完成 · 轨迹已绘出（对应阶段 06 的状态快照）';
          runBtn.disabled=false; runBtn.style.opacity=1;
        }
      }, i*260);
    });
  });
  $('#resetDemo').addEventListener('click',()=>{
    clearTimeout(timer); box.innerHTML=''; stat.textContent='等待运行…';
    const runBtn=$('#runDemo'); runBtn.disabled=false; runBtn.style.opacity=1;
  });
}

/* ============ 启动 ============ */
initTheme();
buildNav();
hlCode();
bindCopy();
bindToggle();
bindDemo();
if(currentChapter&&currentChapter!=='index'){ markVisited(currentChapter); }
updateProgress();
renderMermaid();
scrollSpy();
// 主题切换按钮
const tb=document.querySelector('.theme-toggle');
if(tb) tb.addEventListener('click',toggleTheme);
