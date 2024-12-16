import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import BaseLocale from "./locale-menu/BaseLocale"
import { ModeToggle } from "./theme/ModeToggle"
import SignOut from "./sign-menu/SignOut"

export function BaseMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative">
        <Button variant="link"><Ellipsis /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 absolute right-[-60px]">
        <DropdownMenuGroup>
          <BaseLocale/>
          <ModeToggle/>
        </DropdownMenuGroup>
        <SignOut/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
