import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const Spreadsheet = () => {
  const generateDatesForJanuary = () => {
    const dates = [];
    for (let day = 1; day <= 31; day++) {
      dates.push(`2024-01-${day.toString().padStart(2, "0")}`);
    }
    return dates;
  };

  const generateRandomUsers = (count: number) => {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(`Firefighter ${i + 1}`);
    }
    return users;
  };

  const calculateWorkingHoursForUsers = (userCount: number) => {
    const workingHoursForAllUsers = Array.from({ length: userCount }, () => Array(31).fill(null));
    const serviceDays = [];

    for (let day = 1; day <= 31; day += 3) {
      serviceDays.push(day);
    }

    const firefighterRotation = Array.from({ length: userCount }, (_, i) => i);
    let rotationIndex = 0;

    serviceDays.forEach((serviceDay) => {
      const selectedFirefighters = [];

      while (selectedFirefighters.length < 3) {
        selectedFirefighters.push(firefighterRotation[rotationIndex++ % userCount]);
      }

      selectedFirefighters.forEach((firefighter) => {
        workingHoursForAllUsers[firefighter][serviceDay - 1] = 16;
        if (serviceDay < 31) {
          workingHoursForAllUsers[firefighter][serviceDay] = 8;
        }
      });
    });

    return workingHoursForAllUsers;
  };

  const users = generateRandomUsers(5);
  const dates = generateDatesForJanuary();
  const workingHoursForUsers = calculateWorkingHoursForUsers(users.length);

  const calculateTotalHours = (hoursArray: (number | null)[]) => {
    return hoursArray.reduce((sum, hours) => sum! + (hours || 0), 0);
  };

  return (
    <div className="w-[90vw] overflow-x-auto mx-auto mt-10">
      <Table className="border">
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead>Użytkownik</TableHead>
            {dates.map((date) => (
              <TableHead key={date}>{date}</TableHead>
            ))}
            <TableHead>Total Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {users.map((user, userIndex) => (
            <React.Fragment key={user}>
              <TableRow>
                <TableCell rowSpan={2}>{user}</TableCell>
                {workingHoursForUsers[userIndex].map((hours, index) => (
                  <TableCell key={`hours-${user}-${dates[index]}`}>{hours}</TableCell>
                ))}
                <TableCell>{calculateTotalHours(workingHoursForUsers[userIndex])}</TableCell>
              </TableRow>
              <TableRow>
                {dates.map((date) => (
                  <TableCell key={`input-${user}-${date}`}>
                    <input type="text" className="w-full" />
                  </TableCell>
                ))}
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Spreadsheet;
