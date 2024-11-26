"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns";


export function FieldLabel(props: {
  children?: React.ReactNode,
  required?: boolean,
  className?: string,
}) {
  return <FormLabel className={cn("flex", props.className)}>
    {props.children}
    {props.required ? <span className="text-zinc-500">{'*'}</span> : null}
  </FormLabel>;
}

export function TextAreaField<F extends FieldValues>(props: {
  rows?: number,
  required?: boolean,
  placeholder?: string,
  helperText?: string | JSX.Element,
  control: Control<F>,
  name: Path<F>,
  label: React.ReactNode,
  monospace?: boolean,
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label className="flex flex-col gap-2">
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={props.rows}
                placeholder={props.placeholder}
                value={field.value ?? ""}
                style={{
                  fontFamily: props.monospace ? "ui-monospace, monospace" : undefined,
                }}
              />
            </FormControl>
            <FormMessage />
          </label>
        </FormItem>
      )}
    />
  );
}

export function InputField<F extends FieldValues>(props: {
  control: Control<F>,
  name: Path<F>,
  label: React.ReactNode,
  placeholder?: string,
  required?: boolean,
  type?: string,
  disabled?: boolean,
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label className="flex flex-col gap-2">
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={props.placeholder}
                className="max-w-lg"
                disabled={props.disabled}
                type={props.type}
              />
            </FormControl>
            <FormMessage />
          </label>
        </FormItem>
      )}
    />
  );
}

export function SwitchField<F extends FieldValues>(props: {
  control: Control<F>,
  name: Path<F>,
  label: React.ReactNode,
  required?: boolean,
  border?: boolean,
  disabled?: boolean,
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label className={cn(
            "flex flex-row items-center gap-2",
            props.border ? "rounded-lg border p-3 shadow-sm" : null
          )}>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={props.disabled}
              />
            </FormControl>
            <FieldLabel required={props.required}>
              {props.label}
            </FieldLabel>
          </label>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SwitchListField<F extends FieldValues>(props: {
  variant?: "switch" | "checkbox",
  control: Control<F>,
  name: Path<F>,
  label: React.ReactNode,
  options: { value: string, label: string }[],
  required?: boolean,
  disabled?: boolean,
}) {
  const Trigger = props.variant === "checkbox" ? Checkbox : Switch;

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <div className="flex flex-col rounded-lg border p-3 shadow-sm space-y-4">
            {props.options.map(provider => (
              <label className="flex flex-row items-center justify-between" key={provider.value}>
                <FieldLabel required={props.required}>{provider.label}</FieldLabel>
                <FormControl>
                  <Trigger
                    checked={field.value.includes(provider.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, provider.value]);
                      } else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        field.onChange(field.value.filter((v: any) => v !== provider.value));
                      }
                    }}
                    disabled={props.disabled}
                  />
                </FormControl>
              </label>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function DateField<F extends FieldValues>(props: {
  control: Control<F>,
  name: Path<F>,
  label: React.ReactNode,
  required?: boolean,
  disabled?: boolean,
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FieldLabel required={props.required}>{props.label}</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[160px] sm:w-[180px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={props.disabled}
                >
                  <CalendarIcon className="h-4 hidden sm:visible w-4 ml-0 mr-2 opacity-50" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectField<F extends FieldValues>(props: {
  control: Control<F>,
  name: Path<F>,
  label?: React.ReactNode,
  options: { value: string, label: string }[],
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label ? <FieldLabel required={props.required}>{props.label}</FieldLabel> : null}
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={props.disabled}>
              <SelectTrigger className="min-w-[160px] max-w-lg my-0">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {props.options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
