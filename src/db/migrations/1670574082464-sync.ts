import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1670574082464 implements MigrationInterface {
    name = 'sync1670574082464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "dob"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "dob" date NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "dob"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "dob" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
    }

}
