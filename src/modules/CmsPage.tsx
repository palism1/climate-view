/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import {
  fetchCmsContent,
  addCmsContent,
  updateCmsContent,
  deleteCmsContent,
  updateSystemConfig,
} from "./CmsService";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface CmsContent {
  title: string;
  body: string;
}

interface CmsPageProps {
  pageId: string;
}

const CmsPage: React.FC<CmsPageProps> = ({ pageId }) => {
  const [content, setContent] = useState<CmsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState<CmsContent>({
    title: "",
    body: "",
  });
  const [config, setConfig] = useState({ refreshInterval: 60, userAccess: [] });

  useEffect(() => {
    const getContent = async () => {
      try {
        const data = await fetchCmsContent(pageId);
        setContent(data);
      } catch (error) {
        console.error("Failed to load CMS content:", error);
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [pageId]);

  const handleAddContent = async () => {
    try {
      await addCmsContent(newContent);
      alert("Content added successfully");
    } catch (error) {
      console.error("Failed to add content:", error);
    }
  };

  const handleUpdateContent = async () => {
    try {
      await updateCmsContent(pageId, newContent);
      alert("Content updated successfully");
    } catch (error) {
      console.error("Failed to update content:", error);
    }
  };

  const handleDeleteContent = async () => {
    try {
      await deleteCmsContent(pageId);
      alert("Content deleted successfully");
    } catch (error) {
      console.error("Failed to delete content:", error);
    }
  };

  const handleUpdateConfig = async () => {
    try {
      await updateSystemConfig(config);
      alert("Configuration updated successfully");
    } catch (error) {
      console.error("Failed to update configuration:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!content) {
    return <p>Error loading content.</p>;
  }

  return (
    <div>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      <div>
        <h2>Manage Content</h2>
        <TextField
          label="Title"
          value={newContent.title}
          onChange={(e) =>
            setNewContent({ ...newContent, title: e.target.value })
          }
        />
        <TextField
          label="Body"
          value={newContent.body}
          onChange={(e) =>
            setNewContent({ ...newContent, body: e.target.value })
          }
        />
        <Button onClick={handleAddContent}>Add Content</Button>
        <Button onClick={handleUpdateContent}>Update Content</Button>
        <Button onClick={handleDeleteContent}>Delete Content</Button>
      </div>
      <div>
        <h2>System Configuration</h2>
        <TextField
          label="Refresh Interval"
          type="number"
          value={config.refreshInterval}
          onChange={(e) =>
            setConfig({ ...config, refreshInterval: parseInt(e.target.value) })
          }
        />
        <Button onClick={handleUpdateConfig}>Update Configuration</Button>
      </div>
    </div>
  );
};

export default CmsPage;
