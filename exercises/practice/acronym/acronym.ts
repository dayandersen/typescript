export function parse(phrase: string): string {
  return phrase.split(" ").reduce((acronym: string, s: string) => {
    return acronym + s.charAt(0).toUpperCase()
  }, "")
}
