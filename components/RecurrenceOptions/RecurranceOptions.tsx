"use client"
import { useRecurrence } from '@/context/RecurranceContext';

const RecurrenceOptions = () => {
  const { recurrence, setRecurrence } = useRecurrence();

  const handlePatternChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecurrence({ ...recurrence, pattern: e.target.value as any });
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecurrence({ ...recurrence, interval: parseInt(e.target.value) });
  };

  const handleSpecificDaysChange = (day: number) => {
    const newDays = recurrence.specificDays?.includes(day)
      ? recurrence.specificDays.filter(d => d !== day)
      : [...(recurrence.specificDays || []), day];

    setRecurrence({ ...recurrence, specificDays: newDays });
  };

  const handleNthDayChange = (nth: number, day: number) => {
    setRecurrence({ ...recurrence, nthDayOfMonth: { nth, day } });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-1/2 m-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recurrence Options</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="pattern" className="block text-sm font-medium text-gray-700 mb-1">
            Recurrence Pattern:
          </label>
          <select
            id="pattern"
            value={recurrence.pattern}
            onChange={handlePatternChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-1">
            Interval (Every X {recurrence.pattern}):
          </label>
          <input
            id="interval"
            type="number"
            value={recurrence.interval}
            onChange={handleIntervalChange}
            min="1"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />
        </div>

        {recurrence.pattern === 'weekly' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Days of the Week:</label>
            <div className="flex space-x-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <label key={index} className="block">
                  <input
                    type="checkbox"
                    checked={recurrence.specificDays?.includes(index) || false}
                    onChange={() => handleSpecificDaysChange(index)}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        )}

        {recurrence.pattern === 'monthly' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nth Day of Month:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Nth"
                min="1"
                onChange={(e) => handleNthDayChange(parseInt(e.target.value), recurrence.nthDayOfMonth?.day || 0)}
                className="border p-2 rounded-lg"
              />
              <select
                value={recurrence.nthDayOfMonth?.day || ''}
                onChange={(e) => handleNthDayChange(recurrence.nthDayOfMonth?.nth || 0, parseInt(e.target.value))}
                className="border p-2 rounded-lg"
              >
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <option value={index} key={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
