let userId = 1;
let workoutId = 1;

export function createUser(overrides = {}) {
  return {
    id: userId++,
    name: 'User ' + userId,
    email: `user${userId}@example.com`,
    ...overrides
  };
}

export function createWorkout(overrides = {}) {
  return {
    id: workoutId++,
    title: 'Workout ' + workoutId,
    description: 'A great workout',
    ...overrides
  };
}

export function createEntity(overrides = {}) {
  return {
    id: workoutId++,
    name: 'Entity ' + workoutId,
    ...overrides
  };
}