import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class ReportsService {

  // PDF
  generateProductsPdf(): Promise<string> {

    return new Promise((resolve, reject) => {

      const command = `
      D:\\birt-runtime-4.23.0-202603110852\\ReportEngine\\genReport.bat
      -f PDF
      -o "D:\\Crud-Productos\\Crud backend simple\\reports\\output\\products.pdf"
      "D:\\Crud-Productos\\Crud backend simple\\reports\\products_report.rptdesign"
      `;

      exec(command, (error) => {

        if (error) {
          reject(error);
        } else {

          resolve(
            'D:\\Crud-Productos\\Crud backend simple\\reports\\output\\products.pdf',
          );
        }
      });
    });
  }

  // EXCEL
  generateProductsExcel(): Promise<string> {

    return new Promise((resolve, reject) => {

      const command = `
      D:\\birt-runtime-4.23.0-202603110852\\ReportEngine\\genReport.bat
      -f XLSX
      -o "D:\\Crud-Productos\\Crud backend simple\\reports\\output\\products.xlsx"
      "D:\\Crud-Productos\\Crud backend simple\\reports\\products_report.rptdesign"
      `;

      exec(command, (error) => {

        if (error) {
          reject(error);
        } else {

          resolve(
            'D:\\Crud-Productos\\Crud backend simple\\reports\\output\\products.xlsx',
          );
        }
      });
    });
  }
}