const useMounted = () => {
  const [mounted, setMounted] = React.useState(false)

  //  Updates mounted status
  React.useEffect(() => {
    setMounted(true)

    return () => {
      setMounted(false)
    }
  }, [])

  return mounted
}

export default useMounted
