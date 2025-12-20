import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("teacher_payment")
export class TeacherPayment {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "uuid" })
  teacherId: string;

  @Column({ type: "varchar", array: true, nullable: true })
  lessons: string[];

  @Column({ type: "int" })
  totalLessonAmount: number;

  @Column({ type: "int" })
  platformComission: number;

  @Column({ type: "int" })
  platformAmount: number;

  @Column({ type: "int" })
  teacherAmount: number;

  @Column({ type: "uuid" })
  paidBy: string;

  @Column({ type: "timestamp", nullable: true })
  paidAt: Date;

  @Column({ type: "boolean", default: false })
  isCanceled: boolean;

  @Column({ type: "timestamp", nullable: true })
  canceledAt: Date;

  @Column({ type: "uuid", nullable: true })
  canceledBy: string;

  @Column({ type: "varchar", nullable: true })
  canceledReason: string;

  @Column({ type: "varchar", nullable: true })
  notes: string;

  @ManyToOne("Teacher", (teacher: any) => teacher.payments)
  @JoinColumn({ name: "teacherId" })
  teacher: any;

  @ManyToOne("Admin", (admin: any) => admin.issuedPayments)
  @JoinColumn({ name: "paidBy" })
  admin: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
