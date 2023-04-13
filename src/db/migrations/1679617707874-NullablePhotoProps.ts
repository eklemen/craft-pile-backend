import { MigrationInterface, QueryRunner } from "typeorm";

export class NullablePhotoProps1679617707874 implements MigrationInterface {
    name = 'NullablePhotoProps1679617707874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "date_of_photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "date_of_photo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "description" SET NOT NULL`);
    }

}
