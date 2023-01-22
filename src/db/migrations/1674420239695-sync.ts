import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674420239695 implements MigrationInterface {
    name = 'sync1674420239695'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            CREATE TABLE "genre" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_comment" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "bookId" integer NOT NULL,
                "userId" integer NOT NULL,
                "createdTime" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_09bced71952353c5ae4e40f0f52" PRIMARY KEY ("id")
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
            CREATE TABLE "cart" (
                "id" SERIAL NOT NULL,
                "bookId" integer NOT NULL,
                "userId" integer NOT NULL,
                "price" character varying NOT NULL,
                "bookCover" character varying NOT NULL,
                "quantityOfGoods" character varying NOT NULL DEFAULT '1',
                CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_rate" (
                "id" SERIAL NOT NULL,
                "bookId" integer NOT NULL,
                "userId" integer NOT NULL,
                "rate" character varying NOT NULL,
                CONSTRAINT "PK_b566ca46efc8c09ce97b1b302da" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "liked_book" (
                "id" SERIAL NOT NULL,
                "bookId" integer NOT NULL,
                "userId" integer NOT NULL,
                CONSTRAINT "PK_71a1ea530b4eb22d96fe7653686" PRIMARY KEY ("id")
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
            ALTER TABLE "user_comment"
            ADD CONSTRAINT "FK_ebd475b57b16b0039934dc31a14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_comment"
            ADD CONSTRAINT "FK_662da7eaf5f8d28558ee7fddfa4" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_15605eba0be4c6669389090dd15" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_rate"
            ADD CONSTRAINT "FK_da3b6bb898bcfb8d17afaedc6c6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_rate"
            ADD CONSTRAINT "FK_d0e50f29e72b2f263071575fd98" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "liked_book"
            ADD CONSTRAINT "FK_96325209a35e035f8be9a4455b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "liked_book"
            ADD CONSTRAINT "FK_007d39df5109688f941296c0ce3" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "liked_book" DROP CONSTRAINT "FK_007d39df5109688f941296c0ce3"
        `);
        await queryRunner.query(`
            ALTER TABLE "liked_book" DROP CONSTRAINT "FK_96325209a35e035f8be9a4455b9"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_rate" DROP CONSTRAINT "FK_d0e50f29e72b2f263071575fd98"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_rate" DROP CONSTRAINT "FK_da3b6bb898bcfb8d17afaedc6c6"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_15605eba0be4c6669389090dd15"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_comment" DROP CONSTRAINT "FK_662da7eaf5f8d28558ee7fddfa4"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_comment" DROP CONSTRAINT "FK_ebd475b57b16b0039934dc31a14"
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
            DROP TABLE "liked_book"
        `);
        await queryRunner.query(`
            DROP TABLE "book_rate"
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "user_comment"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
