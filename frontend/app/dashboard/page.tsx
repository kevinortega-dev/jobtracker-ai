"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/auth";
import {
  Application,
  ApplicationCreate,
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "@/lib/applications";
import StatsCards from "@/components/StatsCards";
import ApplicationCard from "@/components/ApplicationCard";
import ApplicationModal from "@/components/ApplicationModal";

export default function DashboardPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchApplications();
  }, [router]);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch {
      console.error("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: ApplicationCreate) => {
    try {
      await createApplication(data);
      await fetchApplications();
      setIsModalOpen(false);
    } catch {
      console.error("Error creating application");
    }
  };

  const handleUpdate = async (data: ApplicationCreate) => {
    if (!editingApp) return;
    try {
      await updateApplication(editingApp.id, data);
      await fetchApplications();
      setEditingApp(null);
      setIsModalOpen(false);
    } catch {
      console.error("Error updating application");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta postulación?")) return;
    try {
      await deleteApplication(id);
      await fetchApplications();
    } catch {
      console.error("Error deleting application");
    }
  };

  const handleEdit = (application: Application) => {
    setEditingApp(application);
    setIsModalOpen(true);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">🚀 JobTracker AI</h1>
          <button
            onClick={logout}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Mis Postulaciones</h2>
            <p className="text-slate-400 mt-1">Gestiona y analiza tu búsqueda de empleo</p>
          </div>
          <button
            onClick={() => { setEditingApp(null); setIsModalOpen(true); }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-lg"
          >
            ➕ Nueva postulación
          </button>
        </div>

        {/* Stats */}
        <StatsCards applications={applications} />

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar empresa o cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-700 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Todos los estados</option>
            <option value="applied">Aplicado</option>
            <option value="interview">Entrevista</option>
            <option value="technical">Prueba Técnica</option>
            <option value="offer">Oferta</option>
            <option value="rejected">Rechazado</option>
          </select>
        </div>

        {/* Lista de postulaciones */}
        {loading ? (
          <div className="text-center text-slate-400 py-20">Cargando...</div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-400 text-lg">No hay postulaciones aún</p>
            <p className="text-slate-500 text-sm mt-2">Agrega tu primera postulación</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingApp(null); }}
        onSubmit={editingApp ? handleUpdate : handleCreate}
        application={editingApp}
      />
    </div>
  );
}