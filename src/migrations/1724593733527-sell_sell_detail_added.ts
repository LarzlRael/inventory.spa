import { MigrationInterface, QueryRunner } from "typeorm";

export class SellSellDetailAdded1724593733527 implements MigrationInterface {
    name = 'SellSellDetailAdded1724593733527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`detalles_venta\` (\`idDetail\` int NOT NULL AUTO_INCREMENT, \`quantitySold\` int NOT NULL, \`priceSale\` decimal(10,2) NOT NULL, \`subtotal\` decimal(10,2) NOT NULL, \`idVenta\` int NULL, \`idProducto\` int NULL, PRIMARY KEY (\`idDetail\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ventas\` (\`idSell\` int NOT NULL AUTO_INCREMENT, \`sellDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`totalVenta\` int NOT NULL, \`clientName\` varchar(255) NOT NULL, \`idUsuario\` int NULL, PRIMARY KEY (\`idSell\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6aacf1388accb6e58c6d09a3581\` FOREIGN KEY (\`idVenta\`) REFERENCES \`ventas\`(\`idSell\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6695d36e3e2c917bd5422d7d7a6\` FOREIGN KEY (\`idProducto\`) REFERENCES \`Products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_dd7321a2da616a5a73aa14b8d04\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_dd7321a2da616a5a73aa14b8d04\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6695d36e3e2c917bd5422d7d7a6\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6aacf1388accb6e58c6d09a3581\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`DROP TABLE \`ventas\``);
        await queryRunner.query(`DROP TABLE \`detalles_venta\``);
    }

}
