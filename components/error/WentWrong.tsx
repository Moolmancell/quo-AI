import { RotateCw } from "lucide-react"
import { CloudOff } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty"

export function WentWrong({className, onClick}: {className?: string, onClick?: () => void }) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudOff className="w-12 h-12 text-muted-foreground"/>
        </EmptyMedia>
        <EmptyTitle>Something Went Wrong</EmptyTitle>
        <EmptyDescription>
          Try refreshing the page or come back later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline" onClick={onClick}>
          <RotateCw />
          Refresh Page
        </Button>
      </EmptyContent>
    </Empty>
  )
}
