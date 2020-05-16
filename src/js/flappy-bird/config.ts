// NOTE: All computed variables are for performance

export const DEBUG = true;

export const CANVAS_ID = 'game';                // id of <canvas> html-element
export const CANVAS_WIDTH = 375;                // canvas width (html-element is set accordingly)
export const CANVAS_HEIGHT = 667;               // canvas height (html-element is set accordingly)

export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 30;
export const PLAYER_X0 = CANVAS_WIDTH / 2 - PLAYER_WIDTH;
export const PLAYER_Y0 = CANVAS_HEIGHT / 2;
export const PLAYER_VY_MAX = 15;                // max falling speed
export const PLAYER_VY_FLAP = -7;               // vy when player hits the flap key
export const PLAYER_GRAVITY = .5;               // added to vy every frame

export const PIPE_WIDTH = 90;
export const PIPE_GAP = 200;                    // y-gap between the pipes; the lower the value the harder it is
export const PIPE_VX = 3;                       // default speed at which the pipes move towards the player
export const PIPE_MAX_DY = 400;                 // max y-difference between two pipe pairs
export const PIPE_MARGIN = 20;                  // minimum pipe margin from screen boundaries
export const PIPE_SPAWN_TIMER = 100;            // number of frames after which a new pipe will be spawned

// color definitions
export const COL_PLAYER = 'yellow';
export const COL_BG = 'skyblue';
export const COL_PIPE = 'green';
export const COL_DEAD = 'red';

// keys
export const KEY_FLAP = 'ArrowUp';              // ev.code to move player up
export const KEY_PAUSE = 'Space';
