import React, { ChangeEvent, useState } from "react";
import PizZip, { LoadData } from "pizzip";
import Docxtemplater from "docxtemplater";
import * as XLSX from "xlsx";
import { Range, WorkSheet } from "xlsx";
import { PropertiesTypes, VariablesTypes } from "./ConvertForm.types";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const Converter = () => {
  const [variables, setVariables] = useState<VariablesTypes[]>([]);
  const [properties, setProperties] = useState<PropertiesTypes[]>([]);

  console.log("variables", variables);
  console.log("properties", properties);

  const doxcFileReader = async (e: ChangeEvent) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as LoadData;

      const doc = new Docxtemplater(new PizZip(content));
      const text = doc.getFullText();
      const filterText = text.match(/\{(.*?)}/g);
      if (filterText) {
        filterText?.map((text) =>
          setVariables((prevState: VariablesTypes[]) => {
            const textToObject = JSON.parse(text);
            return [...prevState, textToObject];
          })
        );
      }
    };
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.readAsBinaryString(file);
  };

  const getRangeData = async (variable: VariablesTypes, sheet: WorkSheet) => {
    const variableType = variable.stroka && !variable.strokaTwo;
    let range: Range;
    const dataRange: VariablesTypes[] = [];

    if (variableType) {
      range = XLSX.utils.decode_range(
        `A${variable.stolbec}:C${variable.stroka}`
      );
    }
    if (!variableType) {
      range = XLSX.utils.decode_range(
        `A${variable.stolbec}:C${variable.strokaTwo}`
      );
    }

    return new Promise((resolve, reject) => {
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          let cell_address = { c: C, r: R };
          let data = XLSX.utils.encode_cell(cell_address);
          if (sheet[data]) {
            dataRange.push(sheet[data]);
          }
        }
      }
      setProperties((prevState: PropertiesTypes[]) => {
        return [...prevState, dataRange as PropertiesTypes];
      });
      resolve(true);
    });
  };

  const sheetFileReader = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const table = XLSX.read(e.target?.result);
      const sheet = table.Sheets[table.SheetNames[2]];
      variables?.forEach(async (variable) => {
        await getRangeData(variable, sheet);
      });
    };
    reader.readAsArrayBuffer(file);
  };
  const generateFile = () => {
    const sections = properties.map((propertie: PropertiesTypes) => {
      return {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(JSON.stringify(propertie))], // Just newline without text
          }),
        ],
      };
    });

    const doc = new Document({
      sections: sections,
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };
  return (
    <>
      <h1>docx</h1>
      <input
        type="file"
        onChange={doxcFileReader}
        accept=".docx"
        name="docx-reader"
      />

      {variables.length && (
        <>
          <h1>sheet</h1>
          <input type="file" onChange={sheetFileReader} accept=".xls,.xlsx" />
        </>
      )}
      <button onClick={generateFile}>download file</button>
    </>
  );
};

export default Converter;
