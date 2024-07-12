import express, { Router, Request, Response } from "express";
import { CheckError } from "../../database/validate";
import { DeleteDB } from "../../database/delete";
const remove: Router = express.Router();
const check: CheckError.Validate = new CheckError.Validate();
const { deletePlanetsID, deletePlanetsCode } = DeleteDB;


remove.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.query as { id: unknown } as { id: number };
        check.hasID(id);
        const response = await deletePlanetsID(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message } as { error: string });
    }
})
export default remove;