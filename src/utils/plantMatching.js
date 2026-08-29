const MATCH_WEIGHTS = {
  light: 30,
  careLevel: 25,
  watering: 20,
  size: 15,
  location: 10,
};

const MATCH_LABELS = {
  light: "الإضاءة المناسبة",
  careLevel: "مستوى العناية",
  watering: "احتياجات الري",
  size: "حجم النبات",
  location: "المكان المناسب",
};

export function calculatePlantMatch(answers, plant) {
  let score = 0;

  Object.entries(MATCH_WEIGHTS).forEach(([category, weight]) => {
    const userAnswer = answers[category];
    const plantPreference = plant.matchPreferences?.[category];

    if (
      userAnswer &&
      plantPreference &&
      userAnswer === plantPreference
    ) {
      score += weight;
    }
  });

  return score;
}

export function getMatchReasons(answers, plant) {
  const reasons = [];

  Object.keys(MATCH_WEIGHTS).forEach((category) => {
    const userAnswer = answers[category];
    const plantPreference = plant.matchPreferences?.[category];

    if (
      userAnswer &&
      plantPreference &&
      userAnswer === plantPreference
    ) {
      reasons.push(MATCH_LABELS[category]);
    }
  });

  return reasons;
}

export function getPlantMatches(answers, plants) {
  if (!answers || !plants || !Array.isArray(plants)) {
    return [];
  }

  return plants
    .map((plant) => {
      const matchPercentage = calculatePlantMatch(
        answers,
        plant
      );

      const matchReasons = getMatchReasons(
        answers,
        plant
      );

      return {
        ...plant,
        matchPercentage,
        matchReasons,
      };
    })
    .sort(
      (a, b) => b.matchPercentage - a.matchPercentage
    );
}

export function getBestMatch(answers, plants) {
  const matches = getPlantMatches(answers, plants);

  if (matches.length === 0) {
    return null;
  }

  return matches[0];
}

export function isStrongMatch(percentage) {
  return percentage >= 75;
}

export default getPlantMatches;