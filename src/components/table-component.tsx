"use client";
import { PrismaMapper, deleteRecordById, updateGame } from "@/lib/actions";
import { booleanToYesNo, pathMapper } from "@/lib/util";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "./modal";
import { set } from "zod";
type RowEditable = {
  name: string;
  options?: Record<string, string>[];
};

export type Row = Record<string, string | number> & { id: string }[];
type TableComponentProps = {
  headingColumns: string[];
  rows: Row[];
  editableFields?: RowEditable[];
  updateFn?: (
    id: string,
    values: Record<string, string | number>
  ) => Promise<void>;
};
const TableComponent = ({
  rows,
  headingColumns,
  editableFields,
  updateFn,
}: TableComponentProps) => {
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] =
    useState<Record<string, Record<string, string | number>>>();
  const pathname = usePathname();
  const isEditable = editableFields && editableFields.length > 0;
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    rowKey: string | number
  ) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [rowKey]: { ...prevValues?.[rowKey], [name]: value },
    }));
  };
  const getInputOrSelect = (key: string, val: string, row: Row) => {
    val = val === "false" ? "No" : val;
    val = val === "true" ? "Si" : val;
    let options = editableFields?.find((item) => item.name === key)?.options;
    if (pathname === "/dashboard/games" && key === "teamWinnerName") {
      options = [
        { name: row["teamA"] as string },
        { name: row["teamB"] as string },
      ];
    }

    if (options) {
      return (
        <select
          name={key}
          value={
            values?.[row.id]?.[key]
              ? String(values?.[row.id]?.[key] ?? "")
              : val
          }
          onChange={(e) => handleOnChange(e, row.id)}
        >
          <option>selecciona</option>
          {options.map((option, idx) => (
            <option key={idx} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      );
    }
    return (
      <input
        type="text"
        name={key}
        value={
          values?.[row.id]?.[key] ? String(values?.[row.id]?.[key] ?? "") : val
        }
        onChange={(e) => handleOnChange(e, row.id)}
      />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th></th>
            {headingColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {rows &&
            rows.map((row, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                {Object.entries(row).map(([key, val], index) => (
                  <td key={index}>
                    {editMode &&
                    isEditable &&
                    editableFields?.map((item) => item.name).includes(key)
                      ? getInputOrSelect(key, String(val), row)
                      : typeof val === "boolean"
                      ? booleanToYesNo(val)
                      : key !== "id" && String(!!val ? val : "N/A")}
                  </td>
                ))}
                <td>
                  <div className="flex gap-4">
                    {isEditable && (
                      <button
                        className="btn btn-outline"
                        onClick={async () => {
                          if (editMode && "id" in row && !!values && updateFn) {
                            await updateFn(row.id as string, values[row.id]);
                          }
                          setEditMode(!editMode);
                          setValues({});
                        }}
                      >
                        {editMode ? "guardar" : "editar"}
                      </button>
                    )}
                    <Modal btnText="eliminar" btnCls="btn-outline  btn-error">
                      <div className="flex flex-col gap-4 p-2">
                        <kbd className="kbd kbd-md">
                          Estas seguro q deseas eliminar este registro?
                        </kbd>
                        <button
                          className="btn btn-outline  btn-error w-fit"
                          onClick={() => {
                            if ("id" in row) {
                              deleteRecordById(
                                row.id as string,
                                pathname,
                                pathMapper[
                                  pathname as keyof typeof pathMapper
                                ] as PrismaMapper
                              );
                            }
                          }}
                        >
                          eliminar
                        </button>
                      </div>
                    </Modal>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
