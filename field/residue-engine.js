const ResidueEngine = (() => {
  let residues = [];

  function add(x, y, intensity) {
    residues.push({
      x,
      y,
      intensity,
      life: 1.0
    });
  }

  function decay() {
    residues.forEach(r => {
      r.life *= 0.985;
    });
    residues = residues.filter(r => r.life > 0.01);
  }

  function all() {
    return residues;
  }

  return {
    add,
    decay,
    all
  };
})();
