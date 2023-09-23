import { ReactElement, ReactNode } from "react";

const TableTh: React.FC<{ children: ReactNode }> = (props) => {
    return <th className="border border-slate-300 p-3 bg-blue-300 text-white">
        {props.children}
    </th>
}

export default TableTh;