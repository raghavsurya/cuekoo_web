interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function NotesInput({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Notes
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="border rounded-lg p-2 w-full"
        placeholder="Add details..."
      />
    </div>
  );
}
