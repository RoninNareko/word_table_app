import React from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const DocxReader = () => {
  const showFile = async (e: any) => {
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

  return <input type="file" onChange={showFile} name="docx-reader" />;
};

export default DocxReader;
