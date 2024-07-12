import express, { Router, Response, Request } from "express";
import { CheckError } from "../../database/validate";
import { AlterDB } from "../../database/alter";
import { iSatellites, iUpdatePlanets, iResponse } from "../../database/interfaces";
const update: Router = express.Router();
const check: CheckError.Validate = new CheckError.Validate();
const { updateCode, updateName, updateSatellite } = AlterDB;

class UpdatePlanets implements iUpdatePlanets {
    public async alterName(id: number, name: string, res: Response): Promise<void> {
        check.hasIdAndName(id, name);
        const response = await updateName(id, name);
        this.sendResponse(res, response);
    }
    public async alterCode(id: number, code: string, res: Response): Promise<void> {
        check.checkIdCode(id, code);
        const response = await updateCode(id, code);
        this.sendResponse(res, response);
    }
    public async alterSatellites(id: number, satellites: iSatellites, res: Response): Promise<void> {
        check.hasIdAndSatellites(id, satellites);
        const response = await updateSatellite(id, satellites);
        this.sendResponse(res, response);
    }
    private sendResponse(res: Response, response: iResponse): void {
        res.status(200).json(response);
    }
}
update.put('/', (req: Request, res: Response) => {
    res.send('teste PUT')
})

export default update;