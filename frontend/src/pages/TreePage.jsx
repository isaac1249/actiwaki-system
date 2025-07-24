// frontend/src/pages/TreePage.jsx
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
    case "規劃中": return "#34a853";
    case "進行中": return "#fbbc04";
    case "已完成": return "#ea4335";
    default: return "#9e9e9e";
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

        const nodes = data.map((task) => ({
          id: task.id.toString(),
          position: {
            x: task.x ?? Math.random() * 400,
            y: task.y ?? Math.random() * 400,
          },
          data: {
            label: (
              <div style={{
                padding: 10,
                borderRadius: 12,
                backgroundColor: getStatusColor(task.status),
                color: "black",
                fontWeight: 500,
                minWidth: 160,
                textAlign: "center",
              }}>
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
        }));

        const edges = data
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

  const handleNodeDragStop = useCallback((event, node) => {
    const taskId = parseInt(node.id, 10);
    const { x, y } = node.position;

    fetch(`https://actiwaki-system.onrender.com/api/tasks/${taskId}/position`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y }),
    }).catch((err) => {
      console.error("儲存節點位置失敗", err);
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#000" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDragStop={handleNodeDragStop}
        fitView
        fitViewOptions={{ padding: 0.4 }}
      >
        <Background color="#444" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            const task = originalData.find((t) => t.id === parseInt(n.id));
            return getStatusColor(task?.status);
          }}
          style={{ bottom: 100, right: 350 }}
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