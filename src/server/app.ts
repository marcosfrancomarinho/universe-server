import express, { Express } from "express";
import cors from "cors";
import create from "./router/create";
import search from "./router/search";
import remove from "./router/remove";
import update from "./router/update"; // Importe o módulo de atualização

// Inicializa a aplicação Express
const app: Express = express();

/**
 * Define a porta do servidor com fallback para 3000 se não definida no ambiente.
 * 
 * A porta é obtida da variável de ambiente `PORT`. Se a variável não estiver definida, 
 * a porta padrão utilizada será 3000.
 */
const PORT: number = parseInt(process.env.PORT ?? '3000', 10);

// Middleware para habilitar CORS
app.use(cors());

// Middleware para habilitar o parsing de JSON no corpo das requisições
app.use(express.json());

/**
 * Define a rota para criação de planetas.
 * 
 * As requisições enviadas para a rota `/create` serão tratadas pelo módulo `create`.
 */
app.use('/create', create);

/**
 * Define a rota para busca de planetas.
 * 
 * As requisições enviadas para a rota `/search` serão tratadas pelo módulo `search`.
 */
app.use('/search', search);

/**
 * Define a rota para remoção de planetas.
 * 
 * As requisições enviadas para a rota `/remove` serão tratadas pelo módulo `remove`.
 */
app.use('/remove', remove);

/**
 * Define a rota para atualização de planetas.
 * 
 * As requisições enviadas para a rota `/update` serão tratadas pelo módulo `update`.
 */
app.use('/update', update);

/**
 * Inicia o servidor na porta definida.
 * 
 * O servidor será iniciado e ficará escutando na porta especificada pela variável `PORT`.
 * Quando o servidor estiver online, uma mensagem será exibida no console.
 */
app.listen(PORT, () => {
    console.log(`Server online on port ${PORT}`);
});
