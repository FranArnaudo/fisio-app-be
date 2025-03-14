import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1734304241972 implements MigrationInterface {
    name = 'InitialSchema1734304241972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "professional_area_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "measurement_patient_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "measurement_measurement_type_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "appointment_patient_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "appointment_professional_id_fkey"`);
        await queryRunner.query(`CREATE TABLE "servicetype" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" integer NOT NULL, CONSTRAINT "PK_d057cbc26544f6a46aa64907136" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "healthcare" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "sessionPriceByArea" numeric array NOT NULL, "copayByArea" numeric array NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a3d9cd204257e8bf69803c9b5c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric NOT NULL, "copay" numeric NOT NULL, "servicetypeId" uuid, "areaId" uuid, "healthcareId" uuid, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "measurement_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unit" character varying, "normal_min_value" numeric, "normal_max_value" numeric, "data_type" character varying NOT NULL DEFAULT 'numeric', "areaId" uuid NOT NULL, CONSTRAINT "PK_834854bfdd30290e1ab05ab9234" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "patient_id"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_type_id"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dni" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "UQ_85461c4e83bc6d38da87f734d71" UNIQUE ("dni")`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "patientId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurementTypeId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "lastname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "registerDate"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "registerDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "UQ_644ffaf8fbde4db798cb47712fe" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_value_text"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_value_text" character varying`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_time"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_time" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "appointmentDatetime"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "appointmentDatetime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "status" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "patientId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "professionalId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "patientId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "professionalId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_b98d271c4618f0672448f4d9e2a" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_6ae3b6521a32cf30f073310123a" FOREIGN KEY ("servicetypeId") REFERENCES "servicetype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_7211ddf36aea863667fa23d8bc5" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_53d15a5a1c1da8a47beeb6729a3" FOREIGN KEY ("healthcareId") REFERENCES "healthcare"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement_type" ADD CONSTRAINT "FK_3189f811003ccc9dea974a2654c" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_29df1673164b16515c4229ee764" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_93de07c16af23d14bedfc8541fa" FOREIGN KEY ("measurementTypeId") REFERENCES "measurement_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_1efb8063ad19e9e3f9157219033" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_1efb8063ad19e9e3f9157219033"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_93de07c16af23d14bedfc8541fa"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_29df1673164b16515c4229ee764"`);
        await queryRunner.query(`ALTER TABLE "measurement_type" DROP CONSTRAINT "FK_3189f811003ccc9dea974a2654c"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_53d15a5a1c1da8a47beeb6729a3"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_7211ddf36aea863667fa23d8bc5"`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_6ae3b6521a32cf30f073310123a"`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_b98d271c4618f0672448f4d9e2a"`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "professionalId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "patientId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" SET DEFAULT '60'`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "professionalId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "patientId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" SET DEFAULT '60'`);
        await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "status" character varying(50) NOT NULL DEFAULT 'Programado'`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "appointmentDatetime"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "appointmentDatetime" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_time"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement_value_text"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_value_text" text`);
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "UQ_644ffaf8fbde4db798cb47712fe"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "registerDate"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "registerDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "lastname" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "firstname" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurementTypeId"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "UQ_85461c4e83bc6d38da87f734d71"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dni"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement_type_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "patient_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" ADD "description" character varying(1500)`);
        await queryRunner.query(`DROP TABLE "measurement_type"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "healthcare"`);
        await queryRunner.query(`DROP TABLE "servicetype"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "appointment_professional_id_fkey" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_id_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "measurement_measurement_type_id_fkey" FOREIGN KEY ("measurement_type_id") REFERENCES "measurementtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "measurement_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "professional_area_id_fkey" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
