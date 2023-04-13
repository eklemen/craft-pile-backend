import { MigrationInterface, QueryRunner } from "typeorm";

export class OptionalDob1678148911680 implements MigrationInterface {
    name = 'OptionalDob1678148911680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "child" ALTER COLUMN "date_of_birth" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "child" ALTER COLUMN "date_of_birth" SET NOT NULL`);
    }

}
