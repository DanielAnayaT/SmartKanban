import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f0f4f8",
    fontFamily: "system-ui, -apple-system, sans-serif",
  } as React.CSSProperties,
  nav: {
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 50,
  } as React.CSSProperties,
  navContent: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  } as React.CSSProperties,
  logo: {
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "18px",
  } as React.CSSProperties,
  brandText: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "16px",
  } as React.CSSProperties,
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  } as React.CSSProperties,
  backButton: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  mainContent: {
    flex: 1,
    padding: "24px 16px",
    overflow: "auto",
  } as React.CSSProperties,
  projectHeader: {
    marginBottom: "24px",
  } as React.CSSProperties,
  projectTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 8px 0",
  } as React.CSSProperties,
  projectDescription: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0,
  } as React.CSSProperties,
  boardContainer: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "20px",
    minHeight: "600px",
  } as React.CSSProperties,
  list: {
    minWidth: "320px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 200px)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  listHeader: {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,
  listTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    flex: 1,
  } as React.CSSProperties,
  deleteListButton: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  tasksContainer: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  } as React.CSSProperties,
  task: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "12px",
    cursor: "move",
    transition: "all 0.2s",
    userSelect: "none",
  } as React.CSSProperties,
  taskHovered: {
    backgroundColor: "#f3f4f6",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  taskContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "8px",
  } as React.CSSProperties,
  taskText: {
    fontSize: "13px",
    color: "#111827",
    margin: 0,
    wordBreak: "break-word",
    flex: 1,
  } as React.CSSProperties,
  taskActions: {
    display: "flex",
    gap: "4px",
    flexShrink: 0,
  } as React.CSSProperties,
  taskButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "12px",
    padding: "2px 4px",
    transition: "color 0.2s",
  } as React.CSSProperties,
  addTaskButton: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    border: "1px dashed #d1d5db",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s",
    width: "100%",
    textAlign: "center",
  } as React.CSSProperties,
  addListButton: {
    minWidth: "320px",
    backgroundColor: "transparent",
    border: "2px dashed #d1d5db",
    borderRadius: "8px",
    padding: "24px 16px",
    cursor: "pointer",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  } as React.CSSProperties,
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  } as React.CSSProperties,
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  } as React.CSSProperties,
  modalTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    fontFamily: "inherit",
    marginBottom: "16px",
    boxSizing: "border-box",
  } as React.CSSProperties,
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  } as React.CSSProperties,
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  secondaryButton: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  footer: {
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
  } as React.CSSProperties,
  footerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "24px 16px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
  } as React.CSSProperties,

  projectHeaderTop: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},

inviteButton: {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: 600,
},
};

interface Task {
  id: number;
  title: string;
  description: string;
  listId: number;
  assigned_user_id?: number;
  assigned_username?: string;
}

interface List {
  id: number;
  name: string;
  tasks: Task[];
}

interface Board {
  id: number;
  title: string;
  description: string;
  lists: List[];
}

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [draggedTask, setDraggedTask] = useState<{ taskId: number; listId: number } | null>(null);
  const [draggedList, setDraggedList] = useState<number | null>(null);
  const [showTaskModal, setShowTaskModal] = useState<number | null>(null);
  const [showListModal, setShowListModal] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [listInput, setListInput] = useState("");
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);

  const [showAiModal, setShowAiModal] = useState(false);
  const [generatedSubtasks, setGeneratedSubtasks] = useState<
  {
    title: string;
    description: string;
  }[]
