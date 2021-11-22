import Container from '../../atoms/Container'
import Canvas from '../../atoms/Canvas'

const GoL = () => {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, frame: number) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(50, 100, 20 * Math.sin(frame * 0.05) ** 2, 0, 2 * Math.PI)
      ctx.fill()
    },
    []
  )

  return (
    <Container>
      <Canvas draw={draw} />
    </Container>
  )
}

export default GoL
