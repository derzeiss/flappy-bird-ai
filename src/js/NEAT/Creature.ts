import NeuralNetwork, {INeuralNetworkProps} from "./NeuralNetwork";

export default class Creature {

  private _brain: NeuralNetwork;

  constructor(brain?: NeuralNetwork | INeuralNetworkProps) {
    this._brain = Creature._brainFactory(brain);
  }

  private static _brainFactory(brain?: NeuralNetwork | INeuralNetworkProps): NeuralNetwork {
    if (brain instanceof NeuralNetwork) return brain;
    return new NeuralNetwork(brain);
  }

  feedForward() {
    this._brain.feedForward();
  }
}
