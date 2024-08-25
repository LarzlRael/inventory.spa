import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstTableProducts1724592364670 implements MigrationInterface {
    name = 'FirstTableProducts1724592364670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`purchasePrice\` int NOT NULL, \`SalePrice\` int NOT NULL, \`stockQuantity\` int NOT NULL, UNIQUE INDEX \`IDX_26c9336d231c4e90419a5954bd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_26c9336d231c4e90419a5954bd\` ON \`Products\``);
        await queryRunner.query(`DROP TABLE \`Products\``);
    }

}
