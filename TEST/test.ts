console.log("__TEST START__");

class PhoneNumber {
  public readonly phone_number: string;

  constructor(raw_phone_number: string) {
    this.phone_number = raw_phone_number.replaceAll(/[^0-9]/g, "");
  }
}

const pn = new PhoneNumber("010 3734 1756");

console.log(pn.phone_number);

console.log("__TEST END__");
