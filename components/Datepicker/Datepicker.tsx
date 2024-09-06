"use client";
import { useState } from "react";
import { useRecurrence } from "@/context/RecurranceContext";

const DatePicker = () => {
  const { recurrence, setRecurrence } = useRecurrence();
  const [startDate, setStartDate] = useState(recurrence.startDate);
  const [endDate, setEndDate] = useState(recurrence.endDate || null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setStartDate(newDate);
    setRecurrence({ ...recurrence, startDate: newDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined;
    setEndDate(newDate || null);
    setRecurrence({ ...recurrence, endDate: newDate });
  };

  return (
    <div className="p-4 flex">
      <div className="mb-4">
        <label className="me-2">Start Date:</label>
        <input
          type="date"
          value={startDate.toISOString().split("T")[0]}
          onChange={handleStartDateChange}
          className="border p-2 rounded-lg"
        />
      </div>
      <div className="ms-12">
        <label className="me-2">End Date:</label>
        <input
          type="date"
          value={endDate?.toISOString().split("T")[0] || ""}
          onChange={handleEndDateChange}
          className="border p-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default DatePicker;
