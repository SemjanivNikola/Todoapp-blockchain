import Vue from "vue";
import Vuex from "vuex";
import Web3 from 'web3'
import contract from "@truffle/contract";

import TodoListContract from "../../build/contracts/TodoList.json";

const CONTRACT_ADDRESS = "0xCC7E7D31e47bBa3067D5b113Ed40d0760B37895c";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    account: null,
    web3Provider: null,
    loading: false,
    contract: null,
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
    },
    setContract(state, payload) {
      state.contract = payload;
    }
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    getAccount(state) {
      return state.account;
    },
    getContract(state) {
      return state.contract;
    }
  },
  actions: {
    async process({ dispatch, commit }) {
      commit("setLoading", true);
      try {
        await dispatch("loadWeb3");
        await dispatch("loadAccount");
        await dispatch("loadContract");
        commit("setLoading", false);
      } catch (error) {
        console.warn("Error on process: ", error);
      }
    },
    async loadWeb3({ commit }) {
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        const provider = new Web3.providers.HttpProvider("http://localhost:7545");
        commit("setProvider", provider);
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
    async loadContract({ state, commit }) {
      const todoContract = contract(TodoListContract);
      todoContract.setProvider(state.web3Provider);
      
      commit("setContract", todoContract);
    },
    getContractInstance ({getters}) {
      const todoContract = getters.getContract;
      return todoContract.at(CONTRACT_ADDRESS);
    }
  },
});
