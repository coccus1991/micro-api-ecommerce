import {DataSource, DataSourceOptions} from "typeorm";

const connectionOptions: DataSourceOptions = {
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: ['src/entities/*.ts'],
    synchronize: true,
    logging: false
};
export const AppDataSource = new DataSource(connectionOptions);