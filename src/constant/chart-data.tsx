/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChartDataProps } from "@/types"
import { dataKey, nameKey } from "./key"

export const chartData = (data: any): ChartDataProps => {
  return [
    { [nameKey.activer]: "active", [dataKey.users]: data.totalUsers - data.totalUsersNotActive, fill: "var(--color-active)"},
    { [nameKey.activer]: "inactive", [dataKey.users]: data.totalUsersNotActive, fill: "var(--color-inactive)"},
  ]
}

export const chartDataVisiter = (data: any): ChartDataProps => {
  return [
    { [nameKey.visiter]: "online", [dataKey.users]: data.usersVisited, fill: "var(--color-online)"},
    { [nameKey.visiter]: "offline", [dataKey.users]: data.totalUsers - data.usersVisited, fill: "var(--color-offline)"},
  ]
}

export const chartDataSubscribers = (data: any): ChartDataProps => {
  return [
    { [nameKey.subscribers]: "new", [dataKey.users]: data.usersNewSubscribers, fill: "var(--color-new)"},
    { [nameKey.subscribers]: "old", [dataKey.users]: data.totalUsers - data.usersNewSubscribers, fill: "var(--color-old)"},
  ]
}
