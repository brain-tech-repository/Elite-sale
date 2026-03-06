"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Section } from "../types/index"
import { Badge } from "@/components/ui/badge"
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react"

export const sectionColumns: ColumnDef<Section>[] = [
  {
    accessorKey: "header",
    header: "Header",
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.type}
      </Badge>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="flex gap-2 items-center">

        {row.original.status === "Done" ? (
          <IconCircleCheckFilled className="text-green-500 size-4" />
        ) : (
          <IconLoader className="size-4 animate-spin" />
        )}

        {row.original.status}

      </Badge>
    ),
  },

  {
    accessorKey: "target",
    header: "Target",
  },

  {
    accessorKey: "limit",
    header: "Limit",
  },

  {
    accessorKey: "reviewer",
    header: "Reviewer",
  },
]