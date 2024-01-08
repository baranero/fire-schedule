import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const Spreadsheet = () => {

  function generateDatesForJanuary2024() {
    const dates = [];
    for (let day = 1; day <= 31; day++) {
      dates.push(`2024-01-${day.toString().padStart(2, '0')}`);
    }
    return dates;
  }
  
  function generateRandomUsers(count: number) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(`Użytkownik ${i + 1}`);
    }
    return users;
  }
  const dates = generateDatesForJanuary2024();
  const users = generateRandomUsers(5);

  return (
    <div className="w-[90vw] overflow-x-auto mx-auto mt-10">
      <Table className="border">
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-32">Użytkownik</TableHead>
            {dates.map(date => (
              <TableHead className="" key={date}>{date}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <React.Fragment key={user}>
              <TableRow>
                {/* Scalona komórka dla nazwy użytkownika */}
                <TableCell rowSpan={2}>{user}</TableCell>
                {dates.map(date => (
                  <TableCell key={date}>Harmonogram</TableCell>
                ))}
              </TableRow>
              <TableRow>
                {dates.map(date => (
                  <TableCell key={date}>
                    {/* Tutaj możesz użyć komponentu pola tekstowego z Shadcn UI */}
                    <input type="text" />
                  </TableCell>
                ))}
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


export default Spreadsheet;
