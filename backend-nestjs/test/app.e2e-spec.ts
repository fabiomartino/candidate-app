import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as path from 'path';

describe('CandidatesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should upload candidate with valid Excel', async () => {
    const res = await request(app.getHttpServer())
      .post('/candidates/upload')
      .field('name', 'John')
      .field('surname', 'Doe')
      .attach('excel', path.join(__dirname, './candidate.xlsx'))
      .expect(200);

    expect(res.body).toHaveProperty('name', 'John');
    expect(res.body).toHaveProperty('surname', 'Doe');
    expect(res.body).toHaveProperty('seniority');
    expect(['junior', 'senior']).toContain(res.body.seniority);
    expect(typeof res.body.years).toBe('number');
    expect(typeof res.body.availability).toBe('boolean');
  });

  it('should return 400 if no Excel is uploaded', async () => {
    const res = await request(app.getHttpServer())
      .post('/candidates/upload')
      .field('name', 'John')
      .field('surname', 'Doe')
      .expect(400);

    expect(res.body.message).toContain('Excel file is required');
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app.getHttpServer())
      .post('/candidates/upload')
      .field('name', '')
      .field('surname', 'Doe')
      .attach('excel', path.join(__dirname, './candidate.xlsx'))
      .expect(400);

    expect(res.body.message).toContain('Missing required field: name');
  });

  it('should return 400 if surname is missing', async () => {
    const res = await request(app.getHttpServer())
      .post('/candidates/upload')
      .field('name', 'John')
      .field('surname', '')
      .attach('excel', path.join(__dirname, './candidate.xlsx'))
      .expect(400);

    expect(res.body.message).toContain('Missing required field: surname');
  });
});