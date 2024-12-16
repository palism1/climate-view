declare module "../CmsPage" {
  import { FC } from "react";

  interface CmsPageProps {
    pageId: string;
  }

  const CmsPage: FC<CmsPageProps>;
  export default CmsPage;
}
