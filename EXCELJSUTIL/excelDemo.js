const ExcelJs = require('exceljs');

async function excelTest(){
    let output = {row:-1,column:-1};
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("C:/Users/fierroe/Documents/archivos de playwright/download.xlsx")
    const worksheet = workbook.getWorksheet('Sheet1');

    //Imprime el numero de columna y fila donde se encuentre "Apple"
    worksheet.eachRow((row,rowNumber) =>{
        row.eachCell((cell, colNumber) =>{
            //console.log(cell.value);
            if(cell.value === "Banana"){
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })

    //Remplazara donde se encuentra la palabra Apple por fila y columna por
    //Iphone
    const cell = worksheet.getCell(output.row, output.column);
    cell.value= "Republica";
    await workbook.xlsx.writeFile("C:/Users/fierroe/Documents/archivos de playwright/download.xlsx");
}

excelTest();


