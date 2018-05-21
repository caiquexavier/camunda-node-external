
class Option {
  value;

  constructor(value) {
    if (!value) this.value = null;
    else this.value = value;
  }

  empty() {
    return None;
  }

  map(f) {
    return this.isEmpty() ? None : new Option(f(this.get()));
  }

  flatmap(fmap) {
    return this.isEmpty() ? None : fmap(this.get());
  }

  filter(predicate) {
    return this.isEmpty() || predicate(this.get()) ? this : None;
  }

  get() {
    return this.value;
  }

  orElse(another) {
    return this.isEmpty() ? another : this.get();
  }

  orThrows(error: Error) {
      if (this.isEmpty()) throw error
      else return this.get()
  }

  ifPresent(consumer) {
    if (this.isEmpty()) return
    else consumer(this.value)
  }

  isEmpty() {
    return this === None || !this.value;
  }
}

const None = new Option(false)

export default value => new Option(value)
