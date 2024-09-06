"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRecurrence } from "@/context/RecurranceContext";

const MiniCalendar = () => {
  const { recurrence } = useRecurrence();
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

  useEffect(() => {
    const generateRecurringDates = () => {
      const dates = [];
      const currentDate = new Date(recurrence.startDate);
      const endDate =
        recurrence.endDate ||
        new Date(
          currentDate.getFullYear() + 10,
          currentDate.getMonth(),
          currentDate.getDate()
        );

      const getNthDayOfMonth = (
        year: number,
        month: number,
        n: number,
        day: number
      ) => {
        const date = new Date(year, month, 1);
        let count = 0;
        while (date.getMonth() === month) {
          if (date.getDay() === day) {
            count++;
            if (count === n) return new Date(date);
          }
          date.setDate(date.getDate() + 1);
        }
        return null; 
      };

      while (currentDate <= endDate) {
        switch (recurrence.pattern) {
          case "daily":
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + recurrence.interval);
            break;
          case "weekly":
            if (recurrence.specificDays && recurrence.specificDays.length > 0) {
              const weekStart = new Date(currentDate);
              console.log(weekStart);
              recurrence.specificDays.forEach((day) => {
                const specificDate = new Date(weekStart);
                console.log(specificDate);
                specificDate.setDate(specificDate.getDate() + day + 1);
                if (specificDate >= currentDate && specificDate <= endDate) {
                  dates.push(new Date(specificDate));
                }
              });
              currentDate.setDate(
                currentDate.getDate() + 7 * recurrence.interval
              );
            } else {
              dates.push(new Date(currentDate));
              currentDate.setDate(
                currentDate.getDate() + recurrence.interval * 7
              );
            }
            break;
          case "monthly":
            if (recurrence.nthDayOfMonth) {
              const { nth, day } = recurrence.nthDayOfMonth;
              const nthDay = getNthDayOfMonth(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                nth,
                day
              );
              if (nthDay && nthDay >= currentDate && nthDay <= endDate) {
                dates.push(nthDay);
              }
              currentDate.setMonth(
                currentDate.getMonth() + recurrence.interval
              );
            } else {
              dates.push(new Date(currentDate));
              currentDate.setMonth(
                currentDate.getMonth() + recurrence.interval
              );
            }
            break;
          case "yearly":
            dates.push(new Date(currentDate));
            currentDate.setFullYear(
              currentDate.getFullYear() + recurrence.interval
            );
            break;
          default:
            break;
        }
      }

      setHighlightedDates(dates);
    };

    generateRecurringDates();
  }, [recurrence]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-1/2 m-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Selected Recurring Dates
      </h2>
      <div className="custom-calendar">
        <Calendar
          className="border-none rounded-lg overflow-hidden"
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const isHighlighted = highlightedDates.some(
                (highlightedDate) =>
                  date.getDate() === highlightedDate.getDate() &&
                  date.getMonth() === highlightedDate.getMonth() &&
                  date.getFullYear() === highlightedDate.getFullYear()
              );

              if (isHighlighted) {
                return "active-tile";
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default MiniCalendar;
