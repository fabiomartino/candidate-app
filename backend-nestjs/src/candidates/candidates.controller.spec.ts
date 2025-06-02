import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [CandidatesService],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.processExcel and return result', () => {
    const mockFile: Express.Multer.File = {
      buffer: Buffer.from('fake buffer'),
      fieldname: 'excel',
      originalname: 'test.xlsx',
      encoding: '7bit',
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 1234,
      stream: undefined as any,
      destination: undefined as any,
      filename: undefined as any,
      path: undefined as any,
    };

    const mockCandidate = {
      name: 'John',
      surname: 'Doe',
      seniority: 'junior',
      years: 3,
      availability: true,
    };

    jest.spyOn(service, 'processExcel').mockReturnValue(mockCandidate);

    const result = controller.uploadCandidate('John', 'Doe', mockFile);

    expect(service.processExcel).toHaveBeenCalledWith('John', 'Doe', mockFile);

    expect(result).toEqual(mockCandidate);
  });
});