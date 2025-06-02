import { CandidatesService } from './candidates.service';
import * as XLSX from 'xlsx';

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(() => {
    service = new CandidatesService();
  });

  it('should process valid Excel and return candidate object', () => {
    const data = [
      {
        Seniority: 'junior',
        'Years of experience': 2,
        Availability: 'true',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const mockFile: Express.Multer.File = {
      buffer,
      fieldname: 'excel',
      originalname: 'test.xlsx',
      encoding: '7bit',
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: buffer.length,
      stream: undefined as any,
      destination: undefined as any,
      filename: undefined as any,
      path: undefined as any,
    };

    const result = service.processExcel('John', 'Doe', mockFile);

    expect(result).toEqual({
      name: 'John',
      surname: 'Doe',
      seniority: 'junior',
      years: 2,
      availability: true,
    });
  });

  it('should throw if Excel file is empty', () => {
    const emptyFile: Express.Multer.File = {
      buffer: Buffer.from(''),
      fieldname: 'excel',
      originalname: 'empty.xlsx',
      encoding: '7bit',
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 0,
      stream: undefined as any,
      destination: undefined as any,
      filename: undefined as any,
      path: undefined as any,
    };

    expect(() => service.processExcel('John', 'Doe', emptyFile)).toThrowError(
      'Excel file does not contain any rows',
    );
  });

  it('should throw if Excel has no valid rows', () => {
    const worksheet = XLSX.utils.json_to_sheet([]); // empty sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const mockFile: Express.Multer.File = {
      buffer,
      fieldname: 'excel',
      originalname: 'empty_rows.xlsx',
      encoding: '7bit',
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: buffer.length,
      stream: undefined as any,
      destination: undefined as any,
      filename: undefined as any,
      path: undefined as any,
    };

    expect(() => service.processExcel('John', 'Doe', mockFile)).toThrowError(
      'Excel file does not contain any rows',
    );
  });
});