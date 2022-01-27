import XLSX from "xlsx";
import React, { useState, useEffect } from "react";

function handleImportExcel(file) {
    // 獲取上傳的文件對象
    const { files } = file.target;
    // 通過FileReader對象讀取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
        try {
            const { result } = event.target;
            // 以二進制流方式讀取得到整份excel表格對象
            const workbook = XLSX.read(result, { type: "binary" });
            let data = []; // 存儲獲取到的數據
            // 遍歷每張工作表進行讀取（這里默認只讀取第一張表）
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法將 excel 轉成 json 數據
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一張表，就取消注釋這行
                }
            }
            console.log(data);
        } catch (e) {
            // 這里可以拋出文件類型錯誤不正確的相關提示
            console.log("文件類型不正確");
            return;
        }
    };
    // 以二進制方式打開文件
    fileReader.readAsBinaryString(files[0]);
}

export default  {handleImportExcel} ;
