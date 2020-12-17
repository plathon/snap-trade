export default interface IJwt {
  sign(data: { [key: string]: string }, privateKey: string): string
}
