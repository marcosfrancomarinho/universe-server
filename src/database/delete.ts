import { iResponse } from "./interfaces";
import Planets from "./model";
import { CheckError } from "./validate";

const check = new CheckError.Validate();

/**
 * Namespace para operações de exclusão no banco de dados.
 */
export namespace DeleteDB {
    /**
     * Função assíncrona para deletar um planeta do banco de dados pelo ID.
     * 
     * @param id - ID do planeta a ser deletado.
     * @returns Uma promessa que resolve para um objeto de resposta indicando o sucesso da operação.
     */
    export async function deletePlanetsID(id: number): Promise<iResponse> {
        try {
            // Verifica se o ID fornecido é válido.
            check.hasID(id);

            // Deleta o planeta do banco de dados pelo ID.
            const dataDelete = await Planets.destroy({
                where: { id: id }
            });

            // Verifica se algum registro foi deletado.
            check.itsVoid(dataDelete);

            // Retorna uma resposta indicando o sucesso da operação.
            return {
                message: 'Planeta deletado com sucesso',
                done: true,
            } as iResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Função assíncrona para deletar um planeta do banco de dados pelo código.
     * 
     * @param code - Código do planeta a ser deletado.
     * @returns Uma promessa que resolve para um objeto de resposta indicando o sucesso da operação.
     */
    export async function deletePlanetsCode(code: string): Promise<iResponse> {
        try {
            // Verifica se o código fornecido é válido.
            check.hasCode(code);

            // Deleta o planeta do banco de dados pelo código.
            const dataDelete = await Planets.destroy({
                where: { code: code.trim().toUpperCase() }
            });

            // Verifica se algum registro foi deletado.
            check.itsVoid(dataDelete);

            // Retorna uma resposta indicando o sucesso da operação.
            return {
                message: 'Planeta deletado com sucesso',
                done: true,
            } as iResponse;
        } catch (error) {
            throw error;
        }
    }
}
