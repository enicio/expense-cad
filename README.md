### Introdução
Este projeto implementa uma API REST completa para gerenciamento de despesas pessoais, utilizando Node.js, Fastify. 

### A API oferece as seguintes funcionalidades:

#### Autenticação de Usuário
Login com validação de credenciais (usuário e senha).
Geração de token JWT para autenticação em requests subsequentes.
#### CRUD de Despesas
Create:

- Cadastro de nova despesa com os campos:
- Descrição (máximo 191 caracteres).
- Data (não pode ser futura).
- Valor (não negativo).
- Usuário (ID do usuário logado).
- Validação dos dados informados.


#### Consulta de despesas:
- Todas as despesas do usuário logado.
- Validação do ID da despesa para consulta.
- Retorno das despesas consultadas.

#### Tecnologias Utilizadas
- Node.js
- Fastify
- Biblioteca de autenticação (JWT, Passport)

#### Ferramentas de teste 
- Jest


### Para Iniciar
Clone o repositório.
```bash
git clone git@github.com:enicio/expense-cad.git
```
A maneira mais rápida de executar esse projeto é atraves do docker.
```bash
docker compose up
```
#### Alternativa para execução do projeto

Instale as dependências
```bash
npm install
```
Realize o build do projeto
```bash
npm run build
```

Inicie o projeto
```bash
npm run start
```

Teste a API utilizando ferramentas como Postman ou Insomnia.

Execução dos testes
```bash
npm run tests
```




#### Exemplo de Uso
#### Criar o usuário:

POST http://localhost:3333/users

Corpo da requisição
```json
{
	"name": "Mathilda",
	"email": "mathilda@chata.com",
	"password": "123456"

}
```
#### Autenticação:

POST http://localhost:3333/users/authenticate

```json
{
	"email": "mathilda@chata.com",
	"password": "123456"
}
```
* Essa etapa responde com um token de autenticação que dever ser usado nas rotas de criação de despesas e buscar despesas

#### Criar despesa

* Necessário informar o token de autenticação

POST http://localhost:3333/expense

```json
{
  "amount": 12000,
  "description": "comoprar uma kombi",
  "date": "2021-10-10"
}
```

#### Buscar despesas
* Necessário informar o token de autenticação
GET http://localhost:3333/expense







Contribuições
Sinta-se à vontade para contribuir com este projeto!