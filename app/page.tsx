"use client";
import DatePicker from "@/components/Datepicker/Datepicker";
import RecurrenceOptions from "@/components/RecurrenceOptions/RecurranceOptions";
import MiniCalendar from "@/components/Minicalender/MiniCalendar";
import { useRecurrence } from "@/context/RecurranceContext";

export default function Home() {
  const { recurrence } = useRecurrence();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">Recurring Date Picker</h1>
      <DatePicker />
      {recurrence.startDate && recurrence.endDate ? (
        <div className="flex justify-between">
          <RecurrenceOptions />
          <MiniCalendar />
        </div>
      ) : (
        <div className="border h-[70vh] border-dashed rounded-lg flex justify-center items-center">
          <p className="text-xl font-medium">
            Please pick a start and a end date to see the recurrence pattern
          </p>
        </div>
      )}
    </div>
  );
}
