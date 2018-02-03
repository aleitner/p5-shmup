function Level(current) {
  const levels = {
    0: {
      loaded: false,
      victory: false,
      enemies: {
        health: 100,
        power: 5,
      },
      position: [
        // generate 1 enemy
        { x: 150, y: 20 },
        { x: 160, y: 30 }
      ]
    }
  };

  return levels[current];
}
