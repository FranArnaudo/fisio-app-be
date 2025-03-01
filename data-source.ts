// eslint-disable-next-line @typescript-eslint/no-require-imports
const DataSource = require('typeorm').DataSource;

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // Change as needed
  port: 5432,
  username: 'fran',
  password: 'Fran24',
  database: process.env.POSTGRES_DB || 'fisio-app',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // Migrations handle schema changes
});

export default dataSource;
