import Neuron from "./Neuron";
import UniqueEntity from "./UniqueEntity";
import Layer from "./Layer";
import Gene from "./Gene";
import {randFloat, randInt} from "./util";

export interface INeuralNetworkProps {
  crossover: boolean,
  inputs?: number,
  outputs?: number,
  layers?: Layer[]
}

export default class NeuralNetwork extends UniqueEntity {
  private _iInputLayer: number = 0;
  private _iOutputLayer: number;

  private _nextNeuronId: number;
  private _nextGeneId: number;

  private _layers: Layer[];
  private _genes: Gene[];

  constructor(props: INeuralNetworkProps) {
    super();
    this._nextNeuronId = 1;

    if (!props.crossover) this._initNewNetwork(props.inputs, props.outputs);
    else this._initCrossoverNetwork(props)
  }

  feedForward() {

  }


  addRandomConnection() {

  }

  private _initNewNetwork(inputs: number, outputs: number) {
    this._layers.push(this._getFilledLayer(this._iInputLayer, inputs));
    this._layers.push(this._getFilledLayer(this._iOutputLayer, outputs));
    this._mutate();
  }

  private _initCrossoverNetwork(props: INeuralNetworkProps) {
    // TODO
  }

  private _getFilledLayer(layerIndex: number, neuronAmount: number = 1) {
    const layer = new Layer(layerIndex);
    for (var i = 0; i < neuronAmount; i++) {
      layer.addNeuron(new Neuron(this._nextNeuronId++, layer));
    }
    return layer;
  }

  private _addRandomConnection() {
    let iFrom, iTo;
    do {
      iFrom = randInt(0, this._layers.length);
      iTo = randInt(0, this._layers.length);
    } while (iFrom == iTo);
    let neuronFrom = this._layers[iFrom].getRandomNeuron();
    let neuronTo = this._layers[iTo].getRandomNeuron();
    this._genes.push(new Gene(this._nextGeneId++, neuronFrom, neuronTo, randFloat(-1, 1)));
  }

  private _mutate() {
    if (this._genes.length === 0) {
      this._addRandomConnection();
    }

    // 80% of the time mutate gene weights
    if (Math.random() < .8) {
      this._genes.forEach(g => g.mutate());
    }

    // 5% of the time add a new connection
    if (Math.random() < .05) {
      this.addRandomConnection();
    }

    // 1% of the time add node
    if (Math.random() < .01) {

    }
  }
}
