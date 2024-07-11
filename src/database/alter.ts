import Planets from "./model";
import { CheckError } from "./validate";
import { iResponse, iSatellites } from "./interfaces";

const check = new CheckError.Validate();

/**
 * Namespace para operações de alteração no banco de dados.
 */
export namespace AlterDB {
    /**
     * Função assíncrona para atualizar o nome de um planeta no banco de dados pelo ID.
     * 
     * @param id - ID do planeta a ser atualizado.
     * @param name - Novo nome do planeta.
     * @returns Uma promessa que resolve para um objeto de resposta indicando o sucesso da operação.
     */
    export async function updateName(id: number, name: string): Promise<iResponse> {
        try {
            // Verifica se o ID e o nome fornecidos são válidos.
            check.hasIdAndName(id, name);

            // Atualiza o nome do planeta no banco de dados.
            const alter = await Planets.update(
                { name: name.trim() },
                { where: { id: id } }
            );

            // Verifica se algum registro foi alterado.
            check.itsVoid(alter);

            // Retorna uma resposta indicando o sucesso da operação.
            return {
                message: `O nome do planeta foi alterado com sucesso`,
                done: true
            } as iResponse;
        } catch (error) {
            check.uniquePlanets(error);
            throw error;
        }
    }

    /**
     * Função assíncrona para atualizar o código de um planeta no banco de dados pelo ID.
     * 
     * @param id - ID do planeta a ser atualizado.
     * @param code - Novo código do planeta.
     * @returns Uma promessa que resolve para um objeto de resposta indicando o sucesso da operação.
     */
    export async function updateCode(id: number, code: string): Promise<iResponse> {
        try {
            // Verifica se o ID e o código fornecidos são válidos.
            check.hasIdAndCode(id, code);

            // Atualiza o código do planeta no banco de dados.
            const alter = await Planets.update(
                { code: code.trim() },
                { where: { id: id } }
            );

            // Verifica se algum registro foi alterado.
            check.itsVoid(alter);

            // Retorna uma resposta indicando o sucesso da operação.
            return {
                message: `O código do planeta foi alterado com sucesso`,
                done: true
            } as iResponse;
        } catch (error) {
            check.uniquePlanets(error);
            throw error;
        }
    }

    /**
     * Função assíncrona para atualizar os satélites de um planeta no banco de dados pelo ID.
     * 
     * @param id - ID do planeta a ser atualizado.
     * @param satellites - Novo objeto de satélites do planeta.
     * @returns Uma promessa que resolve para um objeto de resposta indicando o sucesso da operação.
     */
    export async function updateSatellite(id: number, satellites: iSatellites): Promise<iResponse> {
        try {
            // Verifica se o ID e os satélites fornecidos são válidos.
            check.hasIdAndSatellites(id, satellites);

            // Atualiza os satélites do planeta no banco de dados.
            const alter = await Planets.update(
                { satellites: satellites },
                { where: { id: id } }
            );

            // Verifica se algum registro foi alterado.
            check.itsVoid(alter);

            // Retorna uma resposta indicando o sucesso da operação.
            return {
                message: `Os satélites do planeta foram alterados com sucesso`,
                done: true
            } as iResponse;
        } catch (error) {
            check.uniquePlanets(error);
            throw error;
        }
    }
}
