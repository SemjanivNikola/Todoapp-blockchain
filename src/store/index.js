import Vue from "vue";
import Vuex from "vuex";
import Web3 from 'web3'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    account: null,
    web3Provider: null,
    loading: false,
  },
  mutations: {
    setProvider(state, payload) {
      state.web3Provider = payload;
    },
    setAccount(state, payload) {
      state.account = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    getAccount(state) {
      return state.account;
    }
  },
  actions: {
    async process({ dispatch, commit }) {
      commit("setLoading", true);
      try {
        await dispatch("loadWeb3");
        await dispatch("loadAccount");
        commit("setLoading", false);
      } catch (error) {
        console.warn("Error on process: ", error);
      }
    },
    async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        // commit("setProvider", web3.currentProvider);
        try {
          // Request account access if needed
          await ethereum.request({ method: 'eth_requestAccounts' });

          const transactionHash = await ethereum.request({/* ... */ });
          // Handle the result
          console.log(transactionHash);
        } catch (error) {
          // User denied account access...
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
    async loadAccount({ commit }) {
      const accList = await ethereum.request({ method: 'eth_accounts' });
      commit("setAccount", accList[0]);
    },
  },
  // async loadContract() {
  //   // Create a JavaScript version of the smart contract
  //   const todoList = await $.getJSON('TodoList.json')
  //   App.contracts.TodoList = TruffleContract(todoList)
  //   App.contracts.TodoList.setProvider(App.web3Provider)

  //   // Hydrate the smart contract with values from the blockchain
  //   App.todoList = await App.contracts.TodoList.deployed()
  // }
});
