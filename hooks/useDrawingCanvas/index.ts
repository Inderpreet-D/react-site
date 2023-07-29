export type DrawType = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  frameCount: number
) => void

const useDrawingCanvas = (draw: DrawType) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    let frameCount = 0
    let animationFrameID: number

    const render = () => {
      frameCount++
      draw(context, canvas, frameCount)
      animationFrameID = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameID)
    }
  }, [draw])

  return canvasRef
}

export default useDrawingCanvas
