const STORAGE_KEY = 'DEVInKnowledge Dicas'
let dicas = [];
const categorias = [
  {
    id:1,
    nome: 'Total',
  },
  {
    id:2,
    nome: 'FrontEnd',
  },
  {
    id:3,
    nome: 'BackEnd',
  },
  {
    id:4,
    nome: 'FullStack',
  },
  {
    id:5,
    nome:'Comportamental/SoftSkills',
  },
  
]; 

function criaCategorias (){
  const select = document.getElementById('categoria')
  categorias.forEach(function(categoria){
    if (categoria.id !== 1 ){
      const opcao = document.createElement('option')
      opcao.innerText = categoria.nome
      opcao.value = categoria.id
      select.appendChild(opcao);
    }
  })
}

function adicionaDica (evento) {
  evento.preventDefault();

 const dica = {
  id: new Date().getTime(),
  titulo: evento.target.titulo.value,
  linguagemSkill: evento.target.linguagemSkill.value,
  categoria: parseInt(evento.target.categoria.value),
  descricao:evento.target.descricao.value,
  link:evento.target.link.value,
 }
 
 dicas.push(dica);
 salvarDicasLocalStorage(dicas)
 exibeDicas(dicas);
 obtemTotalDicasPorCategoria();
 atualizarTela();

 evento.target.reset();
 alert("Dica cadastrada com sucesso")
}


function exibeDicas(dicas){
  const lista = document.getElementById('lista')
  lista.innerHTML = ''
  dicas.forEach((dica) => {
    const li = document.createElement('li')
    li.classList.add('list-dica')
    
    const titulo = document.createElement('h2')
    titulo.innerText = dica.titulo
    titulo.classList.add('subtitulo')

    const linguagemSkill = document.createElement('h3')
    linguagemSkill.innerText = dica.linguagemSkill
    linguagemSkill.classList.add('linguagemSkill')

    const subtitulo = document.createElement('p')
    subtitulo.innerText = obtemNomeCategoria(dica.categoria)
     
    const descricao = document.createElement('p')
    descricao.innerText = dica.descricao

      const link = document.createElement('a');
      link.classList.add('link')
      link.href = dica.link;
      link.innerText = dica.link

  const botaoExcluir = document.createElement("button")
  botaoExcluir.classList.add('botao-excluir');
  botaoExcluir.innerHTML = 'type="button"';
  botaoExcluir.textContent = '🗑️';
  botaoExcluir.addEventListener('click', () => {
    botaoExcluir.parentElement.remove(), alert('Dica excluída com sucesso (Apenas do HTML!) \nNão consegui excluir do localstorage :(');
  
  })
  
    li.innerHTML = ''
    li.appendChild(titulo)
    li.appendChild(linguagemSkill)
    li.appendChild(subtitulo)
    li.appendChild(descricao)
    li.appendChild(link);
    li.appendChild(botaoExcluir)
    lista.appendChild(li)
 
  })
}

function obtemNomeCategoria(id) {
  const categoria = categorias.find((categoria )=> categoria.id === id)
  return categoria.nome;
}

const filtrarDicas = (id) => {
  const dicasFiltradas = dicas.filter((dica) => dica.categoria === id)
  return dicasFiltradas;
}

function obtemTotalDicasPorCategoria (id) {
  const dicasFiltradas = filtrarDicas(id);
  return dicasFiltradas.length;
}

function obtemTotalDicas() {
  return dicas.length;
}

const pesquisaDicaPorNome = () => {
  const nome = document.getElementById('input-pesquisa').value;
  const dicasFiltradas = dicas.filter((dica) => dica.titulo.toLowerCase().includes(nome.toLowerCase()))
  exibeDicas(dicasFiltradas); 
}

const botaoPesquisa = document.getElementById('botao-pesquisa');
botaoPesquisa.addEventListener('click', pesquisaDicaPorNome);

function exibeCategorias() {
  const lista = document.getElementById('total');
  lista.innerHTML = '';

  categorias.forEach((categoria) => {
    let totalCategoria = 0;
    if (categoria.id === 1){
      totalCategoria = obtemTotalDicas();
    } else {
     totalCategoria = obtemTotalDicasPorCategoria(categoria.id);
    }

    const li = document.createElement('li');
    li.classList.add('list-dica', 'list-dica-total');
    li.addEventListener('click', () => filtraDicasPorCategoria(categoria.id));

    const titulo = document.createElement('h2');
    titulo.innerText = categoria.nome;
    titulo.classList.add('total-title');
    li.appendChild(titulo);

    const total = document.createElement('p');
    total.innerText = totalCategoria;
    total.classList.add('subtitle');
    li.appendChild(total);
    lista.appendChild(li);

  });
}


function filtraDicasPorCategoria(id) {
  const listaFiltrada = id === 1 ? dicas : filtrarDicas(id);
  exibeDicas(listaFiltrada);
}

const formulario = document.getElementById('form-dica')
formulario.addEventListener('submit', adicionaDica)

const salvarDicasLocalStorage = (arrayDicas) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayDicas));
};

const obterDicasLocalStorage = () => {
  const dicasLS = localStorage.getItem(STORAGE_KEY);
  return dicasLS ? JSON.parse(dicasLS) : [];
  
};

function carregarDadosIniciais () {
  criaCategorias();
  atualizarTela();
}

function atualizarTela() {
  dicas = obterDicasLocalStorage();
  obtemTotalDicasPorCategoria();
  exibeCategorias();
  exibeDicas(dicas);
}
window.addEventListener('load', carregarDadosIniciais);
