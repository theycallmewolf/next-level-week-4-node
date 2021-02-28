import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from './User';
import { Survey } from './Survey';

@Entity('surveys_users')
class SurveyUser {
  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }

  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column()
  survey_id: string;
  
  @ManyToOne(() => Survey)
  @JoinColumn({name: 'survey_id'})
  survey: Survey;
  
  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;
}

export { SurveyUser };