"use client";

import { Check, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface AutoCompleteOption {
	value: string | number;
	label: string;
}

export interface AutoCompleteProps {
	options: AutoCompleteOption[];
	value: string | number;
	onChange: (value: string | number) => void;
		onSearch?: (search: string) => void;   // ⭐ NEW
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	width?: string;
	disabled?: boolean;
}

export function AutoComplete({
	options,
	value,
	onChange,
	onSearch,
	placeholder = "Select option...",
	searchPlaceholder = "Search...",
	emptyMessage = "No option found.",
	width = "w-full",
	disabled = false,
}: AutoCompleteProps) {
	const [open, setOpen] = React.useState(false);

	const selectedLabel = React.useMemo(() => {
		return options.find((option) => option.value === value)?.label;
	}, [options, value]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`${width} justify-between shadow-lg`}
					disabled={disabled}
				>
					{selectedLabel || placeholder}
					<ChevronDownIcon className="size-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="p-0"
				align="start"
				style={{ width: "var(--radix-popover-trigger-width)" }}
			>
				<Command>
					<CommandInput placeholder={searchPlaceholder} className="h-9" 
					onValueChange={(value) => onSearch?.(value)}  // ⭐ search call
					/>
					<CommandList>
						<CommandEmpty>{emptyMessage}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={String(option.label)}
									onSelect={() => {
										onChange(option.value === value ? "" : option.value);
										setOpen(false);
									}}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto size-4",
											value === option.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}