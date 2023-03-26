module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/collections',
      },
    ];
  },
};
