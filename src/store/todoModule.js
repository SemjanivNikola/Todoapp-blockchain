
const CONTRACT_ADDRESS = "0xCC7E7D31e47bBa3067D5b113Ed40d0760B37895c";

export default {
  state: {
    contract: null,
  },
  mutations: {
    setContract(state, payload) {
      state.contract = payload;
    }
  },
  actions: {
    getContractInstance({ getters }) {
      const todoContract = getters.getContract;
      return todoContract.at(CONTRACT_ADDRESS);
    },
  },
};
