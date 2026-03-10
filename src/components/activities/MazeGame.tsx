import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Flag,
  Footprints,
  RotateCcw,
  Target,
} from 'lucide-react';
import type { MazeActivity } from '../../data/activitiesData';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface MazeGameProps {
  activity: MazeActivity;
  onComplete: () => void;
}

interface CellPos {
  row: number;
  col: number;
}

function findCell(grid: number[][], value: number): CellPos {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === value) {
        return { row, col };
      }
    }
  }
  return { row: 0, col: 0 };
}

const cellKey = (row: number, col: number) => `${row},${col}`;

export function MazeGame({ activity, onComplete }: MazeGameProps) {
  const startPos = useMemo(() => findCell(activity.grid, 2), [activity.grid]);
  const endPos = useMemo(() => findCell(activity.grid, 3), [activity.grid]);

  const [playerPos, setPlayerPos] = useState<CellPos>(startPos);
  const [visited, setVisited] = useState<Set<string>>(new Set([cellKey(startPos.row, startPos.col)]));
  const [moveCount, setMoveCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalCells = activity.grid.length * activity.grid[0].length;
  const visitedPercent = Math.round((visited.size / totalCells) * 100);

  useEffect(() => {
    setPlayerPos(startPos);
    setVisited(new Set([cellKey(startPos.row, startPos.col)]));
    setMoveCount(0);
    setIsComplete(false);
  }, [startPos]);

  const canMove = (row: number, col: number): boolean => {
    if (row < 0 || row >= activity.grid.length || col < 0 || col >= activity.grid[0].length) {
      return false;
    }
    return activity.grid[row][col] !== 1;
  };

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (isComplete) return;

    let newRow = playerPos.row;
    let newCol = playerPos.col;

    if (direction === 'up') newRow -= 1;
    if (direction === 'down') newRow += 1;
    if (direction === 'left') newCol -= 1;
    if (direction === 'right') newCol += 1;

    if (!canMove(newRow, newCol)) return;

    setPlayerPos({ row: newRow, col: newCol });
    setVisited((prev) => new Set(prev).add(cellKey(newRow, newCol)));
    setMoveCount((prev) => prev + 1);

    if (newRow === endPos.row && newCol === endPos.col) {
      setIsComplete(true);
      setTimeout(() => onComplete(), 1400);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isComplete) return;

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        move('up');
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        move('down');
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move('left');
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        move('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, move, playerPos]);

  const reset = () => {
    setPlayerPos(startPos);
    setVisited(new Set([cellKey(startPos.row, startPos.col)]));
    setMoveCount(0);
    setIsComplete(false);
  };

  return (
    <Card className="p-6 md:p-8 rounded-3xl border-none shadow-lg space-y-6">
      <Card className="p-5 rounded-2xl border-none bg-gradient-to-r from-primary/10 via-card to-accent/10">
        <h3 className="text-2xl font-semibold mb-1">{activity.title}</h3>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 rounded-2xl border border-border/70 shadow-sm bg-secondary/40">
          <p className="text-xs text-muted-foreground">Movimientos</p>
          <p className="text-xl font-bold">{moveCount}</p>
        </Card>
        <Card className="p-3 rounded-2xl border border-border/70 shadow-sm bg-secondary/40">
          <p className="text-xs text-muted-foreground">Visitadas</p>
          <p className="text-xl font-bold">{visited.size}</p>
        </Card>
        <Card className="p-3 rounded-2xl border border-border/70 shadow-sm bg-secondary/40">
          <p className="text-xs text-muted-foreground">Progreso</p>
          <p className="text-xl font-bold">{visitedPercent}%</p>
        </Card>
        <Card className="p-3 rounded-2xl border border-border/70 shadow-sm bg-secondary/40">
          <p className="text-xs text-muted-foreground">Objetivo</p>
          <p className="text-xl font-bold">Llegar</p>
        </Card>
      </div>

      <div className="flex justify-center">
        <div
          className="inline-grid gap-1 bg-secondary p-3 sm:p-4 rounded-2xl border border-border/60 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${activity.grid[0].length}, minmax(0, 1fr))` }}
        >
          {activity.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isPlayer = playerPos.row === rowIndex && playerPos.col === colIndex;
              const isVisited = visited.has(cellKey(rowIndex, colIndex));
              const isStart = rowIndex === startPos.row && colIndex === startPos.col;
              const isEnd = rowIndex === endPos.row && colIndex === endPos.col;
              const isWall = cell === 1;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-all ${
                    isWall
                      ? 'bg-foreground/90'
                      : isEnd
                      ? 'bg-primary/20 border border-primary'
                      : isStart
                      ? 'bg-accent/20 border border-accent'
                      : isVisited
                      ? 'bg-primary/10 border border-primary/30'
                      : 'bg-card border border-border'
                  }`}
                >
                  {isPlayer && (
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Footprints className="w-3.5 h-3.5" />
                    </div>
                  )}
                  {!isPlayer && isStart && <Flag className="w-4 h-4 text-accent-foreground" />}
                  {!isPlayer && isEnd && <Target className="w-4 h-4 text-primary" />}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
        <div className="inline-flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-accent/30 border border-accent" />
          <span>Inicio</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-primary/30 border border-primary" />
          <span>Meta</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-foreground/90" />
          <span>Muro</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div />
          <Button
            onClick={() => move('up')}
            disabled={isComplete}
            size="lg"
            className="w-14 h-14 rounded-xl bg-primary hover:bg-accent p-0"
            aria-label="Mover arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          <div />
          <Button
            onClick={() => move('left')}
            disabled={isComplete}
            size="lg"
            className="w-14 h-14 rounded-xl bg-primary hover:bg-accent p-0"
            aria-label="Mover izquierda"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => move('down')}
            disabled={isComplete}
            size="lg"
            className="w-14 h-14 rounded-xl bg-primary hover:bg-accent p-0"
            aria-label="Mover abajo"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => move('right')}
            disabled={isComplete}
            size="lg"
            className="w-14 h-14 rounded-xl bg-primary hover:bg-accent p-0"
            aria-label="Mover derecha"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <Button onClick={reset} variant="outline" className="rounded-full gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar camino</span>
        </Button>
      </div>

      {isComplete && (
        <Card className="p-6 rounded-2xl text-center bg-primary/10 border-primary/30 space-y-2">
          <h4 className="text-xl font-semibold">Meta alcanzada</h4>
          <p className="text-sm text-muted-foreground">
            Lo lograste en {moveCount} movimientos.
          </p>
        </Card>
      )}
    </Card>
  );
}
