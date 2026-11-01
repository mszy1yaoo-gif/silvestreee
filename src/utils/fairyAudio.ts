/**
 * Web Audio ambient music synthesizer for SILVESTRE — Rừng Mộng
 * Synthesizes a gentle, dreamy, fairy-tale pentatonic celesta melody in real-time.
 */

class FairyMusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  // Gentle pentatonic scale frequencies (F major / D minor fairy dream scale)
  private notes = [
    349.23, // F4
    392.0,  // G4
    440.0,  // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    698.46, // F5
    783.99, // G5
    880.0,  // A5
    1046.5, // C6
  ];

  private patterns = [
    [0, 2, 4, 3, 2, 6, 4, 7],
    [4, 6, 7, 9, 7, 4, 2, 0],
    [2, 4, 6, 4, 3, 2, 0, 2],
    [7, 6, 4, 2, 4, 6, 7, 9],
  ];

  private currentPattern = 0;
  private noteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, delaySec: number) {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + delaySec;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm chime / music-box timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, t);

    // Envelope: quick gentle attack, shimmering decay
    noteGain.gain.setValueAtTime(0, t);
    noteGain.gain.linearRampToValueAtTime(0.18, t + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    // Subtle harmonic overtone (celesta sparkle)
    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, t);
    overtoneGain.gain.setValueAtTime(0, t);
    overtoneGain.gain.linearRampToValueAtTime(0.04, t + 0.03);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, t + duration * 0.6);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    overtone.connect(overtoneGain);
    overtoneGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);
    overtone.start(t);
    overtone.stop(t + duration * 0.6);
  }

  private step() {
    if (!this.isPlaying || !this.ctx) return;

    const pattern = this.patterns[this.currentPattern % this.patterns.length];
    const notePos = pattern[this.noteIndex % pattern.length];
    const freq = this.notes[notePos];

    // Play current chime
    this.playTone(freq, 2.8, 0);

    // Occasional dreamy sub-harmony
    if (this.noteIndex % 4 === 0) {
      const bassFreq = this.notes[0] * 0.5;
      this.playTone(bassFreq, 3.5, 0.02);
    }

    this.noteIndex++;
    if (this.noteIndex >= pattern.length) {
      this.noteIndex = 0;
      this.currentPattern = (this.currentPattern + 1) % this.patterns.length;
    }

    // Schedule next chime with gentle humanized fairy tempo (~480ms - 580ms)
    const interval = 520 + (Math.random() * 80 - 40);
    this.timerId = window.setTimeout(() => this.step(), interval);
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 1.2);
    }
    this.step();
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const fairyMusic = new FairyMusicPlayer();
