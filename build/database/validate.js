"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckError = void 0;
var CheckError;
(function (CheckError) {
    class Validate {
        messageError;
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
                noFindID: 'Não se encontram planetas com base neste ID ou código',
                response: 'Informe na query o id ou código do planeta ou o nome',
                responseDelete: 'Informe na query o id ou código do planeta',
                lengthCode: (length) => {
                    return `Código deve conter 5 caracteres - Código informado: ${length}`;
                }
            };
        }
        hasCode(code) {
            if (!code || code.trim().length === 0) {
                throw new Error(this.messageError.code);
            }
            if (code.trim().length !== 5) {
                throw new Error(this.messageError.lengthCode(code.trim().length));
            }
        }
        hasName(name) {
            if (!name || name.trim().length === 0) {
                throw new Error(this.messageError.name);
            }
        }
        hasSatellites(satellites) {
            if (typeof satellites !== 'object') {
                throw new Error(this.messageError.object);
            }
            const length = Object.keys(satellites).length;
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
            const isEmpty = name.some(satellite => satellite.trim().length === 0);
            if (isEmpty) {
                throw new Error(this.messageError.satellites);
            }
        }
        hasID(id) {
            if (isNaN(id) || !id || id <= 0) {
                throw new Error(this.messageError.id);
            }
        }
        verificationDatas(name, code, satellites) {
            this.hasName(name);
            this.hasCode(code);
            this.hasSatellites(satellites);
        }
        uniquePlanets(error) {
            const code = error?.original?.code;
            const messageSql = error?.parent;
            if (code === '23505') {
                throw new Error(messageSql);
            }
        }
        itsNull(value) {
            if (!value || value.length === 0) {
                throw new Error(this.messageError.null);
            }
        }
        hasIdAndName(id, name) {
            this.hasID(id);
            this.hasName(name);
        }
        itsVoid(value) {
            if (value[0] === 0 || value === 0) {
                throw new Error(this.messageError.noFindID);
            }
        }
        hasIdAndCode(id, code) {
            this.hasID(id);
            this.hasCode(code);
        }
        hasIdAndSatellites(id, satellites) {
            this.hasID(id);
            this.hasSatellites(satellites);
        }
        checkResponse(id, code, name) {
            if (!id && !code && !name) {
                throw new Error(this.messageError.response);
            }
        }
        checkIdCode(id, code) {
            if (!id && !code) {
                throw new Error(this.messageError.responseDelete);
            }
        }
    }
    CheckError.Validate = Validate;
})(CheckError || (exports.CheckError = CheckError = {}));
