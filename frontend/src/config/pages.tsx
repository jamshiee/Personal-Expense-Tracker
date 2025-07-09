// import { ValidIcon } from "@/icons";

export type Page = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  // icon: ValidIcon;
  disabled?: boolean;
  segment: string;
  children?: Page[];
};


export type PageId = (typeof pagesConfig)[number]["segment"];

export const pagesConfig = [
  {
    title: "Dashboard",
    description: "Check all the responses in one place.",
    href: "/dashboard",
    // icon: "activity",
    segment: "dashboard",
    // children: monitorPagesConfig,
  },
  {
    title: "Add Expense",
    description: "Your workspace settings",
    href: "/addexpense",
    // icon: "cog",
    segment: "addexpense",
    // children: settingsPagesConfig,
  },

] as const satisfies readonly Page[];

// type MarketingPageType = Page;


export function getPageBySegment(
  segment: string | string[],
  currentPage: readonly Page[] = pagesConfig
): Page | undefined {
  if (typeof segment === "string") {
    const page = currentPage.find((page) => page.segment === segment);
    return page;
  }
  if (Array.isArray(segment) && segment.length > 0) {
    const [firstSegment, ...restSegments] = segment;
    const childPage = currentPage.find((page) => page.segment === firstSegment);
    if (childPage?.children) {
      return getPageBySegment(restSegments, childPage.children);
    }
    return childPage;
  }
  return undefined;
}
