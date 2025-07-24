import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const getStatusColor = (status) => {
  switch (status) {
    case "規劃中":
      return "#34a853"; // 綠
    case "進行中":
      return "#fbbc04"; // 黃
    case "已完成":
      return "#ea4335"; // 紅
    default:
      return "#9e9e9e"; // 灰
  }
};

const TreePage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetch("https://actiwaki-system.onrender.com/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setOriginalData(data);
        const sortedData = [...data].sort((a, b) => a.id - b.id);

        const idToTask = Object.fromEntries(sortedData.map((task) => [task.id, task]));
        const idToChildren = {};
        sortedData.forEach((task) => {
          if (task.parent) {
            if (!idToChildren[task.parent]) idToChildren[task.parent] = [];
            idToChildren[task.parent].push(task);
          }
        });

        const levelMap = {};
        const visited = new Set();

        const assignLevels = (task, level = 0) => {
          if (visited.has(task.id)) return;
          visited.add(task.id);
          levelMap[task.id] = level;
          const children = idToChildren[task.id] || [];
          children.forEach((child) => assignLevels(child, level + 1));
        };

        sortedData.forEach((task) => {
          if (!task.parent) assignLevels(task);
        });

        const levelCounts = {};
        const nodes = sortedData.map((task) => {
          const level = levelMap[task.id] || 0;
          levelCounts[level] = (levelCounts[level] || 0) + 1;

          return {
            id: task.id.toString(),
            position: {
              x: levelCounts[level] * 300,
              y: level * 250,
            },
            data: {
              label: (
                <div
                  style={{
                    padding: 10,
                    borderRadius: 12,
                    backgroundColor: getStatusColor(task.status),
                    color: "black",
                    fontWeight: 500,
                    minWidth: 160,
                    textAlign: "center",
                  }}
                >
                  <div><strong>ID: {task.id}</strong></div>
                  <div>{task.name || "無名"}</div>
                  <div>重要度: {task.priority || "無"}</div>
                  <div>完成度: {task.completion ?? 0}%</div>
                </div>
              ),
            },
            style: {
              border: "none",
              backgroundColor: "transparent",
            },
          };
        });

        const edges = sortedData
          .filter((task) => task.parent)
          .map((task) => ({
            id: `e${task.parent}-${task.id}`,
            source: task.parent.toString(),
            target: task.id.toString(),
            animated: true,
            style: { stroke: "#aaa" },
          }));

        setNodes(nodes);
        setEdges(edges);
      });
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    const taskId = parseInt(node.id, 10);
    const task = originalData.find((t) => t.id === taskId);
    setSelectedTask(task);
  }, [originalData]);

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#000" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.4 }}
      >
        <Background color="#444" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "blue";
            return "#00ff00";
          }}
          style={{ bottom: 100, right: 350}} // ⬅️ 就是這行調整 MiniMap 位置
        />
      </ReactFlow>

      {selectedTask && (
        <div style={{
          position: "absolute",
          top: 100,
          left: 100,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          zIndex: 999,
        }}>
          <h3>編輯任務：{selectedTask.name}</h3>
          <p>ID: {selectedTask.id}</p>
          <p>完成度: {selectedTask.completion}%</p>
          <p>重要度: {selectedTask.priority}</p>
          <p>狀態: {selectedTask.status}</p>
          <button onClick={handleCloseModal}>關閉</button>
        </div>
      )}
    </div>
  );
};

export default TreePage;
