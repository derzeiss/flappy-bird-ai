import Neuron from "./Neuron";
import {chooseRandom} from "./util";

export default class Layer {
  index: number;
  private _neurons: Neuron[];

  constructor(index: number) {
    this.index = index;
  }

  addNeuron(neuron: Neuron) {
    this._neurons.push(neuron);
  }

  getRandomNeuron() {
    return chooseRandom(this._neurons);
  }
}
