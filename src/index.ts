const apiKey: string = 'fd937c0a'
let pesquisa: string = 'joker'
const paiGrid: any = document.querySelector('.grid')
const altaMarvel: any | null = document.querySelector('.marvel')
const altaHarry: any | null = document.querySelector('.harry')
const altaStar: any | null = document.querySelector('.star')
const altaAnime: any | null = document.querySelector('.anime')
const altaDisney: any | null = document.querySelector('.disney')

const btnPesquisar: any = document.querySelector('.botao');
const acao: any = document.querySelector('.acao')
const comedia: any = document.querySelector('.comedia')
const romance: any = document.querySelector('.romance')
const terror: any = document.querySelector('.terror')



interface dados{
    Title: string
    Year: string
    Type: string
    Poster: string
}

async function requisicao(url: string): Promise<dados>{
    try{

        const response = await fetch(url)

        //confirmando se a requisição deu certo
        if(!response.ok){
            throw new Error('deu ruim');
        }

        const data = await response.json();
        return data.Search

    }catch(error){
        throw new Error(`Então ${error}`)
    }
}



requisicao(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
.then(data => card(data, paiGrid))
.catch(error => console.error())

//criando elemento e definindo classes
function createEl(div: string, classe: string): HTMLElement {
    const d = document.createElement(div)
    const classes: string[] = classe.split(' ')

    for(const c of classes){
        d.classList.add(c)
    }

    return d
}

//criar card a partir da pesquisa
function card(array: any, pai: any):void {

    //limpa o catalogo
    const c: any = paiGrid.querySelectorAll('.card')

    for(const item of c){
        item.remove()
    }


    //acresenta
   for(const item of array){
     const card: HTMLElement = createEl('div', 'card')
     const imagem: any = createEl('img','card-img-top')
     const cardBody: HTMLElement = createEl('div','card-body')
     const titulo: HTMLElement = createEl('h2', 'card-text')

     const spin: any | null = document.querySelector('.spinner-border')

    imagem.src = item['Poster']
    titulo.innerHTML = item['Title']


     cardBody.append(titulo)
     card.append(imagem)
     card.append(cardBody)

    card.addEventListener('click', () => preencherDados(item))

     pai.append(card)
     spin.style.display = 'none';
   }
}

//criar card a partir do alta
function cardAlta(array: any, pai: any):void {
    for(let i = 0; i < 4; i++){
        const card: HTMLElement = createEl('div', 'card')
        const imagem: any = createEl('img','card-img-top')
        const cardBody: HTMLElement = createEl('div','card-body')
        const titulo: HTMLElement = createEl('h2', 'card-text')

        imagem.src = array[i].Poster;
        titulo.innerHTML = array[i].Title

        cardBody.append(titulo)
        card.append(imagem)
        card.append(cardBody)
   
        card.addEventListener('click', () => preencherDados(array[i]))

        pai.append(card)
    }
}




//em alta
function alta(filme: string): void {
    const containerAlta: any = document.querySelector('.cards-alta')
    const todosCards: any[] = containerAlta.querySelectorAll('.card')

    for(const t of todosCards){
        t.remove()
    }


    requisicao(`https://www.omdbapi.com/?s=${filme}&apikey=${apiKey}`)
    .then(data => cardAlta(data, containerAlta))
}

function preencherDados(item: string): void{
    const x: any = document.getElementById('windown')
    x.classList.toggle('active')

    const v: any = document.querySelector('.voltar')
    v.addEventListener('click', () => x.classList.remove('active'))

    const wImagem: any = document.querySelector('#windown .flex .card img')
    wImagem.src = item['Poster']

    const wTitulo: any = document.querySelector('#windown .flex .card .card-body h2')
    wTitulo.innerHTML = item['Title']

}









// ================= event ==========

altaHarry.addEventListener('click', () => {
    const op: any = document.querySelectorAll('.nav-alta .op')

    for(const o of op){
        o.classList.remove('check')
    }

    altaHarry.classList.add('check')
    alta('harry')
} )

altaMarvel.addEventListener('click', () => {
    const op: any = document.querySelectorAll('.nav-alta .op')

    for(const o of op){
        o.classList.remove('check')
    }

    altaMarvel.classList.add('check')
    alta('marvel')
} )

altaStar.addEventListener('click', () => {
    const op: any = document.querySelectorAll('.nav-alta .op')

    for(const o of op){
        o.classList.remove('check')
    }

    altaStar.classList.add('check')

    alta('star')
} )

altaAnime.addEventListener('click', () => {
    const op: any = document.querySelectorAll('.nav-alta .op')

    for(const o of op){
        o.classList.remove('check')
    }

    altaAnime.classList.add('check')
    alta('anime')
} )

altaDisney.addEventListener('click', () => {
    const op: any = document.querySelectorAll('.nav-alta .op')

    for(const o of op){
        o.classList.remove('check')
    }

    altaDisney.classList.add('check')
    alta('World of Disney')
} )

btnPesquisar.addEventListener('click', () => {
    const inputPesquisar: any = document.querySelector('.form-control')
    const valor: string = inputPesquisar.value

    requisicao(`https://www.omdbapi.com/?s=${valor}&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())

})

acao.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='acao'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())

})

terror.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='terror'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())
})

romance.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='romance'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())
})

comedia.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='comedia'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())
})

document.addEventListener('click', ({target}: any): void => {
    

})

alta('anime')