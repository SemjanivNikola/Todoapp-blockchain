
const CONTRACT_ADDRESS = "0xCC7E7D31e47bBa3067D5b113Ed40d0760B37895c";

export default {
  state: {
    contract: null,
    taskList: [],
    count: 0,
  },
  mutations: {
    setContract(state, payload) {
      state.contract = payload;
    },
    setTaskList(state, payload) {
      state.taskList = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    },
    addNewTask(state, payload) {
      state.taskList.push(payload);
    },
    handleToggle(state, payload) {
      const item = state.taskList.filter(item => item.id === payload.id);
      item[0].completed = payload.value;
    }
  },
  getters: {
    getContract(state) {
      return state.contract;
    },
    getTaskList(state) {
      return state.taskList;
    },
  },
  actions: {
    getContractInstance({ getters }) {
      const todoContract = getters.getContract;
      return todoContract.at(CONTRACT_ADDRESS);
    },
    async readTaskList({ dispatch, commit, rootGetters }) {
      const instance = await dispatch("getContractInstance");
      const address = rootGetters.getAccount;

      const count = await instance.taskCount({ from: address });
      commit("setCount", count);

      const taskList = [];
      for (let i = 0; i < count; i++) {
        taskList.push(await instance.tasks(i))
      }
      commit("setTaskList", taskList);
    },
    async handleCreateTask({ dispatch, commit, rootGetters }, payload) {
      try {
        const instance = await dispatch("getContractInstance");
        const address = rootGetters.getAccount;

        const response = await instance.createTask(payload.content, payload.category, { from: address });
        commit("addNewTask", { id: response.logs[0].args.id.words[0], content: response.logs[0].args.content, commpleted: response.logs[0].args.completed, category: response.logs[0].args.category });

        return true;
      } catch (error) {
        console.warn("Error on task create: ", error);
        return false;
      }
    },
    async handleToggle({ dispatch, commit, rootGetters }, payload) {
      try {
        const instance = await dispatch("getContractInstance");
        const address = rootGetters.getAccount;

        const response = await instance.toggleCompleted(payload, { from: address });

        commit("handleToggle", { id: payload, value: response.logs[0].args.completed });

        return true;
      } catch (error) {
        console.warn("Error on task toggle: ", error);
        return false;
      }
    }
  },
};
