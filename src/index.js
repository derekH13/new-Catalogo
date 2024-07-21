"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = 'fd937c0a';
let pesquisa = 'joker';
const paiGrid = document.querySelector('.grid');
const altaMarvel = document.querySelector('.marvel');
const altaHarry = document.querySelector('.harry');
const altaStar = document.querySelector('.star');
const altaAnime = document.querySelector('.anime');
const altaDisney = document.querySelector('.disney');
const btnPesquisar = document.querySelector('.botao');
const acao = document.querySelector('.acao');
const comedia = document.querySelector('.comedia');
const romance = document.querySelector('.romance');
const terror = document.querySelector('.terror');
function requisicao(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            //confirmando se a requisição deu certo
            if (!response.ok) {
                throw new Error('deu ruim');
            }
            const data = yield response.json();
            return data.Search;
        }
        catch (error) {
            throw new Error(`Então ${error}`);
        }
    });
}
requisicao(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
    .then(data => card(data, paiGrid))
    .catch(error => console.error());
//criando elemento e definindo classes
function createEl(div, classe) {
    const d = document.createElement(div);
    const classes = classe.split(' ');
    for (const c of classes) {
        d.classList.add(c);
    }
    return d;
}
//criar card a partir da pesquisa
function card(array, pai) {
    if (!paiGrid)
        return;
    //limpa o catalogo
    const c = paiGrid.querySelectorAll('.card');
    for (const item of c) {
        item.remove();
    }
    //acresenta
    for (const item of array) {
        const card = createEl('div', 'card');
        const favorito = createEl('div', "favorito");
        const imagem = createEl('img', 'card-img-top');
        const cardBody = createEl('div', 'card-body');
        const titulo = createEl('h2', 'card-text');
        const spin = document.querySelector('.spinner-border');
        favorito.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-heart' viewBox='0 0 16 16'><path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15'/></svg>";
        imagem.src = item['Poster'];
        titulo.innerHTML = item['Title'];
        card.append(favorito);
        cardBody.append(titulo);
        card.append(imagem);
        card.append(cardBody);
        card.addEventListener('click', () => preencherDados(item));
        pai.append(card);
        spin.style.display = 'none';
    }
}
//criar card a partir do alta
function cardAlta(array, pai) {
    for (let i = 0; i < 4; i++) {
        const card = createEl('div', 'card');
        const favorito = createEl('div', "favorito");
        const imagem = createEl('img', 'card-img-top');
        const cardBody = createEl('div', 'card-body');
        const titulo = createEl('h2', 'card-text');
        imagem.src = array[i].Poster;
        titulo.innerHTML = array[i].Title;
        favorito.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-heart' viewBox='0 0 16 16'><path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15'/></svg>";
        card.append(favorito);
        cardBody.append(titulo);
        card.append(imagem);
        card.append(cardBody);
        card.addEventListener('click', () => preencherDados(array[i]));
        pai.append(card);
    }
}
//em alta
function alta(filme) {
    const containerAlta = document.querySelector('.cards-alta');
    if (!containerAlta)
        return;
    const todosCards = containerAlta.querySelectorAll('.card');
    for (const t of todosCards) {
        t.remove();
    }
    requisicao(`https://www.omdbapi.com/?s=${filme}&apikey=${apiKey}`)
        .then(data => cardAlta(data, containerAlta));
}
function preencherDados(item) {
    const x = document.getElementById('windown');
    const wImagem = document.querySelector('#windown .flex .card img');
    const v = document.querySelector('.voltar');
    if (!x)
        return;
    if (!wImagem)
        return;
    if (!v)
        return;
    x.classList.toggle('active');
    wImagem.src = item.Poster;
    v.addEventListener('click', () => x.classList.remove('active'));
    const wTitulo = document.querySelector('#windown .flex .card .card-body h2');
    wTitulo.innerHTML = item['Title'];
}
// ================= event ==========
if (altaHarry) {
    altaHarry.addEventListener('click', () => {
        const op = document.querySelectorAll('.nav-alta .op');
        for (const o of op) {
            o.classList.remove('check');
        }
        altaHarry.classList.add('check');
        alta('harry');
    });
}
if (altaMarvel) {
    altaMarvel.addEventListener('click', () => {
        const op = document.querySelectorAll('.nav-alta .op');
        for (const o of op) {
            o.classList.remove('check');
        }
        altaMarvel.classList.add('check');
        alta('marvel');
    });
}
if (altaStar) {
    altaStar.addEventListener('click', () => {
        const op = document.querySelectorAll('.nav-alta .op');
        for (const o of op) {
            o.classList.remove('check');
        }
        altaStar.classList.add('check');
        alta('star');
    });
}
if (altaAnime) {
    altaAnime.addEventListener('click', () => {
        const op = document.querySelectorAll('.nav-alta .op');
        for (const o of op) {
            o.classList.remove('check');
        }
        altaAnime.classList.add('check');
        alta('anime');
    });
}
if (altaDisney) {
    altaDisney.addEventListener('click', () => {
        const op = document.querySelectorAll('.nav-alta .op');
        for (const o of op) {
            o.classList.remove('check');
        }
        altaDisney.classList.add('check');
        alta('World of Disney');
    });
}
if (btnPesquisar) {
    btnPesquisar.addEventListener('click', () => {
        const inputPesquisar = document.querySelector('.form-control');
        if (!inputPesquisar)
            return;
        const valor = inputPesquisar.value;
        requisicao(`https://www.omdbapi.com/?s=${valor}&apikey=${apiKey}`)
            .then(data => card(data, paiGrid))
            .catch(error => console.error());
    });
}
acao.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='acao'&apikey=${apiKey}`)
        .then(data => card(data, paiGrid))
        .catch(error => console.error());
});
terror.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='terror'&apikey=${apiKey}`)
        .then(data => card(data, paiGrid))
        .catch(error => console.error());
});
romance.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='romance'&apikey=${apiKey}`)
        .then(data => card(data, paiGrid))
        .catch(error => console.error());
});
comedia.addEventListener('click', () => {
    requisicao(`https://www.omdbapi.com/?s='comedia'&apikey=${apiKey}`)
        .then(data => card(data, paiGrid))
        .catch(error => console.error());
});
document.addEventListener('click', ({ target }) => {
});
alta('anime');
console.log('s');
