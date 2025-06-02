import { Injectable, BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class CandidatesService {
  processExcel(name: string, surname: string, file: Express.Multer.File) {
    if (!file?.buffer) {
        throw new Error('Uploaded file is empty or invalid.');
    }

    const buffer = file.buffer;
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log('PARSED EXCEL ROWS:', data);

    if (!data || data.length === 0) {
        throw new BadRequestException('Excel file does not contain any rows');
    }

    const row = data[0] as any;

    if (!row['Seniority'] || !row['Years of experience'] || row['Availability'] === undefined) {
        throw new BadRequestException('Excel file must contain columns: Seniority, Years of experience, Availability');
    }

    const seniority = row['Seniority'].toLowerCase();
    if (seniority !== 'junior' && seniority !== 'senior') {
      throw new BadRequestException('Seniority must be either "junior" or "senior"');
    }

    // ✅ Years
    const years = Number(row['Years of experience']);
    if (isNaN(years) || years < 0) {
      throw new BadRequestException('Years of experience must be a valid number greater than or equal to 0');
    }

    // ✅ Availability
    const availabilityRaw = row['Availability'];
    const availability =
      availabilityRaw === true ||
      availabilityRaw === 'true' ||
      availabilityRaw === 'TRUE' ||
      availabilityRaw === 1;

    const candidate = {
        name: name.trim(),
        surname: surname.trim(),
        seniority,
        years,
        availability,
    };

    return candidate;
  }
}