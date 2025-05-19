export function accumulate(list: [unknown], accumulator: (a: unknown) => unknown): list[unknown] {
  const newlist = []
  for (const i of list) {
    newlist.push(accumulator(i))
  }
  return newlist
}
