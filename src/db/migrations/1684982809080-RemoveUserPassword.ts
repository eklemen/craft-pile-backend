import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveUserPassword1684982809080 implements MigrationInterface {
  name = 'RemoveUserPassword1684982809080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'password');

    const cognitoUuidColumn = new TableColumn({
      name: 'cognitoUuid',
      type: 'varchar',
      isNullable: true,
    });

    await queryRunner.addColumn('user', cognitoUuidColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'cognitoUuid');

    const passwordColumn = new TableColumn({
      name: 'password',
      type: 'varchar',
      isNullable: false,
    });

    await queryRunner.addColumn('user', passwordColumn);
  }
}
