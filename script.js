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
 const lista=extras.map((p)=>({nome:p.nome,preco:p.preco,tamanhos:p.tamanhos,categoria:p.categoria,img:p.img,imgs:p.imgs,extra:true}))
 .concat(padrao.map(p=>({nome:p[0],preco:p[1],tamanhos:p[2],categoria:p[3],extra:false})));
 const filtrada=lista.filter(p=>(categoriaAtual==="todos"||p.categoria===categoriaAtual)&&p.nome.toLowerCase().includes(busca));
 const area=document.getElementById("produtos");
 area.innerHTML="";
 filtrada.forEach(p=>{
   const card=document.createElement("article"); card.className="card";
   const foto=document.createElement("div"); foto.className="foto";
   const fotos=Array.isArray(p.imgs)?p.imgs:(p.img?[p.img]:[]);

   if(fotos.length){
     const galeria=document.createElement("div");
     galeria.className="galeria";

     fotos.forEach((src,i)=>{
       const im=document.createElement("img");
       im.src=src;
       im.alt=p.nome;
       if(i!==0) im.style.display="none";
       galeria.appendChild(im);
     });

     if(fotos.length>1){
       let atual=0;

       const anterior=document.createElement("button");
       anterior.className="galeria-btn anterior";
       anterior.type="button";
       anterior.textContent="‹";

       const proxima=document.createElement("button");
       proxima.className="galeria-btn proxima";
       proxima.type="button";
       proxima.textContent="›";

       const contador=document.createElement("span");
       contador.className="galeria-contador";
       contador.textContent=`1/${fotos.length}`;

       function mostrar(n){
         atual=(n+fotos.length)%fotos.length;
         galeria.querySelectorAll("img").forEach((img,i)=>{
           img.style.display=i===atual?"block":"none";
         });
         contador.textContent=`${atual+1}/${fotos.length}`;
       }

       anterior.onclick=()=>mostrar(atual-1);
       proxima.onclick=()=>mostrar(atual+1);

       galeria.append(anterior,proxima,contador);
     }

     foto.appendChild(galeria);
   }else{
     foto.innerHTML='<div class="semfoto">👕</div>';
   }
   const info=document.createElement("div"); info.className="info";
   info.innerHTML=`<h3>${esc(p.nome)}</h3><div class="preco">R$ ${Number(p.preco).toFixed(2).replace(".",",")}</div><p class="detalhes">Tamanhos: ${esc(p.tamanhos)}</p><a class="whats" target="_blank" href="https://wa.me/558888963078?text=${encodeURIComponent("Olá! Quero a camisa "+p.nome+" - R$ "+Number(p.preco).toFixed(2))}">Comprar pelo WhatsApp</a>`;
   card.append(foto,info); area.appendChild(card);
 });
}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

document.getElementById("foto").addEventListener("change",e=>{
  const files=[...e.target.files].slice(0,5);
  const prev=document.getElementById("preview");
  prev.innerHTML="";
  delete prev.dataset.imgs;

  if(!files.length)return;

  let restantes=files.length;
  const imagens=new Array(files.length);

  files.forEach((f,i)=>{
    const r=new FileReader();
    r.onload=()=>{
      imagens[i]=r.result;
      restantes--;

      if(restantes===0){
        prev.dataset.imgs=JSON.stringify(imagens);
        prev.innerHTML=imagens.map(src=>`<img src="${src}" alt="Prévia da camisa">`).join("");
        document.getElementById("status").textContent=
          `${imagens.length} foto(s) escolhida(s). Agora clique em Adicionar ao catálogo.`;
      }
    };
    r.readAsDataURL(f);
  });
});

document.getElementById("adicionarBtn").addEventListener("click",()=>{
  const nome=document.getElementById("nome").value.trim();
  const preco=document.getElementById("preco").value;
  const tamanhos=document.getElementById("tamanhos").value.trim();
  const categoria=document.getElementById("categoria").value;
  const status=document.getElementById("status");
  const imgs=JSON.parse(document.getElementById("preview").dataset.imgs||"[]");

  if(!imgs.length){status.textContent="⚠️ Escolha pelo menos uma foto.";return}
  if(!nome){status.textContent="⚠️ Digite o nome da camisa.";return}
  if(!preco){status.textContent="⚠️ Digite o preço.";return}

  extras.push({
    nome,
    preco,
    tamanhos:tamanhos||"P, M, G, GG",
    categoria,
    imgs,
    img:imgs[0]
  });

  localStorage.setItem("minhaLojaProdutos",JSON.stringify(extras));

  document.getElementById("nome").value="";
  document.getElementById("preco").value="";
  document.getElementById("tamanhos").value="";
  document.getElementById("foto").value="";
  document.getElementById("preview").innerHTML="";
  delete document.getElementById("preview").dataset.imgs;

  status.textContent="✅ Camisa adicionada! Ela já apareceu no catálogo.";
  render();
  document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
});

document.getElementById("busca").addEventListener("input",render);
document.querySelectorAll(".filtro").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filtro").forEach(x=>x.classList.remove("ativo"));b.classList.add("ativo");categoriaAtual=b.dataset.cat;render()}));
render();
const ADMIN_PASSWORD = 'PrimeSoccer2026';
const loginAdmin = document.getElementById("loginAdmin");
const adminPanel = document.getElementById("adicionar");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const entrarAdmin = document.getElementById("entrarAdmin");
const sairAdmin = document.getElementById("sairAdmin");
const adminSenha = document.getElementById("adminSenha");
const loginStatus = document.getElementById("loginStatus");

function mostrarLogin() {
  loginAdmin.style.display = "block";
  loginAdmin.scrollIntoView({behavior:"smooth"});
}

function abrirAdmin() {
  loginAdmin.style.display = "none";
  adminPanel.style.setProperty("display", "block", "important");
  adminPanel.scrollIntoView({behavior:"smooth"});
}

adminLoginBtn.addEventListener("click", mostrarLogin);

entrarAdmin.addEventListener("click", () => {
  if (adminSenha.value === ADMIN_PASSWORD) {
    adminSenha.value = "";
    loginStatus.textContent = "";
    abrirAdmin();
  } else {
    loginStatus.textContent = "Senha incorreta.";
  }
});

adminSenha.addEventListener("keydown", e => {
  if (e.key === "Enter") entrarAdmin.click();
});

sairAdmin.addEventListener("click", () => {
  adminPanel.style.setProperty("display", "none", "important");
  loginAdmin.style.display = "block";
});
