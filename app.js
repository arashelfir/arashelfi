let D=window.STORE_DATA,A,cat='همه',q='',pimg='',editId=null,tab='p';
const $=s=>document.querySelector(s),esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dg=s=>String(s).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/\D/g,'');
function link(t,v){if(!v)return'';if(/^https?:/.test(v))return v;if(t=='wa')return'https://wa.me/'+dg(v).replace(/^0/,'98');if(t=='ig')return'https://instagram.com/'+v.replace('@','');return'tel:'+dg(v)}
const PH='<svg viewBox="0 0 64 64" fill="none" stroke="#e10600" stroke-width="3"><path d="M8 10h48M8 26h48M8 42h48M8 58h48M12 10v48M52 10v48"/></svg>';
function site(){const s=D.settings;$('#logo').src=s.logo;$('#ht').innerHTML=s.heroTitle;$('#hs').textContent=s.heroSub;
const all=['همه',...D.cats];$('#chips').innerHTML=all.map(c=>`<button class="chip ${c==cat?'on':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('')+'<input class="srch" id="sq" placeholder="جستجوی محصول..." value="'+esc(q)+'">';
$('#chips').onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;site();$('#sq').focus()}};
$('#sq').oninput=e=>{q=e.target.value;grid()};grid();
const w=link('wa',s.whatsapp),ig=link('ig',s.instagram),it=(e,t,v,h)=>`<div class="ic rv"><div class="e">${e}</div><h4>${t}</h4>${v?(h?`<a href="${esc(h)}" target="_blank" rel="noopener">${esc(v)}</a>`:`<span>${esc(v)}</span>`):'<span class="m">به‌زودی</span>'}</div>`;
$('#info').innerHTML=it('🕘','ساعت کاری',s.hours)+it('📞','تلفن تماس',s.phone,link('t',s.phone))+it('📸','اینستاگرام',s.instagram,ig)+it('💬','واتساپ',s.whatsapp,w)+it('📍','آدرس',s.address);
$('#ft').textContent='© '+s.name+' — همه حقوق محفوظ است';obs()}
function grid(){const s=D.settings,l=D.products.filter(p=>(cat=='همه'||p.cat==cat)&&(!q||(p.name+p.desc).includes(q)));
const h=link('wa',s.whatsapp)||link('t',s.phone);
$('#grid').innerHTML=l.length?l.map((p,i)=>`<div class="card rv" style="transition-delay:${i%4*80}ms"><div class="img">${p.img?`<img src="${p.img}" alt="${esc(p.name)}" loading="lazy">`:PH}<span class="tag">${esc(p.cat)}</span></div><div class="cb"><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="pr">تماس بگیرید جهت استعلام قیمت</div><a class="btn pri" href="${esc(h)}" target="_blank" rel="noopener">استعلام قیمت</a></div></div>`).join(''):'<div class="empty">محصولی پیدا نشد.</div>';obs()}
function obs(){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.rv:not(.in)').forEach(n=>o.observe(n))}
function toast(t){const n=$('#tst');n.textContent=t;n.classList.add('on');setTimeout(()=>n.classList.remove('on'),2800)}
/* ---- admin (visible only to the page owner/editors) ---- */
function pan(){const s=A.settings,f=(k,l)=>`<div><label>${l}</label><input data-s="${k}" value="${esc(s[k])}"></div>`;
let b;
if(tab=='p'){const e=A.products.find(p=>p.id==editId)||{};b=`<h3>${editId?'ویرایش محصول':'افزودن محصول جدید'}</h3><div class="two"><div><label>نام محصول</label><input id="pn" value="${esc(e.name)}"></div><div><label>دسته‌بندی</label><select id="pc">${A.cats.map(c=>`<option ${c==e.cat?'selected':''}>${esc(c)}</option>`).join('')}</select></div></div><label>توضیحات</label><textarea id="pd" rows="3">${esc(e.desc)}</textarea><label>عکس محصول</label><input type="file" id="pf" accept="image/*">${pimg?`<img src="${pimg}" style="width:90px;border-radius:12px;margin-top:8px">`:''}<div style="margin-top:12px"><button class="btn pri sm" id="ps">${editId?'ثبت تغییرات':'افزودن به لیست'}</button>${editId?'<button class="btn sec sm" id="pcx">انصراف</button>':''}</div><h3 style="margin-top:20px">لیست محصولات (${A.products.length})</h3>`+A.products.map(p=>`<div class="row">${p.img?`<img src="${p.img}">`:'<i></i>'}<span>${esc(p.name)}</span><button class="btn sec sm" data-e="${p.id}">ویرایش</button><button class="btn dng sm" data-d="${p.id}">حذف</button></div>`).join('')}
else b=`<div class="two">${f('name','نام فروشگاه')}${f('hours','ساعت کاری')}${f('phone','شماره تماس')}${f('instagram','لینک یا آیدی اینستاگرام')}${f('whatsapp','شماره یا لینک واتساپ')}${f('address','آدرس')}${f('pass','رمز ورود به پنل ()')}${f('heroTitle','عنوان بالای صفحه (HTML مجاز)')}${f('heroSub','متن زیر عنوان')}</div><label>دسته‌بندی‌ها (با کاما جدا کن)</label><input id="cs" value="${esc(A.cats.join('، '))}">`;
$('#pan').innerHTML=`<h2>⚙️ پنل مدیریت قفسه آرا</h2><div class="tabs"><button class="chip ${tab=='p'?'on':''}" data-t="p">محصولات</button><button class="chip ${tab=='s'?'on':''}" data-t="s">اطلاعات سایت</button></div>${b}<hr style="margin:20px 0;border:0;border-top:1px solid #eee"><button class="btn pri" id="pub">💾 ذخیره و انتشار</button><button class="btn sec" id="cl">بستن</button>`}
$('#pan').onclick=async e=>{const t=e.target,d=t.dataset;
if(d.t){tab=d.t;pan()}else if(d.e){editId=d.e;pimg=A.products.find(p=>p.id==editId).img;pan()}
else if(d.d){if(confirm('این محصول حذف شود؟')){A.products=A.products.filter(p=>p.id!=d.d);pan()}}
else if(t.id=='pcx'){editId=null;pimg='';pan()}
else if(t.id=='ps'){const n=$('#pn').value.trim();if(!n)return toast('نام محصول را وارد کن');const o={id:editId||String(Date.now()),name:n,cat:$('#pc').value,desc:$('#pd').value,img:pimg};
editId?A.products=A.products.map(p=>p.id==editId?o:p):A.products.unshift(o);editId=null;pimg='';pan();toast('به لیست اضافه شد؛ برای نمایش روی سایت «ذخیره و انتشار» بزن')}
else if(t.id=='cl'){$('#adm').style.display='none'}
else if(t.id=='pub'){const c=$('#cs');if(c)A.cats=c.value.split(/[,،\n]/).map(x=>x.trim()).filter(Boolean);
try{const out='window.STORE_DATA = '+JSON.stringify(A,null,1)+';\n';const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([out],{type:'text/javascript'}));l.download='data.js';l.click();toast('فایل data.js دانلود شد؛ جای data/data.js بذارش و صفحه را رفرش کن')}catch(x){toast('خطا: '+x.message)}}};
$('#pan').oninput=e=>{if(e.target.dataset.s)A.settings[e.target.dataset.s]=e.target.value};
$('#pan').onchange=e=>{if(e.target.id!='pf'||!e.target.files[0])return;const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,700/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);pimg=c.toDataURL('image/jpeg',.78);const n=$('#pn').value,d=$('#pd').value,cc=$('#pc').value;pan();$('#pn').value=n;$('#pd').value=d;$('#pc').value=cc};i.src=r.result};r.readAsDataURL(e.target.files[0])};
$('#fab').onclick=()=>{A=JSON.parse(JSON.stringify(D));editId=null;pimg='';tab='p';pan();$('#adm').style.display='block'};
site();
if(location.hash=='#admin'){const p=prompt('رمز پنل مدیریت:');if(p!==null&&p===(D.settings.pass||'1234'))$('#fab').click();else if(p!==null)alert('رمز اشتباه است')}
