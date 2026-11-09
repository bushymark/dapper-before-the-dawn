function setupImageViewer() {
  document.querySelectorAll<HTMLImageElement>("article img").forEach((image) => {
    if (image.dataset.imageViewer === "ready") return
    image.dataset.imageViewer = "ready"
    image.classList.add("enlargeable-image")
    const trigger: HTMLElement = image.closest("a") ?? image
    if (trigger === image) {
      image.tabIndex = 0
      image.setAttribute("role", "button")
    }
    trigger.setAttribute("aria-haspopup", "dialog")
    trigger.setAttribute("aria-label", `Enlarge image: ${image.alt || "illustration"}`)

    let viewer: HTMLDialogElement | undefined
    function open(event: Event) {
      event.preventDefault()
      event.stopPropagation()
      if (viewer?.open) return

      const dialog = document.createElement("dialog")
      viewer = dialog
      dialog.className = "image-viewer"
      dialog.setAttribute("aria-label", image.alt || "Full-size image")

      const toolbar = document.createElement("div")
      toolbar.className = "image-viewer-toolbar"
      const zoom = document.createElement("button")
      zoom.type = "button"
      zoom.textContent = "View at 100%"
      zoom.setAttribute("aria-pressed", "false")
      const close = document.createElement("button")
      close.type = "button"
      close.textContent = "Close"
      close.setAttribute("aria-label", "Close image viewer")
      toolbar.append(zoom, close)

      const stage = document.createElement("div")
      stage.className = "image-viewer-stage"
      const fullImage = document.createElement("img")
      fullImage.src = image.currentSrc || image.src
      fullImage.alt = image.alt
      stage.append(fullImage)
      dialog.append(toolbar, stage)
      document.body.append(dialog)

      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      dialog.addEventListener("close", () => {
        document.body.style.overflow = previousOverflow
        dialog.remove()
        viewer = undefined
        if (trigger.isConnected) (trigger as HTMLElement).focus({ preventScroll: true })
      })
      close.addEventListener("click", () => dialog.close())
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog || event.target === stage) dialog.close()
      })
      zoom.addEventListener("click", () => {
        const actualSize = dialog.classList.toggle("image-viewer-actual-size")
        zoom.textContent = actualSize ? "Fit to screen" : "View at 100%"
        zoom.setAttribute("aria-pressed", String(actualSize))
        stage.scrollTo(0, 0)
      })
      dialog.showModal()
      close.focus()
    }

    function keydown(event: KeyboardEvent) {
      if (event.key === " " || event.key === "Enter") open(event)
    }
    trigger.addEventListener("click", open)
    trigger.addEventListener("keydown", keydown)
    window.addCleanup(() => {
      viewer?.close()
      trigger.removeEventListener("click", open)
      trigger.removeEventListener("keydown", keydown)
      delete image.dataset.imageViewer
    })
  })
}

document.addEventListener("nav", setupImageViewer)
document.addEventListener("render", setupImageViewer)
