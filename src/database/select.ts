import { Op } from "sequelize";
import Planets from "./model";
import { CheckError } from "./validate";
import { iSearchPlanets } from "./interfaces";

const check: CheckError.Validate = new CheckError.Validate();

/**
 * Namespace SelectDB contém funções para buscar informações de planetas no banco de dados.
 */
export namespace SelectDB {
    const attr: Array<string> = [
        'id', 'name',
        'code', 'satellites'
    ];

    /**
     * Busca um planeta pelo ID.
     * @param id O ID do planeta.
     * @returns O planeta encontrado.
     * @throws Error Se o ID for inválido ou se o planeta não for encontrado.
     */
    export async function searchPlanetsID(id: number): Promise<iSearchPlanets> {
        try {
            check.hasID(id);
            const response: unknown = await Planets.findByPk(id, {
                raw: true,
                attributes: attr
            });
            check.itsNull(response as Array<iSearchPlanets | void> | null);
            return response as iSearchPlanets;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Busca planetas pelo nome.
     * @param name O nome do planeta.
     * @returns Uma lista de planetas encontrados.
     * @throws Error Se o nome for inválido ou se nenhum planeta for encontrado.
     */
    export async function searchPlanetsName(name: string): Promise<Array<iSearchPlanets>> {
        try {
            check.hasName(name);
            const response: unknown = await Planets.findAll({
                where: {
                    name: { [Op.like]: `%${name.trim().toLowerCase()}%` }
                },
                attributes: attr,
                raw: true
            });
            check.itsNull(response as Array<iSearchPlanets | void> | null);
            return response as Array<iSearchPlanets>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Busca um planeta pelo código.
     * @param code O código do planeta.
     * @returns O planeta encontrado.
     * @throws Error Se o código for inválido ou se o planeta não for encontrado.
     */
    export async function searchPlanetsCode(code: string): Promise<iSearchPlanets> {
        try {
            check.hasCode(code);
            const response: unknown = await Planets.findOne({
                where: {
                    code: code.trim().toUpperCase()
                },
                attributes: attr,
                raw: true
            });
            check.itsNull(response as Array<iSearchPlanets | void> | null);
            return response as iSearchPlanets;
        } catch (error) {
            throw error;
        }
    }
}
