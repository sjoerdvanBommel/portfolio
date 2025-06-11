import { CurrentTime } from '../current-time';

export function MainThreadBlocker() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center w-fit gap-4 p-6 my-6 rounded-lg dashed-border bg-gray-50 dark:bg-gray-900/50">
        <button
          className="cursor-pointer bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-md font-medium transition-colors duration-200"
          onClick={() => {
            const start = Date.now();
            while (Date.now() - start < 1000 + Math.random() * 2000) {
              // Busy wait: this blocks the main thread
            }
          }}
        >
          Synchronous call
        </button>
        <div className="text-lg w-28 flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <CurrentTime />
        </div>
      </div>
    </div>
  );
}
