import React, { ReactNode } from 'react';
import "./TableStyle.css"

export interface TableColumns {
    ColumnsTitle: string[];
}

export interface TableRow {
    userlogin: string;
    usercreatetime: string;
    userlogintime: string;
}

export class Table extends React.Component {
    columns: TableColumns;
    rows: TableRow[];
    constructor(columns: TableColumns, rows: TableRow[]) {
        super(rows, columns);
        this.columns = columns;
        this.rows = rows;
    }

    render(): ReactNode {
        return (
            <table>
                <thead>
                    <tr>
                        {
                            this.columns.ColumnsTitle.map(function (columntitle: string, index: number): ReactNode {
                                return <th key={"th" + index}>{columntitle}</th>;
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.rows.map(function (value: TableRow, index: number): ReactNode {
                        return (
                            <tr key={"tb" + index}>
                                <td>{value.userlogin}</td>
                                <td>{value.usercreatetime}</td>
                                <td>{value.userlogintime}</td>
                            </tr>
                         )
                    })
                    }
                </tbody>
            </table>
        )
    }
}

export default Table;