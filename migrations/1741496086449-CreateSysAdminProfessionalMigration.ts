import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSysAdminProfessionalMigration implements MigrationInterface {
  name = 'CreateSysAdminProfessionalMigration'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert the SysAdmin area and get its id
    const areaResult = await queryRunner.query(
      `INSERT INTO "area" ("name") VALUES ('SysAdmin') RETURNING "id";`
    );
    const areaId = areaResult[0].id;

    // Insert the professional referencing the newly created area id
    await queryRunner.query(
      `INSERT INTO "professional" (
          "firstname",
          "lastname",
          "username",
          "password",
          "phone",
          "email",
          "colorHex",
          "areaId"
        ) VALUES (
          'Admin',
          'Admin',
          'Admin',
          '$2b$10$zRAjOXts3mlicD5sAXrEMOGpGNFth8zzVjP8si0qP8TDTPEJsmpO6',
          '0000000000',
          'francisco.arnaudo.dev@gmail.com',
          '#eb78d2',
          '${areaId}'
        );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback: Delete the professional and then the area record
    await queryRunner.query(
      `DELETE FROM "professional" WHERE "username" = 'Admin';`
    );
    await queryRunner.query(
      `DELETE FROM "area" WHERE "name" = 'SysAdmin';`
    );
  }
}
