const STORAGE_KEY = "plantora-my-plants";

export function getMyPlants() {
  try {
    const storedPlants = localStorage.getItem(STORAGE_KEY);

    if (!storedPlants) {
      return [];
    }

    const parsedPlants = JSON.parse(storedPlants);

    return Array.isArray(parsedPlants) ? parsedPlants : [];
  } catch {
    return [];
  }
}

export function saveMyPlants(plants) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
}

export function addMyPlant(plant) {
  const currentPlants = getMyPlants();

  const exists = currentPlants.some(
    (item) => item.id === plant.id
  );

  if (exists) {
    return currentPlants;
  }

  const newPlant = {
    ...plant,
    healthStatus: plant.healthStatus || "good",
    notes: plant.notes || "",
    lastWatered: plant.lastWatered || null,
    wateringInterval: plant.wateringInterval || 7,
    addedAt: plant.addedAt || new Date().toISOString(),
  };

  const updatedPlants = [...currentPlants, newPlant];

  saveMyPlants(updatedPlants);

  return updatedPlants;
}

export function updateMyPlant(id, updates) {
  const currentPlants = getMyPlants();

  const updatedPlants = currentPlants.map((plant) =>
    plant.id === id
      ? {
          ...plant,
          ...updates,
        }
      : plant
  );

  saveMyPlants(updatedPlants);

  return updatedPlants;
}

export function deleteMyPlant(id) {
  const currentPlants = getMyPlants();

  const updatedPlants = currentPlants.filter(
    (plant) => plant.id !== id
  );

  saveMyPlants(updatedPlants);

  return updatedPlants;
}

export function markPlantAsWatered(id) {
  return updateMyPlant(id, {
    lastWatered: new Date().toISOString(),
  });
}

export function clearMyPlants() {
  localStorage.removeItem(STORAGE_KEY);
}