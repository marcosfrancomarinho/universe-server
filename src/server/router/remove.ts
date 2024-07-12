import express, { Router, Request, Response } from "express";
import { CheckError } from "../../database/validate";
import { DeleteDB } from "../../database/delete";
import { iRemovePlanets, iResponse } from "../../database/interfaces";

// Inicializa o roteador do Express
const remove: Router = express.Router();

// Inicializa o validador
const check: CheckError.Validate = new CheckError.Validate();

// Extrai os métodos de deleção do DeleteDB
const { deletePlanetsID, deletePlanetsCode } = DeleteDB;

/**
 * Classe responsável por remover planetas com base em diferentes critérios.
 */
class RemovePlanets implements iRemovePlanets {
    /**
     * Remove um planeta pelo ID.
     * @param id - ID do planeta a ser removido.
     * @param res - Objeto de resposta do Express.
     */
    public async removePlanetsId(id: number, res: Response): Promise<void> {
        check.hasID(id);
        const response = await deletePlanetsID(id);
        this.sendResponse(res, response);
    }

    /**
     * Remove um planeta pelo código.
     * @param code - Código do planeta a ser removido.
     * @param res - Objeto de resposta do Express.
     */
    public async removePlanetsCode(code: string, res: Response): Promise<void> {
        check.hasCode(code);
        const response = await deletePlanetsCode(code);
        this.sendResponse(res, response);
    }

    /**
     * Envia a resposta da remoção.
     * @param res - Objeto de resposta do Express.
     * @param response - Resposta da operação de remoção.
     */
    private sendResponse(res: Response, response: iResponse): void {
        res.status(200).json(response);
    }
}

// Define a rota DELETE para remover planetas
remove.delete('/', async (req: Request, res: Response) => {
    try {
        const removePlanets = new RemovePlanets();
        const { id, code } = req.query as { id: unknown, code: unknown } as { id: number, code: string };

        check.checkIdCode(id, code);
        // Verifica se pelo menos um dos parâmetros foi fornecido
        if (id) return await removePlanets.removePlanetsId(id, res);
        if (code) return await removePlanets.removePlanetsCode(code, res);
    } catch (error) {
        // Envia a mensagem de erro em caso de exceção
        res.status(400).json({ error: (error as Error).message } as { error: string });
    }
});

export default remove;