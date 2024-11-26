"use client"
import { SelectField } from "@/components/common/FormFields"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import { analyticsRangeAtom } from "@/store/analyticsRange"
import { useSetRecoilState } from "recoil"
import { useEffect } from "react"
const analyticsRangeOptions = [
  {
    label: "All time",
    value: "alltime"
  },
  {
    label: "Last 7 days",
    value: "last7days"
  },
  {
    label: "This Month",
    value: "thisMonth"
  },
  {
    label: "Last Month",
    value: "lastMonth"
  }
]

export default function SelectAnalyticsRange() {
  const setAnalyticsRange = useSetRecoilState(analyticsRangeAtom)
  const analyticsRangeSchema = z.object({
    analyticsRange: z.string()
  })
  const form = useForm<z.infer<typeof analyticsRangeSchema>>({
    resolver: zodResolver(analyticsRangeSchema),
    defaultValues: {
      analyticsRange: "alltime"
    }
  })
  const selectedValue = form.watch("analyticsRange")
  useEffect(() => {
    setAnalyticsRange(analyticsRangeOptions.find(option => option.value === selectedValue) || analyticsRangeOptions[0])
  }, [selectedValue])
  return (
    <Form {...form}>
      <form>
        <SelectField
          control={form.control}
          name="analyticsRange"
          options={analyticsRangeOptions}
        />
      </form>
    </Form>
  )
}
