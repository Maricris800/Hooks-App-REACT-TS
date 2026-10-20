

export interface ScrambleWordState {
    words: string[];
    currentWord: string;
    scrambledWord: string;
    guess: string;
    points: number;
    errorCounter: number;
    maxAllowErrors: number;
    skipCounter: number;
    maxSkips: number;
    isGameOver: boolean;
    totalWords: number;
}

const GAME_WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML',
  'ANGULAR',
  'SOLID',
  'NODE',
  'VUEJS',
  'SVELTE',
  'EXPRESS',
  'MONGODB',
  'POSTGRES',
  'DOCKER',
  'KUBERNETES',
  'WEBPACK',
  'VITE',
  'TAILWIND',
];


// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export const getInitialState = (): ScrambleWordState => {
  
 const shuffleWords = shuffleArray([...GAME_WORDS]);

  return {
    currentWord: shuffleWords[0],
    errorCounter: 0,
    guess: "",
    isGameOver: false,
    maxAllowErrors: 3, 
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffleWords[0]),
    skipCounter: 0,
    words: shuffleWords,
    totalWords: shuffleWords.length,
  }
}

export type ScrambleWordAction = 
  | { type: 'SET_GUESS', payload: string}
  | { type: 'CHECK_ANSWER'}
  | { type: 'SKIP_WORD'}
  | { type: 'STAR_NEW_GAME'}

export const scrambleWordReducer = (
  state: ScrambleWordState,
  action: ScrambleWordAction 
) => {
  switch (action.type) {
    case 'SET_GUESS':
      return { ...state, guess: action.payload.trim().toUpperCase() };
    case 'CHECK_ANSWER': {
      if (state.currentWord === state.guess) {
        const newWords = state.words.slice(1);
        return {
          ...state,
          points: state.points + 1,
          guess: '',
          words: newWords,
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]),
        };
      }
      return {
        ...state,
        guess: "",
        errorCounter: state.errorCounter + 1,
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      }
    }
    case 'SKIP_WORD':{
      if (state.skipCounter >= state.maxSkips) return state;
        
      const updateWords = state.words.slice(1);

      return {
        ...state,
        words: updateWords,
        skipCounter: state.skipCounter + 1,        
        currentWord: updateWords[0],
        scrambleWord: scrambleWord(updateWords[0]),
        guess: "",          
      };
      
    }
    
    case 'SET_GUESS':
    //   return { ...state, guess: action.payload };
    // case 'SET_POINTS':
    //   return { ...state, points: action.payload };
    // case 'SET_ERROR_COUNTER':
    //   return { ...state, errorCounter: action.payload };
    // case 'SET_MAX_ALLOW_ERRORS':
    //   return { ...state, maxAllowErrors: action.payload };
    // case 'SET_SKIP_COUNTER':
    //   return { ...state, skipCounter: action.payload };
    // case 'SET_MAX_SKIPS':
    //   return { ...state, maxSkips: action.payload };
    // case 'SET_IS_GAME_OVER':
    //   return { ...state, isGameOver: action.payload };
    default:
      return state;
  }
};