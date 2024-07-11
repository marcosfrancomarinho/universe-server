import express, { Express } from "express";
import cors from "cors";
import create from "./router/create";
import search from "./router/search";

// Inicializa a aplicação Express
const app: Express = express();

// Define a porta do servidor com fallback para 3000 se não definido no ambiente
const PORT: number = parseInt(process.env.PORT ?? '3000', 10);

// Middleware para habilitar CORS
app.use(cors());

// Middleware para habilitar o parsing de JSON no corpo das requisições
app.use(express.json());

// Define a rota para criação de planetas
app.use('/create', create);

// Define a rota para busca de planetas
app.use('/search', search);

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Server online on port ${PORT}`);
});
 