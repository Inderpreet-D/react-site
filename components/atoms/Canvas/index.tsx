import { CanvasProps } from 'react-html-props'

type MyCanvasProps = CanvasProps & {
  draw: (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    frameCount: number
  ) => void
  style?: React.CSSProperties
  width?: string
  height?: string
}

const Canvas: React.FC<MyCanvasProps> = ({ draw, ...props }) => {
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

  return <canvas ref={canvasRef} {...props} />
}

export default Canvas
