import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class linkProjectDocumentation1648898327879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('projects', new TableColumn(
            { name: 'documentation_link', type: 'varchar', isNullable: true }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('projects', 'documentation_link')
    }

}
