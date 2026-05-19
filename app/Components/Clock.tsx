// "use client";

// import React, { useEffect, useState, useRef } from "react";

// const GOLD = "#bfa87c";

// const CITY_DATA: any = {
//   Chicago: { tz: "America/Chicago", lat: 41.8781, lon: -87.6298 },
//   "New York": { tz: "America/New_York", lat: 40.7128, lon: -74.006 },
//   London: { tz: "Europe/London", lat: 51.5074, lon: -0.1278 },
//   Dubai: { tz: "Asia/Dubai", lat: 25.2048, lon: 55.2708 },
// };

// export default function Clock() {
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const [time, setTime] = useState<Date | null>(null);
//   const [cityWeather, setCityWeather] = useState<Record<string, any>>({});

//   /* ================= TIME ================= */
//   useEffect(() => {
//     setTime(new Date());
//     const id = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(id);
//   }, []);

//   /* ================= WEATHER ================= */
//   useEffect(() => {
//     const fetchAllWeather = async () => {
//       const promises = Object.keys(CITY_DATA).map(async (city) => {
//         const { lat, lon } = CITY_DATA[city];
//         try {
//           const weatherRes = await fetch(
//             `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
//           );
//           const weatherData = await weatherRes.json();

//           const aqiRes = await fetch(
//             `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`
//           );
//           const aqiData = await aqiRes.json();

//           return {
//             city,
//             weather: weatherData.current_weather,
//             aqi: aqiData.current?.us_aqi,
//           };
//         } catch {
//           return { city, weather: null, aqi: null };
//         }
//       });

//       const results = await Promise.all(promises);
//       const newWeather: Record<string, any> = {};
//       results.forEach((item) => {
//         if (item.weather) {
//           newWeather[item.city] = {
//             ...item.weather,
//             aqi: item.aqi,
//           };
//         }
//       });
//       setCityWeather(newWeather);
//     };

//     fetchAllWeather();
//   }, []);

//   if (!time) return <div className="min-h-screen bg-white" />;

//   /* ================= CLOCK LOGIC ================= */
//   const getTimeParts = (timezone: string) => {
//     const fmt = new Intl.DateTimeFormat("en-US", {
//       timeZone: timezone,
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//       hour12: false,
//     }).formatToParts(time);

//     const map: any = {};
//     fmt.forEach((p) => (map[p.type] = Number(p.value)));

//     return {
//       hour: map.hour,
//       minute: map.minute,
//       second: map.second,
//     };
//   };

//   const makeHands = (tz: string) => {
//     const t = getTimeParts(tz);
//     return {
//       sec: t.second * 6,
//       min: t.minute * 6 + t.second * 0.1,
//       hour: (t.hour % 12) * 30 + t.minute * 0.5,
//     };
//   };

//   const ClockSVG = (city: string) => {
//     const hands = makeHands(CITY_DATA[city].tz);
//     const weather = cityWeather[city];

