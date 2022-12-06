import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1670321121038 implements MigrationInterface {
    name = 'sync1670321121038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "dob"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "dob" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "dob"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "dob" date NOT NULL
        `);
    }

}
