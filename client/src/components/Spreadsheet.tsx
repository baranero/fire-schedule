import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type User = {
  id: number;
};

const generateUsers = (): User[] => {
  return Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));
};

const Spreadsheet = () => {
  const [users] = useState<User[]>(generateUsers());
  const [selectedUsers, setSelectedUsers] = useState<{ [key: number]: number[] }>({});
  const [day, setDay] = useState(1);

  useEffect(() => {
    if (day > 31) return;

    const usersToSelect: number[] = [];

    if (day === 1 || day % 3 === 1) {
      let allUserIds = users.map((u) => u.id);

      const excludedDays = [day - 3];

      const priorityUsers = allUserIds.filter((id) => {
        return !excludedDays.some((d) => selectedUsers[d]?.includes(id));
      });

      while (usersToSelect.length < 2 && priorityUsers.length > 0) {
        const randomIndex = Math.floor(Math.random() * priorityUsers.length);
        usersToSelect.push(...priorityUsers.splice(randomIndex, 1));
      }

      allUserIds = allUserIds.filter((id) => !usersToSelect.includes(id));
      while (usersToSelect.length < 4 && allUserIds.length > 0) {
        const randomIndex = Math.floor(Math.random() * allUserIds.length);
        usersToSelect.push(...allUserIds.splice(randomIndex, 1));
      }
    }

    setSelectedUsers((prev) => ({ ...prev, [day]: usersToSelect }));
    setDay(day + 1);
  }, [day, users, selectedUsers]);

  const renderCellValue = (userId: number, day: number) => {
    if (day % 3 === 1 && selectedUsers[day]?.includes(userId)) return 16;
    if (day % 3 === 2 && selectedUsers[day - 1]?.includes(userId)) return 8;
    return "";
  };

  const renderTableData = () => {
    return users.map((user) => {
      let sum = 0;
      const cells = Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;
        const value = renderCellValue(user.id, day);
        sum += Number(value);
        return <TableCell key={day}>{value}</TableCell>;
      });

      return (
        <TableRow key={user.id}>
          <TableCell>User {user.id}</TableCell>
          {cells}
          <TableCell>{sum}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          {Array.from({ length: 31 }, (_, i) => (
            <TableHead key={i + 1}>Day {i + 1}</TableHead>
          ))}
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderTableData()}</TableBody>
    </Table>
  );
};

export default Spreadsheet;
