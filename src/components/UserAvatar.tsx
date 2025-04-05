import { UserRoundIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function UserAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="transition duration-300 ease-in-out group-hover:bg-transparent">
        <UserRoundIcon size={16} className="opacity-60" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  )
}
