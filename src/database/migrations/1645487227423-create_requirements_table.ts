import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRequirementsTable1645487227423
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "requirements",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true,
          },
          { name: "description", type: "varchar", isNullable: false },
          {
            name: "difficulty",
            enum: ["0", "1", "2", "3", "4", "5"],
            type: "integer",
            isNullable: false,
          },
          {
            name: "importance",
            enum: ["0", "1", "2", "3"],
            type: "integer",
            isNullable: false,
          },
          { name: "estimated_time", type: "float", isNullable: false },
          {
            name: "created_at",
            type: "TIMESTAMP",
            default: "CURRENT_TIMESTAMP",
            isNullable: false,
          },
          { name: "active", type: "boolean", isNullable: false, default: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable("project_requirements")) {
      await queryRunner.dropTable("project_requirements");
    }

    await queryRunner.dropTable("requirements");
  }
}
