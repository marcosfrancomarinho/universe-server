import { Response } from "express";

/**
 * Interface para representar a resposta de uma operação.
 */
interface iResponse {
    /**
     * Mensagem indicando o resultado da operação.
     */
    message: string;

    /**
     * Booleano indicando se a operação foi concluída com sucesso.
     */
    done: boolean;
}

/**
 * Interface para representar informações sobre satélites.
 */
interface iSatellites {
    /**
     * Array contendo os nomes dos satélites.
     */
    name: Array<string>;

    /**
     * Número total de satélites.
     */
    amount: number;
}

/**
 * Interface para representar a busca de planetas.
 */
interface iSearchPlanets {
    /**
     * Identificador único do planeta.
     */
    id: number;

    /**
     * Nome do planeta.
     */
    name: string;

    /**
     * Código do planeta.
     */
    code: string;

    /**
     * Informações sobre os satélites do planeta.
     */
    satellites: iSatellites;
}

/**
 * Interface para definir métodos de validação.
 */
interface iValidate {
    /**
     * Valida se o nome foi informado.
     * @param name - Nome a ser validado.
     */
    hasName(name: string): void;

    /**
     * Valida se o código foi informado e possui o tamanho correto.
     * @param code - Código a ser validado.
     */
    hasCode(code: string): void;

    /**
     * Valida se o ID foi informado e é válido.
     * @param id - ID a ser validado.
     */
    hasID(id: number): void;

    /**
     * Valida se as informações sobre satélites foram informadas e são válidas.
     * @param satellites - Informações sobre os satélites a serem validadas.
     */
    hasSatellites(satellites: iSatellites): void;

    /**
     * Valida se os dados do planeta são válidos.
     * @param name - Nome do planeta.
     * @param code - Código do planeta.
     * @param satellites - Informações sobre os satélites do planeta.
     */
    verificationDatas(name: string, code: string, satellites: iSatellites): void;

    /**
     * Valida se há duplicidade de planetas.
     * @param error - Erro a ser verificado.
     */
    uniquePlanets(error: any): void;

    /**
     * Valida se o valor é nulo.
     * @param value - Valor a ser verificado.
     */
    itsNull(value: null | Array<iSearchPlanets | void>): void;

    /**
     * Valida se o ID e o nome foram informados e são válidos.
     * @param id - ID a ser validado.
     * @param name - Nome a ser validado.
     */
    hasIdAndName(id: number, name: string): void;

    /**
     * Valida se o ID e o código foram informados e são válidos.
     * @param id - ID a ser validado.
     * @param code - Código a ser validado.
     */
    hasIdAndCode(id: number, code: string): void;

    /**
     * Valida se o ID e as informações sobre satélites foram informados e são válidos.
     * @param id - ID a ser validado.
     * @param satellites - Informações sobre os satélites a serem validadas.
     */
    hasIdAndSatellites(id: number, satellites: iSatellites): void;

    /**
     * Valida se o valor é vazio.
     * @param value - Valor a ser verificado.
     */
    itsVoid(value: any): void;

    /**
     * Valida se a resposta contém pelo menos um dos parâmetros: ID, código ou nome.
     * @param id - O ID do planeta.
     * @param code - O código do planeta.
     * @param name - O nome do planeta.
     * @throws Error Se nenhum dos parâmetros for fornecido.
     */
    checkResponse(id: number, code: string, name: string): void;

    /**
     * Verifica se o ID e o código foram informados.
     * @param id - O ID do planeta.
     * @param code - O código do planeta.
     */
    checkIdCode(id: number, code: string): void;

    /**
     * Verifica se todos os dados necessários foram informados.
     * @param code - O código do planeta.
     * @param name - O nome do planeta.
     * @param satellites - Informações sobre os satélites do planeta.
     */
    checkAllDatas(code: string, name: string, satellites: iSatellites): void;
}

/**
 * Interface para definir mensagens de erro.
 */
interface iMessageError {
    /**
     * Mensagem de erro para nome não informado.
     */
    name: string;

    /**
     * Mensagem de erro para informações sobre satélites não informadas ou vazias.
     */
    satellites: string;

    /**
     * Mensagem de erro para código não informado.
     */
    code: string;

    /**
     * Mensagem de erro para quantidade de satélites não especificada.
     */
    amountSatellites: string;

    /**
     * Mensagem de erro para nome do satélite não informado.
     */
    nameSatellites: string;

    /**
     * Mensagem de erro para ID não informado ou inválido.
     */
    id: string;

    /**
     * Mensagem de erro para objeto satélite não informado.
     */
    object: string;

    /**
     * Mensagem de erro para quantidade de satélites especificada diferente da informada.
     */
    equalsAmountSatellites: string;

    /**
     * Mensagem de erro para planeta não encontrado.
     */
    null: string;

    /**
     * Mensagem de erro para quando nenhum planeta é encontrado com base no ID.
     */
    noFindID: string;

    /**
     * Mensagem de erro para quando nenhum dos parâmetros obrigatórios é fornecido.
     */
    response: string;

    /**
     * Mensagem de erro para quando não se encontra um planeta com base no código na deleção.
     */
    responseDelete: string;

    /**
     * Mensagem de erro para quando não se encontram dados no corpo da solicitação.
     */
    responseAll: string;

    /**
     * Função que retorna uma mensagem de erro para código com tamanho diferente de 5 caracteres.
     * @param length - Tamanho do código informado.
     * @returns Mensagem de erro.
     */
    lengthCode(length: number): string;
}

/**
 * Interface para definir métodos de seleção de planetas.
 */
interface iSelectPlanets {
    /**
     * Seleciona um planeta pelo ID.
     * @param id - ID do planeta.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    selectID(id: number, res: Response): Promise<void>;

    /**
     * Seleciona um planeta pelo código.
     * @param code - Código do planeta.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    selectCode(code: string, res: Response): Promise<void>;

    /**
     * Seleciona um planeta pelo nome.
     * @param name - Nome do planeta.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    selectName(name: string, res: Response): Promise<void>;
}

/**
 * Interface para definir métodos de remoção de planetas.
 */
interface iRemovePlanets {
    /**
     * Remove um planeta pelo ID.
     * @param id - ID do planeta a ser removido.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    removePlanetsId(id: number, res: Response): Promise<void>;

    /**
     * Remove um planeta pelo código.
     * @param code - Código do planeta a ser removido.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    removePlanetsCode(code: string, res: Response): Promise<void>;
}

/**
 * Interface para definir métodos de atualização de planetas.
 */
interface iUpdatePlanets {
    /**
     * Altera o nome de um planeta com base no ID fornecido.
     * @param id - ID do planeta a ser atualizado.
     * @param name - Novo nome do planeta.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    alterName(id: number, name: string, res: Response): Promise<void>;

    /**
     * Altera o código de um planeta com base no ID fornecido.
     * @param id - ID do planeta a ser atualizado.
     * @param code - Novo código do planeta.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    alterCode(id: number, code: string, res: Response): Promise<void>;

    /**
     * Altera as informações de satélites de um planeta com base no ID fornecido.
     * @param id - ID do planeta a ser atualizado.
     * @param satellites - Novas informações de satélites do planeta.
     * @param res - Objeto de resposta do Express.
     * @returns Promise<void>
     */
    alterSatellites(id: number, satellites: iSatellites, res: Response): Promise<void>;
}

export {
    iResponse,
    iSatellites,
    iSearchPlanets,
    iValidate,
    iMessageError,
    iSelectPlanets,
    iRemovePlanets,
    iUpdatePlanets
}
