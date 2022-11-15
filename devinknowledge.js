let dicas = [];
const categorias = [
  {
    id:1,
    nome: 'FrontEnd',
  },
  {
    id:2,
    nome: 'BackEnd',
  },
  {
    id:3,
    nome: 'FullStack',
  },
  {
    id:4,
    nome:'Comportamental/SoftSkills',
  },
]; 

function criaCategorias (){
  const select = document.getElementById('categoria')
  
  categorias.forEach(function(categoria){
    const opcao = document.createElement('option')
    opcao.innerText = categoria.nome
    opcao.value = categoria.id
    select.appendChild(opcao)

  })
}

function adicionaDica (evento) {
  evento.preventDefault();

 const dica = {
  id: new Date().getTime(),
  titulo: evento.target.titulo.value,
  linguagemSkill: evento.target.linguagemSkill.value,
  categoria: evento.target.categoria.value,
  descricao:evento.target.descricao.value,
 }
 dicas.push(dica);
 exibeDicas();
}

function obtemNomeCategoria(id) {
  const categoria = categorias.find((categoria )=> categoria.id === parseInt(id))
  return categoria.nome
}

function exibeDicas (){
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
     
    li.innerHTML = ''
    li.appendChild(titulo)
    li.appendChild(linguagemSkill)
    li.appendChild(subtitulo)
    li.appendChild(descricao)
    lista.appendChild(li)
  })
}

const formulario = document.getElementById('form-dica')
formulario.addEventListener('submit', adicionaDica)

// document.body.addEventListener('load', criaCategorias()) alternativa
document.body.onload = criaCategorias;