import React from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import * as XLSX from "xlsx";

const DocxReader = () => {
  const doxcFileReader = async (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const content: any = e.target?.result;

      const doc = new Docxtemplater(new PizZip(content));
      const text = doc.getFullText();
      console.log(text.match(/\{(.*?)}/g));
    };
    reader.readAsBinaryString(e.target.files[0]);
  };
  const sheetFileReader = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      //@ts-ignore
      const table = XLSX.read(e.target.result);
      const sheet = table.Sheets[table.SheetNames[2]];
      var range = XLSX.utils.decode_range("A6:C104");
      const variables = {
        list: 1,
        stolbec: 6,
        stroka: 10,
        stolbec2: 104,
      };
      var dataRange = [];
      /* Iterate through each element in the structure */
      for (var R = range.s.r; R <= range.e.r; ++R) {
        for (var C = range.s.c; C <= range.e.c; ++C) {
          var cell_address = { c: C, r: R };
          var data = XLSX.utils.encode_cell(cell_address);
          //@ts-ignore
          if (sheet[data]) {
            dataRange.push(sheet[data]);
          }
        }
      }
      console.log(dataRange);
      console.log(sheet, range);
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <>
      <h1>docx</h1>
      <input type="file" onChange={doxcFileReader} name="docx-reader" />
      <h1>sheet</h1>
      <input type="file" onChange={sheetFileReader} name="docx-reader" />
    </>
  );
};

export default DocxReader;