>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  const [projectMembers, setProjectMembers] = useState<any[]>([]);

  const [board, setBoard] = useState<Board | null>(null);

  const API_URL = "http://localhost:8000";

  useEffect(() => {
    if (!projectId) return;

    const fetchBoard = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1. Project
        const projectRes = await fetch(`${API_URL}/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const project = await projectRes.json();

        if (!project || project.detail) {
          console.error("Project error:", project);
          return;
        }

        const membersRes = await fetch(
          `${API_URL}/projects/${projectId}/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const membersData = await membersRes.json();

        setProjectMembers(membersData);

        // 2. Boards
        const boardRes = await fetch(`${API_URL}/boards/project/${projectId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const boards = await boardRes.json();

        if (!Array.isArray(boards) || boards.length === 0) {
          console.warn("No board found → initializing empty board");

          setBoard({
            id: 0,
            title: project.name,
            description: project.description,
            lists: [],
          });

          return;
      }

        const boardData = boards[0];

        // 3. Lists 
        let lists: any[] = [];

        try {
          const listsRes = await fetch(
            `${API_URL}/lists/board/${boardData.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const listsData = await listsRes.json();

          if (Array.isArray(listsData)) {
            lists = listsData;
          }
        } catch (err) {
          console.warn("No lists found or error fetching lists", err);
        }

        // 4. Tasks
        const listsWithTasks = await Promise.all(
          lists.map(async (list: any) => {
            try {
              const tasksRes = await fetch(
                `${API_URL}/tasks/list/${list.id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              const tasks = await tasksRes.json();

              return {
                id: list.id,
                name: list.name,
                tasks: Array.isArray(tasks)
                  ? tasks.map((t: any) => ({
                      id: t.id,
                      title: t.title,
                      description: t.description,
                      listId: list.id,
                      assigned_user_id: t.assigned_user_id,
                      assigned_username: t.assigned_username,
                    }))
                  : [],
              };
            } catch {
              return {
                id: list.id,
                name: list.name,
                tasks: [],
            } ;
            }
          })
        );

      // 5. Set board FINAL
        setBoard({
          id: boardData.id,
          title: project.name,
          description: project.description,
          lists: listsWithTasks,
        });
      } catch (err) {
        console.error("Error cargando board", err);

        // fallback seguro para que UI nunca muera
        setBoard({
          id: 0,
          title: "Project",
          description: "",
          lists: [],
        });
      }
    };

    fetchBoard();

    const interval = setInterval(() => {
    fetchBoard();
  }, 5000);

  return () => clearInterval(interval);
}, [projectId]);

const inviteUser = async () => {
  if (!inviteEmail.trim() || !projectId) return;

  try {
    setInviteLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/invitations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project_id: Number(projectId),
        email: inviteEmail,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Error inviting user");
      return;
    }

    alert("Invitation sent!");

    setInviteEmail("");
    setShowInviteModal(false);

  } catch (err) {
    console.error("Error inviting user", err);
  } finally {
    setInviteLoading(false);
  }
};

  // Task Management
  const addTask = async (listId: number) => {
    if (!taskInput.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: taskInput, description: "", list_id: listId, current_user_id: 0 }),
      });

      const newTask = await res.json();


      setBoard((prev) =>
        prev && {
          ...prev,
          lists: prev.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: [...list.tasks, newTask],
                }
              : list
          ),
        }
      );

      setTaskInput("");
      setShowTaskModal(null);
    } catch (err) {
      console.error("Error creando task", err);
    }
    
  };

  const deleteTask = async (taskId: number, listId: number) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setBoard((prev) =>
        prev && {
          ...prev,
          lists: prev.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.filter((t) => t.id !== taskId),
                }
              : list
          ),
        }
      );
    } catch (err) {
      console.error("Error eliminando task", err);
    }
  
};

const assignUser = async (
  taskId: number,
  userId: number
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/tasks/${taskId}/assign?user_id=${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedTask = await res.json();

    setBoard((prev: any) => {
      if (!prev) return prev;

      return {
        ...prev,
        lists: prev.lists.map((list: any) => ({
          ...list,
          tasks: list.tasks.map((task: any) =>
            task.id === taskId
              ? {
                  ...task,
                  assigned_user_id:
                    updatedTask.assigned_user_id,
                  assigned_username:
                    updatedTask.assigned_username,
                }
              : task
          ),
        })),
      };
    });

  } catch (err) {
    console.error("Error assigning user", err);
  }
};

  const generateSubtasks = async (
  taskId: number,
  listId: number
) => {
  try {
    setLoadingAi(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8000/tasks/${taskId}/generate-subtasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log("AI response:", data);

    setGeneratedSubtasks(data.subtasks || []);

    setSelectedTaskId(taskId);

    setSelectedListId(listId);

    setShowAiModal(true);

  } catch (err) {
    console.error("Error generando subtasks", err);
  } finally {
    setLoadingAi(false);
  }
};

  const createAiSubtasks = async () => {
  if (!selectedListId) return;

  try {
    const token = localStorage.getItem("token");

    const createdTasks = [];

    for (const subtask of generatedSubtasks) {
      const res = await fetch(
        "http://localhost:8000/tasks/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: subtask.title,
            description: subtask.description,
            list_id: selectedListId,
          }),
        }
      );

      const newTask = await res.json();

      createdTasks.push({
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        listId: selectedListId,
      });
    }

    // actualizar frontend
    setBoard((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        lists: prev.lists.map((list) => {
          if (list.id === selectedListId) {
            return {
              ...list,
              tasks: [...list.tasks, ...createdTasks],
            };
          }

          return list;
        }),
      };
    });

    setShowAiModal(false);

  } catch (err) {
    console.error("Error creando subtasks", err);
  }
};

  const handleTaskDragStart = (e: React.DragEvent, taskId: number, listId: number) => {
    setDraggedTask({ taskId, listId });
    (e.currentTarget as HTMLElement).style.opacity = "0.5";
  };

  const handleTaskDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
  };

  const handleTaskDrop = async (
  e: React.DragEvent,
  targetListId: number
) => {
  e.preventDefault();

  if (!draggedTask || !board) return;

  const { taskId, listId: sourceListId } = draggedTask;

  const token = localStorage.getItem("token");

  try {
    let updatedBoard = structuredClone(board);

    let movedTask: any = null;

    //  1. sacar task de su lista original
    updatedBoard.lists = updatedBoard.lists.map((list) => {
      if (list.id === sourceListId) {
        const task = list.tasks.find((t) => t.id === taskId);
        movedTask = task;

        return {
          ...list,
          tasks: list.tasks.filter((t) => t.id !== taskId),
        };
      }
      return list;
    });

    if (!movedTask) return;

    //  2. insertar en nueva lista
    updatedBoard.lists = updatedBoard.lists.map((list) => {
      if (list.id === targetListId) {
        return {
          ...list,
          tasks: [
            ...list.tasks,
            { ...movedTask, listId: targetListId },
          ],
        };
      }
      return list;
    });

    //  3. recalcular positions 
    const payload: any[] = [];

    updatedBoard.lists.forEach((list) => {
      list.tasks.forEach((task, index) => {
        payload.push({
          id: Number(task.id),
          list_id: list.id,
          position: index,
        });
      });
    });

    //  4. actualizar UI
    setBoard(updatedBoard);

    //  5. backend reorder
    await fetch("http://localhost:8000/tasks/reorder", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

  } catch (err) {
    console.error("Error moviendo task", err);
  }

  setDraggedTask(null);
};

  const handleListDragStart = (e: React.DragEvent, listId: number) => {
    setDraggedList(listId);
    (e.currentTarget as HTMLElement).style.opacity = "0.7";
  };

  const handleListDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
  };

  const handleListDrop = async (
    e: React.DragEvent,
    targetListId: number
  ) => {
    e.preventDefault();

    if (!draggedList || !board) return;

    // Si es la misma lista, no hacemos nada
    if (draggedList === targetListId) {
      setDraggedList(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const draggedIndex = board.lists.findIndex(
        (l) => l.id === draggedList
      );
      const targetIndex = board.lists.findIndex(
        (l) => l.id === targetListId
      );

      if (draggedIndex === -1 || targetIndex === -1) return;

      // 🔥 1. Reordenar en frontend
      const newLists = [...board.lists];
      const [movedList] = newLists.splice(draggedIndex, 1);
      newLists.splice(targetIndex, 0, movedList);

      setBoard((prev) =>
        prev ? { ...prev, lists: newLists } : prev
      );

      const reordered = newLists.map((list, index) => ({
        id: Number(list.id),
        position: index,
      }));

    
      await fetch(`http://localhost:8000/lists/reorder`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reordered),
      });

    } catch (err) {
      console.error("Error moviendo listas", err);
    }

    setDraggedList(null);
  };

  const handleListDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // List Management
  const addList = async () => {
    if (!listInput.trim() || !board) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/lists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: listInput, board_id: board.id }),
      });

      const newList = await res.json();

      const formattedList = {
        id: newList.id,
        name: newList.title || newList.name,
        tasks: [],
      };

      setBoard((prev) =>
        prev && {
          ...prev,
          lists: [...prev.lists, formattedList],
        }
      );

      setListInput("");
      setShowListModal(false);
    } catch (err) {
      console.error("Error creando lista", err);
    }
  };

  const deleteList = async (listId: number) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${API_URL}/lists/${listId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setBoard((prev) =>
        prev && {
          ...prev,
          lists: prev.lists.filter((l) => l.id !== listId),
        }
      );
    } catch (err) {
      console.error("Error eliminando lista", err);
    }
  };

  if (!board) {
    return <div>Cargando proyecto...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Navigation Header */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <Link to="/" style={styles.brand}>
            <div style={styles.logo}>SK</div>
            <span style={styles.brandText}>SmartKanban</span>
          </Link>
          <div style={styles.navActions}>
            <Link to="/dashboard" style={{ ...styles.backButton, textDecoration: "none", color: "inherit" }}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Project Header */}
        <div style={styles.projectHeader}>
          <div style={styles.projectHeaderTop}>
  <div>
    <h1 style={styles.projectTitle}>{board.title}</h1>
    <p style={styles.projectDescription}>
      {board.description}
    </p>
  </div>

  <button
    style={styles.inviteButton}
    onClick={() => setShowInviteModal(true)}
  >
    Invite User
  </button>
