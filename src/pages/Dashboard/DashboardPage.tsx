import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ModalMode, type Report } from "../../types";
import { useReportContext } from "../../context/ReportContext";
import ReportCard from "../../components/ReportCard/ReportCard";
import ReportModal from "../../components/ReportModal/ReportModal";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);

  const { user, logout } = useAuth();
  const {
    reports,
    addReport,
    reorderReports,
    deleteReport,
    updateReport,
    clearReports,
  } = useReportContext();

  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = reports.findIndex((report) => report.id === active.id);
    const newIndex = reports.findIndex((report) => report.id === over.id);

    const newOrder = arrayMove(reports, oldIndex, newIndex);
    reorderReports(newOrder);
  };

  const openModal = (mode: ModalMode, report?: Report) => {
    setModalMode(mode);
    setActiveReport(report ?? null);
    setIsReportModalOpen(true);
  };

  const handleSave = (title: string, content: string, aiUsedAt?: string) => {
    if (modalMode === ModalMode.EDIT && activeReport) {
      updateReport(activeReport.id, title, content, aiUsedAt);
    } else {
      addReport(title, content, aiUsedAt);
    }
    setIsReportModalOpen(false);
  };

  const handleDelete = (report: Report) => {
    setReportToDelete(report);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (reportToDelete) {
      deleteReport(reportToDelete.id);
      setReportToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleLogout = () => {
    clearReports();
    logout();
  };

  return (
    <Box py={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <h2>Welcome, {user?.name} 👋</h2>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          label="Search reports"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={reports.length === 0}
          placeholder={
            reports.length === 0
              ? "No reports available to search."
              : "Type to search..."
          }
          helperText={
            reports.length === 0 ? "Search disabled – no reports found." : " "
          }
          size="small"
        />
      </Stack>

      {user?.role === "admin" && (
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => openModal(ModalMode.CREATE)}
        >
          New Report
        </Button>
      )}

      <Stack spacing={2}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={reports.map((report) => report.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredReports.map((report: Report) => (
              <ReportCard
                key={report.id}
                report={report}
                onView={(report) => openModal(ModalMode.PREVIEW, report)}
                onEdit={(report) => openModal(ModalMode.EDIT, report)}
                onDelete={(report) => handleDelete(report)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Stack>

      {isReportModalOpen && (
        <ReportModal
          open={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSave={modalMode === ModalMode.PREVIEW ? undefined : handleSave}
          initialTitle={activeReport?.title}
          initialContent={activeReport?.content}
          readOnly={modalMode === ModalMode.PREVIEW}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </Box>
  );
};

export default Dashboard;
