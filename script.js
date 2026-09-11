const padrao=[
["Flamengo","99.90","P, M, G, GG","brasileiros"],
["Palmeiras","99.90","P, M, G, GG","brasileiros"],
["Corinthians","99.90","P, M, G, GG","brasileiros"],
["São Paulo","99.90","P, M, G, GG","brasileiros"],
["Real Madrid","109.90","P, M, G, GG","europeus"],
["Barcelona","109.90","P, M, G, GG","europeus"],
["Manchester City","109.90","P, M, G, GG","europeus"],
["Liverpool","109.90","P, M, G, GG","europeus"],
["Brasil","109.90","P, M, G, GG","selecoes"],
["Argentina","109.90","P, M, G, GG","selecoes"]
];

let extras=JSON.parse(localStorage.getItem("minhaLojaProdutos")||"[]");
let categoriaAtual="todos";

function render(){
 const busca=(document.getElementById("busca").value||"").toLowerCase();
 const lista=extras.map((p)=>({nome:p.nome,preco:p.preco,tamanhos:p.tamanhos,categoria:p.categoria,img:p.img,extra:true}))
 .concat(padrao.map(p=>({nome:p[0],preco:p[1],tamanhos:p[2],categoria:p[3],extra:false})));
 const filtrada=lista.filter(p=>(categoriaAtual==="todos"||p.categoria===categoriaAtual)&&p.nome.toLowerCase().includes(busca));
 const area=document.getElementById("produtos");
 area.innerHTML="";
 filtrada.forEach(p=>{
   const card=document.createElement("article"); card.className="card";
   const foto=document.createElement("div"); foto.className="foto";
   if(p.img){const im=document.createElement("img");im.src=p.img;foto.appendChild(im)}
   else {foto.innerHTML='<div class="semfoto">👕</div>'}
   const info=document.createElement("div"); info.className="info";
   info.innerHTML=`<h3>${esc(p.nome)}</h3><div class="preco">R$ ${Number(p.preco).toFixed(2).replace(".",",")}</div><p class="detalhes">Tamanhos: ${esc(p.tamanhos)}</p><a class="whats" target="_blank" href="https://wa.me/5500000000000?text=${encodeURIComponent("Olá! Quero a camisa "+p.nome+" - R$ "+Number(p.preco).toFixed(2))}">Comprar pelo WhatsApp</a>`;
   card.append(foto,info); area.appendChild(card);
 });
}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

document.getElementById("foto").addEventListener("change",e=>{
 const f=e.target.files[0], prev=document.getElementById("preview");
 prev.innerHTML="";
 if(!f)return;
 const r=new FileReader();
 r.onload=()=>{const im=document.createElement("img");im.src=r.result;prev.appendChild(im);prev.dataset.img=r.result;document.getElementById("status").textContent="Foto escolhida. Agora clique em Adicionar ao catálogo."};
 r.readAsDataURL(f);
});

document.getElementById("adicionarBtn").addEventListener("click",()=>{
 const nome=document.getElementById("nome").value.trim(), preco=document.getElementById("preco").value, tamanhos=document.getElementById("tamanhos").value.trim(), categoria=document.getElementById("categoria").value, img=document.getElementById("preview").dataset.img||"";
 const status=document.getElementById("status");
 if(!img){status.textContent="⚠️ Escolha uma foto primeiro.";return}
 if(!nome){status.textContent="⚠️ Digite o nome da camisa.";return}
 if(!preco){status.textContent="⚠️ Digite o preço.";return}
 extras.push({nome,preco,tamanhos:tamanhos||"P, M, G, GG",categoria,img});
 localStorage.setItem("minhaLojaProdutos",JSON.stringify(extras));
 document.getElementById("nome").value="";document.getElementById("preco").value="";document.getElementById("tamanhos").value="";document.getElementById("foto").value="";document.getElementById("preview").innerHTML="";delete document.getElementById("preview").dataset.img;
 status.textContent="✅ Camisa adicionada! Ela já apareceu no catálogo.";
 render(); document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
});

document.getElementById("busca").addEventListener("input",render);
document.querySelectorAll(".filtro").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filtro").forEach(x=>x.classList.remove("ativo"));b.classList.add("ativo");categoriaAtual=b.dataset.cat;render()}));
render();