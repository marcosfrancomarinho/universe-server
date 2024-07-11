import express, { Router, Request, Response } from "express";
import { InsertDB } from "../../database/insert";
import { CheckError } from "../../database/validate";
import { iResponse, iSearchPlanets } from "../../database/interfaces";

// Inicializa o roteador do Express
const create: Router = express.Router();

// Inicializa o validador
const check: CheckError.Validate = new CheckError.Validate();

// Extrai o método de criação de planetas do InsertDB
const { createPlanets } = InsertDB;

/**
 * Rota para criação de planetas.
 */
create.post('/', async (req: Request, res: Response) => {
    try {
        // Extrai dados do corpo da requisição
        const { name, code, satellites } = req.body as iSearchPlanets;

        // Valida os dados fornecidos
        check.verificationDatas(name, code, satellites);

        // Cria o planeta com os dados fornecidos
        const response: iResponse = await createPlanets(name, code, satellites);

        // Envia a resposta de sucesso
        res.status(200).json(response);
    } catch (error) {
        // Envia a mensagem de erro em caso de exceção
        res.status(400).json({ error: (error as Error).message } as { error: string });
    }
});

export default create;
