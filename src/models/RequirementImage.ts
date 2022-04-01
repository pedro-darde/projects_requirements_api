import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Requirement } from "./Requirement";

@Entity('requirement_image')
export class RequirementImage {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column()
    path: string

    @Column()
    fileName: string

    @ManyToOne(() => Requirement, requirement => requirement.pictures)
    @JoinColumn({ name: 'requirement_id' })
    requirement: Requirement
}