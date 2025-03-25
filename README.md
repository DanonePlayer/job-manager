# Job Manager 🚀

Gerenciador de vagas de emprego, permitindo cadastro, listagem, edição e exclusão de vagas, com autenticação via JWT.

## 📋 Funcionalidades
✅ Login e autenticação JWT  
✅ Cadastro, listagem, edição e remoção de vagas  
✅ Proteção de rotas  
✅ Logout e controle de sessão  

## 🚀 Tecnologias
- React (com Vite)
- React Router Dom (para navegação)
- Context API (para gerenciamento de estado)
- Axios (para comunicação com a API)
- Styled Components
- JWT Utilizado para autenticação e controle de sessões.

## 📦 Instalação
1. Clone o repositório:  
   ```sh
   git clone https://github.com/DanonePlayer/job-manager.git
   cd job-manager

   
2. Instale as dependências:
   ```sh
   npm install
   npm install react-toastify
   npm install react-router-dom

3. Inicie a aplicação localmente:
   ```sh
   npm run dev

4. Abra seu navegador e acesse: http://localhost:5173/


## 📋 Diferenciais Implementados
- Dockerização: A aplicação está dockerizada, facilitando o deploy e a configuração em diferentes ambientes.


## 🐳 Dockerização

A aplicação foi dockerizada para facilitar a execução e o deploy em diferentes ambientes. Para rodar a aplicação com Docker, siga os passos abaixo:

1. Certifique-se de ter o Docker instalado

   - Caso não tenha o Docker instalado, você pode seguir a documentação oficial para instalá-lo: Instalação do Docker.

2. Construir a imagem Docke:
   Dentro do diretório raiz da aplicação, execute o seguinte comando para construir a imagem Docker:
   ```sh
   docker build -t job-react-app .

3. Rodar o container Docker
   Após a imagem ser construída, execute o seguinte comando para rodar o container:
   ```sh
   docker run -p 80:80 job-manager
Isso fará com que a aplicação seja acessada em http://localhost.
