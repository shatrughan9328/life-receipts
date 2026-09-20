import { generateStoryFromReceipts } from '../utils/storyGenerator';
import { getLifeChapters, getChapterById } from '../utils/chapterGenerator';
import { detectPatterns, getDigitalPersonality } from '../utils/patternDetector';
import { getOverviewAnalytics } from '../utils/analytics';
import { ALL_RECEIPTS } from '../data/receipts';

/**
 * Story & Narrative Synthesis Service
 * Provides decoupled access to life chapters, stories, patterns, and digital personality.
 */
export const storyService = {
  /**
   * Synthesize narrative from an array of connected receipts
   */
  generateStory(receipts) {
    return generateStoryFromReceipts(receipts);
  },

  /**
   * Retrieve all computed life chapters
   */
  getChapters() {
    return getLifeChapters();
  },

  /**
   * Retrieve chapter by ID
   */
  getChapter(id) {
    return getChapterById(id);
  },

  /**
   * Detect unconscious behavioral patterns
   */
  getPatterns(receipts = ALL_RECEIPTS) {
    return detectPatterns(receipts);
  },

  /**
   * Retrieve digital personality archetype
   */
  getPersonality(receipts = ALL_RECEIPTS) {
    return getDigitalPersonality(receipts);
  },

  /**
   * Retrieve analytics for overview
   */
  getAnalytics(receipts = ALL_RECEIPTS) {
    return getOverviewAnalytics(receipts);
  }
};
