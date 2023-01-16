import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673863541842 implements MigrationInterface {
    name = 'sync1673863541842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
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
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "price" character varying NOT NULL,
                "text" character varying NOT NULL,
                "rate" character varying,
                "cover" character varying NOT NULL,
                "date" character varying NOT NULL,
                "status" character varying NOT NULL,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genre_genre" (
                "bookId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "PK_7b8c83da852574d44c4f7f9cd66" PRIMARY KEY ("bookId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1ea0184b15eabed75957f55a5b" ON "book_genre_genre" ("bookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e58420b1bc65de398197d07a40" ON "book_genre_genre" ("genreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre_genre"
            ADD CONSTRAINT "FK_1ea0184b15eabed75957f55a5b2" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre_genre"
            ADD CONSTRAINT "FK_e58420b1bc65de398197d07a40e" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genre_genre" DROP CONSTRAINT "FK_e58420b1bc65de398197d07a40e"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre_genre" DROP CONSTRAINT "FK_1ea0184b15eabed75957f55a5b2"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e58420b1bc65de398197d07a40"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1ea0184b15eabed75957f55a5b"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genre_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }

}
