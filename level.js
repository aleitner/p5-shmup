function Level(current) {
  const levels = {
    1: {
      loaded: false,
      victory: false,
      enemies: {
        health: 10,
        power: 5,
      },
      position: [
        // generate 1 enemy
        { x: 100, y: 20 },
        { x: 300, y: 50 }
      ]
    }
  };

  return levels[current];
}
