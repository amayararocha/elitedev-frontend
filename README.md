# Elitedev Frontend

Este repositório contém o front-end da aplicação de Lista de Filmes, desenvolvida com Angular e estilizada com Tailwind CSS. A aplicação permite aos usuários pesquisar e salvar filmes em uma lista de favoritos, integrando-se com o backend para exibir detalhes dos filmes.

## Requisitos Funcionais

### Front-End

- **Interface de Pesquisa de Filmes**: Permite aos usuários buscar filmes pela API TMDb.
- **Exibição de Detalhes dos Filmes**: Mostra informações detalhadas dos filmes, incluindo a nota do TMDb.
- **Gerenciamento da Lista de Filmes Favoritos**: Adiciona e remove filmes da lista de favoritos.

## Tecnologias Utilizadas

- **Angular**: Framework para desenvolvimento de front-end.
- **Tailwind CSS**: Framework para estilização.

## Estrutura do Projeto
```
elitedev-frontend/
│
├── src/
│   ├── app/
│   │   ├── componentes/
│   │   │   ├── favorites/          # Componentes relacionados à lista de favoritos
│   │   │   ├── footer/             # Componente de rodapé
│   │   │   ├── home/               # Componente da página inicial
│   │   │   ├── login/              # Componente de login
│   │   │   ├── movie/              # Componentes relacionados aos filmes
│   │   │   ├── navbar/             # Componente da barra de navegação
│   │   │   └── register/           # Componente de registro
│   │   ├── environment/            # Configurações de ambiente
│   │   ├── service/                # Serviços para interação com APIs
│   │   │   ├── movie.service.ts    # Serviço para gerenciar filmes
│   │   │   └── user.service.ts     # Serviço para gerenciar usuários
│   │   ├── app.component.html      # HTML do componente principal
│   │   ├── app.component.ts        # Lógica do componente principal
│   │   ├── app.config.ts           # Configurações da aplicação
│   │   ├── app.routes.ts           # Configuração das rotas da aplicação
│   │   └── main.ts                 # Arquivo principal da aplicação
```
## Instalação e Execução

1. **Clone o repositório**:

```bash
git clone https://github.com/amayararocha/elitedev-frontend.git
cd elitedev-frontend
```
2. **Instale as dependências**:
```
npm install
```
3. **Configuração do Ambiente**:
- Navegue até o arquivo `environment.ts` localizado em `src/environments/`.
- Configure a URL do seu backend local substituindo o valor da variável `apiUrl` com a URL onde o backend está rodando.
4. **Execute a aplicação**:
```
ng serve
```
5. **Acesse a aplicação no navegador**:
```
http://localhost:4200
```
## Considerações Finais

O deploy do front-end foi realizado com sucesso, e a aplicação está acessível conforme esperado. No entanto, a integração com a API do backend não está funcionando corretamente devido a problemas com o deploy do backend, o que impede que a aplicação frontend se conecte à API.

Apesar desse problema de conectividade, você pode visualizar a aplicação online no seguinte link: [Link](https://elitedev-frontend.vercel.app/home). 

### Agradecimentos

A construção desta aplicação foi uma grande oportunidade de aprendizado e aprimoramento de habilidades em desenvolvimento front-end, e cada desafio encontrado ajudou a crescer como desenvolvedora.

Obrigado por conferir este projeto!

## Demonstração
**Vídeo de Demonstração: [Aqui](https://youtu.be/WsBcRP4Mr2U).**
