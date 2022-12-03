const useDocumentListener = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (e: DocumentEventMap[K]) => any
) => {
  React.useEffect(() => {
    document.addEventListener(type, listener)

    return () => {
      document.removeEventListener(type, listener)
    }
  }, [type, listener])
}

export default useDocumentListener
