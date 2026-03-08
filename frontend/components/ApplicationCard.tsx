import { Application, STATUS_OPTIONS } from "@/lib/applications";

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: number) => void;
  onAnalyze: (application: Application) => void;
}

export default function ApplicationCard({ application, onEdit, onDelete, onAnalyze }: ApplicationCardProps) {
  const statusOption = STATUS_OPTIONS.find((s) => s.value === application.status);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{application.position}</h3>
          <p className="text-slate-400 text-sm mt-1">🏢 {application.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusOption?.color}`}>
          {statusOption?.label}
        </span>
      </div>

      {application.notes && (
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">📝 {application.notes}</p>
      )}

      <div className="flex justify-between items-center mt-4">
        <span className="text-slate-500 text-xs">
          📅 {new Date(application.applied_date).toLocaleDateString("es-CL")}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onAnalyze(application)}
            className="bg-blue-600/50 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            🤖 IA
          </button>
          <button
            onClick={() => onEdit(application)}
            className="bg-purple-600/50 hover:bg-purple-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete(application.id)}
            className="bg-red-600/50 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}