export class BinarySearchTree {
  private readonly val: number;
  private r: BinarySearchTree | undefined = undefined;
  private l: BinarySearchTree | undefined = undefined;
  private parent: BinarySearchTree | undefined



  constructor(data: number, parent: BinarySearchTree | undefined = undefined) {
    this.val = data;
    this.parent = parent
  }

  public get data(): number {
    return this.val
  }

  public get right(): BinarySearchTree | undefined {
    return this.r
  }

  public get left(): BinarySearchTree | undefined {
    return this.l
  }

  public insert(item: number): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let curr: BinarySearchTree = this
    
    while (true) {
      if (item > curr.data) {
        if (curr.right === undefined) {
          curr.r = new BinarySearchTree(item, curr)
          return
        } else {
          curr = curr.r!
        }
      } else {
        if (curr.left === undefined) {
          curr.l = new BinarySearchTree(item, curr)
          return
        } else {
          curr = curr.l!
        }
      }
    }
  }

  public each(callback: (data: number) => unknown) {
    this.recurse(this).forEach((it: number) => callback(it))
  }

  private recurse(curr: BinarySearchTree | undefined): number[] {
    if (curr === undefined) {
      return []
    } else {
      return this.recurse(curr.l).concat([curr.val]).concat(this.recurse(curr.r))
    }
  }
}
