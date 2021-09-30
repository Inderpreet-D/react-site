export type Handler<T> = {
  [x: string]: T
}

export type ReducerFunc<S, A> = (s: S, a: A) => S
