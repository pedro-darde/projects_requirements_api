import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class requirementLocation1648759861238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('requirements', new TableColumn({
            name: "location",
            type: 'json',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('requirements', 'location')
    }

}
