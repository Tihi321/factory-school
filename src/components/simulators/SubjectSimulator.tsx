import React from 'react';
import {
  Simulator01Shift,
  Simulator02Alignment,
  Simulator03Specs,
  Simulator04Codebase,
  Simulator05Loops
} from './SimulatorsBatch1';
import {
  Simulator06Verification,
  Simulator07SystemOne,
  Simulator08Swarms,
  Simulator09Operate,
  Simulator10Factory
} from './SimulatorsBatch2';

export interface SubjectSimulatorProps {
  subjectId: number;
  isCompleted: boolean;
  onComplete: (bonusXp?: number) => void;
}

export const SubjectSimulator: React.FC<SubjectSimulatorProps> = ({
  subjectId,
  isCompleted,
  onComplete
}) => {
  switch (subjectId) {
    case 1:
      return <Simulator01Shift isCompleted={isCompleted} onComplete={onComplete} />;
    case 2:
      return <Simulator02Alignment isCompleted={isCompleted} onComplete={onComplete} />;
    case 3:
      return <Simulator03Specs isCompleted={isCompleted} onComplete={onComplete} />;
    case 4:
      return <Simulator04Codebase isCompleted={isCompleted} onComplete={onComplete} />;
    case 5:
      return <Simulator05Loops isCompleted={isCompleted} onComplete={onComplete} />;
    case 6:
      return <Simulator06Verification isCompleted={isCompleted} onComplete={onComplete} />;
    case 7:
      return <Simulator07SystemOne isCompleted={isCompleted} onComplete={onComplete} />;
    case 8:
      return <Simulator08Swarms isCompleted={isCompleted} onComplete={onComplete} />;
    case 9:
      return <Simulator09Operate isCompleted={isCompleted} onComplete={onComplete} />;
    case 10:
      return <Simulator10Factory isCompleted={isCompleted} onComplete={onComplete} />;
    default:
      return (
        <div className="bg-card border border-line rounded-xl p-6 text-center text-fg-muted font-mono text-sm">
          No simulator available for Subject ID #{subjectId}.
        </div>
      );
  }
};

export default SubjectSimulator;
