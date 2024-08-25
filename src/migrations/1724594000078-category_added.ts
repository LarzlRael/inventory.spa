import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryAdded1724594000078 implements MigrationInterface {
    name = 'CategoryAdded1724594000078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`idCategory\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`idCategoria\` int NULL, PRIMARY KEY (\`idCategory\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_dd7321a2da616a5a73aa14b8d04\``);
        await queryRunner.query(`ALTER TABLE \`ventas\` CHANGE \`sellDate\` \`sellDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`ventas\` CHANGE \`idUsuario\` \`idUsuario\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6aacf1388accb6e58c6d09a3581\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6695d36e3e2c917bd5422d7d7a6\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` CHANGE \`idVenta\` \`idVenta\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` CHANGE \`idProducto\` \`idProducto\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_dd7321a2da616a5a73aa14b8d04\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2b3503c12b4f4f3d39027a8eed3\` FOREIGN KEY (\`idCategoria\`) REFERENCES \`categories\`(\`idCategory\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6aacf1388accb6e58c6d09a3581\` FOREIGN KEY (\`idVenta\`) REFERENCES \`ventas\`(\`idSell\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6695d36e3e2c917bd5422d7d7a6\` FOREIGN KEY (\`idProducto\`) REFERENCES \`Products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6695d36e3e2c917bd5422d7d7a6\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` DROP FOREIGN KEY \`FK_6aacf1388accb6e58c6d09a3581\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2b3503c12b4f4f3d39027a8eed3\``);
        await queryRunner.query(`ALTER TABLE \`ventas\` DROP FOREIGN KEY \`FK_dd7321a2da616a5a73aa14b8d04\``);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` CHANGE \`idProducto\` \`idProducto\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` CHANGE \`idVenta\` \`idVenta\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6695d36e3e2c917bd5422d7d7a6\` FOREIGN KEY (\`idProducto\`) REFERENCES \`Products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`detalles_venta\` ADD CONSTRAINT \`FK_6aacf1388accb6e58c6d09a3581\` FOREIGN KEY (\`idVenta\`) REFERENCES \`ventas\`(\`idSell\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ventas\` CHANGE \`idUsuario\` \`idUsuario\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`ventas\` CHANGE \`sellDate\` \`sellDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`ventas\` ADD CONSTRAINT \`FK_dd7321a2da616a5a73aa14b8d04\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
