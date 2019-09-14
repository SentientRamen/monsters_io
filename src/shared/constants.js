module.exports = Object.freeze({
  PLAYER_RADIUS: 20,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 400,
  PLAYER_FIRE_COOLDOWN: 0.25,

  BULLET_RADIUS: 3,
  BULLET_SPEED: 800,
  BULLET_DAMAGE: 10,

  SCORE_BULLET_HIT: 20,
  SCORE_PER_SECOND: 1,

  TYPE_EFFECTIVE : {
    'normal': {'normal': 1, 'fight': 1, 'flying': 1, 'poison': 1, 'ground': 1, 'rock': 0.5, 'bug': 1, 'ghost': 0, 'steel': 0.5, 'fire': 1, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 1, 'ice': 1, 'dragon': 1, 'dark': 1, 'fairy': 1},
    'fight': {'normal': 2, 'fight': 1, 'flying': 0.5, 'poison': 0.5, 'ground': 1, 'rock': 2, 'bug': 0.5, 'ghost': 0, 'steel': 2, 'fire': 1, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 0.5, 'ice': 2, 'dragon': 1, 'dark': 2, 'fairy': 0.5},
    'flying': {'normal': 1, 'fight': 2, 'flying': 1, 'poison': 1, 'ground': 1, 'rock': 0.5, 'bug': 2, 'ghost': 1, 'steel': 0.5, 'fire': 1, 'water': 1, 'grass': 2, 'electric': 0.5, 'psychic': 1, 'ice': 1, 'dragon': 1, 'dark': 1, 'fairy': 1},
    'poison': {'normal': 1, 'fight': 1, 'flying': 1, 'poison': 0.5, 'ground': 0.5, 'rock': 0.5, 'bug': 1, 'ghost': 0.5, 'steel': 0, 'fire': 1, 'water': 1, 'grass': 2, 'electric': 1, 'psychic': 1, 'ice': 1, 'dragon': 1, 'dark': 1, 'fairy': 2},
    'ground': {'normal': 1, 'fight': 1, 'flying': 0, 'poison': 2, 'ground': 1, 'rock': 2, 'bug': 0.5, 'ghost': 1, 'steel': 2, 'fire': 2, 'water': 1, 'grass': 0.5, 'electric': 2, 'psychic': 1, 'ice': 1, 'dragon': 1, 'dark': 1, 'fairy': 1},
    'rock': {'normal': 1, 'fight': 0.5, 'flying': 2, 'poison': 1, 'ground': 0.5, 'rock': 1, 'bug': 2, 'ghost': 1, 'steel': 0.5, 'fire': 2, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 1, 'ice': 2, 'dragon': 1, 'dark': 1, 'fairy': 1},
    'bug': {'normal': 1, 'fight': 0.5, 'flying': 0.5, 'poison': 0.5, 'ground': 1, 'rock': 0.5, 'bug': 1, 'ghost': 0.5, 'steel': 0.5, 'fire': 0.5, 'water': 1, 'grass': 2, 'electric': 1, 'psychic': 2, 'ice': 1, 'dragon': 1, 'dark': 2, 'fairy': 0.5},
    'ghost': {'normal': 0, 'fight': 1, 'flying': 1, 'poison': 1, 'ground': 1, 'rock': 1, 'bug': 1, 'ghost': 2, 'steel': 1, 'fire': 1, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 2, 'ice': 1, 'dragon': 1, 'dark': 0.5, 'fairy': 1},
    'steel': {'normal': 1, 'fight': 1, 'flying': 1, 'poison': 1, 'ground': 1, 'rock': 2, 'bug': 1, 'ghost': 1, 'steel': 0.5, 'fire': 0.5, 'water': 0.5, 'grass': 1, 'electric': 0.5, 'psychic': 1, 'ice': 2, 'dragon': 1, 'dark': 1, 'fairy': 2},
    'fire': {'normal': 1, 'fight': 1, 'flying': 1, 'poison': 1, 'ground': 1, 'rock': 0.5, 'bug': 2, 'ghost': 1, 'steel': 2, 'fire': 0.5, 'water': 0.5, 'grass': 2, 'electric': 1, 'psychic': 1, 'ice': 2, 'dragon': 0.5, 'dark': 1, 'fairy': 1},
    'water': {'normal': 1, 'fight': 1, 'flying': 1, 'poison': 1, 'ground': 2, 'rock': 2, 'bug': 1, 'ghost': 1, 'steel': 1, 'fire': 2, 'water': 0.5, 'grass': 0.5, 'electric': 1, 'psychic': 1, 'ice': 1, 'dragon': 0.5, 'dark': 1, 'fairy': 1},
    'grass': {'normal': 1, 'fight': 1, 'flying': 0.5, 'poison': 0.5, 'ground': 2, 'rock': 2, 'bug': 0.5, 'ghost': 1, 'steel': 0.5, 'fire': 0.5, 'water': 2, 'grass': 0.5, 'electric': 1, 'psychic': 1, 'ice': 1, 'dragon': 0.5, 'dark': 1, 'fairy': 1},
    'electric': {'normal': 1, 'fight': 1, 'flying': 2, 'poison': 1, 'ground': 0, 'rock': 1, 'bug': 1, 'ghost': 1, 'steel': 0.5, 'fire': 1, 'water': 2, 'grass': 0.5, 'electric': 0.5, 'psychic': 1, 'ice': 1, 'dragon': 0.5, 'dark': 1, 'fairy': 1},
    'psychic': {'normal': 1, 'fight': 2, 'flying': 1, 'poison': 2, 'ground': 1, 'rock': 1, 'bug': 1, 'ghost': 1, 'steel': 0.5, 'fire': 1, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 0.5, 'ice': 1, 'dragon': 1, 'dark': 0, 'fairy': 1},
    'ice': {'normal': 1, 'fight': 1, 'flying': 2, 'poison': 1, 'ground': 2, 'rock': 1, 'bug': 1, 'ghost': 1, 'steel': 0.5, 'fire': 0.5, 'water': 0.5, 'grass': 2, 'electric': 1, 'psychic': 1, 'ice': 0.5, 'dragon': 2, 'dark': 1, 'fairy': 1},
    'dragon': {'normal': 1, 'fight': 1, 'flying': 1, 'poison': 1, 'ground': 1, 'rock': 1, 'bug': 1, 'ghost': 1, 'steel': 0.5, 'fire': 1, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 1, 'ice': 1, 'dragon': 2, 'dark': 1, 'fairy': 0},
    'dark': {'normal': 1, 'fight': 0.5, 'flying': 1, 'poison': 1, 'ground': 1, 'rock': 1, 'bug': 1, 'ghost': 2, 'steel': 1, 'fire': 1, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 2, 'ice': 1, 'dragon': 1, 'dark': 0.5, 'fairy': 0.5},
    'fairy': {'normal': 1, 'fight': 2, 'flying': 1, 'poison': 0.5, 'ground': 1, 'rock': 1, 'bug': 1, 'ghost': 1, 'steel': 0.5, 'fire': 0.5, 'water': 1, 'grass': 1, 'electric': 1, 'psychic': 1, 'ice': 1, 'dragon': 2, 'dark': 2, 'fairy': 1}
  },

  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },
});