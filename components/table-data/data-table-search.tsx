"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { IconLayoutColumns, IconChevronDown } from "@tabler/icons-react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface DataTableSearchProps<TData> {
  table: Table<TData>;
}

/* 🔥 Sortable Item */
function SortableColumnItem({ column }: any) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DropdownMenuCheckboxItem
      ref={setNodeRef}
      style={style}
      checked={column.getIsVisible()}
      onCheckedChange={(value) => column.toggleVisibility(!!value)}
      className="flex items-center justify-between capitalize"
    >
      {/* Column Name */}
      <span>{column.id}</span>

      {/* ✅ Drag Icon (RIGHT SIDE) */}
      <span
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()} // prevent checkbox toggle
        className="ml-2 cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={14} />
      </span>
    </DropdownMenuCheckboxItem>
  );
}

export function DataTableSearch<TData>({ table }: DataTableSearchProps<TData>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const columnOrder = table.getState().columnOrder;

  /* 🔥 Handle drag reorder */
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columnOrder.indexOf(active.id);
    const newIndex = columnOrder.indexOf(over.id);

    table.setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
  };

  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide(),
    );

  return (
    <div className="flex items-center justify-between px-4 lg:px-6 px-1 gap-4">
      {/* 🔍 SEARCH */}
      <Input
        placeholder="Search sections..."
        value={(table.getColumn("header")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("header")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <div className="flex items-center gap-2">
        {/* 🔥 CUSTOMIZE + REORDER DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden lg:inline">Customize Columns</span>
              <span className="lg:hidden">Columns</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-0">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={columnOrder}
                strategy={verticalListSortingStrategy}
              >
                {columns.map((column) => (
                  <SortableColumnItem key={column.id} column={column} />
                ))}
              </SortableContext>
            </DndContext>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
