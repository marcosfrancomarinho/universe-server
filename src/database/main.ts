import { Sequelize } from "sequelize";

/**
 * Configura uma instância do Sequelize para conectar ao banco de dados MySQL.
 */
const sequelize: Sequelize = new Sequelize({
    /**
     * Nome de usuário para autenticação no banco de dados.
     */
    username: 'root',

    /**
     * Senha para autenticação no banco de dados.
     */
    password: '151822',

    /**
     * Nome do banco de dados ao qual se conectar.
     */
    database: 'universe',

    /**
     * Endereço do servidor de banco de dados.
     */
    host: 'localhost',

    /**
     * Dialeto do banco de dados usado pelo Sequelize.
     * Aqui, 'mysql' indica que o banco de dados é MySQL.
     */
    dialect: 'mysql'
});

export default sequelize;
