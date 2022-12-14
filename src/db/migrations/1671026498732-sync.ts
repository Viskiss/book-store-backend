import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1671026498732 implements MigrationInterface {
    name = 'sync1671026498732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "fullName" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying NOT NULL
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
            ALTER TABLE "user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "fullName"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id"
        `);
    }

}
