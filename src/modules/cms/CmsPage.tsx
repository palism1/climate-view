import React, { useEffect, useState } from "react";
import { fetchCmsContent } from "./CmsService";

interface CmsContent {
  title: string;
  body: string;
}

const CmsPage: React.FC<{ pageId: string }> = ({ pageId }) => {
  const [content, setContent] = useState<CmsContent | null>(null);

  useEffect(() => {
    const getContent = async () => {
      try {
        const data = await fetchCmsContent(pageId);
        setContent(data);
      } catch (error) {
        console.error("Failed to load CMS content:", error);
      }
    };

    getContent();
  }, [pageId]);

  if (!content) {
    return <p>Loading content...</p>;
  }

  return (
    <div>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </div>
  );
};

export default CmsPage;
