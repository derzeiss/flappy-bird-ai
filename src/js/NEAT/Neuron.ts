import Gene from "./Gene";
import Layer from "./Layer";

export default class Neuron {
  public id: number;
  public layer: Layer;
  public outputValue: number;
  private _synapsesIn: Gene[];
  private _activationFunc: Function;

  constructor(id: number, layer: Layer) {
    this.id = id;
    this.layer = layer;

    // add activation function to non-input nodes
    this._activationFunc = this.layer.index > 0 ? Neuron._sigmoid : (): null => null;
  }

  private static _sigmoid(x: number) {
    return 1 / (1 + Math.pow(Math.E, -x));
  }

  engage() {
    this.outputValue = this._activationFunc(this._getWeightedInputSum());
  }

  isConnectedTo(node: Neuron) {
    // nodes on same layer can't be connected
    if (this.layer === node.layer) return false;

    // this sits after node -> check this's incoming synapses
    if (this.layer > node.layer) return this._synapsesIn.some(s => s.from === node);
    else return node._synapsesIn.some(s => s.from === this);
  }

  clone() {
    return new Neuron(this.id, this.layer);
  }

  private _getWeightedInputSum() {
    let sum = 0;
    this._synapsesIn.forEach((s: Gene) => sum += s.weight * s.from.outputValue);
    return sum;
  }
}
