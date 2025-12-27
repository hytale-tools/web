import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from "@/components/ui/tooltip";

export default function Advertisement() {
  return (
    <div className="absolute top-4 md:top-auto md:bottom-4 right-3 z-50">
      <Tooltip>
        <TooltipTrigger>
          <a 
            href="https://discord.gg/Psx9uKDnWR"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/25 px-3.5 py-2.5 rounded-md cursor-pointer hover:bg-black/35 transition-all duration-300 inline-block"
          >
            <img src="/hylandia-banner.png" alt="Hylandia" className="h-12 object-cover object-center inline-block" />
          </a>
        </TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent>
            <p>An upcoming Hytale Minigames Server</p>
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    </div>
  );
}
