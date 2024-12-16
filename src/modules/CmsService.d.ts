declare module "../CmsService" {
  interface CmsContent {
    title: string;
    body: string;
  }

  export function fetchCmsContent(pageId: string): Promise<CmsContent>;
}
