import contract from "@truffle/contract";
import Vue from "vue";
import Vuex from "vuex";
import Web3 from 'web3';
import todoModule from "./todoModule";

import TodoListContract from "../../build/contracts/TodoList.json";

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
    },
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    getAccount(state) {
      return state.account;
    },
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
      try {
        const accList = await ethereum.request({ method: 'eth_accounts' });
        commit("setAccount", accList[0]);
      } catch (error) {
        alert("It looks like you don't have metamask extension.");
      }
    },
    async loadContract({ state, commit }) {
      const todoContract = contract(TodoListContract);
      todoContract.setProvider(state.web3Provider);

      commit("todoList/setContract", todoContract);
    },
  },
  modules: {
    todoList: {
      namespaced: true,
      ...todoModule,
    },
  },
});
