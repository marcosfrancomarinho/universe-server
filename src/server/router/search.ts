import express, { Router, Request, Response } from "express";
import { CheckError } from "../../database/validate";
import { SelectDB } from "../../database/select";
import { iSearchPlanets, iSelectPlanets } from "../../database/interfaces";

// Inicializa o roteador do Express
const search: Router = express.Router();

// Inicializa o validador
const check: CheckError.Validate = new CheckError.Validate();

// Extrai os métodos de busca do SelectDB
const { searchPlanetsID, searchPlanetsCode, searchPlanetsName } = SelectDB;

/**
 * Classe responsável por selecionar planetas com base em diferentes critérios.
 */
class SelectPlanets implements iSelectPlanets {
    /**
     * Seleciona um planeta pelo ID.
     * @param id - ID do planeta.
     * @param res - Objeto de resposta do Express.
     */
    public async selectID(id: number, res: Response): Promise<void> {
        check.hasID(id);
        const response: iSearchPlanets = await searchPlanetsID(id);
        this.sendResponse(res, response);
    }

    /**
     * Seleciona um planeta pelo código.
     * @param code - Código do planeta.
     * @param res - Objeto de resposta do Express.
     */
    public async selectCode(code: string, res: Response): Promise<void> {
        check.hasCode(code);
        const response: iSearchPlanets = await searchPlanetsCode(code);
        this.sendResponse(res, response);
    }

    /**
     * Seleciona planetas pelo nome.
     * @param name - Nome do planeta.
     * @param res - Objeto de resposta do Express.
     */
    public async selectName(name: string, res: Response): Promise<void> {
        check.hasName(name);
        const response: iSearchPlanets[] = await searchPlanetsName(name);
        this.sendResponse(res, response);
    }

    /**
     * Envia a resposta de sucesso.
     * @param res - Objeto de resposta do Express.
     * @param response - Dados do planeta.
     */
    private sendResponse(res: Response, response: iSearchPlanets | iSearchPlanets[]): void {
        res.status(200).json(response);
    }
}

// Define a rota POST para buscar planetas
search.post('/', async (req: Request, res: Response) => {
    try {
        const select: iSelectPlanets = new SelectPlanets();
        const { id, code, name } = req.query as {
            id: unknown;
            code: unknown;
            name: unknown;
        } as {
            id: number;
            code: string;
            name: string;
        };

        // Verifica se pelo menos um dos parâmetros foi fornecido
        check.checkResponse(id, code, name);

        // Busca o planeta com base nos parâmetros fornecidos
        if (id) return await select.selectID(id, res);
        if (code) return await select.selectCode(code, res);
        if (name) return await select.selectName(name, res);

    } catch (error) {
        // Envia a mensagem de erro em caso de exceção
        res.status(400).json({ error: (error as Error).message });
    }
});

export default search;

