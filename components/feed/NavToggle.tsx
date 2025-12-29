import { Toggle } from "@/components/ui/Toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavToggle({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} aria-label={label}>
      <Toggle
        size="lg"
        pressed={isActive}
      >
        {icon}
      </Toggle>
    </Link>
  )
}
