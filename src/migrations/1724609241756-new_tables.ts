import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTables1724609241756 implements MigrationInterface {
    name = 'NewTables1724609241756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`idCategory\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`idCategory\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`purchasePrice\` int NOT NULL, \`SalePrice\` int NOT NULL, \`stockQuantity\` int NOT NULL, \`idCategory\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`detalles_venta\` (\`idDetail\` int NOT NULL AUTO_INCREMENT, \`quantitySold\` int NOT NULL, \`priceSale\` decimal(10,2) NOT NULL, \`subtotal\` decimal(10,2) NOT NULL, \`idVenta\` int NULL, \`idProducto\` int NULL, PRIMARY KEY (\`idDetail\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ventas\` (\`idSell\` int NOT NULL AUTO_INCREMENT, \`sellDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`totalVenta\` int NOT NULL, \`clientName\` varchar(255) NOT NULL, \`idUsuario\` int NULL, PRIMARY KEY (\`idSell\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`authStrategy\` varchar(255) NULL DEFAULT 'web', \`phone\` int NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Products\` ADD CONSTRAINT \`FK_c31435184b77187af3e45d35d46\` FOREIGN KEY (\`idCategory\`) REFERENCES \`categories\`(\`idCategory\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6aacf1388accb6e58c6d09a3581\` FOREIGN KEY (\`idVenta\`) REFERENCES \`ventas\`(\`idSell\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6695d36e3e2c917bd5422d7d7a6\` FOREIGN KEY (\`idProducto\`) REFERENCES \`Products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_dd7321a2da616a5a73aa14b8d04\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_dd7321a2da616a5a73aa14b8d04\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6695d36e3e2c917bd5422d7d7a6\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6aacf1388accb6e58c6d09a3581\``);
        await queryRunner.query(`ALTER TABLE \`Products\` DROP FOREIGN KEY \`FK_c31435184b77187af3e45d35d46\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`ventas\``);
        await queryRunner.query(`DROP TABLE \`detalles_venta\``);
        await queryRunner.query(`DROP TABLE \`Products\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
