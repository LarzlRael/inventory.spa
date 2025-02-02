import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configEnvs } from './env';

dotenvConfig({ path: '.env' });

const config = {
  type: 'mysql', // Cambiado de 'postgres' a 'mysql'
  host: configEnvs.databaseHost,
  port: configEnvs.databasePort, // Asegúrate de que esté en el puerto correcto de MySQL (por defecto 3306)
  username: configEnvs.databaseUsername,
  password: configEnvs.databasePassword,
  database: configEnvs.databaseName,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],

  autoLoadEntities: true,
  // Deberías ajustar esto según tu entorno (falso en producción)
  synchronize: false,
  /* ssl: false, */
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
