import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { colors } from "../../styles/colors";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useGenerateAIDraft, useSummarizeContent } from "../../hooks/useAI";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (title: string, content: string, aiUsedAt?: string) => void;
  initialTitle?: string;
  initialContent?: string;
  readOnly?: boolean;
}

const ReportModal = ({
  open,
  onClose,
  onSave,
  initialTitle = "",
  initialContent = "",
  readOnly = false,
}: ReportModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [aiUsed, setAiUsed] = useState(false);

  const { mutate: generateDraft, isPending: isGenerating } = useGenerateAIDraft(
    (draft: string) => {
      setAiUsed(true);
      setContent(draft);
    }
  );

  const { mutate: summarizeContent, isPending: isSummarizing } =
    useSummarizeContent((summary: string) => {
      setAiUsed(true);
      setContent(summary);
    });

  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setContent(initialContent);
      setAiUsed(false);
    }
  }, [open, initialTitle, initialContent]);

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    setTitleError(false);

    if (onSave) {
      onSave(
        title.trim(),
        content,
        aiUsed ? new Date().toISOString() : undefined
      );
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {readOnly
          ? "Report Preview"
          : initialTitle
          ? "Edit Report"
          : "New Report"}
      </DialogTitle>

      {!readOnly && (
        <Stack direction="column" spacing={2} mb={2} ml={3} mt={2} mr={3}>
          <TextField
            fullWidth
            label="AI Prompt"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Enter a prompt to generate a draft..."
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              disabled={isGenerating || !aiPrompt.trim()}
              onClick={() => generateDraft(aiPrompt)}
            >
              {isGenerating ? <CircularProgress size={20} /> : "Generate Draft"}
            </Button>

            <Button
              variant="outlined"
              disabled={isSummarizing || !content}
              onClick={() => summarizeContent(content)}
            >
              {isSummarizing ? (
                <CircularProgress size={20} />
              ) : (
                "Summarize Content"
              )}
            </Button>
          </Stack>
        </Stack>
      )}

      <DialogContent sx={{ overflow: "visible", pt: 1 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (titleError && e.target.value.trim()) {
              setTitleError(false);
            }
          }}
          sx={{ mb: 2 }}
          disabled={readOnly}
          error={titleError}
          helperText={titleError ? "Title is required." : ""}
        />

        <RichTextEditor
          content={content}
          onChange={(val) => {
            setContent(val);
          }}
          readOnly={readOnly}
        />

        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
          Preview:
        </Typography>
        <Box
          sx={{
            border: `1px solid ${colors.border}`,
            borderRadius: "6px",
            padding: "10px",
            minHeight: "150px",
            backgroundColor: colors.alabaster,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!readOnly && (
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ReportModal;
