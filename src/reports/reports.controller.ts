import {
  Controller,
  Get,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Get('products/pdf')
  async getProductsPdf(
    @Res() res: Response,
  ) {

    const filePath =
      await this.reportsService.generateProductsPdf();

    return res.sendFile(filePath);
  }

  @Get('products/xlsx')
async getProductsExcel(
  @Res() res: Response,
) {

  const filePath =
    await this.reportsService.generateProductsExcel();

  return res.download(filePath);
}
}