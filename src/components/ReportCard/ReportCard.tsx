import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import type { Report } from "../../types";
import { colors } from "../../styles/colors";
import { useSortable } from "@dnd-kit/sortable";
import { useAuth } from "../../context/AuthContext";
import { stripHtml, truncateText } from "./helpers";

interface Props {
  report: Report;
  onView: (report: Report) => void;
  onEdit: (report: Report) => void;
  onDelete: (report: Report) => void;
}

const ReportCard = ({ report, onView, onEdit, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: report.id });
  const { user } = useAuth();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box style={style}>
      <Card ref={setNodeRef}>
        <CardContent
          {...attributes}
          {...listeners}
          style={{ cursor: "grab" }}
          sx={{ backgroundColor: colors.gallery }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6">{report.title}</Typography>
            {report.aiUsedAt && (
              <Chip
                label="AI"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              />
            )}
          </Stack>
          <Typography variant="body2" color={colors.grey}>
            Created: {new Date(report.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" color={colors.grey}>
            Updated: {new Date(report.updatedAt).toLocaleString()}
          </Typography>
          {report.aiUsedAt && (
            <Typography variant="body2" color={colors.grey}>
              AI used: {new Date(report.aiUsedAt).toLocaleString()}
            </Typography>
          )}
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Preview:
          </Typography>
          {report.content && (
            <Box
              sx={{
                border: `1px solid ${colors.border}`,
                borderRadius: "4px",
                padding: "8px",
                backgroundColor: colors.alabaster,
                maxHeight: 150,
                overflow: "auto",
                mt: 1,
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {truncateText(stripHtml(report.content), 250)}
              </Typography>
            </Box>
          )}
        </CardContent>

        <CardActions>
          <Button size="small" onClick={() => onView(report)}>
            View full report
          </Button>
          {user?.role === "admin" && (
            <>
              <Button onClick={() => onEdit(report)}>Edit</Button>
              <Button color="error" onClick={() => onDelete(report)}>
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default ReportCard;
