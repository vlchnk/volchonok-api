import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import UserRoute from '@routes/users.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

let userId: number;

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response statusCode 200 / findAll', () => {
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response statusCode 201 / created', async () => {
      const userData: CreateUserDto = {
        name: 'test',
        email: 'test-user@email.com',
        password: 'q1w2e3r4',
      };

      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      const response = await request(app.getServer())
        .post(`${usersRoute.path}`)
        .send(userData);

      expect(response.status).toEqual(201);
      expect(response.body.data.name).toEqual(userData.name);
      expect(response.body.data.email).toEqual(userData.email);

      userId = response.body.data.id;
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const userId = 1;
      const userData: CreateUserDto = {
        name: 'test',
        email: 'test-user@email.com',
        password: 'q1w2e3r4',
      };

      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
