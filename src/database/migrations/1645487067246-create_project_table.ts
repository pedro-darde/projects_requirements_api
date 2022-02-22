import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectTable1645487067246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "projects",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "start_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "release_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("projects");
  }
}
