import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.get('/', (request, response) => {
  return response.status(200).json({ message: 'hello wolf' });
}); 

app.post('/', (request, response) => {
  return response.status(200).json({message: 'dados recebidos com sucesso'})
});

app.listen(3333, () => {
  console.log(`
  ______________________________________________

  Server is Up @ http://localhost:3333/
  @TheyCallMeWolf
  ______________________________________________
  `)
});