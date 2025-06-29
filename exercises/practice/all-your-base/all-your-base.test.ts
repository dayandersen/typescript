import { describe, it, expect } from '@jest/globals'
import { convert } from './all-your-base.ts'

describe('Converter', () => {
  it('single bit one to decimal', () => {
    const converted = convert([1], 2, 10)
    console.log(converted)
    expect(converted).toEqual([1])
  })

  it('binary to single decimal', () => {
    expect(convert([1, 0, 1], 2, 10)).toEqual([5])
  })

  it('single decimal to binary', () => {
    expect(convert([5], 10, 2)).toEqual([1, 0, 1])
  })

  it('binary to multiple decimal', () => {
    expect(convert([1, 0, 1, 0, 1, 0], 2, 10)).toEqual([4, 2])
  })

  it('decimal to binary', () => {
    const converted = convert([4, 2], 10, 2)
    expect(converted).toEqual([1, 0, 1, 0, 1, 0])
  })

  it('trinary to hexadecimal', () => {
    const converted = convert([1, 1, 2, 0], 3, 16)
    expect(converted).toEqual([2, 10])
  })

  it('hexadecimal to trinary', () => {
    const converted = convert([2, 10], 16, 3)
    expect(converted).toEqual([1, 1, 2, 0])
  })

  it('15-bit integer', () => {
    expect(convert([3, 46, 60], 97, 73)).toEqual([6, 10, 45])
  })

  it('empty list', () => {
    expect(() => {
      convert([], 2, 10)
    }).toThrow('Input has wrong format')
  })

  it('single zero', () => {
    expect(convert([0], 10, 2)).toEqual([0])
  })

  it('multiple zeros', () => {
    expect(() => {
      convert([0, 0, 0], 10, 2)
    }).toThrow('Input has wrong format')
  })

  it('leading zeros', () => {
    expect(() => {
      convert([0, 6, 0], 7, 10)
    }).toThrow('Input has wrong format')
  })

  it('negative digit', () => {
    expect(() => {
      convert([1, -1, 1, 0, 1, 0], 2, 10)
    }).toThrow('Input has wrong format')
  })

  it('invalid positive digit', () => {
    expect(() => {
      convert([1, 2, 1, 0, 1, 0], 2, 10)
    }).toThrow('Input has wrong format')
  })

  it('first base is one', () => {
    expect(() => {
      convert([], 1, 10)
    }).toThrow('Wrong input base')
  })

  it('second base is one', () => {
    expect(() => {
      convert([1, 0, 1, 0, 1, 0], 2, 1)
    }).toThrow('Wrong output base')
  })

  it('first base is zero', () => {
    expect(() => {
      convert([], 0, 10)
    }).toThrow('Wrong input base')
  })

  it('second base is zero', () => {
    expect(() => {
      convert([7], 10, 0)
    }).toThrow('Wrong output base')
  })

  it('first base is negative', () => {
    expect(() => {
      convert([1], -2, 10)
    }).toThrow('Wrong input base')
  })

  it('second base is negative', () => {
    expect(() => {
      convert([1], 2, -7)
    }).toThrow('Wrong output base')
  })

  it('both bases are negative', () => {
    expect(() => {
      convert([1], -2, -7)
    }).toThrow('Wrong input base')
  })

  it('wrong output_base base not integer', () => {
    expect(() => {
      convert([0], 3, 2.5)
    }).toThrow('Wrong output base')
  })
})
