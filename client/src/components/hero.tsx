import { Search, Fish, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-screen flex items-center justify-center fishing-gradient overflow-hidden">
      {/* Hero Background Image Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Animated Angler Fish Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Angler Fish 1 - Large swimming left to right with glow */}
        <div className="absolute top-1/4 -left-32 opacity-15 animate-[depth-swim_40s_linear_infinite]">
          <svg width="120" height="120" viewBox="0 0 512 512" className="text-cyan-300 animate-[pulse-glow_6s_ease-in-out_infinite]">
            <path fill="currentColor" d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064zm-52.344 158.156c3.147-.125 6.36.236 9.563 1.094 3.054.82 5.872 2.054 8.438 3.625-.14 0-.268-.03-.407-.03-9.922 0-17.97 6.636-17.97 14.813.002 8.176 8.048 14.812 17.97 14.812 6.503 0 12.16-2.86 15.313-7.125.645 4.24.462 8.684-.72 13.094-4.575 17.074-22.11 27.2-39.188 22.625-17.074-4.576-27.23-22.115-22.656-39.19 3.717-13.872 16.022-23.176 29.656-23.718zm-95.375 11.157l17.907 5.31-12.75 43.064 47.437 38.844-11.842 14.468-52.25-42.78-4.782-3.938 1.75-5.938 14.53-49.03zm-44.937 25.686l17.938 5.313-8.875 29.936 33.437 27.375-11.844 14.47-38.25-31.313-4.812-3.937 1.78-5.97 10.626-35.874z"/>
            {/* Angler light */}
            <circle cx="450" cy="70" r="8" fill="#fbbf24" className="animate-[pulse-glow_3s_ease-in-out_infinite]" opacity="0.8">
              <animate attributeName="r" values="6;12;6" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* Angler Fish 2 - Medium swimming right to left */}
        <div className="absolute top-2/3 -right-32 opacity-12 animate-[swim-rl_35s_linear_infinite_5s]">
          <svg width="100" height="100" viewBox="0 0 512 512" className="text-blue-200 scale-x-[-1]">
            <path fill="currentColor" d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064zm-52.344 158.156c3.147-.125 6.36.236 9.563 1.094 3.054.82 5.872 2.054 8.438 3.625-.14 0-.268-.03-.407-.03-9.922 0-17.97 6.636-17.97 14.813.002 8.176 8.048 14.812 17.97 14.812 6.503 0 12.16-2.86 15.313-7.125.645 4.24.462 8.684-.72 13.094-4.575 17.074-22.11 27.2-39.188 22.625-17.074-4.576-27.23-22.115-22.656-39.19 3.717-13.872 16.022-23.176 29.656-23.718zm-95.375 11.157l17.907 5.31-12.75 43.064 47.437 38.844-11.842 14.468-52.25-42.78-4.782-3.938 1.75-5.938 14.53-49.03zm-44.937 25.686l17.938 5.313-8.875 29.936 33.437 27.375-11.844 14.47-38.25-31.313-4.812-3.937 1.78-5.97 10.626-35.874z"/>
            {/* Angler light - positioned correctly for flipped fish */}
            <circle cx="62" cy="70" r="6" fill="#fbbf24" className="animate-[pulse-glow_4s_ease-in-out_infinite]" opacity="0.7">
              <animate attributeName="r" values="4;10;4" dur="4s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* Angler Fish 3 - Small swimming diagonally */}
        <div className="absolute bottom-1/4 left-1/4 opacity-18 animate-[swim-diagonal-up_25s_ease-in-out_infinite_8s]">
          <svg width="80" height="80" viewBox="0 0 512 512" className="text-white">
            <path fill="currentColor" d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064zm-52.344 158.156c3.147-.125 6.36.236 9.563 1.094 3.054.82 5.872 2.054 8.438 3.625-.14 0-.268-.03-.407-.03-9.922 0-17.97 6.636-17.97 14.813.002 8.176 8.048 14.812 17.97 14.812 6.503 0 12.16-2.86 15.313-7.125.645 4.24.462 8.684-.72 13.094-4.575 17.074-22.11 27.2-39.188 22.625-17.074-4.576-27.23-22.115-22.656-39.19 3.717-13.872 16.022-23.176 29.656-23.718zm-95.375 11.157l17.907 5.31-12.75 43.064 47.437 38.844-11.842 14.468-52.25-42.78-4.782-3.938 1.75-5.938 14.53-49.03zm-44.937 25.686l17.938 5.313-8.875 29.936 33.437 27.375-11.844 14.47-38.25-31.313-4.812-3.937 1.78-5.97 10.626-35.874z"/>
          </svg>
        </div>

        {/* Angler Fish 4 - School of tiny angler fish moving leftward */}
        <div className="absolute top-1/2 right-1/3 opacity-10 animate-[swim-school_20s_ease-in-out_infinite_12s]">
          <div className="space-y-3 scale-x-[-1]">
            <svg width="60" height="60" viewBox="0 0 512 512" className="text-slate-300 scale-50">
              <path fill="currentColor" d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064z"/>
              <circle cx="450" cy="70" r="4" fill="#fbbf24" opacity="0.6">
                <animate attributeName="r" values="3;6;3" dur="3.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
            <svg width="55" height="55" viewBox="0 0 512 512" className="text-slate-300 scale-50 ml-4">
              <path fill="currentColor" d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064z"/>
              <circle cx="450" cy="70" r="3.5" fill="#fbbf24" opacity="0.5">
                <animate attributeName="r" values="2.5;5.5;2.5" dur="4s" repeatCount="indefinite"/>
              </circle>
            </svg>
            <svg width="50" height="50" viewBox="0 0 512 512" className="text-slate-300 scale-50 ml-2">
              <path fill="currentColor" d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064z"/>
              <circle cx="450" cy="70" r="3" fill="#fbbf24" opacity="0.4">
                <animate attributeName="r" values="2;5;2" dur="4.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>

        {/* Angler Fish 5 - Large with wave motion moving rightward */}
        <div className="absolute top-3/4 left-1/2 opacity-14 animate-[swim-wave_28s_ease-in-out_infinite_15s]">
          <svg width="110" height="110" viewBox="0 0 512 512" className="text-teal-200">
            <path fill="currentColor" d="M442.906 52.156c-.806.02-1.617.076-2.437.188-13.124 1.79-22.993 13.47-30.47 32.875-5.993 15.552-10.81 37.088-13.938 66.5-32.023-22.095-63.766-29.543-95.28-25.845l-26.97-60.063-24.968 71.282L198.5 107.28l-.813 63.064-46.562 1.75 12.53 30.562c-17.504 16.246-34.963 34.403-52.405 53.844l-92.813-45.375 44.876 75.906-36.47 39.095 36.282 2.78-40.47 59.876 108.064-64.905 87.56 42.53-49.75 17.376 35.564 13.814-32.563 22.22 52.157.967-4.593 46.845 59.312-72.03L365 437.654 496.063 270.47c-3.87-6.63-7.735-12.974-11.594-19.095l-119.376 150.97-4.72 5.967-6.78-3.406-44.344-22.22 8.375-16.717 37.53 18.81L473.69 234.907c-20.158-29.63-40.187-52.59-60.094-69.656 2.96-34.52 8.11-58.353 13.875-73.313 6.36-16.51 12.884-20.706 15.5-21.062 1.306-.178 2.63.047 4.75 1.53 2.118 1.485 4.693 4.293 7 8.19 4.582 7.743 8.005 19.562 8.217 31.686-7.95 3.715-13.437 11.804-13.437 21.157 0 12.878 10.436 23.313 23.313 23.313 12.876 0 23.312-10.435 23.312-23.313 0-9.752-6.002-18.114-14.5-21.593-.284-15.23-4.225-29.62-10.813-40.75-3.322-5.615-7.346-10.478-12.375-14-3.77-2.642-8.322-4.49-13.125-4.875-.8-.065-1.6-.083-2.406-.064zm-52.344 158.156c3.147-.125 6.36.236 9.563 1.094 3.054.82 5.872 2.054 8.438 3.625-.14 0-.268-.03-.407-.03-9.922 0-17.97 6.636-17.97 14.813.002 8.176 8.048 14.812 17.97 14.812 6.503 0 12.16-2.86 15.313-7.125.645 4.24.462 8.684-.72 13.094-4.575 17.074-22.11 27.2-39.188 22.625-17.074-4.576-27.23-22.115-22.656-39.19 3.717-13.872 16.022-23.176 29.656-23.718zm-95.375 11.157l17.907 5.31-12.75 43.064 47.437 38.844-11.842 14.468-52.25-42.78-4.782-3.938 1.75-5.938 14.53-49.03zm-44.937 25.686l17.938 5.313-8.875 29.936 33.437 27.375-11.844 14.47-38.25-31.313-4.812-3.937 1.78-5.97 10.626-35.874z"/>
            {/* Angler light for the large fish */}
            <circle cx="450" cy="70" r="8" fill="#fbbf24" className="animate-[pulse-glow_5s_ease-in-out_infinite]" opacity="0.8">
              <animate attributeName="r" values="6;14;6" dur="5s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* Enhanced Bubble Streams */}
        <div className="absolute bottom-1/4 left-1/6 opacity-30">
          <div className="animate-[spiral-up_18s_ease-in-out_infinite]">
            <svg width="40" height="100" viewBox="0 0 40 100" className="text-cyan-200">
              <circle cx="8" cy="90" r="4" fill="currentColor" opacity="0.4">
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="25" cy="75" r="3.5" fill="currentColor" opacity="0.5">
                <animate attributeName="r" values="2.5;4.5;2.5" dur="2.3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="15" cy="55" r="3" fill="currentColor" opacity="0.6">
                <animate attributeName="r" values="2;4;2" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="30" cy="40" r="2.5" fill="currentColor" opacity="0.5">
                <animate attributeName="r" values="1.5;3.5;1.5" dur="2.1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="12" cy="25" r="2" fill="currentColor" opacity="0.4">
                <animate attributeName="r" values="1;3;1" dur="1.9s" repeatCount="indefinite"/>
              </circle>
              <circle cx="22" cy="10" r="1.5" fill="currentColor" opacity="0.3">
                <animate attributeName="r" values="0.8;2.2;0.8" dur="2.2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/5 opacity-25">
          <div className="animate-[spiral-up_20s_ease-in-out_infinite_6s]">
            <svg width="45" height="110" viewBox="0 0 45 110" className="text-blue-200">
              <circle cx="15" cy="95" r="4.5" fill="currentColor" opacity="0.3">
                <animate attributeName="r" values="3.5;6;3.5" dur="2.4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="30" cy="80" r="3.8" fill="currentColor" opacity="0.4">
                <animate attributeName="r" values="2.8;5;2.8" dur="2.1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="20" cy="60" r="3.2" fill="currentColor" opacity="0.5">
                <animate attributeName="r" values="2.2;4.2;2.2" dur="1.7s" repeatCount="indefinite"/>
              </circle>
              <circle cx="35" cy="42" r="2.8" fill="currentColor" opacity="0.4">
                <animate attributeName="r" values="1.8;3.8;1.8" dur="2.3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="12" cy="25" r="2.2" fill="currentColor" opacity="0.4">
                <animate attributeName="r" values="1.2;3.2;1.2" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="28" cy="8" r="1.8" fill="currentColor" opacity="0.3">
                <animate attributeName="r" values="1;2.6;1" dur="2.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>

        {/* Additional Bubble Streams */}
        <div className="absolute bottom-1/2 left-3/4 opacity-20">
          <div className="animate-[bubble-rise_14s_ease-in-out_infinite_3s]">
            <svg width="25" height="70" viewBox="0 0 25 70" className="text-slate-300">
              <circle cx="12" cy="60" r="2.5" fill="currentColor" opacity="0.4">
                <animate attributeName="r" values="2;3.5;2" dur="1.6s" repeatCount="indefinite"/>
              </circle>
              <circle cx="8" cy="45" r="2" fill="currentColor" opacity="0.5">
                <animate attributeName="r" values="1.5;2.8;1.5" dur="1.9s" repeatCount="indefinite"/>
              </circle>
              <circle cx="18" cy="30" r="1.8" fill="currentColor" opacity="0.4">
                <animate attributeName="r" values="1.2;2.5;1.2" dur="2.1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="15" cy="15" r="1.5" fill="currentColor" opacity="0.3">
                <animate attributeName="r" values="1;2.2;1" dur="1.8s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-1/3 left-2/3 opacity-25 animate-[float-gentle_8s_ease-in-out_infinite]">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-cyan-100">
            <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.4"/>
            <circle cx="45" cy="20" r="0.8" fill="currentColor" opacity="0.3"/>
            <circle cx="30" cy="35" r="1.2" fill="currentColor" opacity="0.5"/>
            <circle cx="50" cy="45" r="0.6" fill="currentColor" opacity="0.3"/>
            <circle cx="20" cy="50" r="0.9" fill="currentColor" opacity="0.4"/>
            <circle cx="10" cy="40" r="0.7" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>

        <div className="absolute top-2/3 right-3/4 opacity-20 animate-[drift-current_12s_ease-in-out_infinite_5s]">
          <svg width="50" height="50" viewBox="0 0 50 50" className="text-blue-100">
            <circle cx="12" cy="12" r="0.8" fill="currentColor" opacity="0.3"/>
            <circle cx="35" cy="18" r="1.1" fill="currentColor" opacity="0.4"/>
            <circle cx="25" cy="30" r="0.9" fill="currentColor" opacity="0.5"/>
            <circle cx="40" cy="38" r="0.7" fill="currentColor" opacity="0.3"/>
            <circle cx="15" cy="42" r="1" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>

        {/* Enhanced Seaweed Forest */}
        <div className="absolute bottom-0 left-1/4 opacity-18 animate-[sway_12s_ease-in-out_infinite]">
          <svg width="50" height="240" viewBox="0 0 50 240" className="text-emerald-800">
            <path
              d="M25 240 Q18 220 28 200 Q32 180 22 160 Q18 140 30 120 Q34 100 24 80 Q20 60 32 40 Q36 20 26 0"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              opacity="0.7"
            >
              <animate attributeName="d" values="M25 240 Q18 220 28 200 Q32 180 22 160 Q18 140 30 120 Q34 100 24 80 Q20 60 32 40 Q36 20 26 0;M25 240 Q22 220 26 200 Q30 180 24 160 Q20 140 28 120 Q32 100 26 80 Q22 60 30 40 Q34 20 28 0;M25 240 Q18 220 28 200 Q32 180 22 160 Q18 140 30 120 Q34 100 24 80 Q20 60 32 40 Q36 20 26 0" dur="12s" repeatCount="indefinite"/>
            </path>
            <path
              d="M30 240 Q35 220 27 200 Q24 180 32 160 Q36 140 26 120 Q22 100 34 80 Q38 60 28 40 Q24 20 36 0"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              opacity="0.5"
            >
              <animate attributeName="d" values="M30 240 Q35 220 27 200 Q24 180 32 160 Q36 140 26 120 Q22 100 34 80 Q38 60 28 40 Q24 20 36 0;M30 240 Q33 220 29 200 Q26 180 30 160 Q34 140 28 120 Q24 100 32 80 Q36 60 30 40 Q26 20 34 0;M30 240 Q35 220 27 200 Q24 180 32 160 Q36 140 26 120 Q22 100 34 80 Q38 60 28 40 Q24 20 36 0" dur="10s" repeatCount="indefinite"/>
            </path>
            <path
              d="M20 240 Q15 220 23 200 Q27 180 17 160 Q13 140 25 120 Q29 100 19 80 Q15 60 27 40 Q31 20 21 0"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              opacity="0.4"
            >
              <animate attributeName="d" values="M20 240 Q15 220 23 200 Q27 180 17 160 Q13 140 25 120 Q29 100 19 80 Q15 60 27 40 Q31 20 21 0;M20 240 Q17 220 21 200 Q25 180 19 160 Q15 140 23 120 Q27 100 21 80 Q17 60 25 40 Q29 20 23 0;M20 240 Q15 220 23 200 Q27 180 17 160 Q13 140 25 120 Q29 100 19 80 Q15 60 27 40 Q31 20 21 0" dur="14s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>

        <div className="absolute bottom-0 right-1/3 opacity-15 animate-[sway_14s_ease-in-out_infinite_3s]">
          <svg width="45" height="220" viewBox="0 0 45 220" className="text-teal-700">
            <path
              d="M22 220 Q16 200 26 180 Q30 160 20 140 Q16 120 28 100 Q32 80 22 60 Q18 40 30 20 Q34 10 24 0"
              stroke="currentColor"
              strokeWidth="3.5"
              fill="none"
              opacity="0.6"
            >
              <animate attributeName="d" values="M22 220 Q16 200 26 180 Q30 160 20 140 Q16 120 28 100 Q32 80 22 60 Q18 40 30 20 Q34 10 24 0;M22 220 Q19 200 24 180 Q28 160 22 140 Q18 120 26 100 Q30 80 24 60 Q20 40 28 20 Q32 10 26 0;M22 220 Q16 200 26 180 Q30 160 20 140 Q16 120 28 100 Q32 80 22 60 Q18 40 30 20 Q34 10 24 0" dur="14s" repeatCount="indefinite"/>
            </path>
            <path
              d="M27 220 Q32 200 24 180 Q20 160 30 140 Q34 120 24 100 Q20 80 32 60 Q36 40 26 20 Q22 10 32 0"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              opacity="0.4"
            >
              <animate attributeName="d" values="M27 220 Q32 200 24 180 Q20 160 30 140 Q34 120 24 100 Q20 80 32 60 Q36 40 26 20 Q22 10 32 0;M27 220 Q30 200 26 180 Q22 160 28 140 Q32 120 26 100 Q22 80 30 60 Q34 40 28 20 Q24 10 30 0;M27 220 Q32 200 24 180 Q20 160 30 140 Q34 120 24 100 Q20 80 32 60 Q36 40 26 20 Q22 10 32 0" dur="12s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>

        <div className="absolute bottom-0 left-2/3 opacity-12 animate-[sway_16s_ease-in-out_infinite_6s]">
          <svg width="38" height="200" viewBox="0 0 38 200" className="text-green-600">
            <path
              d="M19 200 Q14 185 22 165 Q26 145 18 125 Q14 105 24 85 Q28 65 20 45 Q16 25 26 5"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              opacity="0.5"
            >
              <animate attributeName="d" values="M19 200 Q14 185 22 165 Q26 145 18 125 Q14 105 24 85 Q28 65 20 45 Q16 25 26 5;M19 200 Q16 185 20 165 Q24 145 20 125 Q16 105 22 85 Q26 65 22 45 Q18 25 24 5;M19 200 Q14 185 22 165 Q26 145 18 125 Q14 105 24 85 Q28 65 20 45 Q16 25 26 5" dur="16s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>

        {/* Water Surface Animation */}
        <div className="absolute top-0 left-0 w-full h-32 overflow-hidden">
          {/* Animated water surface */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/20 via-blue-400/15 to-transparent animate-[water-surface_8s_ease-in-out_infinite]">
            <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0">
              <path
                d="M0,60 Q100,40 200,60 T400,60 L400,0 L0,0 Z"
                fill="rgba(99, 179, 237, 0.15)"
                className="animate-[water-surface_6s_ease-in-out_infinite]"
              >
                <animate
                  attributeName="d"
                  values="M0,60 Q100,40 200,60 T400,60 L400,0 L0,0 Z;M0,50 Q100,70 200,50 T400,50 L400,0 L0,0 Z;M0,60 Q100,40 200,60 T400,60 L400,0 L0,0 Z"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M0,70 Q100,50 200,70 T400,70 L400,0 L0,0 Z"
                fill="rgba(147, 197, 253, 0.1)"
                className="animate-[water-surface_8s_ease-in-out_infinite_2s]"
              >
                <animate
                  attributeName="d"
                  values="M0,70 Q100,50 200,70 T400,70 L400,0 L0,0 Z;M0,55 Q100,75 200,55 T400,55 L400,0 L0,0 Z;M0,70 Q100,50 200,70 T400,70 L400,0 L0,0 Z"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          {/* Water ripples */}
          <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-30">
            <div className="w-full h-full rounded-full border-2 border-cyan-200/40 animate-[water-ripple_4s_ease-out_infinite]"></div>
          </div>
          <div className="absolute top-2/3 right-1/3 w-12 h-12 opacity-25">
            <div className="w-full h-full rounded-full border-2 border-blue-200/30 animate-[water-ripple_5s_ease-out_infinite_2s]"></div>
          </div>
          <div className="absolute top-1/3 left-2/3 w-20 h-20 opacity-20">
            <div className="w-full h-full rounded-full border-2 border-slate-200/25 animate-[water-ripple_6s_ease-out_infinite_4s]"></div>
          </div>
        </div>

        {/* Caustic Light Patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-32 h-32 opacity-25 animate-[caustic-light_12s_ease-in-out_infinite]">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-cyan-200">
              <path
                d="M20,20 Q40,10 60,20 Q80,30 80,50 Q70,70 50,80 Q30,70 20,50 Q10,30 20,20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.6"
              >
                <animate
                  attributeName="d"
                  values="M20,20 Q40,10 60,20 Q80,30 80,50 Q70,70 50,80 Q30,70 20,50 Q10,30 20,20 Z;M25,15 Q45,25 65,15 Q85,25 85,45 Q75,65 55,75 Q35,65 25,45 Q15,25 25,15 Z;M20,20 Q40,10 60,20 Q80,30 80,50 Q70,70 50,80 Q30,70 20,50 Q10,30 20,20 Z"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          <div className="absolute top-1/2 right-1/4 w-28 h-28 opacity-20 animate-[caustic-light_15s_ease-in-out_infinite_5s]">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-blue-200">
              <path
                d="M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.5"
              >
                <animate
                  attributeName="d"
                  values="M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30 Z;M35,25 Q55,35 75,25 Q85,45 75,65 Q55,75 35,65 Q25,45 35,25 Z;M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30 Z"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          <div className="absolute top-3/4 left-1/2 w-24 h-24 opacity-15 animate-[caustic-light_18s_ease-in-out_infinite_8s]">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-slate-200">
              <path
                d="M25,40 Q45,30 65,40 Q75,60 65,80 Q45,70 25,80 Q15,60 25,40 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              >
                <animate
                  attributeName="d"
                  values="M25,40 Q45,30 65,40 Q75,60 65,80 Q45,70 25,80 Q15,60 25,40 Z;M30,35 Q50,45 70,35 Q80,55 70,75 Q50,65 30,75 Q20,55 30,35 Z;M25,40 Q45,30 65,40 Q75,60 65,80 Q45,70 25,80 Q15,60 25,40 Z"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>

        {/* Underwater Depth Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Deep water rays */}
          <div className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-cyan-300/10 via-blue-400/5 to-transparent opacity-30 rotate-12 animate-[float-gentle_20s_ease-in-out_infinite]"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-200/15 via-cyan-300/8 to-transparent opacity-25 -rotate-6 animate-[float-gentle_25s_ease-in-out_infinite_5s]"></div>
          <div className="absolute top-0 left-2/3 w-1.5 h-full bg-gradient-to-b from-slate-200/8 via-blue-300/6 to-transparent opacity-20 rotate-3 animate-[drift-current_30s_ease-in-out_infinite_8s]"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Main Brand */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight font-poppins tracking-tight">
              <span className="block text-primary drop-shadow-lg">RIG OF DEATH</span>
              <span className="block text-3xl md:text-4xl text-muted-foreground font-light mt-4 tracking-wide">
                STAY IN STYLE
              </span>
            </h1>
          </div>
          
          {/* Tagline */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl md:text-2xl text-foreground/90 font-light leading-relaxed">
              Autentické rybářské vybavení pro moderní rybáře
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Objevte naši pečlivě vybranou kolekci prémiového vybavení. 
              Od profesionálních prutů po speciální návnady – vše pro váš úspěch na vodě.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input 
                placeholder="Vyhledejte rybářské vybavení..."
                className="pl-16 pr-6 py-8 text-lg rounded-2xl bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 focus:border-primary shadow-2xl transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Prohlédnout kolekci
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-primary px-12 py-8 text-xl rounded-2xl backdrop-blur-sm transition-all duration-300"
            >
              Naše příběhy
            </Button>
          </div>
          
          
        </div>
      </div>
    </section>
  );
}
