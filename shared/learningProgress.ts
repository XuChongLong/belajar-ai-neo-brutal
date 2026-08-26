export type WrongQuizQuestion = {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  materialId: number;
  materialTitle: string;
};

export type QuizAttempt = {
  score: number;
  total: number;
  percentage: number;
  lastAttemptAt: string;
};

export type LearningActivityType = "lesson-completed" | "lesson-read" | "quiz-completed" | "flashcard-mastered";

export type LearningActivity = {
  id: string;
  type: LearningActivityType;
  materialId: number | null;
  occurredAt: number;
};

export type ProjectEvidence = {
  checked: string[];
  reflection: string;
  updatedAt: string;
};

export type CoursePortfolio = {
  narrative: string;
  selectedEvidence: string[];
  updatedAt: string;
};

export type NpcProgressSnapshot = {
  activePet: "cat" | "dog" | "unicorn" | "robot";
  xp: Record<"cat" | "dog" | "unicorn" | "robot", number>;
  earnedMilestones: Record<"cat" | "dog" | "unicorn" | "robot", ("bayi" | "anak" | "remaja" | "prima" | "dewasa")[]>;
  popupEnabled: boolean;
  popupPosition: { x: number; y: number };
  foodInventory: number;
  snackCoins: number;
  ownedAccessories: ("bow" | "glasses" | "crown")[];
  equippedAccessory: "bow" | "glasses" | "crown" | null;
  audioEnabled: boolean;
  daily: {
    date: string;
    feedings: number;
    plays: number;
    miniGameRounds: number;
    miniGameBestScore: number;
    miniGameCoinsClaimed: number;
    questProgress: { lessons: number; quizCorrect: number; flashcards: number };
    claimedQuestIds: ("lesson" | "quiz" | "flashcard")[];
  };
};

export type LearningProgressSnapshot = {
  completed: number[];
  bookmarks: number[];
  scores: Record<number, number>;
  quizAttempts: Record<string, QuizAttempt>;
  wrongQuizQuestions: Record<string, WrongQuizQuestion[]>;
  chapterReadLessons: Record<number, number[]>;
  flashcardKnown: string[];
  flashcardReviewQueue: string[];
  selectedGoal: string | null;
  npc: NpcProgressSnapshot;
  current: number;
  streak: number;
  lastVisit: string;
  activityHistory: LearningActivity[];
  weeklyGoal: number;
  projectEvidence: Record<string, ProjectEvidence>;
  coursePortfolio: Record<string, CoursePortfolio>;
};

export function createEmptyLearningProgress(): LearningProgressSnapshot {
  return {
    completed: [],
    bookmarks: [],
    scores: {},
    quizAttempts: {},
    wrongQuizQuestions: {},
    chapterReadLessons: {},
    flashcardKnown: [],
    flashcardReviewQueue: [],
    selectedGoal: null,
    npc: {
      activePet: "cat",
      xp: { cat: 0, dog: 0, unicorn: 0, robot: 0 },
      earnedMilestones: { cat: ["bayi"], dog: ["bayi"], unicorn: ["bayi"], robot: ["bayi"] },
      popupEnabled: false,
      popupPosition: { x: 0.83, y: 0.76 },
      foodInventory: 0,
      snackCoins: 0,
      ownedAccessories: [],
      equippedAccessory: null,
      audioEnabled: true,
      daily: { date: "", feedings: 0, plays: 0, miniGameRounds: 0, miniGameBestScore: 0, miniGameCoinsClaimed: 0, questProgress: { lessons: 0, quizCorrect: 0, flashcards: 0 }, claimedQuestIds: [] },
    },
    current: 1,
    streak: 0,
    lastVisit: "",
    activityHistory: [],
    weeklyGoal: 5,
    projectEvidence: {},
    coursePortfolio: {},
  };
}
