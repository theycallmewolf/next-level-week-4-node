import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required('Nome obrigatório'),
      email: yup.string().email('Adicione um email válido').required('Email obrigatório'),
    });
    
    // validation version 1
    // if(!(await schema.isValid(request.body))) {
    //   return response.status(400).json({error: 'validation failed'});
    // }
    
    // validation version 2
    try {
      await schema.validate(request.body, {abortEarly: false});
    } catch ({errors}) {
      throw new AppError(errors);
    }

    // repository -> entity manager (link to db)
    const usersRepository = getCustomRepository(UsersRepository);
    
    // step 1 - check if user already exists
    const userAlreadyExists = await usersRepository.findOne({email})

    if(userAlreadyExists) { throw new AppError('users already exists') };

    // step 2 - create user
    const user = usersRepository.create({ name, email });

    // step 3 - save user
    await usersRepository.save(user);
    
    return response.status(201).json(user);
  }
}

export { UserController };
