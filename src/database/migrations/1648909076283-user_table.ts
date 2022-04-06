import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class userTable1648909076283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    { name: 'email', type: 'varchar' },
                    { name: 'password', type: 'varchar' },
                    { name: 'name', type: 'varchar' },
                ]
            },

        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
