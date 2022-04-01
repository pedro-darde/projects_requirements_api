import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";
import { Requirement } from "./Requirement";

@Entity("project_requirements")
export class ProjectRequirement {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @ManyToOne(() => Project, project => project.projectRequirements, { eager: true })
  @JoinColumn({ name: "project_id" })
  project: Project;

  @ManyToOne(() => Requirement, requirement => requirement.projectsRequirements, { eager: true })
  @JoinColumn({ name: "requirement_id" })
  requirement: Requirement;
}
