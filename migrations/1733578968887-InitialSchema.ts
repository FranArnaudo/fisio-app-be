import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1733578968887 implements MigrationInterface {
    name = 'InitialSchema1733578968887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "measurement_patient_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "measurement_measurement_type_id_fkey"`);
        await queryRunner.query(`CREATE TABLE "measurement_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unit" character varying, "normal_min_value" numeric, "normal_max_value" numeric, "data_type" character varying NOT NULL DEFAULT 'numeric', "areaId" uuid NOT NULL, CONSTRAINT "PK_834854bfdd30290e1ab05ab9234" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dateofbirth"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "registerdate"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "patient_id"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_type_id"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dateOfBirth" date`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "registerDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "patientId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurementTypeId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "UQ_644ffaf8fbde4db798cb47712fe" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_value_text"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_value_text" character varying`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_time"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_time" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "measurement_type" ADD CONSTRAINT "FK_3189f811003ccc9dea974a2654c" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_29df1673164b16515c4229ee764" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_93de07c16af23d14bedfc8541fa" FOREIGN KEY ("measurementTypeId") REFERENCES "measurement_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_93de07c16af23d14bedfc8541fa"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_29df1673164b16515c4229ee764"`);
        await queryRunner.query(`ALTER TABLE "measurement_type" DROP CONSTRAINT "FK_3189f811003ccc9dea974a2654c"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_time"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_value_text"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_value_text" text`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "lastname" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "firstname" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "UQ_644ffaf8fbde4db798cb47712fe"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurementTypeId"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "registerDate"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_type_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "patient_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "registerdate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dateofbirth" date`);
        await queryRunner.query(`ALTER TABLE "area" ADD "description" character varying(1500)`);
        await queryRunner.query(`DROP TABLE "measurement_type"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "measurement_measurement_type_id_fkey" FOREIGN KEY ("measurement_type_id") REFERENCES "measurementtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "measurement_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
