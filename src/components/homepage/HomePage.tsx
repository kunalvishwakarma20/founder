import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import user1 from "@/public/users/user-1.png";
import user2 from "@/public/users/user-2.png";
import user3 from "@/public/users/user-3.png";
import user4 from "@/public/users/user-4.jpg";
import user5 from "@/public/users/user-5.jpg";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen mx-auto text-center mt-6">
      <div className="w-full px-4 md:px-6 flex flex-col md:flex-row items-center justify-center lg:-mt-14 -mt-10 bg-white/70 sm:py-8 lg:pt-0 md:py-14">
        {/* Hero Section */}
        <div className="w-full max-w-screen-md text-center md:text-start px-4 md:px-28 py-4 md:py-6 mx-auto flex flex-col gap-4 mt-8 md:mt-20">
          {/* Badge */}
          <div className="select-none flex items-center mx-auto md:mx-0 max-w-[15.2rem] space-x-2 font-medium text-zinc-900 border border-gray-500 backdrop-blur-sm rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 fill-blue-600 text-blue-600" />
            <p className="text-xs md:text-sm">For the Startup Dreamers</p>
          </div>

          {/* Hero Text */}
          <h1 className="text-2xl md:text-[2.5rem] leading-tight px-2 md:px-0">
            <span className="font-bold">Your Personal Startup Mentor</span>
            <span className="hidden md:inline">— </span>
            <br className="md:hidden" />
            Get Expert Startup Advice,
            <br className="md:hidden" />
            <span className="font-bold">Powered by AI.</span>
          </h1>

          <p className="text-gray-800 text-base md:text-lg tracking-tight px-4 md:px-0">
            Expert insights from top business leaders, tailored with AI to guide
            your startup&apos;s success.
          </p>

          {/* User Avatars and Rating */}
          <div className="mt-8 md:mt-12 flex flex-col items-center md:items-start select-none">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              <div className="flex -space-x-4">
                {[user1, user2, user3, user4, user5].map((user, index) => (
                  <Image
                    key={index}
                    width={100}
                    height={100}
                    className="inline-block h-8 w-8 md:h-10 md:w-10 rounded-full ring-2 ring-slate-200 object-cover"
                    src={user}
                    alt={`user ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="h-3 w-3 md:h-4 md:w-4 text-blue-600 fill-blue-600"
                    />
                  ))}
                </div>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">1,250</span> happy founders
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Preview Section */}
        <div className="w-full max-w-screen-sm py-8 md:py-32 px-4 md:px-9 flex mx-auto justify-center select-none">
          <div className="hidden md:flex flex-col gap-4 p-2 mr-4">
            {[user3, user4, user5].map((user, index) => (
              <Image
                key={index}
                width={100}
                height={100}
                className={`inline-block h-10 w-10 rounded-full ring-2 ring-slate-200 ${
                  index > 0 ? 'opacity-60' : ''
                }`}
                src={user}
                alt={`user ${index + 1}`}
              />
            ))}
          </div>

          <div className="w-full text-start max-w-sm bg-white shadow-md rounded-xl border">
            <div className="p-3 md:p-[0.6rem] flex flex-col gap-2">
              <div className="flex space-x-2 p-2">
              <svg width="2500" height="2500" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" className="h-6 w-6" viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"><text x="-9999" y="-9999">ChatGPT</text><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z" fill="currentColor"/></svg>
                <p className="font-bold text-xs md:text-sm">Free trial users</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3 md:p-4">
                <div className="flex flex-col gap-3 md:gap-4 mb-4 text-sm md:text-base">
                  <p>
                    Hi
                    <span className="bg-blue-100 text-blue-600 ml-0.5 rounded-md p-1">
                      Amy
                    </span>
                    ,
                  </p>
                  <p>Congrats on starting your founder journey!</p>
                  <p>I&apos;m here if you need help with your free trial.</p>
                  <p>
                    Here some getting started docs to check
                    <span className="bg-gradient-to-r ml-1 from-gray-100 via-blue-100 to-blue-200">
                      out:{" "}
                    </span>
                    <span className="text-base font-semibold text-blue-600 -ml-[0.15rem]">
                      |
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
