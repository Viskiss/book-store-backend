import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1672837375703 implements MigrationInterface {
    name = 'sync1672837375703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
    }

}
