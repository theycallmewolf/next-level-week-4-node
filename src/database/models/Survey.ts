import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('surveys')
class Survey {
  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Survey };