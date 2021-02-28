import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

  // http://localhost:3333/answers/10?u=9e1e32b2-3149-4251-a4e4-c091a64a0284

  // route params : 10
  // // routes.get('/answers/:value')
  
  // query params : u=9e1e32b2-3149-4251-a4e4-c091a64a0284
  // // Não são obrigatórios
  // // key=value

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUserRepository.findOne({
      id: String(u),
    })

    if(!surveyUser) {
      return response.status(400).json({
        error: 'Survey User does not exists',
      })
    }

    surveyUser.value = Number(value);

    await surveysUserRepository.save(surveyUser);

    return response.status(200).json(surveyUser)    
  }
}

export { AnswerController };