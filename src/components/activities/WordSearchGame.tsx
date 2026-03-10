import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, RotateCcw, Sparkles, Undo2, XCircle } from 'lucide-react';
import type { WordSearchActivity } from '../../data/activitiesData';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface WordSearchGameProps {
  activity: WordSearchActivity;
  onComplete: () => void;
}

interface CellPos {
  row: number;
  col: number;
}

const toCellKey = (row: number, col: number) => `${row},${col}`;
const sameCell = (a: CellPos, b: CellPos) => a.row === b.row && a.col === b.col;

function isAdjacent(a: CellPos, b: CellPos): boolean {
  const rowDiff = Math.abs(a.row - b.row);
  const colDiff = Math.abs(a.col - b.col);
  return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
}

function isPathPrefix(path: CellPos[], fullPath: CellPos[]): boolean {
  if (path.length > fullPath.length) return false;
  for (let index = 0; index < path.length; index++) {
    if (!sameCell(path[index], fullPath[index])) return false;
  }
  return true;
}

function isExactPath(path: CellPos[], fullPath: CellPos[]): boolean {
  return path.length === fullPath.length && isPathPrefix(path, fullPath);
}

function buildWordPaths(grid: string[][], word: string): CellPos[][] {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const target = word.toUpperCase().split('');
  const results: CellPos[][] = [];

  if (rows === 0 || cols === 0 || target.length === 0) {
    return results;
  }

  const directions = [
    { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
    { row: 0, col: -1 },                       { row: 0, col: 1 },
    { row: 1, col: -1 },  { row: 1, col: 0 }, { row: 1, col: 1 },
  ];

  const dfs = (
    row: number,
    col: number,
    index: number,
    path: CellPos[],
    visited: Set<string>
  ) => {
    if (index === target.length - 1) {
      results.push([...path]);
      return;
    }

    for (const direction of directions) {
      const nextRow = row + direction.row;
      const nextCol = col + direction.col;

      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) continue;

      const key = toCellKey(nextRow, nextCol);
      if (visited.has(key)) continue;

      const letter = grid[nextRow][nextCol].toUpperCase();
      if (letter !== target[index + 1]) continue;

      visited.add(key);
      path.push({ row: nextRow, col: nextCol });
      dfs(nextRow, nextCol, index + 1, path, visited);
      path.pop();
      visited.delete(key);
    }
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col].toUpperCase() !== target[0]) continue;

      const key = toCellKey(row, col);
      dfs(row, col, 0, [{ row, col }], new Set([key]));
    }
  }

  return results;
}

