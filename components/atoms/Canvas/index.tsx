import { CanvasProps } from 'react-html-props'

import useDrawingCanvas, { DrawType } from '../../../hooks/useDrawingCanvas'

type MyCanvasProps = CanvasProps & {
  draw: DrawType
  style?: React.CSSProperties
  width?: string
  height?: string
}

const Canvas: React.FC<MyCanvasProps> = ({ draw, ...props }) => {
  const canvasRef = useDrawingCanvas(draw)

  return <canvas ref={canvasRef} {...props} />
}

export default Canvas
