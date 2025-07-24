import Navbar from "../components/Navbar"
import GridGuides from "../components/GridGuides"
import Image from "next/image"

export default function explorePage(){

    const categories = ["Food","Art","Music","Dance","Rituals","Theatre"];
    const provinces = [
    "Aceh",
    "North Sumatra",
    "West Sumatra",
    "South Sumatra",
    "Banten",
    "West Java",
    "Central Java",
    "East Java",
    "Bali",
    "West Kalimantan",
    "South Sulawesi",
    "Papua"
    ];

    return(
        <div className="grid grid-cols-12 gap-5 place-content-start bg-white min-h-screen overflow-hidden relative">
            <div className="absolute inset-0 z-0 pointer-events-none z-0">
                {/* <GridGuides /> */}
            </div>
            {/* Navbar */}
            <div className="absolute top-0 left-0 w-full z-[999]">
                <Navbar />
            </div>

          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-50 z-0 pointer-events-none  w-400 h-200">
            <Image
              src="/Assets/patternFade.png"
              alt="Pattern Fade"
              layout="fill"
              objectFit="cover"
              className="opacity-50 rotate-180"
            />
          </div>

            <div className="flex flex-col justify-center items-center col-span-12 gap-8 font-semibold h-screen px-32">
                <div className="text-5xl text-black">
                    Categories
                </div>

                <div className="carousel rounded-box col-span-12 space-x-5">
                        {categories.map((category,i)=>(
                            <div className="carousel-item rounded-xl relative">

                                <img
                                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                                alt="Burger" /> 

                                <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-90 bg-gradient-to-t from-black to-transparent z-0"></div>

                                <div className="absolute bottom-4 left-5 text-2xl text-white">
                                    {category}
                                </div>

                            </div>
                        ))}

                </div>
            </div>


            

            <div className="col-span-12 h-screen grid grid-cols-12 relative">
                <div className="col-span-12 bg-red-200 w-screen bg-red-600 h-96 mb-12 absolute z-1">

                </div>

                <div className="col-span-12 px-32 grid grid-cols-12 gap-5 relative">
                    <div className="col-span-5 flex flex-col justify-center h-full text-black mt-51">
                        <div className="font-semibold text-5xl mb-6">
                            This is _______
                        </div>
                        
                        <div className="text-[16px] mb-13 font-medium"
                        style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet laoreet dolor, eget consectetur orci tempus vel. 
                        </div>

                        <button className="bg-black text-white text-xl px-6 py-2 rounded-full w-66 mb-3">
                            Learn more 
                        </button>
                    </div>

                </div>

                <div className="absolute top left-170 z-[0]">
                <Image
                    src="/Assets/BgSupergrapicFade.png"
                    alt="Pattern Fade"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-202"
                />
                </div>
            
            </div>

            <div className="h-screen px-32 col-span-12 flex flex-col justify-center items-start gap-20 relative z-100">
                <div className=" text-black font-bold text-5xl">
                    Check Out More!
                </div>

                <div className="grid grid-cols-12 gap-5 w-full">
                    {provinces.map((province, i) => (
                        <div key={i} className="col-span-2 h-46 bg-neutral-400 relative w-full">
                            <div className="absolute font-bold text-white bottom-2 left-2 p-2 w-30 text-3xl z-1">
                                {province}
                            </div>
                            
                            <div className="absolute bottom-0 left-0 w-full h-[120px] opacity-80 bg-gradient-to-t from-black to-transparent z-0"></div>
                        </div>
                    ))} 
                </div> 
            </div>

            <div className="absolute bg-gradient-to-r from-white to-transparent z-0 pointer-events-none right-0 bottom-0 w-400 h-200">
                    <Image
                    src="/Assets/patternFade.png"
                    alt="Pattern Fade"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-50"
                    />
                </div>
        </div>
    )
}