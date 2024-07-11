import Planets from "./model";
import { CheckError } from "./validate";
import { iSatellites, iResponse } from "./interfaces";

const check: CheckError.Validate = new CheckError.Validate();

/**
 * Namespace para operações de inserção no banco de dados.
 */
export namespace InsertDB {
    /**
     * Função assíncrona para criar um planeta no banco de dados.
     * 
     * @param name - Nome do planeta a ser criado.
     * @param code - Código do planeta a ser criado.
     * @param satellites - Informações sobre os satélites do planeta.
     * @returns Uma promessa que resolve para um objeto de resposta indicando o sucesso da operação.
     */
    export async function createPlanets(name: string, code: string, satellites: iSatellites): Promise<iResponse> {
        try {
            // Verifica se os dados fornecidos são válidos.
            check.verificationDatas(name, code, satellites);

            // Cria um novo registro de planeta no banco de dados.
            await Planets.create({
                name: name,
                code: code,
                satellites: satellites
            });

            // Retorna uma resposta indicando o sucesso da operação.
            const response: iResponse = {
                message: `Planeta ${name} foi criado com sucesso`,
                done: true
            };
            return response;
        } catch (error: any) {
            // Verifica se houve um erro de duplicidade de planetas.
            check.uniquePlanets(error);
            throw error;
        }
    }
}
