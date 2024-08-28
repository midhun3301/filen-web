import { memo, useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import eventEmitter from "@/lib/eventEmitter"
import Content from "./content"
import { useTranslation } from "react-i18next"

export const EventDialog = memo(() => {
	const [open, setOpen] = useState<boolean>(false)
	const [uuid, setUUID] = useState<string | null>(null)
	const { t } = useTranslation()

	const preventDefault = useCallback((e: Event) => {
		e.preventDefault()
		e.stopPropagation()
	}, [])

	useEffect(() => {
		const listener = eventEmitter.on("openEventDialog", (id: string) => {
			setUUID(id)
			setOpen(true)
		})

		return () => {
			listener.remove()
		}
	}, [])

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent
				className="outline-none focus:outline-none active:outline-none hover:outline-none select-none"
				id="event-content"
				onOpenAutoFocus={preventDefault}
			>
				<DialogHeader>{t("dialogs.event.title")}</DialogHeader>
				{uuid && <Content uuid={uuid} />}
				<DialogFooter />
			</DialogContent>
		</Dialog>
	)
})

export default EventDialog