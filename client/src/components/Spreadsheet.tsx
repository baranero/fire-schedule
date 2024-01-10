import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type FirefighterRecord = {
  firefighter: number;
  [key: string]: number | null;
};

const generateDates = (year: number) => {
  const dates = [];
  for (let month = 0; month < 2; month++) {
    const daysInMonth = month === 1 ? 29 : 31;
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day).toLocaleDateString());
    }
  }
  return dates;
};

const getRandomFirefighter = (
  available: number[] = Array.from({ length: 6 }, (_, i) => i + 1)
): number[] => {
  const numbers: number[] = [];

  while (numbers.length < 2) {
    const randomNumber = Math.floor(Math.random() * available.length) + 1;

    if (!numbers.includes(available[randomNumber - 1])) {
      numbers.push(available[randomNumber - 1]);
    }
  }

  return numbers;
};

const getRandomFirefighters = (count: number): number[] => {
  const selected: number[] = [];
  while (selected.length < count) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    if (!selected.includes(randomNumber)) {
      selected.push(randomNumber);
    }
  }
  return selected;
};

const generateInitialData = (): FirefighterRecord[] => {
  const dates = generateDates(2024);
  const data: FirefighterRecord[] = [];

  const firefightersOnJanFirstAndSecond = getRandomFirefighters(4);

  let lastFirefightersOnDuty = [...firefightersOnJanFirstAndSecond];

  for (let firefighter = 1; firefighter <= 6; firefighter++) {
    const record: FirefighterRecord = { firefighter };

    dates.forEach((date, i) => {
      if (i % 3 === 0 || i % 3 === 1) {
        let firefightersOnDuty;

        if (i === 0 || i === 1) {
          firefightersOnDuty = firefightersOnJanFirstAndSecond;
        } else {
          const available = Array.from({ length: 6 }, (_, i) => i + 1).filter(
            (f) => !lastFirefightersOnDuty.includes(f)
          );

          const newFirefighters = getRandomFirefighter(available);

          firefightersOnDuty = newFirefighters.concat(lastFirefightersOnDuty.slice(0, 2));
        }

        record[date] = firefightersOnDuty.includes(firefighter) ? (i % 3 === 0 ? 16 : 8) : null;

        if (i % 3 === 1) {
          lastFirefightersOnDuty = firefightersOnDuty;
        }
      } else {
        record[date] = null;
      }
    });

    data.push(record);
  }

  return data;
};

const getFirefighterName = (number: number) => `Strażak ${number}`;

const Spreadsheet = () => {
  const data = React.useState<FirefighterRecord[]>(generateInitialData())[0];

  const headers = generateDates(2024);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nazwa</TableHead>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.firefighter}>
            <TableCell>{getFirefighterName(record.firefighter)}</TableCell>
            {headers.map((header) => (
              <TableCell key={header}>{record[header] !== null ? record[header] : ""}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Spreadsheet;
