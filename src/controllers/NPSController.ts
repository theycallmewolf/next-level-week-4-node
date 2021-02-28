import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NPSController {

  // detractors -> 0 - 6 
  // passives -> 7 - 8 ( excluded / don't affect survey result )
  // promoters -> 9 - 10

  // (( promoters - detractors ) / replies) * 100

  async execute( request: Request, response: Response){
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    })

    const detractors = surveysUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      survey => survey.value >= 9 && survey.value <= 10
    ).length;

    const passives = surveysUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const score = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));
    
    return response.status(200).json({
      score,
      detractors,
      promoters,
      passives,
      totalAnswers,
    });
  }
}

export { NPSController };