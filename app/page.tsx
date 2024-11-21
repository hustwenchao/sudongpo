'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      console.log('Audio ended');
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsReady(true);
      setError(null);
    };

    const handleError = () => {
      const errorMessage = audio.error?.message || 'Unknown error';
      console.error('Audio error:', errorMessage);
      setError(errorMessage);
      setIsReady(false);
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      console.log('Audio loading started');
      setIsReady(false);
    };

    const handleWaiting = () => {
      console.log('Audio buffering');
      setIsReady(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('waiting', handleWaiting);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('waiting', handleWaiting);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !isReady) return;

    try {
      if (isPlaying) {
        console.log('Attempting to pause');
        await audioRef.current.pause();
      } else {
        console.log('Attempting to play');
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Playback started successfully');
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Playback error:', error);
      setError(error instanceof Error ? error.message : 'Failed to play audio');
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.png"
          alt="Chinese landscape background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

              {/* Music Player */}
              <div className="absolute top-4 right-4">
            <audio 
              ref={audioRef} 
              src="/background-music.mp3"
              preload="auto"
              onPlay={() => console.log('Audio play event triggered')}
              onPause={() => console.log('Audio pause event triggered')}
            />
            <button
              onClick={togglePlay}
              disabled={!isReady}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                isReady 
                  ? 'bg-gray-800/70 text-white hover:bg-gray-700/70' 
                  : 'bg-gray-400/70 text-gray-200 cursor-not-allowed'
              }`}
              title={error || (isReady ? (isPlaying ? '暂停' : '播放') : '加载中...')}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            {error && (
              <div className="absolute top-full mt-2 right-0 bg-red-500/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {error}
              </div>
            )}
          </div>

      <main className="max-w-2xl mx-auto p-8 bg-white/40 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-48 h-48 mb-6">
            <Image
              src="/Su_shi.jpg"
              alt="Profile picture"
              fill
              className="rounded-full object-cover object-top"
              priority
            />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            苏东坡
          </h1>
          
          <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            北宋文学家、政治家
          </h2>
          
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
            苏轼（1037年1月8日－1101年8月24日），字子瞻，号东坡居士，世称苏东坡。
            眉州眉山（今四川省眉山市）人，北宋时期文学家、政治家。
            苏轼是北宋中期最杰出的文学家，在诗、词、散文、书法、绘画等方面都有极高的造诣。
          </p>
          
          <div className="flex gap-4">
            <Link
              href="/works"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              了解更多
            </Link>
            <Link
              href="/works"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              作品集
            </Link>
            <Link
              href="/relations"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              亲朋
            </Link>
          </div>


        </div>
      </main>
    </div>
  );
}