</div>
        </div>

        {/* Kanban Board */}
        <div style={styles.boardContainer}>
          {board.lists.map((list) => (
            <div
              key={list.id}
              style={styles.list}
              draggable
              onDragStart={(e) => handleListDragStart(e, list.id)}
              onDragEnd={handleListDragEnd}
              onDragOver={handleListDragOver}
              onDrop={(e) => handleListDrop(e, list.id)}
            >
              {/* List Header */}
              <div style={styles.listHeader}>
                <h3 style={styles.listTitle}>
                  {list.name} ({list.tasks.length})
                </h3>
                <button
                  style={styles.deleteListButton}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fecaca";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fee2e2";
                  }}
                  onClick={() => deleteList(list.id)}
                >
                  ×
                </button>
              </div>

              {/* Tasks Container */}
              <div
                style={styles.tasksContainer}
                onDragOver={(e) => { e.stopPropagation(); e.preventDefault(); }}
                onDrop={(e) => handleTaskDrop(e, list.id)}
              >
                {list.tasks.map((task) => (
  <div
    key={task.id}
    style={{
      ...styles.task,
      ...(hoveredTask === task.id
        ? styles.taskHovered
        : {}),
    }}
    draggable
    onDragStart={(e) => {
      e.stopPropagation();
      handleTaskDragStart(e, task.id, list.id);
    }}
    onDragEnd={handleTaskDragEnd}
    onMouseEnter={() => setHoveredTask(task.id)}
    onMouseLeave={() => setHoveredTask(null)}
  >
    <div style={styles.taskContent}>
      
      {/* LEFT SIDE */}
      <div>
        <p style={styles.taskText}>
          {task.title}
        </p>

        {task.assigned_username && (
      <div
      style={{
      marginTop: "6px",
      fontSize: "12px",
      fontWeight: "600",
      color: "#1d4ed8",
      background: "#dbeafe",
      padding: "4px 6px",
      borderRadius: "6px",
      display: "inline-block",
    }}
    >
      👤 {task.assigned_username}
    </div>
  )}

  <div style={{ marginTop: "8px" }}>
  <select
    value={task.assigned_user_id ?? ""}
    onChange={(e) =>
      assignUser(
        task.id,
        e.target.value === "" ? 0 : Number(e.target.value)
        )
    }
    style={{
      fontSize: "12px",
      padding: "6px 8px",
      borderRadius: "6px",
      border: "1px solid #93c5fd",
      background: "#ffffff",
      color: "#111827",
      width: "100%",
      outline: "none",
    }}
  >
    <option value="">
      Unassigned
    </option>

    {projectMembers.map((member) => (
      <option
        key={member.id}
        value={member.id}
      >
        {member.username}
      </option>
    ))}
  </select>
</div>

        {task.description && (
          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#6b7280",
              background: "#f3f4f6",
              padding: "2px 8px",
              borderRadius: "999px",
              display: "inline-block",
            }}
          >
            ⏱ {task.description}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div style={styles.taskActions}>
        <button
          style={styles.taskButton}
          onClick={() =>
            generateSubtasks(task.id, list.id)
          }
        >
          ✨
        </button>

        <button
          style={styles.taskButton}
          onMouseEnter={(e) => {
            (
              e.currentTarget as HTMLButtonElement
            ).style.color = "#ef4444";
          }}
          onMouseLeave={(e) => {
            (
              e.currentTarget as HTMLButtonElement
            ).style.color = "#6b7280";
          }}
          onClick={() =>
            deleteTask(task.id, list.id)
          }
        >
          ✕
        </button>
      </div>

    </div>
  </div>
))}

                {/* Add Task Button */}
                <button
                  style={styles.addTaskButton}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e5e7eb";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f3f4f6";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#d1d5db";
                  }}
                  onClick={() => setShowTaskModal(list.id)}
                >
                  + Add Task
                </button>
              </div>
            </div>
          ))}

          {/* Add List Button */}
          <button
            style={styles.addListButton}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#9ca3af";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f9fafb";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#d1d5db";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
            onClick={() => setShowListModal(true)}
          >
            + Add List
          </button>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div style={styles.modal} onClick={() => setShowTaskModal(null)}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>Add New Task</h2>
            <input
              style={styles.input}
              type="text"
              placeholder="Task description..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addTask(showTaskModal);
                }
              }}
              autoFocus
            />
            <div style={styles.modalActions}>
              <button
                style={styles.secondaryButton}
                onClick={() => setShowTaskModal(null)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f3f4f6";
                }}
              >
                Cancel
              </button>
              <button
                style={styles.primaryButton}
                onClick={() => addTask(showTaskModal)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d4ed8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563eb";
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Modal */}
      {showListModal && (
        <div style={styles.modal} onClick={() => setShowListModal(false)}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>Add New List</h2>
            <input
              style={styles.input}
              type="text"
              placeholder="List name..."
              value={listInput}
              onChange={(e) => setListInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addList();
                }
              }}
              autoFocus
            />
            <div style={styles.modalActions}>
              <button
                style={styles.secondaryButton}
                onClick={() => setShowListModal(false)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f3f4f6";
                }}
              >
                Cancel
              </button>
              <button
                style={styles.primaryButton}
                onClick={addList}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d4ed8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563eb";
                }}
              >
                Add List
              </button>
            </div>
          </div>
        </div>
      )}

      {showAiModal && (
  <div style={styles.modal} onClick={() => setShowAiModal(false)}>
    <div
      style={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 style={styles.modalTitle}>
        AI Generated Subtasks
      </h2>

      {loadingAi ? (
        <p>Generating...</p>
      ) : generatedSubtasks.length === 0 ? (
        <p>No subtasks generated</p>
      ) : (
        <div>
          {generatedSubtasks.map((subtask, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                marginBottom: "10px",
                backgroundColor: "#ffffff",
                color: "#111827",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <div>{subtask.title}</div>

              {subtask.description && (
                <div
                  style={{
                    marginTop: "6px",
                    fontSize: "12px",
                    color: "#6b7280",
                    fontWeight: "400",
                  }}
                >
                  ⏱ {subtask.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={styles.modalActions}>
        <button
          style={styles.secondaryButton}
          onClick={() => setShowAiModal(false)}
        >
          Close
        </button>

        <button
          style={styles.primaryButton}
          onClick={createAiSubtasks}
        >
          Add All
        </button>
      </div>
    </div>
  </div>
)}

{showInviteModal && (
  <div
    style={styles.modal}
    onClick={() => setShowInviteModal(false)}
  >
    <div
      style={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 style={styles.modalTitle}>
        Invite User
      </h2>

      <input
        type="email"
        placeholder="User email..."
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        style={styles.input}
      />

      <div style={styles.modalActions}>
        <button
          style={styles.secondaryButton}
          onClick={() => setShowInviteModal(false)}
        >
          Cancel
        </button>

        <button
          style={styles.primaryButton}
          onClick={inviteUser}
          disabled={inviteLoading}
        >
          {inviteLoading ? "Sending..." : "Send Invite"}
        </button>
      </div>
    </div>
  </div>
)}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          © 2026 SmartKanban. All rights reserved.
        </div>
      </footer>
    </div>
  );
};


export default Project;
