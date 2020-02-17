import {MigrationInterface, QueryRunner} from "typeorm";

export class ListingUser1581955712855 implements MigrationInterface {
    name = 'ListingUser1581955712855'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9"`, undefined);
        await queryRunner.query(`ALTER TABLE "listings" RENAME COLUMN "ownerId" TO "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_45d5c4642c4cad0229da0ec22e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_45d5c4642c4cad0229da0ec22e7"`, undefined);
        await queryRunner.query(`ALTER TABLE "listings" RENAME COLUMN "userId" TO "ownerId"`, undefined);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
