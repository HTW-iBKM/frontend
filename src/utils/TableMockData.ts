import {v4 as uuidv4} from "uuid";
import {getFormattedDate} from "./utility";
import {FileData} from "../sites/files/Files";

export const TableMockData = ():FileData[] => [
  {
    id: uuidv4(),
    fileType: "png",
    fileName: "PNG-Datei-#1.png",
    fileSize: 1,
    fileSizeUnit: "MB",
    fileDateCreated: getFormattedDate(new Date()),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "csv",
    fileName: "CSV-Datei-#1.csv",
    fileSize: 580,
    fileSizeUnit: "KB",
    fileDateCreated: getFormattedDate(new Date('2019-07-13')),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "csv",
    fileName: "CSV-Datei-#2.csv",
    fileSize: 666,
    fileSizeUnit: "KB",
    fileDateCreated: getFormattedDate(new Date('2020-01-20')),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "png",
    fileName: "PNG-Datei-#2.png",
    fileSize: 580,
    fileSizeUnit: "KB",
    fileDateCreated: getFormattedDate(new Date('2019-07-13')),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "png",
    fileName: "PNG-Datei-#3.png",
    fileSize: 2,
    fileSizeUnit: "MB",
    fileDateCreated: getFormattedDate(new Date('2021-07-20')),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "csv",
    fileName: "CSV-Datei-#3.csv",
    fileSize: 56,
    fileSizeUnit: "MB",
    fileDateCreated: getFormattedDate(new Date('2021-08-12')),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "png",
    fileName: "PNG-Datei-#4.png",
    fileSize: 1.5,
    fileSizeUnit: "MB",
    fileDateCreated: getFormattedDate(new Date('2021-02-01')),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "csv",
    fileName: "CSV-Datei-#4-mit-längerem-titel.csv",
    fileSize: 128,
    fileSizeUnit: "GB",
    fileDateCreated: getFormattedDate(new Date('2021-08-12')),
    fileUrl: "test",
  },
  {
    id: uuidv4(),
    fileType: "png",
    fileName: "PNG-Datei-#5-mit-längerem-titel.png",
    fileSize: 12,
    fileSizeUnit: "MB",
    fileDateCreated: getFormattedDate(new Date('2022-01-01')),
    fileUrl: "test",
  },
];