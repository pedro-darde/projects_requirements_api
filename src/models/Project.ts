import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";
import { ProjectRequirement } from "./ProjectRequirement";

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

  @OneToMany(() => ProjectRequirement, projectRequirement => projectRequirement.project)
  projectRequirements: ProjectRequirement[];
}
