interface MultipleSelectProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
}

export function MultipleSelect({ options, selected, onChange, disabled }: MultipleSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => toggleOption(option)}
          disabled={disabled}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all
            ${selected.includes(option)
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`
              w-5 h-5 rounded border-2 flex items-center justify-center
              ${selected.includes(option)
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'}
            `}>
              {selected.includes(option) && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {option}
          </div>
        </button>
      ))}
    </div>
  );
} 