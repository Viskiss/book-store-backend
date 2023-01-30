import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675074959552 implements MigrationInterface {
    name = 'sync1675074959552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "quantityOfGoods"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "quantityOfGoods" numeric NOT NULL DEFAULT '1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "quantityOfGoods"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "quantityOfGoods" character varying NOT NULL DEFAULT '1'
        `);
    }

}
