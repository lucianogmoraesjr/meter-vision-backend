<h1 align="center" id="title">MeterVision API</h1>

<p align="center"><img src="https://socialify.git.ci/lucianogmoraesjr/meter-vision-backend/image?forks=1&issues=1&language=1&name=1&owner=1&pattern=Solid&stargazers=1&theme=Auto" alt="project-image"></p>

<p id="description">O MeterVision é uma aplicação inovadora projetada o para gerenciamento de leitura de consumo individual de água e gás, utilizando inteligência artificial para extrair medições a partir de fotos de medidores.</p>

<p>As especificações da API podem ser consultadas em: <a href="https://metervision.apidocumentation.com/" target="_blank">https://metervision.apidocumentation.com/</a></p>

<h2>🧐 Funcionalidades</h2>

Aqui estão algumas das melhores funcionalidades do projeto:

*   Upload de imagem
*   Extração da medição
*   Identificação do valor extraído com Google Gemini
*   Confirmação do valor extraído
*   Listagem de medições por código de cliente
*   Filtros de listagem por água ou gás

### 🧭 API Endpoints
| Methods | Endpoints | Action |
| --- | --- | --- |
| `GET` | /docs | Documentação da API com Swagger |
| `POST` | / | Criação de medição |
| `GET` | /:customerCode/list?measure_type= | Listagem de medições por cliente com os filtros 'WATER' ou 'GAS' opcionais |
| `PATCH` | /confirm | Confirmação do valor extraído da imagem |

<h2>🛠️ Installation Steps:</h2>

### Configurando o ambiente

Para iniciar a aplicação localmente é necessário ter [Docker](https://docker.com) previamente instalado.

### Environment Variables

O arquivo `.env.example` contém exemplo da única variável necessária, `GEMINI_API_KEY`, que é a sua chave da API do Google Gemini. Basta copiar e alterar o nome para `.env` e preencher com a sua key:

```bash
$ cp .env.example .env
```
### Docker Compose

A aplicação precisa de um banco de dados [Postgres](https://postgresql.org), com o arquivo `docker-compose.yml` o processo de criação dos containers é automatizado, basta rodar o comando a baixo para fazer o build da aplicação:

```bash
$ docker compose up --build
```
Por padrão, a aplicação está rodando no endereço: `http://localhost:3333`

Acesse `http://localhost:3333/docs` para a documentação com Swagger.

<h2>💻 Built with</h2>

Tecnologias utilizadas no projeto:

* [![Node.js][node]][node-url]
* [![TypeScript][typescript]][typescript-url]
* [![Fastify][fastify]][fastify-url]
* [![Prisma][prisma]][prisma-url]
* [![Zod][zod]][zod-url]

<!-- MARKDOWN LINKS & IMAGES -->
[node]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=%23339933&labelColor=20232A
[node-url]: https://nodejs.org/en
[TypeScript]: https://img.shields.io/badge/TypeScript-20232A?style=for-the-badge&logo=TypeScript&logoColor=%233178C6&labelColor=20232A
[typescript-url]: https://www.typescriptlang.org/
[fastify]: https://img.shields.io/badge/Fastify-20232A?style=for-the-badge&logo=fastify&labelColor=20232A
[fastify-url]: https://fastify.dev/
[prisma]: https://img.shields.io/badge/Prisma-20232A?style=for-the-badge&logo=prisma&logoColor=fff&labelColor=20232A
[prisma-url]: https://www.prisma.io/
[zod]: https://img.shields.io/badge/Zod%20-%20%2320232A?style=for-the-badge&logo=zod&labelColor=20232A
[zod-url]: https://zod.dev/
