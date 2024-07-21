const apiKey: string = 'fd937c0a'
let pesquisa: string = 'serie'
const paiGrid: HTMLElement | null = document.querySelector('.grid')
const altaMarvel: HTMLElement | null = document.querySelector('.marvel')
const altaHarry: HTMLElement | null = document.querySelector('.harry')
const altaStar: HTMLElement | null = document.querySelector('.star')
const altaAnime: HTMLElement | null = document.querySelector('.anime')
const altaDisney: HTMLElement | null = document.querySelector('.disney')
const containerFav: HTMLElement | null = document.querySelector('.container-fav')


const btnPesquisar: HTMLElement | null = document.querySelector('.botao');
const acao: any = document.querySelector('.acao')
const comedia: any = document.querySelector('.comedia')
const romance: any = document.querySelector('.romance')
const terror: any = document.querySelector('.terror')

const todosFav: HTMLElement[] = []

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
function card(array: any, pai: HTMLElement | null):void {
    if(!pai) return
    if(!paiGrid) return

    //limpa o catalogo
    const c: any = paiGrid.querySelectorAll('.card')

    for(const item of c){
        item.remove()
    }


    //acresenta
   for(const item of array){
 

     const card: HTMLElement = createEl('div', 'card')
     const favorito: HTMLElement | null = createEl('div', "favorito")
     const imagem: any = createEl('img','card-img-top')
     const cardBody: HTMLElement = createEl('div','card-body')
     const titulo: HTMLElement = createEl('h2', 'card-text')

     const spin: any | null = document.querySelector('.spinner-border')
     favorito.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='red' class='bi bi-heart-fill' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314'/></svg>"

    imagem.src = item['Poster']
    titulo.innerHTML = item['Title']

     card.append(favorito)
     cardBody.append(titulo)
     card.append(imagem)
     card.append(cardBody)

     favorito.addEventListener('click', ({target}) => addFavorito(target))
    card.addEventListener('click', () => preencherDados(item))

     pai.append(card)
     spin.style.display = 'none';
   }
}

//criar card a partir do alta
function cardAlta(array: any, pai: HTMLElement):void {
    for(let i = 0; i < 4; i++){
        const card: HTMLElement = createEl('div', 'card')
        const favorito: HTMLElement | null = createEl('div', "favorito")
        const imagem: any = createEl('img','card-img-top')
        const cardBody: HTMLElement = createEl('div','card-body')
        const titulo: HTMLElement = createEl('h2', 'card-text')

        imagem.src = array[i].Poster;
        titulo.innerHTML = array[i].Title
        favorito.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='red' class='bi bi-heart-fill' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314'/></svg>"

        card.append(favorito)
        cardBody.append(titulo)
        card.append(imagem)
        card.append(cardBody)
   
        favorito.addEventListener('click', ({target}) => addFavorito(target))
        card.addEventListener('click', () => preencherDados(array[i]))

        pai.append(card)
    }
}




//em alta
function alta(filme: string): void {
    const containerAlta: HTMLElement | null = document.querySelector('.cards-alta')
    if(!containerAlta)return

    const todosCards: NodeListOf<Element> = containerAlta.querySelectorAll('.card')

    for(const t of todosCards){
        t.remove()
    }


    requisicao(`https://www.omdbapi.com/?s=${filme}&apikey=${apiKey}`)
    .then(data => cardAlta(data, containerAlta))
}

function preencherDados(item: dados): void{
    return


    console.log(item)
    const x: HTMLElement | null = document.getElementById('windown')
    const wImagem: HTMLImageElement | null = document.querySelector('#windown .flex .card img')
    const v: HTMLElement | null = document.querySelector('.voltar')

    if(!x)return
    if(!wImagem)return
    if(!v)return

    x.classList.toggle('active')
    wImagem.src = item.Poster
    v.addEventListener('click', () => x.classList.remove('active'))

    const wTitulo: any = document.querySelector('#windown .flex .card .card-body h2')
    wTitulo.innerHTML = item['Title']

}


