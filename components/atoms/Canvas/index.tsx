type CanvasProps = {
  draw: (context: CanvasRenderingContext2D, frameCount: number) => void
  style: React.CSSProperties
}

const Canvas: React.FC<CanvasProps> = ({ draw, ...props }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameID: number

    const render = () => {
      frameCount++
      draw(context!, frameCount)
      animationFrameID = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameID)
    }
  }, [draw])

  return <canvas ref={canvasRef} {...props} />
}

export default Canvas
