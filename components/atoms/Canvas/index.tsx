type CanvasProps = {
  draw: (context: CanvasRenderingContext2D, frameCount: number) => void
}

const Canvas: React.FC<CanvasProps> = ({ draw }) => {
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

  return <canvas ref={canvasRef} />
}

export default Canvas
