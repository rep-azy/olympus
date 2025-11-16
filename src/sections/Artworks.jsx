/* eslint-disable */
import { twMerge } from "tailwind-merge"
import Marquee from "../components/Marquee";
import { artworks } from "../constants";

// Shuffle function to randomize artwork order
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Distribute artworks across 4 rows ensuring no duplicates
const distributeArtworks = (artworks) => {
  const shuffled = shuffleArray(artworks);
  const rowCount = 4;
  const rows = Array.from({ length: rowCount }, () => []);
  
  shuffled.forEach((artwork, index) => {
    rows[index % rowCount].push(artwork);
  });
  
  return rows;
};

const [firstRow, secondRow, thirdRow, fourthRow] = distributeArtworks(artworks);

const ArtworkCard = ({
  img,
  title,
  category,
}) => {
  return (
    <figure
      className={twMerge(
        "relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 cursor-pointer overflow-hidden rounded-xl"
      )}
    >
      <img 
        className="w-full h-full object-cover" 
        alt={title} 
        src={img} 
      />
      <div className="absolute h-full inset-x-0 bottom-0 opacity-0 hover:opacity-100 transition-opacity">
        <div className="absolute h-full w-full inset-x-0 bottom-0 bg-gradient-to-t from-brimstone/70 to-transparent p-2">
            <figcaption className="absolute inset-x-0 bottom-2 left-2 text-sm font-bold text-white">
                {title}
            </figcaption>
            <span className="px-2 py-1 w-fit text-xs font-semibold absolute bottom-2 right-2 text-white bg-white/10 rounded-full border border-white/20">
                {category}
            </span>
        </div>
      </div>
    </figure>
  )
}

export default function Artworks() {
    return (
        <div className="items-start mt-25 md:mt-35 c-space">
            <h2 className="text-heading">My Artworks</h2>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
            <div className="relative flex h-[32rem] sm:h-[32rem] md:h-[36rem] lg:h-[40rem] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:1000px] mt-4">
                <div
                    className="flex flex-row items-center gap-4"
                    style={{
                    transform:
                        "translateX(-50px) translateY(0px) translateZ(10px) rotateX(0deg) rotateY(0deg) rotateZ(10deg)",
                    }}
                >
                    <Marquee pauseOnHover vertical className="[--duration:20s]">
                        {firstRow.map((artwork) => (
                            <ArtworkCard key={artwork.title} {...artwork} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
                        {secondRow.map((artwork) => (
                            <ArtworkCard key={artwork.title} {...artwork} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
                        {thirdRow.map((artwork) => (
                            <ArtworkCard key={artwork.title} {...artwork} />
                        ))}
                    </Marquee>
                    <Marquee pauseOnHover className="[--duration:20s]" vertical>
                        {fourthRow.map((artwork) => (
                            <ArtworkCard key={artwork.title} {...artwork} />
                        ))}
                    </Marquee>
                </div>

                <div className="from-brimstone pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"/>
                <div className="from-brimstone pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"/>
                <div className="from-brimstone pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"/>
                <div className="from-brimstone pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"/>
            </div>
        </div>
    )
};
