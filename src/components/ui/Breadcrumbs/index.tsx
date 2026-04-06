import { Breadcrumbs as MUIBreadcrumbs, Link, Stack } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
const routeLabelKeys: Record<string, string> = {
  farmers: "breadcrumbs.routes.farmers",
  "farmers-details": "breadcrumbs.routes.farmer_details",
  "payroll-enquiry": "breadcrumbs.routes.payroll_enquiry",
  articles: "breadcrumbs.routes.articles",
  "my-farm": "breadcrumbs.routes.my_farm",
};

const isNumericId = (segment: string): boolean => {
  return /^\d+$/.test(segment);
};

const isUUID = (segment: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    segment,
  );
};

const isId = (segment: string): boolean => {
  return isNumericId(segment) || isUUID(segment);
};

export default function Breadcrumbs() {
  const location = useLocation();

  // Split the path into segments, filtering out empty strings
  const allPathnames = location.pathname.split("/").filter((x) => x);

  // Check if the base URL is 'my-farm'

  // Filter out numeric IDs and UUIDs from pathnames
  const filteredPathnames = allPathnames.filter((segment) => !isId(segment));

  // If the last raw segment was a UUID (not numeric ID), append a contextual detail label
  const lastRawSegment = allPathnames[allPathnames.length - 1];
  const endsWithUUID = lastRawSegment && isUUID(lastRawSegment);
  const parentSegment = filteredPathnames[filteredPathnames.length - 1];

  const displayPathnames =
    endsWithUUID && parentSegment
      ? [...filteredPathnames, `${parentSegment}-details`]
      : filteredPathnames;

  // Don't render breadcrumbs if there is only one path segment after processing
  if (displayPathnames.length <= 1) {
    return null;
  }

  return (
    <>
      <div>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <MUIBreadcrumbs
            aria-label="breadcrumb"
            sx={{
              paddingY: "5px",
              color: "text.secondary",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              overflow: "hidden",
              position: "relative",
              fontSize: "12px",
            }}
          >
            {displayPathnames.map((pathname, index) => {
              // Use route label map first, fall back to slug formatting
              const displayName = routeLabelKeys[pathname]
                ? routeLabelKeys[pathname]
                : pathname
                    .replace(/-/g, " ")
                    .replace(/([a-z])([A-Z])/g, "$1 $2")
                    .replace(/\b\w/g, (char) => char.toUpperCase());

              // Build navigation path using only the real filtered segments (exclude appended detail labels)
              const to = `/${filteredPathnames.slice(0, index + 1).join("/")}`;

              return (
                <Link
                  key={index}
                  component={RouterLink}
                  to={to}
                  sx={{
                    fontSize: "12px",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      color: "text.primary",
                    },
                  }}
                >
                  {displayName}
                </Link>
              );
            })}
          </MUIBreadcrumbs>
        </Stack>
      </div>
    </>
  );
}
