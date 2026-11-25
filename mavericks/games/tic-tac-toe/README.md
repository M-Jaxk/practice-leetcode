=== TIC-TAC-TOE ===

1. Game requirements
- Board size: 3 × 3.
- Two players: A and B.
- First player: A.
- Players take turns.
- Each player selects a position from 1 to 9.
- Cannot select an occupied position.
- Three matching symbols horizontally, vertically, or diagonally means a win.
- If all 9 cells are occupied without a winner, it's a draw.


Player A vs Player B

 1 | 2 | 3.   
---+---+---
 4 | 5 | 6
---+---+---
 7 | 8 | 9


3. Main game flow
START
  |
Initialize 3 × 3 board
  |
Set current player = A
  |
Display board
  |
Ask player to select position (1-9)
  |
Validate position
  |
  +---- Invalid? ---- YES ---> Display error
  |                            |
  |                            └── Ask again
  NO
  |
Place A or B
  |
Check winning combinations
  |
  +---- Winner? ---- YES ---> Display winner
  |                            |
  NO                           v
  |                           END
  v
Check draw
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
