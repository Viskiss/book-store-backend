import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673265928467 implements MigrationInterface {
    name = 'sync1673265928467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "price" character varying NOT NULL,
                "genre" character varying NOT NULL,
                "text" character varying NOT NULL,
                "rate" character varying,
                "img" character varying NOT NULL,
                CONSTRAINT "UQ_85c8d63d50f8e617e2a49176718" UNIQUE ("author"),
                CONSTRAINT "UQ_cf1f935953d893fc9e559b65e5b" UNIQUE ("price"),
                CONSTRAINT "UQ_e0c327ea08b66445e4eb1ee901d" UNIQUE ("genre"),
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "fullName" character varying,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "dob" date,
                "avatar" character varying,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
    }

}
