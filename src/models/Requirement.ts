import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectRequirement } from "./ProjectRequirement";
import { RequirementImage } from "./RequirementImage";

@Entity("requirements")
export class Requirement {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  description: string;

  @Column()
  difficulty: 0 | 1 | 2 | 3 | 4 | 5;

  @Column()
  importance: 0 | 1 | 2 | 3;

  @Column()
  estimated_time: number;

  @Column({ default: "CURRENT_TIMESTAMP" })
  created_at: string;

  @Column({ default: true })
  active: boolean

  @OneToMany(() => ProjectRequirement, prjR => prjR.requirement)
  projectsRequirements: ProjectRequirement[]

  @OneToMany(() => RequirementImage, image => image.requirement, { eager: true })
  pictures: RequirementImage[]

  @Column({ type: 'json' })
  location: JSON
}
