
module.exports = {

  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none) | 가나쉬 
     network_id: "*",       // Any network (default: none)
    },

  },

  compilers: {
    solc: {
      version: "0.8.13",  // 솔리디티 버전
    }
  },
};
