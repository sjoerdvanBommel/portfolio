type TimelineEvent = {
  label: string;
  color?: string;
  textColor?: string;
  id: string;
};

type TimelineArrow = {
  from: string; // event id
  to: string; // event id
  type?: 'straight' | 'curve';
};

type DependencyTimelineProps = {
  events: TimelineEvent[];
  arrows: TimelineArrow[];
};

const DEFAULT_EVENT_COLOR = 'bg-yellow-800';
const DEFAULT_TEXT_COLOR = 'text-white';

export function DependencyTimeline({ events, arrows }: DependencyTimelineProps) {
  // Map event ids to their index for arrow positioning
  const eventIndex: Record<string, number> = {};
  events.forEach((e, i) => (eventIndex[e.id] = i));

  return (
    <div className="relative my-8 bg-[#18191c] rounded-xl p-8 overflow-x-auto border border-[#232428]">
      {/* Timeline line */}
      <div
        className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#232428] z-0"
        style={{ transform: 'translateY(-50%)' }}
      />
      {/* Events */}
      <div className="flex flex-row items-center justify-start gap-16 relative z-10">
        {events.map((event) => (
          <div key={event.id} className={`relative flex flex-col items-center min-w-[180px]`} style={{ zIndex: 2 }}>
            <div
              className={`rounded-xl px-8 py-4 shadow-lg border border-gray-700 ${event.color || DEFAULT_EVENT_COLOR} ${event.textColor || DEFAULT_TEXT_COLOR}`}
              style={{ fontSize: 20, fontWeight: 500 }}
            >
              {event.label}
            </div>
          </div>
        ))}
      </div>
      {/* Arrows */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
        {arrows.map((arrow, i) => {
          const fromIdx = eventIndex[arrow.from];
          const toIdx = eventIndex[arrow.to];
          if (fromIdx === undefined || toIdx === undefined) return null;
          // Calculate positions
          const gap = 16; // gap-16
          const eventWidth = 180; // min-w-[180px]
          const px = 32; // px-8
          // const py = 16; // py-4 (not used)
          // const boxHeight = 40 + py * 2; (not used)
          const y = 64; // vertical center of timeline
          const fromX = fromIdx * (eventWidth + gap) + eventWidth + px;
          const toX = toIdx * (eventWidth + gap) + px;
          let path = '';
          if (arrow.type === 'curve' || Math.abs(fromIdx - toIdx) > 1) {
            // Curve for non-adjacent or explicit curve
            const midX = (fromX + toX) / 2;
            path = `M${fromX},${y} C${midX},${y - 60} ${midX},${y + 60} ${toX},${y}`;
          } else {
            // Straight for adjacent
            path = `M${fromX},${y} L${toX},${y}`;
          }
          return (
            <path
              key={i}
              d={path}
              stroke="#fff"
              strokeWidth={3}
              fill="none"
              markerEnd="url(#arrowhead)"
              opacity={0.95}
            />
          );
        })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="12"
            markerHeight="12"
            refX="6"
            refY="6"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0,0 12,6 0,12" fill="#fff" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
