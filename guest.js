(()=>{
 const raw=new URLSearchParams(location.hash.slice(1)).get('invitacion');
 if(!raw)return;
 let g;try{g=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(raw.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0))));if(!/^F\d{2}$/.test(g.id)||!Number.isInteger(g.max)||g.max<1||g.max>50||typeof g.family!=='string'||g.family.length>100||!/^[\w-]{32}$/.test(g.token))throw Error();}catch{document.querySelector('.small-note').textContent='El enlace personalizado no es válido. Solicita tu enlace al organizador.';return;}
 const original=document.getElementById('rsvp-form');const form=document.createElement('form');form.id='rsvp-form';original.replaceWith(form);
 const heading=document.createElement('h3');heading.textContent='Familia '+g.family;heading.style.fontSize='26px';
 const intro=document.createElement('p');intro.textContent=`Cuentan con ${g.max} boletos para adultos. Confirmen cuántos utilizarán para acompañarme.`;
 const label=document.createElement('label');label.htmlFor='quantity';label.textContent='¿CUÁNTOS ASISTIRÁN?';
 const select=document.createElement('select');select.id='quantity';select.required=true;select.style.cssText='width:100%;padding:14px;background:#fff9f5;border:1px solid #b78593;font:inherit';
 select.add(new Option('Selecciona una opción',''));for(let i=g.max;i>=0;i--)select.add(new Option(i===g.max?`Usaremos todos: ${i} boletos`:i===0?'No podremos asistir':`${i} adulto${i===1?'':'s'}`,String(i)));
 const btn=document.createElement('button');btn.type='submit';btn.className='button dark';btn.textContent='PREPARAR CONFIRMACIÓN ↗';
 const result=document.createElement('div');result.setAttribute('role','status');
 const api=window.RSVP_CONFIG?.googleScriptUrl||'';
 const automatic=document.createElement('a');automatic.className='button dark';automatic.textContent='CONFIRMAR Y GUARDAR ASISTENCIA ↗';
 if(api){automatic.href=api+'?t='+encodeURIComponent(g.token);automatic.target='_blank';automatic.rel='noopener';form.append(heading,intro,automatic);const p=document.createElement('p');p.textContent='Elige tus lugares en el formulario de confirmación. Tu respuesta quedará guardada para los organizadores.';form.append(p);}
 else{form.append(heading,intro,label,select,btn,result);form.addEventListener('submit',e=>{e.preventDefault();const q=Number(select.value);if(select.value===''||!Number.isInteger(q)||q<0||q>g.max)return;const msg=`Confirmación XV Ambar\nFolio: ${g.id}\nFamilia: ${g.family}\nBoletos asignados: ${g.max}\nAdultos que asistirán: ${q}\nLugares que no utilizaremos: ${g.max-q}\n${q===0?'No podremos asistir.':'¡Nos vemos el 4 de diciembre!'}`;const a=document.createElement('a');a.className='button dark';a.textContent='ENVIAR POR WHATSAPP ↗';a.href='https://wa.me/523318395106?text='+encodeURIComponent(msg);a.target='_blank';a.rel='noopener';const p=document.createElement('p');p.textContent=`${q} de ${g.max} lugares. Envía el mensaje en WhatsApp para completar tu confirmación.`;result.replaceChildren(p,a);});}
 document.querySelector('.small-note').textContent=api?'Tu enlace es exclusivo para tu familia.':'Tu respuesta llegará por WhatsApp al organizador. No se registra automáticamente en una lista.';
 document.querySelector('.rsvp>div>p:not([class])').textContent='Me hará muy feliz compartir esta noche contigo.';
})();
