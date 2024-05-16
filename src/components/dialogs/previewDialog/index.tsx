import { memo, useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import eventEmitter from "@/lib/eventEmitter"
import { type DriveCloudItem } from "@/components/drive"
import worker from "@/lib/worker"
import { fileNameToPreviewType } from "./utils"
import Text from "./text"
import PDF from "./pdf"
import Image from "./image"
import Video from "./video"
import DocX from "./docx"
import { Loader as LoaderIcon, X } from "lucide-react"

export const Loader = memo(() => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<LoaderIcon className="animate-spin-medium" />
		</div>
	)
})

export const PreviewDialog = memo(() => {
	const [open, setOpen] = useState<boolean>(false)
	const [item, setItem] = useState<DriveCloudItem | null>(null)
	const [urlObjects, setURLObjects] = useState<Record<string, string>>({})
	const [buffers, setBuffers] = useState<Record<string, Buffer>>({})
	const openRef = useRef<boolean>(false)

	const previewType = useMemo(() => {
		if (!item) {
			return "other"
		}

		return fileNameToPreviewType(item.name)
	}, [item])

	const cleanup = useCallback(() => {
		setTimeout(() => {
			if (!openRef.current) {
				for (const uuid in urlObjects) {
					globalThis.URL.revokeObjectURL(urlObjects[uuid])
				}

				setURLObjects({})
				setBuffers({})
			}
		}, 3000)
	}, [urlObjects])

	const onOpenChange = useCallback(
		(openState: boolean) => {
			setOpen(openState)
			cleanup()
		},
		[cleanup]
	)

	const loadFile = useCallback(
		async ({ itm }: { itm: DriveCloudItem }) => {
			if (itm.type !== "file") {
				return
			}

			const previewType = fileNameToPreviewType(itm.name)

			if (previewType === "other" || itm.size >= 256 * 1024 * 1024) {
				return
			}

			try {
				const buffer = await worker.readFile({ item: itm, emitEvents: false })

				if (previewType === "text" || previewType === "docx" || previewType === "md" || previewType === "code") {
					setBuffers(prev => ({ ...prev, [itm.uuid]: buffer }))
				} else {
					setURLObjects(prev => ({ ...prev, [itm.uuid]: globalThis.URL.createObjectURL(new Blob([buffer], { type: itm.mime })) }))
				}
			} catch (e) {
				console.error(e)
			} finally {
				cleanup()
			}
		},
		[cleanup]
	)

	useEffect(() => {
		openRef.current = open
	}, [open])

	useEffect(() => {
		const listener = eventEmitter.on("openPreviewModal", ({ item: itm }: { item: DriveCloudItem }) => {
			setItem(itm)
			setOpen(true)
			loadFile({ itm })
		})

		return () => {
			listener.remove()
		}
	}, [loadFile])

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className="fullscreen-dialog no-close-button outline-none focus:outline-none active:outline-none hover:outline-none select-none">
				{item && (
					<div className="absolute w-screen h-screen flex flex-col">
						<div className="flex flex-row border-b h-[49px] shadow-md bg-secondary w-full items-center justify-between px-4 z-50 gap-10 -mt-[1px]">
							<p className="line-clamp-1 text-ellipsis break-all">{item.name}</p>
							<X
								className="h-4 w-4 opacity-70 hover:opacity-100 cursor-pointer"
								onClick={() => setOpen(false)}
							/>
						</div>
						{(previewType === "text" || previewType === "code" || previewType === "md") && (
							<>
								{buffers[item.uuid] ? (
									<Text
										buffer={buffers[item.uuid]}
										item={item}
									/>
								) : (
									<Loader />
								)}
							</>
						)}
						{previewType === "docx" && <>{buffers[item.uuid] ? <DocX buffer={buffers[item.uuid]} /> : <Loader />}</>}
						{previewType === "pdf" && <>{urlObjects[item.uuid] ? <PDF urlObject={urlObjects[item.uuid]} /> : <Loader />}</>}
						{previewType === "image" && (
							<Image
								urlObject={urlObjects[item.uuid]}
								item={item}
							/>
						)}
						{previewType === "video" && <>{urlObjects[item.uuid] ? <Video urlObject={urlObjects[item.uuid]} /> : <Loader />}</>}
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
})

export default PreviewDialog
