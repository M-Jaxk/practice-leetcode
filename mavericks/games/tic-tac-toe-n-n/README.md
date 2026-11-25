=== TIC-TAC-TOE NxN ===

1. Game requirements
- Board size: N × N (default 3 × 3).
- Set the size with a CLI argument: `npm start -- 4` or `node src/index.js 5`.
- Two players: X and O.
- First player: X.
- Players take turns.
- Each player selects a position from 1 to N².
- Cannot select an occupied position.
- N matching symbols horizontally, vertically, or diagonally means a win.
- If all N² cells are occupied without a winner, it's a draw.


2. Board layout (3 × 3 example)

 1 | 2 | 3
---+---+---
 4 | 5 | 6
---+---+---
 7 | 8 | 9


3. Main game flow
START
  |
Initialize N × N board
  |
Set current player = X
  |
Display board
  |
Ask player to select position (1-N²)
  |
Validate position
  |
  +---- Invalid? ---- YES ---> Display error
  |                            |
  |                            └── Ask again
  NO
  |
Place X or O
  |
Check winning lines (N in a row)
  |
  +---- Winner? ---- YES ---> Display winner
  |                            |
  NO                           v
  |                           END
  v
Check draw (all N² cells occupied)
  |
  +---- Draw? ------ YES ---> Display draw
  |                            |
  NO                           v
  |                           END
  v
Switch player
  |
  v
Repeat
