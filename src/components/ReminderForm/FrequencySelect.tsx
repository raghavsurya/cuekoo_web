interface Props {
  frequency: string;
  onChange: (field: "frequency" | "repeat", value: any) => void;
}

export default function FrequencySelect({ frequency, onChange }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reminder Frequency
        </label>
        <select
          value={frequency}
          onChange={(e) => onChange("frequency", e.target.value)}
          className="border rounded-lg p-2 w-40"
        >
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Repeat Every
        </label>
       
      </div>
    </div>
  );
}
