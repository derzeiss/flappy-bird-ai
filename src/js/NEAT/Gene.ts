import {randFloat} from "./util";
import Neuron from "./Neuron";

export default class Gene {
  public id: number;
  public from: Neuron;
  public to: Neuron;
  public weight: number;

  constructor(id: number, from: Neuron, to: Neuron, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  mutate() {
    // chance to change weight completely
    if (Math.random() < .1) this.weight = randFloat(-1, 1);
    // otherwise just tweak it a bit
    else this.weight = Math.min(1, Math.max(-1, randFloat(-1, 1) / 50));
  }

  clone() {
    return new Gene(this.id, this.from, this.to, this.weight);
  }
}
