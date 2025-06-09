import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function AmbientOceanAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.3]);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Generate ocean sounds using Web Audio API
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let oscillator1: OscillatorNode | null = null;
    let oscillator2: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;
    let filterNode: BiquadFilterNode | null = null;

    const createOceanSound = () => {
      try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create oscillators for wave sounds
        oscillator1 = audioContext.createOscillator();
        oscillator2 = audioContext.createOscillator();
        
        // Create gain node for volume control
        gainNode = audioContext.createGain();
        
        // Create filter for more realistic ocean sound
        filterNode = audioContext.createBiquadFilter();
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(800, audioContext.currentTime);
        
        // Configure oscillators
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(60, audioContext.currentTime);
        
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(40, audioContext.currentTime);
        
        // Add subtle frequency modulation for wave-like effect
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
        lfoGain.gain.setValueAtTime(10, audioContext.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator1.frequency);
        
        // Connect audio nodes
        oscillator1.connect(filterNode);
        oscillator2.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set initial volume
        gainNode.gain.setValueAtTime(volume[0], audioContext.currentTime);
        
        // Start oscillators
        oscillator1.start();
        oscillator2.start();
        lfo.start();
        
        setIsLoaded(true);
        
        return { audioContext, oscillator1, oscillator2, gainNode, filterNode, lfo };
      } catch (error) {
        console.warn('Web Audio API not supported, falling back to audio file');
        return null;
      }
    };

    let audioNodes: any = null;

    if (isPlaying && !audioNodes) {
      audioNodes = createOceanSound();
    }

    return () => {
      if (audioNodes) {
        try {
          audioNodes.oscillator1?.stop();
          audioNodes.oscillator2?.stop();
          audioNodes.lfo?.stop();
          audioNodes.audioContext?.close();
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, [isPlaying]);

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0];
    }
  }, [volume]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Ignore autoplay restrictions
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayback}
            className={`h-10 w-10 rounded-full transition-all duration-300 ${
              isPlaying 
                ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
            title={isPlaying ? 'Vypnout zvuky oceánu' : 'Zapnout zvuky oceánu'}
          >
            {isPlaying ? (
              <Waves className="w-5 h-5 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>

          {/* Volume Control */}
          {isPlaying && (
            <div className="flex items-center gap-2 animate-in slide-in-from-right duration-300">
              <Volume2 className="w-4 h-4 text-slate-400" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                min={0}
                step={0.1}
                className="w-20"
              />
            </div>
          )}

          {/* Status Indicator */}
          <div className="flex flex-col items-center">
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isPlaying ? 'bg-primary animate-pulse' : 'bg-slate-600'
            }`} />
            <span className="text-xs text-slate-400 mt-1">
              {isPlaying ? 'Oceán' : 'Ticho'}
            </span>
          </div>
        </div>

        {/* Fallback Audio Element */}
        <audio
          ref={audioRef}
          loop
          preload="none"
          className="hidden"
        >
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeBjaHzfLOeCkFJnLK8N2PQgsWWrTj6qpcGgxGnt/muGAeBjSDyfLNeksFJXTH8N2PQQsUXrHj66hdGQxGnt/ns2UeBjSFzfLNesiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUeBjaHzfLOeCkFJnLK8N2PQgsWWrTj6qpcGgxGnt/muGAeBjSDyfLNeksFJXTH8N2PQQsUXrHj66hdGQxGnt/ns2UeBjSFzfLNek0" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
}