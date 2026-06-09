import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import json from "json5";

const API_URL = "http://localhost:8000";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9fafb",
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
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "16px",
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
  mainContent: {
    flex: 1,
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "48px 16px",
    width: "100%",
  } as React.CSSProperties,
  headerSection: {
    marginBottom: "32px",
  } as React.CSSProperties,
  welcome: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
  } as React.CSSProperties,
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
  } as React.CSSProperties,
  actionBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  } as React.CSSProperties,
  newProjectButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  } as React.CSSProperties,
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  } as React.CSSProperties,
  projectCard: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    padding: "20px",
    cursor: "pointer",
  } as React.CSSProperties,
  projectTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
  } as React.CSSProperties,
  projectDescription: {
    fontSize: "14px",
    color: "#6b7280",
  } as React.CSSProperties,
  emptyState: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  } as React.CSSProperties,
  invitationsContainer: {
  marginBottom: "30px",
},

invitationCard: {
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "12px",
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},

acceptButton: {
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "8px 14px",
  cursor: "pointer",
},

rejectButton: {
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "8px 14px",
  cursor: "pointer",
},
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  } as React.CSSProperties,

  modal: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  } as React.CSSProperties,

  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
  } as React.CSSProperties,

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  } as React.CSSProperties,

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    minHeight: "80px",
  } as React.CSSProperties,

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  } as React.CSSProperties,

  cancel: {
    backgroundColor: "#e5e7eb",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  } as React.CSSProperties,

  create: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  } as React.CSSProperties,
};

interface Project {
  id: number;
  name: string;
  description?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [invitations, setInvitations] = useState<any[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      console.log("Projects loaded:", data);
      setProjects(data);
    } catch (err) {
      console.error("Error cargando proyectos", err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newProject.name) return;

    const token = localStorage.getItem("token");

    try {
      const url = editingProject
        ? `${API_URL}/projects/${editingProject.id}`
        : `${API_URL}/projects/`;

      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      const data = await res.json();

      if (editingProject) {
        // actualizar lista
        setProjects((prev) =>
          prev.map((p) => (p.id === data.id ? data : p))
        );
      } else {
        setProjects((prev) => [...prev, data]);
      }

      setIsModalOpen(false);
      setEditingProject(null);
      setNewProject({ name: "", description: "" });

    } catch (err) {
      console.error("Error guardando proyecto", err);
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description || "",
    });
    setIsModalOpen(true);
  };

  const deleteProject = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este proyecto?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error eliminando proyecto", err);
    }
  };

  const acceptInvitation = async (invitationId: number) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8000/invitations/${invitationId}/accept`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.reload();

  } catch (err) {
    console.error(err);
  }
};

const rejectInvitation = async (invitationId: number) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8000/invitations/${invitationId}/reject`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setInvitations((prev) =>
      prev.filter((i) => i.id !== invitationId)
    );

  } catch (err) {
    console.error(err);
  }
};

const invitationsRes = async () => {
  const token = localStorage.getItem("token");

  await fetch(
    "http://localhost:8000/invitations/my",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
}; 

  useEffect(() => {
  const loadData = async () => {
    const token = localStorage.getItem("token");

    // 1. proyectos
    await fetchProjects();

    // 2. invitaciones
    const invitationsRes = await fetch(
      "http://localhost:8000/invitations/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const invitationsData = await invitationsRes.json();
    setInvitations(invitationsData);
  };

  loadData();
}, []);
  return (
  <div style={styles.container}>
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        <Link to="/" style={styles.brand}>
          <div style={styles.logo}>SK</div>
          <span style={styles.brandText}>SmartKanban</span>
        </Link>
      </div>
    </nav>

    <div style={styles.mainContent}>
      <div style={styles.headerSection}>
        <h1 style={styles.welcome}>Tus Proyectos</h1>
        <p style={styles.subtitle}>
          Maneja y organiza tus proyectos 
        </p>
      </div>

      <div style={styles.actionBar}>
        <span>{projects.length} proyectos</span>
        <button
          style={styles.newProjectButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Nuevo Proyecto
        </button>
      </div>

      {/* LOADING / EMPTY / CONTENT */}
      {loading ? (
        <p>Cargando...</p>
      ) : projects.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No hay proyectos todavía</h3>
          <p>Crea tu primer proyecto</p>
        </div>
      ) : (
        <>
          {/* INVITATIONS*/}
          {invitations.length > 0 && (
            <div style={styles.invitationsContainer}>
              <h2>Invitaciones Pendientes</h2>

              {invitations.map((invitation) => (
                <div key={invitation.id} style={styles.invitationCard}>
                  <div style={{ color: "#111", fontWeight: 500 }}>
                    Invitación al Proyecto #{invitation.project_id}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={styles.acceptButton}
                      onClick={() =>
                        acceptInvitation(invitation.id)
                      }
                    >
                      Accept
                    </button>

                    <button
                      style={styles.rejectButton}
                      onClick={() =>
                        rejectInvitation(invitation.id)
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS GRID */}
          <div style={styles.projectsGrid}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={styles.projectCard}
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 style={styles.projectTitle}>{p.name}</h3>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(p);
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(p.id);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p style={styles.projectDescription}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>

    {/* MODAL CREATE */}
    {isModalOpen && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <h2 style={modalStyles.title}>Create new project</h2>

          <input
            type="text"
            placeholder="Project name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                name: e.target.value,
              })
            }
            style={modalStyles.input}
          />

          <textarea
            placeholder="Description (optional)"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                description: e.target.value,
              })
            }
            style={modalStyles.textarea}
          />

          <div style={modalStyles.actions}>
            <button
              style={modalStyles.cancel}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>

            <button
              style={modalStyles.create}
              onClick={createProject}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
export default Dashboard;