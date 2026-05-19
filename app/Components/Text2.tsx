"use client";

export default function Text2() {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center py-32 px-8">

      <div className="max-w-5xl w-full flex justify-between relative">

        {/* LEFT TEXT BLOCK */}
        <div className="max-w-md leading-[2.2rem] text-[22px] text-[#b5a59b] font-serif tracking-wide space-y-10">

          <p>
            Clean lines and lashings of white  
            underscore the rich tones of  
            nature’s palette.
          </p>

          <p>
            An airy refuge, our boutique 36-room  
            hotel is a place where guests can  
            rediscover the forgotten rhythms of  
            long, drawn-out days and easy,  
            lingering evenings.

            An airy refuge, our boutique 36-room  
            hotel is a place where guests can  
            rediscover the forgotten rhythms of  
            long, drawn-out days and easy,  
            lingering evenings.
          </p>
        </div>

        {/* CENTER DOT DECORATION */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
          {/* <div className="h-4 w-4 bg-[#dad2c7] rounded-full opacity-60"></div> */}
        </div>

      </div>
    </div>
  );
}
