function Log(_: unknown, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const newDescriptor = {
    ...descriptor,
    value: function (...args: unknown[]): unknown {
      console.log(`invoke ${name} width arg`);
      console.dir(args);
      const res = descriptor.value.apply(this, args);
      console.log(`Result:`);
      console.dir(res);

      return res;
    },
  };

  return newDescriptor;
}

class CalCulator {
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}

const cal = new CalCulator();
cal.add(1, 2);
