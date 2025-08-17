Épico: Configuração e Estrutura do Projeto

Task: Inicializar um novo projeto React com Vite.
Task: Configurar o Tailwind CSS (versão 4) para estilização.
Task: Estruturar o projeto com pastas para componentes, páginas, serviços, etc.
Task: Criar o repositório no GitHub e configurar o fluxo de trabalho (Gitflow).


Épico: Funcionalidade de Autenticação
Feature: Tela de Login (/)

Task: Criar o componente de página de login.
Task: Adicionar campos de input para e-mail e senha.
Task: Implementar validação para e-mail válido e senha com 8 ou mais caracteres.
Task: Desabilitar o botão de login se o formulário for inválido.
Task: Adicionar um botão de "submeter" para realizar o login.


Épico: Funcionalidade de Produtos
Feature: Tela Principal de Produtos (/products)

Task: Criar o componente da página principal de produtos.
Task: Realizar a chamada à API de produtos (https://fakestoreapi.com/products) ao inicializar a página.
Task: Renderizar uma lista de produtos com imagem, nome e valor.
Task: Implementar um componente de filtro por categoria.
Task: Adicionar um botão "Adicionar ao carrinho" para cada produto.
Task: Implementar a lógica para adicionar e remover a quantidade de itens no carrinho a partir de cada card de produto.
Task: Exibir o valor total dos itens do carrinho na tela.
Task: Criar um botão "Checkout" que redireciona para a rota /checkout.
Task: Adicionar a funcionalidade de redirecionar para a tela de detalhes do produto ao clicar no card. A URL deve incluir o ID do produto, como 
/products/:id.


Feature: Tela de Detalhes do Produto (/products/:id)

Task: Criar o componente da página de detalhes do produto.
Task: Extrair o ID do produto da URL.
Task: Fazer uma requisição à API específica do produto (https://fakestoreapi.com/products/1) usando o ID.
Task: Exibir a imagem, nome, valor, descrição e avaliação do produto.


Épico: Funcionalidade de Carrinho e Checkout
Feature: Carrinho de Compras

Task: Criar um estado global para o carrinho de compras, garantindo que seja persistente durante a navegação do usuário.
Task: Implementar a lógica de cálculo do preço total do carrinho, atualizando-o a cada adição ou remoção de itens.


Feature: Tela de Checkout (/checkout)

Task: Criar o componente da página de checkout.
Task: Exibir a lista de itens do carrinho com valor unitário, quantidade e valor total.
Task: Permitir a remoção de itens do carrinho nesta tela.
Task: Atualizar o valor total da venda quando um item é removido.