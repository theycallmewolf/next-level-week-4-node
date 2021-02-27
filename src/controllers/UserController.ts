import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    
    // repository -> entity manager (link to db)
    const usersRepository = getCustomRepository(UsersRepository);
    
    // step 1 - check if user already exists
    const userAlreadyExists = await usersRepository.findOne({email})

    if(userAlreadyExists) {
      return response.status(400).json({message: 'users already exists'})
    }

    // step 2 - create user
    const user = usersRepository.create({ name, email });

    // step 3 - save user
    await usersRepository.save(user);
    
    return response.status(201).json(user);
  }
}

export { UserController };
