import { Badge } from "@/components/ui/badge"
import React from "react";

interface PromotionBadgeProps {
  percentage: number
}

const PromotionBadge: React.FC<PromotionBadgeProps> = ({ percentage }) => {
  return <Badge className="ml-1 bg-red-600 text-xs">-{percentage}%</Badge>
}

export default PromotionBadge;
