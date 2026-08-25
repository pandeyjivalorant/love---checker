/**
 * Lover Percentile API Service Layer
 * 
 * This module contains all future backend communication.
 * Currently returns mock data with simulated network delay.
 * 
 * To connect a real backend later, replace the mock implementations
 * with actual fetch/axios calls — no UI changes needed.
 */

/**
 * Returns the 6 love questions.
 * In the future, this will fetch from the backend.
 * @returns {Promise<Array>} Array of question objects
 */
export async function getQuestions() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    {
      id: 1,
      text: 'Who fell in love first?',
      options: ['Me ❤️', 'Them 🥹', 'Both of us 💕']
    },
    {
      id: 2,
      text: 'Who is more likely to say "I miss you" first?',
      options: ['Me', 'Them', 'Both']
    },
    {
      id: 3,
      text: 'Who understands the other person without needing many words?',
      options: ['Me', 'Them', 'Both']
    },
    {
      id: 4,
      text: 'Who would travel the farthest just to see the other person?',
      options: ['Me ✈️', 'Them 🥹', 'We both would ❤️']
    },
    {
      id: 5,
      text: 'Who is more likely to start a random late-night conversation?',
      options: ['Me 🌙', 'Them 🌙', 'Both 😂']
    },
    {
      id: 6,
      text: "What's the one thing that makes your connection special?",
      options: ['Our understanding', 'Our chemistry', 'Our memories']
    }
  ];
}

/**
 * Calculate the lover percentile.
 * 
 * In the future, this will POST to the backend which handles:
 * - Name processing & matching alphabets
 * - Matched = 2, unmatched = 1
 * - LOVE = 1,1,1,1
 * - Left-to-right addition/reduction
 * - Question-answer scoring
 * - Final percentile calculation
 * 
 * The frontend NEVER implements this algorithm.
 * 
 * @param {{ name1: string, name2: string, answers: string[] }} data
 * @returns {Promise<{ percentile: number, nameSync: number, connection: number, loveEnergy: number, questionChemistry: number }>}
 */
export async function calculateLoverPercentile({ name1, name2, answers }) {
  try {
    const response = await fetch('https://lover-percentile-api.onrender.com/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name1, name2, answers })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to calculate lover percentile:', error);
    throw error;
  }
}
