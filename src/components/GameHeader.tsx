interface GameHeaderProps {
  name?: string;
  job?: string;
  level?: number;
  hp?: number;
  mp?: number;
}

export default function GameHeader({
  name = "Yusha Name",
  job = "Web Engineer",
  level = 28,
  hp = 95,
  mp = 80,
}: GameHeaderProps) {
  return (
    <header className="window mb-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p>NAME: {name}</p>
          <p>JOB : {job}</p>
        </div>
        <div>
          <p>LV : {level}</p>
        </div>
        <div className="w-full sm:w-1/3">
          <div className="flex items-center gap-2">
            <span className="w-8">HP</span>
            <div className="progress-bar-container w-full">
              <div className="progress-bar" style={{ width: `${hp}%` }}></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8">MP</span>
            <div className="progress-bar-container w-full">
              <div className="progress-bar mp" style={{ width: `${mp}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
