import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectRequirementsTable1645487604787
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "project_requirements",
        columns: [
          {
            name: "id",
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
            unsigned: true,
          },
          {
            name: "project_id",
            type: "integer",
            isNullable: false,
            unsigned: true,
          },
          {
            name: "requirement_id",
            type: "integer",
            isNullable: false,
            unsigned: true,
          },
        ],
        foreignKeys: [
          {
            name: "project_requirement_product",
            referencedColumnNames: ["id"],
            columnNames: ["project_id"],
            referencedTableName: "projects",
            onDelete: "CASCADE",
          },
          {
            name: "project_requirement_requirement",
            referencedColumnNames: ["id"],
            columnNames: ["requirement_id"],
            referencedTableName: "requirements",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable("project_requirements")) {
      await queryRunner.dropTable("project_requirements");
    }
  }
}
