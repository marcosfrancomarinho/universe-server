import { Sequelize } from "sequelize";

/**
 * Configura uma instância do Sequelize para conectar ao banco de dados PostgreSQL.
 * 
 * A conexão é configurada utilizando a URL de conexão do banco de dados fornecida.
 * O Sequelize é configurado para usar o dialeto PostgreSQL.
 */
const sequelize: Sequelize = new Sequelize(
    process.env.URL as string,
    {
        dialect: 'postgres'
    }
);

export default sequelize;
