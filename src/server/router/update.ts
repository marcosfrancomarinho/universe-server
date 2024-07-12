import express, { Router, Response, Request } from "express";
import { CheckError } from "../../database/validate";
import { AlterDB } from "../../database/alter";
import { iSatellites, iUpdatePlanets, iResponse } from "../../database/interfaces";

const update: Router = express.Router();
const check: CheckError.Validate = new CheckError.Validate();
const { updateCode, updateName, updateSatellite } = AlterDB;

/**
 * Classe responsável por atualizar planetas com base em diferentes critérios.
 */
class UpdatePlanets implements iUpdatePlanets {
    /**
     * Atualiza o nome de um planeta.
     * @param id - ID do planeta.
     * @param name - Novo nome do planeta.
     * @param res - Objeto de resposta do Express.
     */
    public async alterName(id: number, name: string, res: Response): Promise<void> {
        check.hasIdAndName(id, name);
        const response = await updateName(id, name);
        this.sendResponse(res, response);
    }

    /**
     * Atualiza o código de um planeta.
     * @param id - ID do planeta.
     * @param code - Novo código do planeta.
     * @param res - Objeto de resposta do Express.
     */
    public async alterCode(id: number, code: string, res: Response): Promise<void> {
        check.checkIdCode(id, code);
        const response = await updateCode(id, code);
        this.sendResponse(res, response);
    }

    /**
     * Atualiza as informações de satélites de um planeta.
     * @param id - ID do planeta.
     * @param satellites - Novas informações de satélites.
     * @param res - Objeto de resposta do Express.
     */
    public async alterSatellites(id: number, satellites: iSatellites, res: Response): Promise<void> {
        check.hasIdAndSatellites(id, satellites);
        const response = await updateSatellite(id, satellites);
        this.sendResponse(res, response);
    }

    /**
     * Envia a resposta da atualização.
     * @param res - Objeto de resposta do Express.
     * @param response - Resposta da operação de atualização.
     */
    private sendResponse(res: Response, response: iResponse): void {
        res.status(200).json(response);
    }
}

/**
 * Define a rota PUT para atualizar planetas.
 * 
 * As requisições enviadas para esta rota serão tratadas pela classe `UpdatePlanets`.
 */
update.put('/', async (req: Request, res: Response) => {
    try {
        const updatePlanets = new UpdatePlanets();
        const { id, name, code, satellites } = req.body as { id: number, name: string, code: string, satellites: iSatellites };

        // Verifica se todos os dados necessários foram fornecidos
        check.checkAllDatas(code, name, satellites);

        // Chama os métodos de atualização apropriados com base nos dados fornecidos
        if (name) return await updatePlanets.alterName(id, name, res);
        if (code) return await updatePlanets.alterCode(id, code, res);
        if (satellites) return await updatePlanets.alterSatellites(id, satellites, res);
    } catch (error) {
        // Envia a mensagem de erro em caso de exceção
        res.status(400).json({ error: (error as Error).message } as { error: string });
    }
});

export default update;
