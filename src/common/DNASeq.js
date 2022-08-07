const ALLOWED_BASE_PAIRS = new Set(["A", "C", "G", "T"]);
const COMPLEMENTS = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
};

export default class DNASeq {
  static sanitizeFromRaw(str) {
    const sanitized = str
      .split("")
      .map((s) => s.toUpperCase())
      .filter((c) => ALLOWED_BASE_PAIRS.has(c))
      .join("");
    return new DNASeq(sanitized);
  }

  /** @type {string} */
  #data;

  constructor(str) {
    this.#data = str;
  }

  toString() {
    return this.#data;
  }

  complement() {
    return new DNASeq(this.#complementStr());
  }

  reverseComplement() {
    return new DNASeq(this.#complementStr().split("").reverse().join(""));
  }

  #complementStr() {
    return this.#data
      .split("")
      .map((base) => COMPLEMENTS[base])
      .join("");
  }
}
