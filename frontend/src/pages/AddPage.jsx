import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddPage.css";

function AddPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "",
    parent: "",
    status: "規劃中",
    completion: "",
    description: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
     const response = await axios.get("https://actiwaki-system.onrender.com/api/tasks", {
      withCredentials: true
    });
      setTasks(response.data);
    } catch (error) {
      console.error("無法取得任務資料", error);
    }
  };

  const handleChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditTask((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://actiwaki-system.onrender.com/api/tasks", newTask);
      setNewTask({
        name: "",
        priority: "",
        parent: "",
        status: "規劃中",
        completion: "",
        description: ""
      });
      fetchTasks();
    } catch (error) {
      console.error("新增任務失敗", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://actiwaki-system.onrender.com/api/tasks/${id}`, editTask);
      setEditIndex(null);
      fetchTasks();
    } catch (error) {
      console.error("更新任務失敗", error);
    }
  };

  return (
    <div className="add-page">
      <h3>新增任務</h3>
      <div className="form-row">
        <label>任務名稱</label>
        <input name="name" value={newTask.name} onChange={handleChange} />

        <label>重要度</label>
        <input name="priority" value={newTask.priority} onChange={handleChange} />

        <label>母項目</label>
        <input name="parent" value={newTask.parent} onChange={handleChange} />

        <label>狀態</label>
        <select name="status" value={newTask.status} onChange={handleChange}>
          <option>規劃中</option>
          <option>進行中</option>
          <option>已完成</option>
        </select>

        <button onClick={handleSubmit}>送出</button>
      </div>

      <h3>任務列表</h3>
      {tasks.map((task, index) => (
        <div key={task.id} className="task-item">
          {editIndex === index ? (
            <>
              <div className="edit-grid">
                <div>
                  <label>任務名稱</label>
                  <input name="name" value={editTask.name || ""} onChange={(e) => handleChange(e, true)} />
                </div>
                <div>
                  <label>序號</label>
                  <span>{task.id}</span>
                </div>
                <div>
                  <label>重要度</label>
                  <input name="priority" value={editTask.priority || ""} onChange={(e) => handleChange(e, true)} />
                </div>
                <div>
                  <label>母項目</label>
                  <input name="parent" value={editTask.parent || ""} onChange={(e) => handleChange(e, true)} />
                </div>
                <div>
                  <label>狀態</label>
                  <select name="status" value={editTask.status || ""} onChange={(e) => handleChange(e, true)}>
                    <option>規劃中</option>
                    <option>進行中</option>
                    <option>已完成</option>
                  </select>
                </div>
                <div>
                  <label>完成度</label>
                  <input name="completion" value={editTask.completion || ""} onChange={(e) => handleChange(e, true)} />
                </div>
                <div>
                  <label>敘述</label>
                  <textarea name="description" value={editTask.description || ""} onChange={(e) => handleChange(e, true)} />
                </div>
              </div>
              <button onClick={() => handleUpdate(task.id)}>更新</button>
            </>
          ) : (
            <>
              <p>任務名稱：{task.name}</p>
              <p>序號：{task.id}</p>
              <p>重要度：{task.priority}</p>
              <p>母項目：{task.parent}</p>
              <p>狀態：{task.status}</p>
              <p>完成度：{task.completion}</p>
              <p>敘述：{task.description}</p>
              <button onClick={() => { setEditIndex(index); setEditTask(task); }}>編輯</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AddPage;
