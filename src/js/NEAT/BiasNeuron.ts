import Neuron from "./Neuron";
import Layer from "./Layer";

class BiasNeuron extends Neuron {
  constructor(id: number, layer: Layer) {
    super(id, layer);
    this.outputValue = 1;
  }

  engage() {
  }
}
