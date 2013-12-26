module.exports = {
  raw: {
    description: 'futon will only output line-delimited raw JSON (useful for piping)',
    boolean: true
  },
  colors: {
    description: '--no-colors will disable output coloring',
    default: true,
    boolean: true
  }
};
