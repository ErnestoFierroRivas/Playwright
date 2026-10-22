const ExcelJs =require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText,replaceText,change,filePath){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output= await readExcel(worksheet,searchText);
    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}
async function readExcel(worksheet,searchText){
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>{
        row.eachCell((cell,colNumber) =>{
            if(cell.value === searchText){
                output.row=rowNumber;
                output.column=colNumber;
            }
        })
    })
    return output;
}

//Prueba para el cambio en el archivo con la tabla de frutas
test('Upload download excel validation', async ({ page }, testInfo) => {
    const textSearch = 'Mango';
    const updateValue = '909';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const dl = await download;
    const filePath = testInfo.outputPath('download.xlsx');
    await dl.saveAs(filePath);
    //const filePath = 'C:/Users/fierroe/Documents/archivos de playwright/download.xlsx';
    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator('#fileinput').setInputFiles(filePath);
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});