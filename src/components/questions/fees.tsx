import { cn } from "@/lib/utils"
import {
  Card
} from "@/components/ui/card"

type CardProps = React.ComponentProps<typeof Card>
 
export function Fees({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
        <p>Fees</p>
    </Card>
  )
}