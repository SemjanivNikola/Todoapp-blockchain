pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    string category;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    string category,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  function createTask(string memory _content, string memory _category) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, _category, false);
    emit TaskCreated(taskCount, _content, _category, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

  function deleteTask(uint _id) public {
    delete tasks[_id];
  }

}