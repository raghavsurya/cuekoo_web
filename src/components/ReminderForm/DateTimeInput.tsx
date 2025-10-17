import DatePicker from "react-datepicker";

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateTimeInput({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Event Date & Time
      </label>
      <DatePicker
        selected={value}
        onChange={(date) => date && onChange(date)}
        showTimeSelect
        dateFormat="Pp"
        className="border rounded-lg p-2 w-full"
      />
    </div>
  );
}
