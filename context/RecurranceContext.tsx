"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type Recurrence = {
  pattern?: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  specificDays?: number[];
  nthDayOfMonth?: { nth: number; day: number };
  startDate: Date;
  endDate?: Date;
};

type RecurrenceContextType = {
  recurrence: Recurrence;
  setRecurrence: (recurrence: Recurrence) => void;
};

const RecurrenceContext = createContext<RecurrenceContextType | undefined>(
  undefined
);

export const RecurrenceProvider = ({ children }: { children: ReactNode }) => {
  const [recurrence, setRecurrence] = useState<Recurrence>({
    startDate: new Date(),
    interval: 1,
    pattern: "daily",
  });

  return (
    <RecurrenceContext.Provider value={{ recurrence, setRecurrence }}>
      {children}
    </RecurrenceContext.Provider>
  );
};

export const useRecurrence = () => {
  const context = useContext(RecurrenceContext);
  if (!context) {
    throw new Error("useRecurrence must be used within a RecurrenceProvider");
  }
  return context;
};
