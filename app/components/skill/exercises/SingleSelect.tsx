interface SingleSelectProps {
  options: string[];
  selected: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SingleSelect({ options, selected, onChange, disabled }: SingleSelectProps) {
  return (
    <div className="h-full flex flex-col justify-center max-w-3xl mx-auto">
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            disabled={disabled}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all
              ${selected === option 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 