# movieSearch

Uma aplicação web simples para pesquisar filmes usando a API do The Movie Database (TMDB).

## Funcionalidades

- Pesquisar filmes por título.
- Exibir resultados da pesquisa em uma lista paginada.
- Mostrar um pôster do filme (ou um placeholder se indisponível) e o título de cada filme.
- Navegar entre as páginas de resultados.
- Link para o repositório do Github no rodapé.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript (ES Modules)

## Estrutura do Projeto

```
index.html        # Arquivo HTML principal
css/              # Pasta para arquivos CSS
  style.css       # Estilos gerais
  movie-list.css  # Estilos para a lista de filmes
  movie-card.css  # Estilos para os cards de filmes
img/              # Pasta para imagens
  poster_unavailable.svg # Imagem placeholder para pôsteres
js/               # Pasta para arquivos JavaScript
  app.js          # Lógica principal da aplicação
  api/
    movieAPI.js   # Funções para interagir com a TMDB API
  components/
    movieList.js  # Web component para a lista de filmes
    movieCard.js  # Web component para o card de filme
```

## Como Executar

1. Clone este repositório.
2. Abra o arquivo `index.html` em seu navegador.
3. Digite o nome de um filme na barra de pesquisa e pressione Enter ou clique no botão "Search".

**Observação:** É necessário ter uma chave de API válida do TMDB no arquivo `js/api/movieAPI.js` para que a pesquisa funcione. A chave fornecida neste código é para fins de demonstração e pode ter limitações.

## API Key

A aplicação utiliza a API do The Movie Database. Você precisará de uma chave de API para fazer as requisições.
A chave de API está incluída no arquivo `js/api/movieAPI.js`.

```javascript
// js/api/movieAPI.js
const headers = {
	accept: 'application/json',
	Authorization: 'Bearer SUA_CHAVE_API_AQUI' // Substitua pela sua chave de API
}
```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
