function assert(cond: boolean, msg: string): asserts cond {
  if (!cond) {
    throw new Error(msg);
  }
}

function NotUndefined<T>(elm: T, msg: string): asserts elm {
  assert(elm !== undefined, `Unexpected: ${msg} is undefiend`);
}

function NotNull<T>(elm: T, msg: string): asserts elm {
  assert(elm !== null, `Unexpected: ${msg} is null`);
}

function NotImplemented(msg: string) {
  throw new Error(msg);
}

export { assert, NotNull, NotUndefined, NotImplemented };
