type NpcSound = "feed" | "play" | "evolve" | "purchase";

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
}

function note(context: AudioContext, time: number, frequency: number, duration: number, volume = 0.045) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.02);
}

export function playNpcSound(sound: NpcSound, enabled: boolean) {
  if (!enabled) return;
  const context = getContext();
  if (!context) return;
  const start = context.currentTime + 0.015;
  const sequences: Record<NpcSound, number[]> = {
    feed: [523.25, 659.25],
    play: [440, 523.25, 659.25],
    purchase: [392, 587.33],
    evolve: [523.25, 659.25, 783.99, 1046.5, 1318.51],
  };
  const duration = sound === "evolve" ? 0.22 : 0.11;
  sequences[sound].forEach((frequency, index) => note(context, start + index * duration * 0.78, frequency, duration, sound === "evolve" ? 0.05 : 0.04));
  void context.resume().catch(() => undefined);
}
