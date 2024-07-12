import { iValidate, iMessageError, iSatellites, iSearchPlanets } from "./interfaces";

/**
 * Namespace CheckError contém a classe Validate, que é responsável por realizar validações em diversos dados.
 */
export namespace CheckError {

    /**
     * A classe Validate implementa a interface iValidate e contém métodos para validar dados relacionados a planetas e satélites.
     */
    export class Validate implements iValidate {
        private messageError: iMessageError;

        /**
         * Construtor da classe Validate. Inicializa as mensagens de erro padrão.
         */
        constructor() {
            this.messageError = {
                name: 'Nome do planeta não foi informado',
                satellites: 'Informação de satélites não foi informada ou está vazia',
                code: 'Código do planeta não foi informado',
                nameSatellites: 'Nome do satélite não foi informado',
                amountSatellites: 'Quantidade de satélites não foi especificada',
                id: 'ID não foi informado ou é inválido',
                object: 'Objeto satélite não foi informado',
                equalsAmountSatellites: 'Quantidade de satélites especificada está diferente da quantidade informada',
                null: 'O planeta buscado não foi encontrado',
                noFindID: 'Não se encontram planetas com base neste ID',
                response: 'Informe na query o id ou código do planeta ou o nome',
                lengthCode: (length: number): string => {
                    return `Código deve conter 5 caracteres - Código informado: ${length}`;
                }
            }
        }

        /**
         * Verifica se o código do planeta é válido.
         * @param code O código do planeta.
         * @throws Error Se o código for vazio ou não tiver 5 caracteres.
         */
        public hasCode(code: string): void {
            if (!code || code.trim().length === 0) {
                throw new Error(this.messageError.code);
            }
            if (code.trim().length !== 5) {
                throw new Error(this.messageError.lengthCode(code.trim().length));
            }
        }

        /**
         * Verifica se o nome do planeta é válido.
         * @param name O nome do planeta.
         * @throws Error Se o nome for vazio.
         */
        public hasName(name: string): void {
            if (!name || name.trim().length === 0) {
                throw new Error(this.messageError.name);
            }
        }

        /**
         * Verifica se as informações de satélites são válidas.
         * @param satellites O objeto contendo informações dos satélites.
         * @throws Error Se as informações de satélites forem inválidas.
         */
        public hasSatellites(satellites: iSatellites): void {
            if (typeof satellites !== 'object') {
                throw new Error(this.messageError.object);
            }
            const length: number = Object.keys(satellites).length;
            if (length === 0) {
                throw new Error(this.messageError.satellites);
            }
            const { amount, name } = satellites;
            if (!name || name.length === 0 || !Array.isArray(name)) {
                throw new Error(this.messageError.nameSatellites);
            }
            if (!amount || isNaN(amount) || amount <= 0) {
                throw new Error(this.messageError.amountSatellites);
            }
            if (amount !== name.length) {
                throw new Error(this.messageError.equalsAmountSatellites);
            }
            const isEmpty: boolean = name.some(satellite => satellite.trim().length === 0);
            if (isEmpty) {
                throw new Error(this.messageError.satellites);
            }
        }

        /**
         * Verifica se o ID é válido.
         * @param id O ID do planeta.
         * @throws Error Se o ID for inválido.
         */
        public hasID(id: number) {
            if (isNaN(id) || !id || id <= 0) {
                throw new Error(this.messageError.id);
            }
        }

        /**
         * Verifica se os dados do planeta são válidos.
         * @param name O nome do planeta.
         * @param code O código do planeta.
         * @param satellites As informações dos satélites.
         * @throws Error Se algum dos dados for inválido.
         */
        public verificationDatas(name: string, code: string, satellites: iSatellites): void {
            this.hasName(name);
            this.hasCode(code);
            this.hasSatellites(satellites);
        }

        /**
         * Verifica se ocorreu um erro de duplicidade ao inserir um planeta.
         * @param error O erro gerado.
         * @throws Error Se houver duplicidade no banco de dados.
         */
        public uniquePlanets(error: any): void {
            const code: string | undefined = error?.original?.code;
            const messageSql: string | undefined = error?.parent;
            if (code === '23505') {
                throw new Error(messageSql);
            }
        }

        /**
         * Verifica se o valor é nulo.
         * @param value O valor a ser verificado.
         * @throws Error Se o valor for nulo.
         */
        public itsNull(value: null | Array<iSearchPlanets | void>): void {
            if (!value || value.length === 0) {
                throw new Error(this.messageError.null);
            }
        }

        /**
         * Verifica se o ID e o nome são válidos.
         * @param id O ID do planeta.
         * @param name O nome do planeta.
         * @throws Error Se o ID ou o nome forem inválidos.
         */
        public hasIdAndName(id: number, name: string): void {
            this.hasID(id);
            this.hasName(name);
        }

        /**
         * Verifica se o valor está vazio.
         * @param value O valor a ser verificado.
         * @throws Error Se o valor estiver vazio.
         */
        public itsVoid(value: any): void {
            if (value[0] === 0 || value === 0) {
                throw new Error(this.messageError.noFindID);
            }
        }

        /**
         * Verifica se o ID e o código são válidos.
         * @param id O ID do planeta.
         * @param code O código do planeta.
         * @throws Error Se o ID ou o código forem inválidos.
         */
        public hasIdAndCode(id: number, code: string): void {
            this.hasID(id);
            this.hasCode(code);
        }

        /**
         * Verifica se o ID e as informações dos satélites são válidos.
         * @param id O ID do planeta.
         * @param satellites As informações dos satélites.
         * @throws Error Se o ID ou as informações dos satélites forem inválidos.
         */
        public hasIdAndSatellites(id: number, satellites: iSatellites): void {
            this.hasID(id);
            this.hasSatellites(satellites);
        }

        /**
         * Verifica se a resposta contém pelo menos um dos parâmetros: ID, código ou nome.
         * @param id O ID do planeta.
         * @param code O código do planeta.
         * @param name O nome do planeta.
         * @throws Error Se nenhum dos parâmetros for fornecido.
         */
        public checkResponse(id: number, code: string, name: string): void {
            if (!id && !code && !name) {
                throw new Error(this.messageError.response);
            }
        }
    }
}

