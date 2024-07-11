import { DataTypes } from "sequelize";
import sequelize from "./main";

/**
 * Define o modelo 'Planets' para a tabela 'planetas'.
 */
const Planets = sequelize.define('planetas', {
    /**
     * ID do planeta.
     * Chave primária, autoincrementável.
     */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    /**
     * Nome do planeta.
     * Campo obrigatório e único.
     */
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    /**
     * Código do planeta.
     * Campo obrigatório e único.
     */
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    /**
     * Satélites do planeta.
     * Campo obrigatório, armazenado como JSON.
     */
    satellites: {
        type: DataTypes.JSON,
        allowNull: false,
    }
}, {
    tableName: 'planetas',
    timestamps: true,
});

export default Planets;
