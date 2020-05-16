import * as Tone from "tone/tone";

export class AudioInputHandler {
  private static readonly Threshold: number = -27;
  private static readonly Cooldown: number = 12;
  public isMicReady: Promise<Tone.UserMedia>;
  private readonly meter: Tone.Meter;
  private mic: Tone.UserMedia;
  private currentCooldown: number;

  constructor() {
    this.isMicReady = new Tone.UserMedia().open();
    this.meter = new Tone.Meter(.8);
    this.mic = null;
    this.currentCooldown = 0;

    this.isMicReady.then((mic) => {
      this.mic = mic;
      this.mic.connect(this.meter);
    });
  }

  getInput(onInput: Function): boolean {
    if (!this.mic) return false;
    if (this.currentCooldown > 0) this.currentCooldown--;

    let currentLevel = this.meter.getLevel();

    if (currentLevel > AudioInputHandler.Threshold && !this.currentCooldown) {
      this.currentCooldown = AudioInputHandler.Cooldown;
      onInput();
    }
  }
}