export function WordSearchGame({ activity, onComplete }: WordSearchGameProps) {
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [selectedPath, setSelectedPath] = useState<CellPos[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>({
    type: 'info',
    text: 'Selecciona letras una por una para formar cada palabra.',
  });

  const wordPathsByWord = useMemo(() => {
    const map: Record<string, CellPos[][]> = {};
    for (const word of activity.words) {
      map[word] = buildWordPaths(activity.grid, word);
    }
    return map;
  }, [activity.grid, activity.words]);

  const solvableWords = useMemo(
    () => activity.words.filter((word) => (wordPathsByWord[word]?.length ?? 0) > 0),
    [activity.words, wordPathsByWord]
  );

  const unsolvableWords = useMemo(
    () => activity.words.filter((word) => !solvableWords.includes(word)),
    [activity.words, solvableWords]
  );

  const foundCount = foundWords.size;
  const totalTargetWords = solvableWords.length;
  const progressPercent = totalTargetWords === 0 ? 100 : Math.round((foundCount / totalTargetWords) * 100);

  const selectedCellKeys = useMemo(
    () => new Set(selectedPath.map((cell) => toCellKey(cell.row, cell.col))),
    [selectedPath]
  );

  const currentAttempt = useMemo(
    () => selectedPath.map((cell) => activity.grid[cell.row][cell.col]).join(''),
    [selectedPath, activity.grid]
  );

  const completeGameIfNeeded = (nextFoundWords: Set<string>) => {
    if (nextFoundWords.size === totalTargetWords && totalTargetWords > 0) {
      setIsComplete(true);
      setTimeout(() => onComplete(), 1400);
    }
  };

  const clearSelection = (message?: string) => {
    setSelectedPath([]);
    if (message) {
      setFeedback({ type: 'info', text: message });
    }
  };

  const evaluatePath = (path: CellPos[]) => {
    let prefixExists = false;
    let matchedWord: string | null = null;

    for (const word of solvableWords) {
      if (foundWords.has(word)) continue;

      for (const candidatePath of wordPathsByWord[word]) {
        if (isPathPrefix(path, candidatePath)) {
          prefixExists = true;
        }

        if (isExactPath(path, candidatePath)) {
          matchedWord = word;
          return { prefixExists: true, matchedWord };
        }
      }
    }

    return { prefixExists, matchedWord };
  };

  const tryCommitClick = (cell: CellPos) => {
    if (isComplete) return;

    if (selectedPath.length === 0) {
      const firstPath = [cell];
      const { prefixExists } = evaluatePath(firstPath);

      if (!prefixExists) {
        setFeedback({ type: 'error', text: 'Esa letra no inicia ninguna palabra pendiente.' });
        return;
      }

      setSelectedPath(firstPath);
      setFeedback({ type: 'info', text: 'Buen inicio. Sigue tocando letras adyacentes.' });
      return;
    }

    const lastCell = selectedPath[selectedPath.length - 1];
    if (sameCell(lastCell, cell)) return;

    if (selectedPath.some((item) => sameCell(item, cell))) {
      setFeedback({ type: 'error', text: 'Esa letra ya esta en tu intento actual.' });
      return;
    }

    if (!isAdjacent(lastCell, cell)) {
      setFeedback({ type: 'error', text: 'Debes seleccionar una letra adyacente.' });
      return;
    }

    const nextPath = [...selectedPath, cell];
    const { prefixExists, matchedWord } = evaluatePath(nextPath);

    if (!prefixExists) {
      setSelectedPath([]);
      setFeedback({ type: 'error', text: 'Ese camino no forma una palabra valida. Intenta otra vez.' });
      return;
    }

    setSelectedPath(nextPath);

    if (!matchedWord) {
      setFeedback({ type: 'info', text: `Intento actual: ${nextPath.length} letras.` });
      return;
    }

    const nextFoundWords = new Set(foundWords);
    nextFoundWords.add(matchedWord);
    setFoundWords(nextFoundWords);

    setFoundCells((prev) => {
      const next = new Set(prev);
      nextPath.forEach((pathCell) => next.add(toCellKey(pathCell.row, pathCell.col)));
      return next;
    });

    setSelectedPath([]);
    setFeedback({ type: 'success', text: `Encontraste: ${matchedWord}` });
    completeGameIfNeeded(nextFoundWords);
  };

  const undoLastLetter = () => {
    if (selectedPath.length === 0) return;
    setSelectedPath((prev) => prev.slice(0, -1));
    setFeedback({ type: 'info', text: 'Se eliminó la ultima letra del intento.' });
  };

  return (
    <Card className="p-6 md:p-8 rounded-3xl border-none shadow-lg space-y-6">
      <Card className="p-5 rounded-2xl border-none bg-gradient-to-r from-primary/10 via-card to-accent/10">
        <h3 className="text-2xl font-semibold mb-1">{activity.title}</h3>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        <div className="mt-4">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {foundCount}/{totalTargetWords} palabras encontradas
          </p>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <Card className="p-3 sm:p-4 rounded-2xl border border-border/70 bg-secondary/40">
          <div
            className="inline-grid gap-1"
            style={{ gridTemplateColumns: `repeat(${activity.grid[0].length}, minmax(0, 1fr))` }}
          >
            {activity.grid.map((row, rowIndex) =>
              row.map((letter, colIndex) => {
                const key = toCellKey(rowIndex, colIndex);
                const isFound = foundCells.has(key);
                const isInSelection = selectedCellKeys.has(key) && !isFound;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => tryCommitClick({ row: rowIndex, col: colIndex })}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg font-semibold text-sm sm:text-base transition-all border ${
                      isFound
                        ? 'bg-primary text-primary-foreground border-primary'
                        : isInSelection
                        ? 'bg-accent text-accent-foreground border-accent shadow-[0_0_0_2px_hsl(var(--accent)/0.35)] scale-[1.03]'
                        : 'bg-card border-border hover:bg-secondary/40'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>
        </Card>

        <div className="space-y-3">
          <Card className="p-4 rounded-2xl border border-border/70">
            <h4 className="font-semibold mb-3">Palabras objetivo</h4>
            <div className="flex flex-wrap gap-2">
              {activity.words.map((word) => {
                const isFound = foundWords.has(word);
                const isUnsolvable = unsolvableWords.includes(word);
                return (
                  <Badge
                    key={word}
                    variant={isFound ? 'default' : 'outline'}
                    className={`px-3 py-1 rounded-full ${
                      isFound ? 'bg-primary text-primary-foreground' : isUnsolvable ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="inline-flex items-center gap-1.5">
                      {isFound && <CheckCircle2 className="w-3 h-3" />}
                      {!isFound && isUnsolvable && <AlertTriangle className="w-3 h-3" />}
                      <span className={isFound ? 'line-through decoration-2 decoration-primary-foreground/80' : ''}>
                        {word}
                      </span>
                    </div>
                  </Badge>
                );
              })}
            </div>
          </Card>

          {selectedPath.length > 0 && (
            <Card className="p-4 rounded-2xl border border-border/70 bg-secondary/40 space-y-3">
              <p className="text-xs text-muted-foreground">Intento actual</p>
              <p className="font-semibold tracking-wide">{currentAttempt}</p>
              <div className="flex gap-2">
                <Button onClick={undoLastLetter} variant="outline" className="rounded-full flex-1 gap-2">
                  <Undo2 className="w-4 h-4" />
                  <span>Deshacer</span>
                </Button>
                <Button onClick={() => clearSelection('Intento limpiado.')} variant="outline" className="rounded-full flex-1 gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Limpiar</span>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {feedback && (
        <Card
          className={`p-4 rounded-2xl border ${
            feedback.type === 'success'
              ? 'bg-primary/10 border-primary/40'
              : feedback.type === 'error'
              ? 'bg-destructive/10 border-destructive/40'
              : 'bg-secondary border-border'
          }`}
        >
          <div className="flex items-center gap-2 text-sm">
            {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-primary" />}
            {feedback.type === 'error' && <XCircle className="w-4 h-4 text-destructive" />}
            {feedback.type === 'info' && <Info className="w-4 h-4 text-muted-foreground" />}
            <span>{feedback.text}</span>
          </div>
        </Card>
      )}

      {isComplete && (
        <Card className="p-6 rounded-2xl text-center bg-primary/10 border-primary/40 space-y-2">
          <Sparkles className="w-9 h-9 mx-auto text-primary" />
          <h4 className="text-xl font-semibold">Sopa completada</h4>
          <p className="text-sm text-muted-foreground">Encontraste todas las palabras disponibles.</p>
        </Card>
      )}
    </Card>
  );
}
