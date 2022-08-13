const ALLOWED_BASE_PAIRS = new Set(["A", "C", "G", "T"]);
const COMPLEMENTS = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
};

export default class DNASeq {
  static sanitizeFromRaw(str: string) {
    const sanitized = str
      .split("")
      .map((s) => s.toUpperCase())
      .filter((c) => ALLOWED_BASE_PAIRS.has(c))
      .join("");
    return new DNASeq(sanitized);
  }

  #data: string;

  constructor(str: string) {
    this.#data = str;
  }

  toString() {
    return this.#data;
  }

  toArray() {
    return this.toString().split("");
  }

  complement() {
    return new DNASeq(this.#complementStr());
  }

  reverseComplement() {
    return new DNASeq(this.#complementStr().split("").reverse().join(""));
  }

  #complementStr() {
    return this.toArray()
      .map((base) => COMPLEMENTS[base])
      .join("");
  }
}
