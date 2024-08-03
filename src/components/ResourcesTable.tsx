"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
	ColumnDef,
	ColumnFiltersState,
	Row,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import _ from "lodash";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { typeFile } from "@/app/constants";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";

export interface Data {
	id: string;
	name: string;
	type: "file" | "folder" | "archive";
	lastModifiedDateTime: string;
	size: string;
	downloadUrl?: string;
}

export function ButtonActions({ row }: { row: Row<Data> }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	if (!row.original?.downloadUrl) {
		return <></>;
	}

	return (
		<div
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				setIsOpen(!isOpen);
			}}
			className="group relative float-right"
		>
			<button className="flex items-center justify-center">
				<MoreHorizontal className="size-4" />
			</button>
			<ul className={`widget absolute right-full top-0 group-hover:block ${isOpen ? "block" : "hidden"}`}>
				{row.original.downloadUrl ? (
					<li>
						<Link
							href={row.original.downloadUrl}
							className="text-black/80 hover:text-black dark:text-white/80 hover:dark:text-white"
							download
						>
							Download
						</Link>
					</li>
				) : (
					<></>
				)}
			</ul>
		</div>
	);
}

export const columns: ColumnDef<Data>[] = [
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type: string = row.getValue("type");

			const Icon = typeFile[type as "file" | "folder" | "archive"];

			return <Icon />;
		},
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "lastModifiedDateTime",
		header: () => <div className="text-center">Last modified</div>,
		cell: ({ row }) => {
			return (
				<div className="text-center font-medium">
					{formatDistanceToNow(row.getValue("lastModifiedDateTime"))}
				</div>
			);
		},
	},
	{
		accessorKey: "size",
		header: () => <div className="text-center">Size</div>,
		cell: ({ row }) => {
			return <div className="text-center font-medium">{row.getValue("size")}</div>;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		header: () => <div className="float-right">Actions</div>,
		cell: ({ row }) => <ButtonActions row={row} />,
	},
];

export default function ResourcesTable({ path, type }: { path?: string[]; type: "files" | "folders" }) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [data, setData] = useState<Data[]>([]);
	const { toast } = useToast();

	const table = useReactTable({
		data: data || [],
		columns,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	useEffect(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/microsoft/resources/${type}/${path ? path.join("/") : ""}`)
			.then((res) => setData(res.data.data))
			.catch((error) =>
				toast({
					title: "Something went wrong",
					description: error.response?.data?.msg,
					action: (
						<ToastAction onClick={() => location.reload()} altText="Reload">
							Reload
						</ToastAction>
					),
					variant: "destructive",
				}),
			);
	}, [type, path, toast]);

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					tabIndex={-1}
					placeholder="Search name..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button tabIndex={-1} variant="custom" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{_.startCase(column.id)}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className="hover:!bg-white dark:hover:!bg-black" key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{!data ? (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Loading data...
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="cursor-pointer">
											<div
												onClick={() =>
													(location.href = `/resources/${row.getValue("type") === "folder" ? "folders" : "files"}${path ? "/" + path?.join("/") : ""}/${row.getValue("name")}`)
												}
											>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</div>
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button
						tabIndex={-1}
						variant="custom"
						size="sm"
						onClick={() => {
							table.previousPage();
							window.scrollBy(0, 0);
						}}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						tabIndex={-1}
						variant="custom"
						size="sm"
						onClick={() => {
							table.nextPage();
							window.scrollBy(0, 0);
						}}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
