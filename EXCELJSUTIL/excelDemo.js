const ExcelJs = require('exceljs');

async function writeExcelTest(searchText, replaceText, filePath){
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column);
    cell.value= replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,searchText) {

    let output = {row:-1,column:-1};
    //Imprime el numero de columna y fila donde se encuentre "Apple"
    worksheet.eachRow((row,rowNumber) =>{
        row.eachCell((cell, colNumber) =>{
            //console.log(cell.value);
            if(cell.value === searchText){
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}
//Ahora se actualiza la tabla desde aqui
writeExcelTest("Banana","Republic","C:/Users/fierroe/Documents/archivos de playwright/download.xlsx");


