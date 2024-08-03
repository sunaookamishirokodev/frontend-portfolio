import ResourcesTable from "@/components/ResourcesTable";

export default function ResourcesFoldersPage({ params: { path } }: { params: { path: string[] } }) {
	return <ResourcesTable path={path} type="folders" />;
}