//     return (
//       <div
//         key={city}
//         className="
//           flex flex-col items-center
//           transition-transform duration-300
//           hover:scale-105
//           active:scale-100
//         "
//       >
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-[cursive] text-[#b5a27a] mb-4 sm:mb-6">
//           {city}
//         </h2>

//         {/* Responsive SVG */}
//         <svg
//           viewBox="0 0 260 260"
//           className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px]"
//         >
//           <g transform="translate(130,130)">
//             <circle r="" fill="white" stroke="#eee" strokeWidth="2" />
//             <circle r="" fill="none" stroke={GOLD} strokeWidth="5" />

//             {[...Array(60)].map((_, i) => {
//               const angle = (i / 60) * Math.PI * 2;
//               const inner = i % 5 === 0 ? 88 : 95;
//               const outer = 108;
//               return (
//                 <line
//                   key={i}
//                   x1={inner * Math.cos(angle)}
//                   y1={inner * Math.sin(angle)}
//                   x2={outer * Math.cos(angle)}
//                   y2={outer * Math.sin(angle)}
//                   stroke={i % 5 === 0 ? GOLD : "#ccc"}
//                   strokeWidth={i % 5 === 0 ? 2.5 : 1}
//                 />
//               );
//             })}

//             <g transform={`rotate(${hands.hour})`}>
//               <rect x="-5" y="-15" width="10" height="70" rx="5" fill={GOLD} />
//             </g>

//             <g transform={`rotate(${hands.min})`}>
//               <rect x="-3" y="-20" width="6" height="95" rx="4" fill="#666" />
//             </g>

//             <g transform={`rotate(${hands.sec})`}>
//               <line x1="0" y1="10" x2="0" y2="-100" stroke="#d33" strokeWidth="2" />
//             </g>
//           </g>
//         </svg>

//         {/* Weather */}
//         <div className="mt-4 sm:mt-6 text-center min-h-[90px]">
//           {weather ? (
//             <>
//               <div className="text-3xl sm:text-4xl">
//                 {getWeatherIcon(weather.weathercode)}
//               </div>
//               <div className="text-gray-700 font-medium text-sm sm:text-base">
//                 {weather.temperature}°C
//               </div>
//               <div className="text-xs text-gray-500">
//                 Wind: {weather.windspeed} km/h
//               </div>
//               {weather.aqi !== undefined && (
//                 <div className={`text-xs font-bold ${getAqiColor(weather.aqi)}`}>
//                   AQI: {weather.aqi}
//                 </div>
//               )}
//             </>
//           ) : (
//             <span className="text-xs text-gray-400">Loading weather…</span>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div ref={wrapperRef} className="min-h-screen w-full bg-white">
//       <section className="min-h-screen flex items-center justify-center px-4">
//         <div className="w-full max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
//           {Object.keys(CITY_DATA).map((city) => ClockSVG(city))}
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ================= HELPERS ================= */

// function getWeatherIcon(code: number) {
//   if (code === 0) return "☀️";
//   if (code >= 1 && code <= 3) return "⛅";
//   if (code === 45 || code === 48) return "🌫️";
//   if (code >= 61 && code <= 65) return "🌧️";
//   if (code >= 71 && code <= 77) return "❄️";
//   if (code >= 80 && code <= 82) return "🌦️";
//   if (code === 95) return "⚡";
//   return "🌡️";
// }

// function getAqiColor(aqi: number) {
//   if (aqi <= 50) return "text-green-600";
//   if (aqi <= 100) return "text-yellow-600";
//   if (aqi <= 150) return "text-orange-600";
//   return "text-red-600";
// }


"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

type City = {
  name: string;
  country: string;
  timezone: string;
  utc: string;
  lat: number;
  lon: number;
};

const cities: City[] = [
  {
    name: "Los Angeles",
    country: "United States",
    timezone: "America/Los_Angeles",
    utc: "UTC-8",
    lat: 34.0522,
    lon: -118.2437,
  },
  {
    name: "New York",
    country: "United States",
    timezone: "America/New_York",
    utc: "UTC-5",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    utc: "UTC+0",
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    name: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    utc: "UTC+1",
    lat: 48.8566,
    lon: 2.3522,
  },
];

export default function Clock() {
  // Changed from cities[2] (London) to cities[0] (Los Angeles)
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [now, setNow] = useState<Date | null>(null);
  const [is24h, setIs24h] = useState(true);
  const [weather, setWeather] = useState<Record<string, any>>({});

  /* ================= LIVE TIME ================= */
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ================= WEATHER ================= */
  useEffect(() => {
    const fetchWeather = async () => {
      const results = await Promise.all(
        cities.map(async (city) => {
          try {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
            );
            const data = await res.json();
            return { city: city.name, weather: data.current_weather };
          } catch {
            return { city: city.name, weather: null };
          }
        })
      );
      const weatherObj: Record<string, any> = {};
      results.forEach((item) => {
        weatherObj[item.city] = item.weather;
      });
      setWeather(weatherObj);
    };
    fetchWeather();
  }, []);

  /* ================= PARALLAX ================= */
  const { scrollY } = useScroll();
  const yTitle = useTransform(scrollY, [0, 300], [0, -60]);
  const yCards = useTransform(scrollY, [0, 300], [0, 50]);

  /* ================= TIME FORMAT ================= */
  const formatTime = (city: City) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: city.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !is24h,
    }).format(now || new Date());

  const hour = (city: City) =>
    Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: city.timezone,
        hour: "2-digit",
        hour12: false,
      }).format(now || new Date())
    );



  if (!now) return null;

  return (
    <motion.section
      className="min-h-screen bg-white text-black overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ================= MAIN CLOCK ================= */}
        <motion.div
          style={{ y: yTitle }}
          className="mt-8 sm:mt-16 md:mt-28 flex flex-col items-start gap-6"
        >
          {/* WEATHER MAIN DISPLAY */}
          <div className="flex flex-col items-start">
            <AnimatePresence mode="wait">
              {weather[selectedCity.name] ? (
                <motion.div
                  key={selectedCity.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="text-6xl sm:text-9xl md:text-[8rem]">
                      {getWeatherIcon(weather[selectedCity.name].weathercode)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
                        {weather[selectedCity.name].temperature}°
                      </span>
                      <span className="text-base sm:text-xl text-gray-500 mt-2">
                        Wind: {weather[selectedCity.name].windspeed} km/h
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-2xl sm:text-4xl text-gray-300 font-light h-32 flex items-center">
                  Loading weather...
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* DETAILED DATE DISPLAY */}
          <motion.div
            className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-lg sm:text-3xl md:text-4xl font-light text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* DATE */}
            <span className="font-semibold text-black">
              {new Intl.DateTimeFormat("en-US", { timeZone: selectedCity.timezone, day: "numeric" }).format(now)}
            </span>

            {/* DAY */}
            <span>
              {new Intl.DateTimeFormat("en-US", { timeZone: selectedCity.timezone, weekday: "long" }).format(now)}
            </span>

            {/* WEEK */}
            <span className="opacity-60 text-base sm:text-2xl pt-1">
              Week {getWeekNumber(now)}
            </span>

            {/* MONTH */}
            <span>
              {new Intl.DateTimeFormat("en-US", { timeZone: selectedCity.timezone, month: "long" }).format(now)}
            </span>

            {/* YEAR */}
            <span>
              {new Intl.DateTimeFormat("en-US", { timeZone: selectedCity.timezone, year: "numeric" }).format(now)}
            </span>
          </motion.div>

        </motion.div>

        {/* ================= LOCATION ================= */}
        <motion.div
          className="mt-8 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-4xl font-medium">
            {selectedCity.name},
            <br className="sm:hidden" /> {selectedCity.country}
          </h2>
        </motion.div>

        {/* ================= CITY CARDS ================= */}
        <motion.div
          style={{ y: yCards }}
          className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {cities.map((city) => {
            const active = city.name === selectedCity.name;
            const cityWeather = weather[city.name];
            return (
              <motion.button
                key={city.name}
                onClick={() => setSelectedCity(city)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`p-6 rounded-2xl text-left transition ${active
                  ? "bg-black text-white"
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50"
                  }`}
              >
                <p className="text-xs opacity-70">{city.utc}</p>
                <h3 className="text-lg font-medium mt-1">{city.name}</h3>

                <p className="text-2xl mt-4">
                  {formatTime(city).slice(0, 5)}
                </p>

                <p className="mt-1 text-xs opacity-70 flex items-center gap-1">
                  {hour(city) >= 6 && hour(city) < 18 ? (
                    <>
                      <FiSun className="text-amber-500" /> Day
                    </>
                  ) : (
                    <>
                      <FiMoon className="text-slate-500" /> Night
                    </>
                  )}
                </p>

                <div className="mt-2 text-xs flex items-center gap-2">
                  {cityWeather ? (
                    <>
                      {getWeatherIcon(cityWeather.weathercode)}
                      {cityWeather.temperature}°C
                    </>
                  ) : (
                    <span className="opacity-50">Loading weather…</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Weather icon helper
function getWeatherIcon(code: number) {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 61 && code <= 65) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code === 95) return "⚡";
  return "🌡️";
}

function getWeekNumber(d: Date) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
}
