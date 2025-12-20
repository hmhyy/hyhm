import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Transaction } from "./entities/transaction.entity";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) {}

  async create(createDto: CreateTransactionDto) {
    const newTransaction = this.transactionRepository.create(createDto);
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll() {
    return await this.transactionRepository.find({
      relations: ["lesson", "student"],
    });
  }

  async findOne(id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ["lesson", "student"],
    });
    if (!transaction) {
      throw new NotFoundException(`Tranzaksiya (ID: ${id}) topilmadi`);
    }
    return transaction;
  }

  async update(id: string, updateDto: UpdateTransactionDto) {
    const transaction = await this.findOne(id);
    Object.assign(transaction, updateDto);
    return await this.transactionRepository.save(transaction);
  }

  async remove(id: string) {
    const transaction = await this.findOne(id);
    await this.transactionRepository.remove(transaction);
    return { message: "Tranzaksiya muvaffaqiyatli o'chirildi" };
  }
}
