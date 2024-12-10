import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

export function ExampleCard({ example, onPlay }: { 
  example: { text: string; audio?: string }; 
  onPlay?: () => void;
}) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-3">
      <div className="flex-shrink-0 w-6 h-6 mt-1">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-sm font-medium text-blue-600">א</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="prose prose-sm" 
          dangerouslySetInnerHTML={{ __html: example.text }} 
        />
      </div>
      {example.audio && (
        <button
          onClick={onPlay}
          className="flex-shrink-0 p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <SpeakerWaveIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
} 