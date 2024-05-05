import { memo } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"
import useRouteParent from "@/hooks/useRouteParent"
import { useTranslation } from "react-i18next"
import { ArrowUp, ArrowDown } from "lucide-react"

const iconSize = 16

export type DriveSortBy = Record<string, "nameAsc" | "nameDesc" | "sizeAsc" | "sizeDesc" | "lastModifiedAsc" | "lastModifiedDesc">

export const Header = memo(() => {
	const [driveSortBy, setDriveSortBy] = useLocalStorage<DriveSortBy>("driveSortBy", {})
	const routeParent = useRouteParent()
	const { t } = useTranslation()

	return (
		<div className="flex flex-row px-3">
			<div className="flex flex-row w-full h-10 items-center select-none gap-3">
				<div
					className="flex flex-row grow min-w-[200px] items-center cursor-pointer"
					onClick={() =>
						setDriveSortBy(prev => ({
							...prev,
							[routeParent]: prev[routeParent] === "nameDesc" ? "nameAsc" : "nameDesc"
						}))
					}
				>
					<div className="flex flex-row gap-2 items-center">
						<p className="dragselect-start-disallowed line-clamp-1 text-ellipsis">{t("drive.header.name")}</p>
						{(!driveSortBy[routeParent] || driveSortBy[routeParent] === "nameAsc") && <ArrowUp size={iconSize} />}
						{driveSortBy[routeParent] === "nameDesc" && <ArrowDown size={iconSize} />}
					</div>
				</div>
				<div
					className="flex flex-row w-[125px] items-center cursor-pointer"
					onClick={() =>
						setDriveSortBy(prev => ({ ...prev, [routeParent]: prev[routeParent] === "sizeDesc" ? "sizeAsc" : "sizeDesc" }))
					}
				>
					<div className="flex flex-row gap-2 items-center">
						<p className="dragselect-start-disallowed line-clamp-1 text-ellipsis">{t("drive.header.size")}</p>
						{driveSortBy[routeParent] === "sizeAsc" && <ArrowUp size={iconSize} />}
						{driveSortBy[routeParent] === "sizeDesc" && <ArrowDown size={iconSize} />}
					</div>
				</div>
				<div
					className="flex flex-row w-[250px] items-center cursor-pointer"
					onClick={() =>
						setDriveSortBy(prev => ({
							...prev,
							[routeParent]: prev[routeParent] === "lastModifiedDesc" ? "lastModifiedAsc" : "lastModifiedDesc"
						}))
					}
				>
					<div className="flex flex-row gap-2 items-center">
						<p className="dragselect-start-disallowed line-clamp-1 text-ellipsis">{t("drive.header.modified")}</p>
						{driveSortBy[routeParent] === "lastModifiedAsc" && <ArrowUp size={iconSize} />}
						{driveSortBy[routeParent] === "lastModifiedDesc" && <ArrowDown size={iconSize} />}
					</div>
				</div>
			</div>
		</div>
	)
})

export default Header
