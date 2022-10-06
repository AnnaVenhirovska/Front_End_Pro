import { Table, TableColumns, TableRow } from "../Table";
import APIService from "../../services/APIService";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  let tablecolumns: TableColumns = {
    ColumnsTitle: ["Login", "Creation Time", "Last Login Time"],
  };

  const [tablerows, setRows] = useState<TableRow[]>([]);

  useEffect(() => {
    APIService.getAllUsers().then((resp) => {
      let newRows: TableRow[] = [];
      resp.forEach((columnitem) => {
        let column: TableRow = {
          userlogin: columnitem.login,
          usercreatetime: columnitem.creationTime,
          userlogintime: columnitem.lastLoginTime,
        };
        newRows.push(column);
      });

      setRows(newRows);
    });
  }, []);

  let newTable = new Table(tablecolumns, tablerows);

  return (
    <div>
      <h3>HomePage</h3>
      {newTable.render()}
    </div>
  );
};

export default HomePage;