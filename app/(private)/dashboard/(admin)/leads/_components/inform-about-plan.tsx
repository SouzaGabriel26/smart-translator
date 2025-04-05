import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";

type InformAboutPlanProps = {
  enabled: boolean;
  customText?: string;
}

export function InformAboutPlan({ enabled, customText }: InformAboutPlanProps) {
  if (!enabled) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 w-8 h-8 data-[state=open]:bg-muted">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit'>
        <div className='flex flex-col gap-2'>
          <Button variant="outline" className='w-full'>
            {
              customText
                ? customText
                : "Inform about plan"
            }
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