//adiciona aos favoritos ao clicar
const addFavorito = (e: any): void => {
    if(!e)return
    const p = e.parentElement
    const x = p.parentElement
    const paiEl = x.parentElement
    const tf = paiEl.querySelector('.card-body h2').innerHTML

    buscandoFav(tf)
} 

//buscando os favoritos
const buscandoFav = (pesquisa: string) => {
    requisicao(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(data => mostrandoFav(data))
    .catch(error => console.error())

}

const mostrandoFav = (data: any): void => {
    if(!containerFav)return
    
    const card: HTMLElement = createEl('div', 'card')
    const favorito: HTMLElement | null = createEl('div', "favorito")
    const imagem: any = createEl('img','card-img-top')
    const cardBody: HTMLElement = createEl('div','card-body')
    const titulo: HTMLElement = createEl('h2', 'card-text')

    const spin: HTMLElement | null = containerFav.querySelector('.spinner-border')

    if(spin){
        spin.style.display = 'none'
    }
   
    favorito.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='red' class='bi bi-heart-fill' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314'/></svg>"

   imagem.src = data[0].Poster
   titulo.innerHTML = data[0].Title

    card.append(favorito)
    cardBody.append(titulo)
    card.append(imagem)
    card.append(cardBody)

    favorito.addEventListener('click', ({target}) => addFavorito(target))
    card.addEventListener('click', () => preencherDados(data[0]))

    containerFav.append(card)

}













// ================= event ==========
if(altaHarry){
 altaHarry.addEventListener('click', () => {
    const op = document.querySelectorAll('.nav-alta .op')

    for(const o of op){
        o.classList.remove('check')
    }

    altaHarry.classList.add('check')
    alta('harry')
 } )
}


if(altaMarvel){

altaMarvel.addEventListener('click', () => {
    const op  = document.querySelectorAll('.nav-alta .op')

    for(const o of op){
        o.classList.remove('check')
    }

    altaMarvel.classList.add('check')
    alta('marvel')
} )
}


if(altaStar){
    altaStar.addEventListener('click', () => {
        const op  = document.querySelectorAll('.nav-alta .op')

        for(const o of op){
            o.classList.remove('check')
        }

        altaStar.classList.add('check')

        alta('star')
    } )
}



if(altaAnime){
    altaAnime.addEventListener('click', () => {
        const op = document.querySelectorAll('.nav-alta .op')

        for(const o of op){
            o.classList.remove('check')
        }

        altaAnime.classList.add('check')
        alta('anime')
    } )
}


if(altaDisney){
    altaDisney.addEventListener('click', (): void => {
        const op = document.querySelectorAll('.nav-alta .op')

        for(const o of op){
            o.classList.remove('check')
        }

        altaDisney.classList.add('check')
        alta('World of Disney')
    } )
}




if(btnPesquisar){
    btnPesquisar.addEventListener('click', (): void => {
        const inputPesquisar: HTMLInputElement | null = document.querySelector('.form-control')
        if(!inputPesquisar)return
        const valor: string = inputPesquisar.value

        requisicao(`https://www.omdbapi.com/?s=${valor}&apikey=${apiKey}`)
        .then(data => card(data, paiGrid))
        .catch(error => console.error())

    })
}


acao.addEventListener('click', (): void => {
    requisicao(`https://www.omdbapi.com/?s='acao'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())

})

terror.addEventListener('click', (): void => {
    requisicao(`https://www.omdbapi.com/?s='terror'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())
})

romance.addEventListener('click', (): void => {
    requisicao(`https://www.omdbapi.com/?s='romance'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())
})

comedia.addEventListener('click', (): void => {
    requisicao(`https://www.omdbapi.com/?s='comedia'&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error())
})







alta('anime')

console.log('s')