import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1673602738542 implements MigrationInterface {
    name = 'sync1673602738542'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}
