import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class requirementImages1648759966970 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'requirement_image',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'path', type: 'varchar', isNullable: false },
                    { name: 'fileName', type: 'varchar', isNullable: false },
                    { name: 'requirement_id', type: 'integer', unsigned: true, isNullable: false }
                ],
                foreignKeys: [
                    {
                        name: 'requirement_image_foreign',
                        columnNames: ['requirement_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'requirements'
                    }]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('requirement_image')
    }

}
