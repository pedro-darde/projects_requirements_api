import { Column, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  start_date: Date;

  @Column()
  release_date: Date;

  @Column({ default: true })
  active: boolean;
}
