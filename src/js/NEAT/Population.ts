import Creature from "./Creature";
import {INeuralNetworkProps} from "./NeuralNetwork";

class Population {
  private _size: number;
  private _creatures: Creature[];

  constructor(brainType: INeuralNetworkProps, size: number) {
    this._creatures = Population._getNewPop(brainType, size);
  }

  private static _getNewPop(brainType: INeuralNetworkProps, size: number): Creature[] {
    let pop: Creature[] = [];
    for (let i = 0; i < size; i++) {
      pop.push(new Creature(brainType));
    }
    return pop;
  }

  feedForward() {
    this._creatures.forEach(c => c.feedForward);
  }
}
