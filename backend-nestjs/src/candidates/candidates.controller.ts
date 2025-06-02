import { BadRequestException, Controller, Post, UploadedFile, HttpCode, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post('upload')
  @HttpCode(200) 
  @UseInterceptors(
    FileInterceptor('excel', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // optional: 5 MB
      },
    })
  )
  uploadCandidate(
    @Body('name') name: string,
    @Body('surname') surname: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('RECEIVED:', { name, surname });
    console.log('FILE:', file?.originalname, file?.mimetype, file?.size);

    if (!name?.trim()) {
        throw new BadRequestException('Missing required field: name');
      }
  
      if (!surname?.trim()) {
        throw new BadRequestException('Missing required field: surname');
      }
  
      if (!file) {
        throw new BadRequestException('Excel file is required');
      }

    return this.candidatesService.processExcel(name, surname, file);
  }
}