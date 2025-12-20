import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

@Entity("transaction")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  lessonId: string;

  @Column({ type: "uuid" })
  studentId: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ type: "timestamp", nullable: true })
  canceledTime: Date;

  @Column({ type: "timestamp", nullable: true })
  performaceTime: Date;

  @Column({ type: "varchar", nullable: true })
  reason: string;

  @ManyToOne("Lesson", (lesson: any) => lesson.transactions)
  @JoinColumn({ name: "lessonId" })
  lesson: any;

  @ManyToOne("Student", (student: any) => student.transactions)
  @JoinColumn({ name: "studentId" })
  student: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
